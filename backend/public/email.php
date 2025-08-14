<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fields = [
        'name' => 'Имя',
        'tel' => 'Телефон',
        'email' => 'Email',
        'birthday' => 'День рождения',
        'messageType' => 'Выбрана тема',
        // 'message' => 'Текст',
        'companyName' => 'Наименование компании',
        'paymentAmount' => 'Сумма вашего долга',
        'paymentPeriod' => 'Срок погашения',
        'paymentDate' => 'Дата ежемесячного платежа',
        'paymentMonthlyDiscount' => 'Сумма ежемесячного платежа с учетом скидки в 5%',
        'fromComponent' => 'Компонент-инициатор письма',
    ];

    $rows = '';
    foreach($fields as $key => $label) {
        if (!empty($_POST[$key]) && $key !== 'fromComponent') {
            $value = htmlspecialchars($_POST[$key], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
            $rows .= "<tr>
                    <td style=\"padding: 8px 12px; font-weight: 600; white-space: nowrap;\">{$label}:</td>
                    <td style=\"padding: 8px 12px;\">{$value}</td>
                </tr>";
        }
    }

    $component = !empty($_POST['fromComponent'])
        ? htmlspecialchars($_POST['fromComponent'], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')
        : 'Не указан';

    $htmlContent = <<<HTML
                   <!DOCTYPE html>
                   <html lang="ru">
                   <head>
                     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                     <meta name="x-apple-disable-message-reformatting">
                     <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                     <title>Сообщение с сайта</title>
                   </head>
                   <body style="margin:0;padding:0;background:#ffffff;">
                     <div style="max-width:640px;margin:0 auto;padding:24px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.4;color:#111;">
                       <h2 style="margin:0 0 16px;">Сообщение с сайта</h2>
                       <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
                         {$rows}
                       </table>
                       <p style="font-size:12px;color:#666;margin-top:16px;">
                         Если письмо пустое, значит это ошибка, сообщите об этом руководителю отдела: скрипт письма — email.php.
                       </p>
                       <p style="font-size:12px;color:#666;margin:0;">
                         <strong>Компонент-инициатор письма:</strong> {$component}
                       </p>
                     </div>
                   </body>
                   </html>
                   HTML;

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