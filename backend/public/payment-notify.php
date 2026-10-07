<?php

/*
 * Приём уведомлений Т-Банка о статусе платежа.
 *
 * Адрес передаётся в Init параметром NotificationURL. Банк шлёт сюда POST
 * по каждому изменению статуса, включая возвраты по СБП, и ждёт ответа
 * не дольше 10 секунд. Ответить нужно ровно "OK" с кодом 200, иначе банк
 * будет повторять доставку раз в час сутки, затем раз в день месяц.
 *
 * Ничего тяжёлого тут делать нельзя: только проверить подпись и записать
 * уведомление в журнал платежей (backend/payment-log.php).
 */

require __DIR__ . '/../../vendor/autoload.php';
require __DIR__ . '/../payment-log.php';

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

/*
 * Что из уведомления попадает в журнал. Данные карты и контакты не пишем,
 * терминал называем по назначению, а не по ключу.
 */
function notifySummary(array $data): array
{
    $terminalKey = (string) ($data['TerminalKey'] ?? '');

    $terminal = match ($terminalKey) {
        (string) ($_ENV['TBANK_TERMINAL_KEY_CARD'] ?? '~') => 'card',
        (string) ($_ENV['TBANK_TERMINAL_KEY_FPS'] ?? '~') => 'fps',
        '' => 'unknown',
        default => 'other:' . $terminalKey,
    };

    return [
        'terminal' => $terminal,
        'status' => (string) ($data['Status'] ?? ''),
        // в form-urlencoded банк присылает строки "true"/"false"
        'success' => filter_var($data['Success'] ?? false, FILTER_VALIDATE_BOOLEAN),
        'amount' => isset($data['Amount']) ? ((int) $data['Amount']) / 100 : null,
        'orderId' => (string) ($data['OrderId'] ?? ''),
        'paymentId' => (string) ($data['PaymentId'] ?? ''),
        'errorCode' => (string) ($data['ErrorCode'] ?? ''),
        'message' => trim((string) ($data['Message'] ?? '') . ' ' . (string) ($data['Details'] ?? '')),
    ];
}

function respondOk(): void
{
    header('Content-Type: text/plain; charset=utf-8');
    http_response_code(200);
    echo 'OK';
    exit;
}

function reject(int $code, string $reason, array $fields = []): void
{
    paymentLog('notify_rejected', ['reason' => $reason] + $fields);
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
     * чтобы банк не долбил ретраями месяц, а в журнале помечаем, что подпись
     * не проверялась.
     */
    paymentLog('notify', notifySummary($data) + ['signature' => 'not_checked']);
    respondOk();
}

if (!hash_equals(notificationToken($data, $password), (string) ($data['Token'] ?? ''))) {
    reject(403, 'неверная подпись', notifySummary($data));
}

paymentLog('notify', notifySummary($data) + ['signature' => 'ok']);

respondOk();
