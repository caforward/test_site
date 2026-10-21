<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    /*
     * Защита от автоматических отправок.
     *
     * Повод: 26.08.2026 пришло письмо с мусором вида OSA-f26dd509 в имени и
     * претензии, телефоном +70000000000 и почтой в зоне .invalid. Отправлено
     * не через форму, а прямым POST на этот файл - у формы такой набор полей
     * получиться не может.
     *
     * Проверки построены на том, чего живая форма не делает НИКОГДА. Если
     * запрос отбит - отвечаем обычным успехом, чтобы отправитель не понял,
     * что его отсекли, и не начал подбирать. Причина пишется в лог PHP.
     */

    // Форма шлёт подпись темы, а не внутренний код: см. useForm.js,
    // createFormData подменяет value на label. Код в этом поле - признак того,
    // что запрос собран в обход интерфейса.
    $internalTypes = [
        'debt-info', 'installment', 'refund', 'account-unblock', 'cancel-ip',
        'get-contract-id', 'claim', 'other', 'callback',
    ];

    // Зарезервированные зоны из RFC 2606 и RFC 6761. Живой почты там нет,
    // их подставляют сканеры и генераторы тестовых данных.
    $reservedTlds = ['invalid', 'test', 'example', 'localhost', 'local'];

    $post = static function (string $key): string {
        return is_string($_POST[$key] ?? null) ? trim($_POST[$key]) : '';
    };

    $rejectReason = null;

    // 1. Ловушка: поле скрыто от человека, его заполняют только автоматы
    if ($post('website') !== '') {
        $rejectReason = 'заполнено скрытое поле-ловушка';
    }

    // 2. Компонент-инициатор. Все формы, которые шлют сюда, его проставляют
    //    с августа 2025: ModalForm.vue, FormBlock.vue, Calculator.vue
    $allowedComponents = ['ModalForm', 'Calculator'];
    if ($rejectReason === null && !in_array($post('fromComponent'), $allowedComponents, true)) {
        $rejectReason = 'неизвестный компонент-инициатор: "' . $post('fromComponent') . '"';
    }

    // 3. Тема прислана внутренним кодом вместо подписи
    if ($rejectReason === null && in_array(mb_strtolower($post('messageType')), $internalTypes, true)) {
        $rejectReason = 'тема прислана кодом, а не подписью: "' . $post('messageType') . '"';
    }

    // 4. Претензия заполнена при другой теме. В интерфейсе это поле
    //    показывается только когда выбрана тема "Претензия"
    if ($rejectReason === null && $post('claim') !== '' && $post('messageType') !== 'Претензия') {
        $rejectReason = 'претензия заполнена при теме "' . $post('messageType') . '"';
    }

    // 5. Обязательные поля: их требуют все три формы
    if ($rejectReason === null && ($post('name') === '' || $post('tel') === '')) {
        $rejectReason = 'нет обязательных полей';
    }

    // 6. Почта: формат и зарезервированные зоны
    if ($rejectReason === null && $post('email') !== '') {
        $email = $post('email');

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $rejectReason = 'некорректный адрес почты: "' . $email . '"';
        } else {
            $tld = mb_strtolower(substr(strrchr($email, '.') ?: '', 1));

            if (in_array($tld, $reservedTlds, true)) {
                $rejectReason = 'почта в зарезервированной зоне: "' . $email . '"';
            }
        }
    }

    // 7. Телефон-заглушка: одинаковые цифры после кода страны
    if ($rejectReason === null && $post('tel') !== '') {
        $digits = preg_replace('/\D+/', '', $post('tel'));

        if (strlen($digits) >= 10 && preg_match('/^(\d)\1+$/', substr($digits, 1)) === 1) {
            $rejectReason = 'телефон-заглушка: "' . $post('tel') . '"';
        }
    }

    if ($rejectReason !== null) {
        error_log(sprintf(
            'email.php: отправка отклонена (%s), IP %s, поля: %s',
            $rejectReason,
            $_SERVER['REMOTE_ADDR'] ?? 'неизвестен',
            json_encode($_POST, JSON_UNESCAPED_UNICODE)
        ));

        http_response_code(200);
        echo json_encode(["message" => "Сообщение успешно отправлено!"]);
        exit;
    }

    /*
     * Ограничение частоты. Живой человек не отправляет форму чаще нескольких
     * раз за десять минут. Счётчик лежит во временной папке; если она
     * недоступна - пропускаем отправку, защита не должна ронять форму.
     */
    $rateLimitExceeded = false;

    try {
        $rateDir = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'caforward-form-rate';

        if (!is_dir($rateDir)) {
            @mkdir($rateDir, 0700, true);
        }

        if (is_dir($rateDir) && is_writable($rateDir)) {
            $rateFile = $rateDir . DIRECTORY_SEPARATOR . sha1($_SERVER['REMOTE_ADDR'] ?? 'unknown') . '.json';
            $window = 600;   // окно наблюдения, секунд
            $limit = 5;      // отправок за окно

            $stamps = [];

            if (is_file($rateFile)) {
                $saved = json_decode((string) @file_get_contents($rateFile), true);
                $stamps = is_array($saved) ? $saved : [];
            }

            $now = time();
            $stamps = array_values(array_filter($stamps, static function ($t) use ($now, $window) {
                return is_int($t) && $t > $now - $window;
            }));

            if (count($stamps) >= $limit) {
                $rateLimitExceeded = true;
            } else {
                $stamps[] = $now;
                @file_put_contents($rateFile, json_encode($stamps), LOCK_EX);
            }
        }
    } catch (Throwable $e) {
        error_log('email.php: счётчик частоты недоступен - ' . $e->getMessage());
    }

    if ($rateLimitExceeded) {
        error_log(sprintf(
            'email.php: превышена частота отправок, IP %s',
            $_SERVER['REMOTE_ADDR'] ?? 'неизвестен'
        ));

        http_response_code(429);
        echo json_encode(["message" => "Слишком много отправок подряд. Попробуйте через несколько минут."]);
        exit;
    }

    // Проверка файла: если файл пришел, но с ошибкой (кроме "файл не выбран")
    if (isset($_FILES['file_attachment']) &&
        $_FILES['file_attachment']['error'] !== UPLOAD_ERR_OK &&
        $_FILES['file_attachment']['error'] !== UPLOAD_ERR_NO_FILE) {

        http_response_code(400);
        echo json_encode(["message" => "Ошибка загрузки файла. Код: " . $_FILES['file_attachment']['error']]);
        exit;
    }

    $fields = [
        'name' => 'Имя',
        'tel' => 'Телефон',
        'email' => 'Email',
        'birthdayDate' => 'День рождения',
        'messageType' => 'Выбрана тема',
        'claim' => 'Претензия',
        'companyName' => 'Наименование компании',
        'paymentAmount' => 'Сумма вашего долга',
        'paymentPeriod' => 'Срок погашения',
        'paymentDate' => 'Дата ежемесячного платежа',
        'paymentMonthly' => 'Сумма ежемесячного платежа без учета скидки',
        'fromComponent' => 'Компонент-инициатор письма',
    ];

    $htmlContent = '<html><head><meta charset="UTF-8"></head><body>';
    $htmlContent .= '<h2>Сообщение с сайта:</h2>';

    foreach ($fields as $key => $label) {
        if (!empty($_POST[$key]) && $key !== 'fromComponent') {
            $value = htmlspecialchars($_POST[$key], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
            $htmlContent .= "<p><strong>{$label}:</strong> {$value}</p>";
        }
    }

    // Добавляем инфо о вложении в текст письма, если оно есть
    if (isset($_FILES['file_attachment']) && $_FILES['file_attachment']['error'] === UPLOAD_ERR_OK) {
        $htmlContent .= '<p><strong>Вложение:</strong> ' . htmlspecialchars($_FILES['file_attachment']['name']) . '</p>';
    }

    $component = !empty($_POST['fromComponent'])
        ? htmlspecialchars($_POST['fromComponent'], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')
        : 'Не указан';

    $htmlContent .= "<p><strong>Компонент-инициатор письма:</strong> {$component}</p>";
    $htmlContent .= '<small>Если письмо пустое, значит это ошибка, сообщите об этом руководителю отдела: скрипт письма — email.php.</small>';
    $htmlContent .= '</body></html>';

    $mail = new PHPMailer(true);

    try {
        $mail->CharSet = 'UTF-8';
        $mail->isSMTP();
        $mail->Host = $_ENV['SMTP_HOST'];
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['SMTP_USER'];
        $mail->Password = $_ENV['SMTP_PASS'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = $_ENV['SMTP_PORT'];

        $mail->setFrom($_ENV['SMTP_USER'], 'Сообщение с сайта');
        $mail->addAddress($_ENV['SMTP_ADDRESS']);

        // Прикрепляем файл
        if (isset($_FILES['file_attachment']) && $_FILES['file_attachment']['error'] === UPLOAD_ERR_OK) {
            $mail->addAttachment(
                $_FILES['file_attachment']['tmp_name'],
                $_FILES['file_attachment']['name']
            );
        }

        $subject = 'Новое сообщение с сайта';
        $mail->Subject = mb_encode_mimeheader($subject, 'UTF-8');
        $mail->isHTML(true);
        $mail->Body = $htmlContent;
        $mail->AltBody = strip_tags(str_replace(["\n", "\r"], ' ', $htmlContent));

        $mail->send();
        http_response_code(200);
        echo json_encode(["message" => "Сообщение успешно отправлено!"]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["message" => "Ошибка при отправке сообщения: " . $mail->ErrorInfo]);
    }
} else {
    http_response_code(403);
    echo json_encode(["message" => "Доступ запрещен"]);
}
?>