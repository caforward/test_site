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
     * В лог пишется только причина, без полей формы и IP: журнал сервера
     * видят все, у кого есть доступ к хостингу, персональных данных там быть не должно.
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
        $rejectReason = 'неизвестный компонент-инициатор';
    }

    // 3. Тема прислана внутренним кодом вместо подписи
    if ($rejectReason === null && in_array(mb_strtolower($post('messageType')), $internalTypes, true)) {
        $rejectReason = 'тема прислана кодом, а не подписью';
    }

    // 4. Претензия заполнена при другой теме. В интерфейсе это поле
    //    показывается только когда выбрана тема "Претензия"
    if ($rejectReason === null && $post('claim') !== '' && $post('messageType') !== 'Претензия') {
        $rejectReason = 'претензия заполнена при другой теме';
    }

    // 5. Обязательные поля: их требуют все три формы
    if ($rejectReason === null && ($post('name') === '' || $post('tel') === '')) {
        $rejectReason = 'нет обязательных полей';
    }

    // 6. Почта: формат и зарезервированные зоны
    if ($rejectReason === null && $post('email') !== '') {
        $email = $post('email');

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $rejectReason = 'некорректный адрес почты';
        } else {
            $tld = mb_strtolower(substr(strrchr($email, '.') ?: '', 1));

            if (in_array($tld, $reservedTlds, true)) {
                $rejectReason = 'почта в зарезервированной зоне';
            }
        }
    }

    // 7. Телефон-заглушка: одинаковые цифры после кода страны
    if ($rejectReason === null && $post('tel') !== '') {
        $digits = preg_replace('/\D+/', '', $post('tel'));

        if (strlen($digits) >= 10 && preg_match('/^(\d)\1+$/', substr($digits, 1)) === 1) {
            $rejectReason = 'телефон-заглушка';
        }
    }

    if ($rejectReason !== null) {
        error_log('email.php: отправка отклонена (' . $rejectReason . ')');

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
        error_log('email.php: превышена частота отправок');

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

    /*
     * Вложение. С 22.10.2026 хостинг после уязвимостей PHP CVE-2026-109618 и
     * CVE-2026-109619 отвечает 403 на любой POST multipart/form-data, поэтому
     * сайт присылает файл в обычной форме строкой base64: содержимое в
     * file_attachment_b64, имя в file_attachment_name (formRequest.js).
     * Файл через multipart ($_FILES) принимается как раньше.
     */
    $attachment = null;

    if (isset($_FILES['file_attachment']) && $_FILES['file_attachment']['error'] === UPLOAD_ERR_OK) {
        $attachment = [
            'name' => $_FILES['file_attachment']['name'],
            'path' => $_FILES['file_attachment']['tmp_name'],
        ];
    } elseif ($post('file_attachment_b64') !== '') {
        $fileData = base64_decode($post('file_attachment_b64'), true);

        if ($fileData === false || $fileData === '') {
            http_response_code(400);
            echo json_encode(["message" => "Ошибка загрузки файла"]);
            exit;
        }

        // Лимит как MAX_FILE_SIZE в formRequest.js, файл больше сайт не отправляет. В base64
        // файл вырастает на треть, запрос с 5 МБ укладывается в post_max_size 8M
        if (strlen($fileData) > 5 * 1024 * 1024) {
            http_response_code(413);
            echo json_encode(["message" => "Файл больше 5 МБ"]);
            exit;
        }

        // Имя от браузера: без пути и управляющих символов, PHP так же чистит имя в $_FILES
        $fileName = preg_replace(['~[\x00-\x1F\x7F]~u', '~^.*[/\\\\]~u'], '', $post('file_attachment_name')) ?? '';

        $attachment = [
            'name' => $fileName !== '' ? mb_substr($fileName, -200) : 'file',
            'data' => $fileData,
        ];
    }

    $fields = [
        'name' => 'Имя',
        'tel' => 'Телефон',
        'email' => 'Email',
        'birthdayDate' => 'День рождения',
        'messageType' => 'Выбрана тема',
        'claim' => 'Претензия',
        'message' => 'Вопрос',
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
    if ($attachment !== null) {
        $htmlContent .= '<p><strong>Вложение:</strong> ' . htmlspecialchars($attachment['name'], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') . '</p>';
    }

    $component = !empty($_POST['fromComponent'])
        ? htmlspecialchars($_POST['fromComponent'], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')
        : 'Не указан';

    $htmlContent .= "<p><strong>Компонент-инициатор письма:</strong> {$component}</p>";

    // УИД заявки - tid сайта: тот же tid уходит в Метрику в событиях track_id и form_submitted,
    // по нему письмо связывается с визитом. Сайт присылает его пока только с формой рассрочки.
    // Строка последняя, так просил заказчик. Формат как у оплаты: 10-13 цифр и 4 заглавные латинские
    $tid = $post('tid');
    if (preg_match('/^\d{10,13}[A-Z]{4}$/', $tid) === 1) {
        $htmlContent .= "<p><strong>УИД:</strong> {$tid}</p>";
    }
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
        if ($attachment !== null && isset($attachment['path'])) {
            $mail->addAttachment($attachment['path'], $attachment['name']);
        } elseif ($attachment !== null) {
            $mail->addStringAttachment($attachment['data'], $attachment['name']);
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