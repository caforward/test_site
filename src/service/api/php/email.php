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

    $htmlContent = '<html><head><meta charset="UTF-8"></head><body></body></html>';
    $htmlContent .= '<h2>Сообщение с сайта:</h2>';

    foreach ($fields as $key => $label) {
        if (!empty($_POST[$key]) && $key !== 'fromComponent') {
            $htmlContent .= "<p><strong>$label:</strong> " . htmlspecialchars($_POST[$key], ENT_QUOTES, 'UTF-8') . "</p>";
        }
    }

    $htmlContent .= '<small>Если письмо пустое, значит это ошибка, сообщите об этом руководителю отдела: скрипт письма - email.php.</small>';
    // Добавляем вывод компонента-инициатора письма
    if (!empty($_POST['fromComponent'])) {
        $htmlContent .= "<small><strong>Компонент-инициатор письма:</strong> " . htmlspecialchars($_POST['fromComponent'], ENT_QUOTES, 'UTF-8') . "</small>";
    } else {
        $htmlContent .= "<small><strong>Компонент-инициатор письма:</strong> Не указан</small>";
    }

    $htmlContent .= '</body></html>';

    $mail = new PHPMailer(true);

    try {
        $mail->CharSet = 'UTF-8';
        $mail->isSMTP();
        $mail->Host = 'smtp.mail.ru'; 
        $mail->SMTPAuth = true;
        $mail->Username = 'site-no-reply@caforward.ru'; 
        $mail->Password = 'qLg3rh57qVJWBnwzW7S4'; 
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