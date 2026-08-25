<?php

/*
 * Регистрация платежа в Т-Банке со стороны сервера.
 *
 * Зачем так, а не виджетом на фронте: скрипт виджета раздаётся с домена
 * securepay.tinkoff.ru, который работает по сертификату УЦ Минцифры. На
 * устройствах без этого корневого сертификата (обычные iPhone и Android)
 * соединение не устанавливается, скрипт не грузится и оплата не работает.
 *
 * Сервер тот же сертификат принимает без проблем: корень лежит рядом,
 * в backend/certs, и передаётся в cURL явно.
 */

require __DIR__ . '/../../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

const TBANK_INIT_URL = 'https://securepay.tinkoff.ru/v2/Init';
const TBANK_GETQR_URL = 'https://securepay.tinkoff.ru/v2/GetQr';

// securepay.tinkoff.ru работает по сертификату УЦ Минцифры, которого нет
// в стандартном хранилище Linux. Возим корень с собой, иначе cURL не
// установит соединение. Домен tbank.ru не используем: поддержка банка
// подтвердила, что методов на нём официально не существует.
const TBANK_CA_BUNDLE = __DIR__ . '/../certs/russian-trusted-ca.pem';

// Куда банк присылает статусы платежей, включая возвраты по СБП.
// Домен зашит намеренно: адрес уходит в банк и должен быть публичным.
const SITE_URL = 'https://caforward.ru';
const NOTIFICATION_URL = SITE_URL . '/backend/public/payment-notify.php';
const RETURN_URL = SITE_URL . '/payment';

// СБП открыт для проверки: в форме он показывается только на адресе с ?sbp=test,
// поэтому обычные посетители на него не попадут. Как проверим развороты -
// либо оставляем открытым совсем, либо снова ставим false.
const IS_FPS_ENABLED = true;

// Минимальные суммы: у СБП ограничение самого банка, ниже он платёж не примет
const MIN_AMOUNT_FPS = 10;
const MIN_AMOUNT_CARD = 1;
const MAX_AMOUNT = 1000000;

header('Content-Type: application/json; charset=utf-8');

