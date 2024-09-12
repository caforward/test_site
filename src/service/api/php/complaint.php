<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fields = [
        'name' => 'Имя',
        'tel' => 'Телефон',
        'email' => 'Email',
        'employeeName' => 'ФИО сотрудника',
        'complaintMessage' => 'Текст обращения',
    ];

    $htmlContent = '<html><head><meta charset="UTF-8"></head><body></body></html>';
    $htmlContent .= '<h2>Сообщение с сайта:</h2>';

    foreach ($fields as $key => $label) {
        if (!empty($_POST[$key])) {
            $htmlContent .= "<p><strong>$label:</strong> " . htmlspecialchars($_POST[$key], ENT_QUOTES, 'UTF-8') . "</p>";
        }
    }

    $htmlContent .= '</body></html>';

    $mail = new PHPMailer(true);

    try {
        $mail->CharSet = 'UTF-8';
        $mail->isSMTP();
        $mail->Host = 'smtp.mail.ru'; 
        $mail->SMTPAuth = true;
        $mail->Username = 'site-no-reply@caforward.ru'; 
        $mail->Password = ''; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; 
        $mail->Port = 465; 

        $mail->setFrom('site-no-reply@caforward.ru', 'Сообщение с сайта');
        $mail->addAddress('dolg.info@caforward.ru');

        $subject = 'Новое сообщение с сайта';
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