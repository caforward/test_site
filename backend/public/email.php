<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fields = [
        'name' => 'Имя',
        'tel' => 'Телефон',
        'email' => 'Email',
        'birthday' => 'День рождения',
        'messageType' => 'Выбрана тема',
        'companyName' => 'Наименование компании',
        'paymentAmount' => 'Сумма вашего долга',
        'paymentPeriod' => 'Срок погашения',
        'paymentDate' => 'Дата ежемесячного платежа',
        'paymentMonthlyDiscount' => 'Сумма ежемесячного платежа с учетом скидки в 5%',
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