function fail(int $code, string $message): void
{
    http_response_code($code);
    echo json_encode(['ok' => false, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

/*
 * Подпись запроса. Считается только по полям верхнего уровня, вложенные
 * DATA и Receipt в неё не входят. Если пароль терминала не задан, подпись
 * не отправляем - терминал настроен без неё.
 */
function makeToken(array $params, string $password): string
{
    $params['Password'] = $password;

    unset($params['DATA'], $params['Receipt'], $params['Token']);

    ksort($params);

    $concatenated = '';

    foreach ($params as $value) {
        $concatenated .= is_bool($value) ? ($value ? 'true' : 'false') : (string) $value;
    }

    return hash('sha256', $concatenated);
}

/*
 * С фронта телефон приходит в виде маски "+7 999 111-22-33", а банк для чека
 * ждёт сплошные цифры с плюсом.
 */
function normalizePhone(string $phone): string
{
    $digits = preg_replace('/\D+/', '', $phone);

    if ($digits === '') {
        return '';
    }

    if (strlen($digits) === 11 && $digits[0] === '8') {
        $digits = '7' . substr($digits, 1);
    }

    if (strlen($digits) === 10) {
        $digits = '7' . $digits;
    }

    return '+' . $digits;
}

function callBank(string $url, array $payload): ?array
{
    $ch = curl_init($url);

    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE),
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 20,
        CURLOPT_CONNECTTIMEOUT => 10,
    ]);

    if (is_readable(TBANK_CA_BUNDLE)) {
        curl_setopt($ch, CURLOPT_CAINFO, TBANK_CA_BUNDLE);
    } else {
        error_log('payment.php: нет файла сертификатов ' . TBANK_CA_BUNDLE . ', соединение с банком может не установиться');
    }

    $raw = curl_exec($ch);
    $curlError = curl_error($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    curl_close($ch);

    if ($raw === false) {
        error_log("payment.php: запрос $url не выполнен - $curlError");
        return null;
    }

    $decoded = json_decode($raw, true);

    if (!is_array($decoded)) {
        error_log("payment.php: неразбираемый ответ от $url (HTTP $httpCode): $raw");
        return null;
    }

    return $decoded;
}

/*
 * QR для СБП забираем сами и показываем на своей странице. Иначе человек уходит
 * на платёжную страницу банка, где кроме СБП доступна оплата картой, и такой
 * карточный платёж проходит через СБП-терминал, попадая не в тот банк.
 */
function getQr(string $paymentId, string $terminalKey, string $password, string $dataType): ?string
{
    $payload = [
        'TerminalKey' => $terminalKey,
        'PaymentId' => $paymentId,
        'DataType' => $dataType,
    ];

    $payload['Token'] = makeToken($payload, $password);

    $result = callBank(TBANK_GETQR_URL, $payload);

    if ($result === null || empty($result['Success']) || empty($result['Data'])) {
        $message = $result['Message'] ?? 'нет ответа';
        error_log("payment.php: GetQr $dataType не удался - $message");
        return null;
    }

    return $result['Data'];
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    fail(405, 'Метод не поддерживается');
}

$input = json_decode(file_get_contents('php://input'), true);

if (!is_array($input)) {
    fail(400, 'Некорректный запрос');
}

$method = $input['method'] ?? '';
$name = trim((string) ($input['name'] ?? ''));
$contractId = trim((string) ($input['contractId'] ?? ''));
$email = trim((string) ($input['email'] ?? ''));
$phone = normalizePhone((string) ($input['phone'] ?? ''));
$amount = $input['amount'] ?? null;

if ($method !== 'card' && $method !== 'fps') {
    fail(400, 'Неизвестный способ оплаты');
}

if ($method === 'fps' && !IS_FPS_ENABLED) {
    fail(503, 'Оплата через СБП временно недоступна. Оплатите картой или по реквизитам.');
}

if ($name === '' || $contractId === '') {
    fail(400, 'Заполните все обязательные поля');
}

if (!is_numeric($amount)) {
    fail(400, 'Некорректная сумма');
}

$amount = round((float) $amount, 2);
$minAmount = $method === 'fps' ? MIN_AMOUNT_FPS : MIN_AMOUNT_CARD;

if ($amount < $minAmount) {
    fail(400, "Минимальная сумма - $minAmount руб.");
}

if ($amount > MAX_AMOUNT) {
    fail(400, 'Сумма слишком большая');
}

if ($email === '' && $phone === '') {
    fail(400, 'Укажите e-mail или телефон');
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail(400, 'Некорректный e-mail');
}

$terminalKey = $method === 'fps'
    ? ($_ENV['TBANK_TERMINAL_KEY_FPS'] ?? '')
    : ($_ENV['TBANK_TERMINAL_KEY_CARD'] ?? '');

$password = $method === 'fps'
    ? ($_ENV['TBANK_PASSWORD_FPS'] ?? '')
    : ($_ENV['TBANK_PASSWORD_CARD'] ?? '');

if ($terminalKey === '') {
    error_log('payment.php: не задан ключ терминала для способа ' . $method);
    fail(500, 'Оплата временно недоступна. Попробуйте позже или оплатите по реквизитам.');
}

// Т-Банк принимает сумму в копейках
$amountInCents = (int) round($amount * 100);
$purpose = "Оплата по договору номер $contractId";

$data = [
    'Paymentpurpose' => $purpose,
    'Name' => $name,
];

$receipt = [
    'EmailCompany' => 'dolg.info@caforward.ru',
    'Taxation' => 'osn',
    'FfdVersion' => '1.2',
    'Items' => [
        [
            'Name' => $purpose,
            'Price' => $amountInCents,
            'Quantity' => 1,
            'Amount' => $amountInCents,
            'PaymentMethod' => 'credit_payment',
            'PaymentObject' => 'payment',
            'Tax' => 'none',
            'MeasurementUnit' => 'pc',
        ],
    ],
];

if ($email !== '') {
    $data['Email'] = $email;
    $receipt['Email'] = $email;
}

if ($phone !== '') {
    $data['Phone'] = $phone;
    $receipt['Phone'] = $phone;
}

// NotificationURL, SuccessURL и FailURL - поля корневого объекта, поэтому
// добавляем их до расчёта подписи, иначе банк её не примет.
$payload = [
    'TerminalKey' => $terminalKey,
    'Amount' => $amountInCents,
    'OrderId' => date('YmdHis') . '-' . bin2hex(random_bytes(3)),
    'Description' => $contractId,
    'Language' => 'ru',
    'NotificationURL' => NOTIFICATION_URL,
    'SuccessURL' => RETURN_URL . '?paid=1&m=' . $method,
    'FailURL' => RETURN_URL . '?paid=0&m=' . $method,
];

if ($password !== '') {
    $payload['Token'] = makeToken($payload, $password);
}

$payload['DATA'] = $data;
$payload['Receipt'] = $receipt;

$result = callBank(TBANK_INIT_URL, $payload);

if ($result === null) {
    fail(502, 'Банк не отвечает. Попробуйте позже или оплатите по реквизитам.');
}

if (empty($result['Success']) || empty($result['PaymentURL'])) {
    $errorCode = $result['ErrorCode'] ?? '?';
    $bankMessage = trim(($result['Message'] ?? '') . ' ' . ($result['Details'] ?? ''));
    error_log("payment.php: банк отклонил заказ - код $errorCode, $bankMessage");
    fail(502, 'Не удалось создать платёж. Проверьте данные или оплатите по реквизитам.');
}

$answer = [
    'ok' => true,
    'paymentUrl' => $result['PaymentURL'],
    'paymentId' => $result['PaymentId'] ?? null,
];

// Если QR получить не вышло, отдаём только ссылку - фронт уведёт на страницу
// банка, как раньше. Хуже, чем QR, но лучше, чем отказ в оплате.
if ($method === 'fps' && $password !== '' && !empty($result['PaymentId'])) {
    $paymentId = (string) $result['PaymentId'];

    $image = getQr($paymentId, $terminalKey, $password, 'IMAGE');
    $link = getQr($paymentId, $terminalKey, $password, 'PAYLOAD');

    // Банк отдаёт сырой SVG. Заворачиваем в data-URI, чтобы фронт показал его
    // обычным <img> и нам не пришлось вставлять чужую разметку через v-html.
    if ($image !== null) {
        $answer['qrImage'] = 'data:image/svg+xml;base64,' . base64_encode($image);
    }

    if ($link !== null) {
        $answer['qrLink'] = $link;
    }
}

echo json_encode($answer, JSON_UNESCAPED_UNICODE);
