<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; 


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST['name'];
    $tel = $_POST['tel'];



    $message = "Имя: " . $name . "\n";
    $message .= "Телефон: " . $tel . "\n";


    $mail = new PHPMailer(true);

    try {
 

        $mail->isSMTP();
        $mail->Host = 'smtp.mail.ru'; 
        $mail->SMTPAuth = true;
        $mail->Username = 'site-no-reply@caforward.ru'; 
        $mail->Password = 'NxVfKwzE0jgBZ5hjgsYg'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; 
        $mail->Port = 465; 


        $mail->setFrom('site-no-reply@caforward.ru', '');


        $mail->addAddress('dolg.info@caforward.ru');

        $subject = 'Новое сообщение с сайта';
    	$mail->Subject = mb_encode_mimeheader($subject, 'UTF-8');

        $mail->isHTML(true);
		
		$htmlContent = '<html><body>';
   		$htmlContent .= '<h2>Сообщение с сайта, заказывают звонок:</h1>';
    	$htmlContent .= "<h3>Имя: $name</p>";
    	$htmlContent .= "<h3>Телефон: $tel</p>";
    	$htmlContent .= '</body></html>';
		

        $mail->Body = $htmlContent;

        $mail->send();

        http_response_code(200);
        echo json_encode(["message" => "Сообщение успешно отправлено!"]);
    } catch (Exception $e) {

        http_response_code(500);
        echo json_encode(["message" => "Ошибка при отправке сообщения: {$mail->ErrorInfo}"]);
    }
} else {

    http_response_code(403);
    echo json_encode(["message" => "Доступ запрещен"]);
}
?>