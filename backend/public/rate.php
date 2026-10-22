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
     * Повод: 26.08.2026 в email.php прилетел мусор прямым POST в обход формы.
     * Этот файл лежит рядом и устроен так же, поэтому закрываем и его.
     *
     * Ловушки, как в email.php, здесь нет: оценку отправляют пять разных мест,
     * и данные они собирают вручную, а не через BaseForm. Поэтому опираемся на
     * то, что оценка - величина из очень узкого набора.
     *
     * Отбитый запрос получает обычный ответ об успехе, причина идёт в лог.
     * В лог пишется только причина, без полей формы и IP: журнал сервера
     * видят все, у кого есть доступ к хостингу, персональных данных там быть не должно.
     */

    // Кнопка "Оценить" появляется только после выбора звезды, звёзд ровно пять
    $allowedRates = ['1', '2', '3', '4', '5'];

    // Варианты быстрого отзыва из OverlayThank.vue. Показываются только при
    // оценке ниже пяти, поэтому отзыв при пятёрке - признак обхода формы
    $allowedFeedback = [
        'Ошибка на сайте',
        'Неудобно пользоваться',
        'Не загружается или тормозит',
        'Другое',
    ];

    $post = static function (string $key): string {
        return is_string($_POST[$key] ?? null) ? trim($_POST[$key]) : '';
    };

    $rejectReason = null;

    // 1. Оценка. Живая форма без неё письмо не отправляет
    if (!in_array($post('rate'), $allowedRates, true)) {
        $rejectReason = 'оценка вне набора 1-5';
    }

    // 2. Быстрый отзыв, если прислан, должен быть одним из четырёх
    if ($rejectReason === null && $post('feedback') !== ''
        && !in_array($post('feedback'), $allowedFeedback, true)) {
        $rejectReason = 'неизвестный вариант отзыва';
    }

    // 3. Отзыв при пятёрке: кнопки в интерфейсе в этом случае не показываются
    if ($rejectReason === null && $post('feedback') !== '' && $post('rate') === '5') {
        $rejectReason = 'быстрый отзыв при оценке 5';
    }

    // 4. Длины. Живой человек столько не пишет, а спам приходит простынями
    if ($rejectReason === null && mb_strlen($post('message')) > 2000) {
        $rejectReason = 'слишком длинный текст предложения';
    }

    if ($rejectReason === null && mb_strlen($post('username')) > 200) {
        $rejectReason = 'слишком длинное имя пользователя';
    }

    if ($rejectReason !== null) {
        error_log('rate.php: отправка отклонена (' . $rejectReason . ')');

        http_response_code(200);
        echo json_encode(["message" => "Сообщение успешно отправлено!"]);
        exit;
    }

    /*
     * Ограничение частоты. Счётчик отдельный от email.php: поток оценок не
     * должен съедать лимит заявок и наоборот. Если временная папка недоступна -
     * пропускаем отправку, защита не должна ронять форму.
     */
    $rateLimitExceeded = false;

    try {
        $rateDir = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'caforward-rate-rate';

        if (!is_dir($rateDir)) {
            @mkdir($rateDir, 0700, true);
        }

        if (is_dir($rateDir) && is_writable($rateDir)) {
            $rateFile = $rateDir . DIRECTORY_SEPARATOR . sha1($_SERVER['REMOTE_ADDR'] ?? 'unknown') . '.json';
            $window = 600;   // окно наблюдения, секунд
            $limit = 5;      // оценок за окно

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
        error_log('rate.php: счётчик частоты недоступен - ' . $e->getMessage());
    }

    if ($rateLimitExceeded) {
        error_log('rate.php: превышена частота отправок');

        http_response_code(429);
        echo json_encode(["message" => "Слишком много отправок подряд. Попробуйте через несколько минут."]);
        exit;
    }

    $fields = [
        'username' => 'Пользователь',
        'rate' => 'Оценка',
        'feedback' => 'Быстрый отзыв',
        'message' => 'Предложения по улучшению от пользователя',
    ];

    $htmlContent = '<html><head><meta charset="UTF-8"></head><body>';
    $htmlContent .= '<h2>Сообщение с сайта:</h2>';

    foreach ($fields as $key => $label) {
        if (!empty($_POST[$key])) {
            $htmlContent .= "<p><strong>$label:</strong> " . htmlspecialchars($_POST[$key], ENT_QUOTES, 'UTF-8') . "</p>";
        }
    }
    
    $htmlContent .= '<small>Если письмо пустое, значит это ошибка, сообщите об этом руководителю отдела: скрипт письма - rate.php.</small>';
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

        $subject = 'Оценка сайта пользователем';
        $mail->Subject = mb_encode_mimeheader($subject, 'UTF-8');
        $mail->isHTML(true);
        $mail->Body = $htmlContent;

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