<?php
/*require_once __DIR__ . '/recaptchalib.php';
// Введите свой секретный ключ
$secret = "6LcFHNUUAAAAABTuNKZFnhZU3et5sisDthsnYuHW";
// пустой ответ каптчи
$response = null;
$reCaptcha = new ReCaptcha($secret);
if ($_POST["g-recaptcha-response"]) {
$response = $reCaptcha->verifyResponse(
        $_SERVER["REMOTE_ADDR"],
        $_POST["g-recaptcha-response"]
    );
}*/
// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] === 'POST') {
    if (isset($_POST['name'])) {$name = $_POST['name'];}
    if (isset($_POST['birthdate'])) {$birthdate = $_POST['birthdate'];}
    if (isset($_POST['phone'])) {$phone = $_POST['phone'];}
    if (isset($_POST['mail'])) {$mail = $_POST['mail'];}
    if (isset($_POST['textarea'])) {$textarea = $_POST['textarea'];}
    if (isset($_POST['formData'])) {$formData = $_POST['formData'];}


	$to = "dolg.info@caforward.ru"; /*copy message*/
	$sendfrom   = "no-reply@caforward.ru"; /*Укажите адрес, с которого будет приходить письмо, можно не настоящий, нужно для формирования заголовка письма*/
    $headers  = "From: " . strip_tags($sendfrom) . "\r\n";
    $headers .= "Reply-To: ". strip_tags($sendfrom) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html;charset=utf-8 \r\n";
    $subject = "$formData";
     $message = "<h1>$formData</h1> <b>ФИО пославшего:</b> $name <br><b>Телефон:</b> $phone <br><b>Дата рождения</b> $birthdate <br><b>Email:</b> $mail <br><b>Текст сообщения:</b> $textarea";
    $send = mail ($to, $subject, $message, $headers);
	$send = mail ($subject, $message, $headers);
    if ($send == 'true')
    {
    echo '<center><p class="success">Спасибо за обращение. Наша служба поддержки свяжется с Вами.</p></center>';
    }
    else
    {
    echo '<center><p class="fail"><b>Ошибка. Сообщение не отправлено!</b></p></center>';
    }
} else {
    http_response_code(403);
    echo "Попробуйте еще раз";
}
?>