<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fields = [
        'username' => 'Пользователь',
        'rate' => 'Оценка',
        'feedback' => 'Быстрый отзыв',
        'message' => 'Предложения по улучшению от пользователя',
    ];

    $htmlContent = '<html><head><meta charset="UTF-8"></head><body></body></html>';
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
        $mail->Host = 'smtp.mail.ru'; 
        $mail->SMTPAuth = true;
        $mail->Username = 'site-no-reply@caforward.ru'; 
        $mail->Password = ''; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; 
        $mail->Port = 465; 

        $mail->setFrom('site-no-reply@caforward.ru', 'Сообщение с сайта');
        $mail->addAddress('dolg.info@caforward.ru');

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