<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST['name'];
    $tel = $_POST['tel'];
    $email = $_POST['email'];
    $selectedOption = $_POST['selectedOption'];


    $message = "Имя: " . $name . "\n";
    $message .= "Телефон: " . $tel . "\n";
    $message .= "Email: " . $email . "\n";
    $message .= "Выбранная опция: " . $selectedOption . "\n";


    $mail = new PHPMailer(true);

    try {

        $mail->isSMTP();
        $mail->Host = 'smtp.mail.ru';
        $mail->SMTPAuth = true;
        $mail->Username = 'v.panov@caforward.ru'; 
        $mail->Password = '9gFgjcKZgt5xajcDvJ0J'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; 
        $mail->Port = 465; 

        $mail->setFrom('v.panov@caforward.ru', 'no-reply');

        $mail->addAddress('vlad.panov777@gmail.com');

        $subject = 'Новое сообщение с сайта!';
    	$mail->Subject = mb_encode_mimeheader($subject, 'UTF-8');

        $mail->isHTML(true);
		
		$htmlContent = '<html><body>';
   		$htmlContent .= '<h1>Сообщение с сайта, заказывают звонок:</h1>';
    	$htmlContent .= "<h2>Имя: $name</p>";
    	$htmlContent .= "<h2>Телефон: $tel</p>";
    	$htmlContent .= "<h2>Email: $email</p>";
    	$htmlContent .= "<h2>Выбранная опция: $selectedOption</p>";
		$htmlContent .= "<h1>Хорошего вам дня!</h1>";
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