<?php

/*
 * Приём уведомлений Т-Банка о статусе платежа.
 *
 * Адрес передаётся в Init параметром NotificationURL. Банк шлёт сюда POST
 * по каждому изменению статуса, включая возвраты по СБП, и ждёт ответа
 * не дольше 10 секунд. Ответить нужно ровно "OK" с кодом 200, иначе банк
 * будет повторять доставку раз в час сутки, затем раз в день месяц.
 *
 * Ничего тяжёлого тут делать нельзя: только проверить подпись и записать.
 */

require __DIR__ . '/../../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

/*
 * Подпись считается по полям верхнего уровня: вложенные объекты и массивы
 * не участвуют, null-значения банк в неё не включает.
 */
function notificationToken(array $params, string $password): string
{
    unset($params['Token']);

    $params['Password'] = $password;

    $flat = [];

    foreach ($params as $key => $value) {
        if (is_array($value) || $value === null) {
            continue;
        }

        $flat[$key] = is_bool($value) ? ($value ? 'true' : 'false') : (string) $value;
    }

    ksort($flat);

    return hash('sha256', implode('', $flat));
}

function respondOk(): void
{
    header('Content-Type: text/plain; charset=utf-8');
    http_response_code(200);
    echo 'OK';
    exit;
}

function reject(int $code, string $reason): void
{
    error_log("payment-notify.php: уведомление отклонено - $reason");
    http_response_code($code);
    echo 'ERROR';
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    reject(405, 'не POST');
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

// исторически банк слал form-urlencoded, поэтому подстрахуемся
if (!is_array($data) || $data === []) {
    $data = $_POST;
}

if (!is_array($data) || $data === []) {
    reject(400, 'пустое тело');
}

$terminalKey = (string) ($data['TerminalKey'] ?? '');

$password = match ($terminalKey) {
    (string) ($_ENV['TBANK_TERMINAL_KEY_FPS'] ?? '~') => (string) ($_ENV['TBANK_PASSWORD_FPS'] ?? ''),
    (string) ($_ENV['TBANK_TERMINAL_KEY_CARD'] ?? '~') => (string) ($_ENV['TBANK_PASSWORD_CARD'] ?? ''),
    default => '',
};

if ($terminalKey === '' || $password === '') {
    /*
     * Пароль терминала не задан - проверить подлинность нечем. Отвечаем OK,
     * чтобы банк не долбил ретраями месяц, но пишем в лог погромче.
     */
    error_log("payment-notify.php: нет пароля для терминала '$terminalKey', подпись не проверена: $raw");
    respondOk();
}

if (!hash_equals(notificationToken($data, $password), (string) ($data['Token'] ?? ''))) {
    reject(403, "неверная подпись, терминал $terminalKey");
}

$status = (string) ($data['Status'] ?? '?');
$paymentId = (string) ($data['PaymentId'] ?? '?');
$orderId = (string) ($data['OrderId'] ?? '?');
$amount = isset($data['Amount']) ? ((int) $data['Amount']) / 100 : 0;
$success = !empty($data['Success']) ? 'да' : 'нет';
$errorCode = (string) ($data['ErrorCode'] ?? '');
$message = trim((string) ($data['Message'] ?? '') . ' ' . (string) ($data['Details'] ?? ''));

error_log(
    "payment-notify.php: статус=$status успех=$success сумма=$amount терминал=$terminalKey"
    . " платёж=$paymentId заказ=$orderId"
    . ($errorCode !== '' && $errorCode !== '0' ? " ошибка=$errorCode $message" : '')
);

respondOk();
