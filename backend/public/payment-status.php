<?php

/*
 * Статус платежа по СБП для окна с QR. По СБП человек платит в приложении банка,
 * на сайт его никто не возвращает, поэтому окно само спрашивает статус, пока
 * открыто: при оплате показывает «спасибо» и отправляет payment_success в Метрику.
 *
 * Отвечаем только на пару PaymentId и OrderId нашего платежа, по одному номеру
 * чужой статус не узнать. Наружу отдаём только статус, без суммы и контактов.
 */

require __DIR__ . '/../../vendor/autoload.php';
require __DIR__ . '/../tbank-api.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

const TBANK_GETSTATE_URL = 'https://securepay.tinkoff.ru/v2/GetState';

// Итоговые статусы: после них спрашивать дальше незачем, их и пишем в журнал
const FINAL_STATUSES = ['CONFIRMED', 'REJECTED', 'DEADLINE_EXPIRED', 'CANCELED', 'AUTH_FAIL', 'REFUNDED'];

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function answer(int $code, array $body): void
{
    http_response_code($code);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    answer(405, ['ok' => false]);
}

$input = json_decode(file_get_contents('php://input'), true);

$paymentId = is_array($input) ? (string) ($input['paymentId'] ?? '') : '';
$orderId = is_array($input) ? (string) ($input['orderId'] ?? '') : '';

if (!preg_match('/^\d{1,20}$/', $paymentId) || !preg_match('/^[\w-]{1,50}$/', $orderId)) {
    answer(400, ['ok' => false]);
}

// Окно с QR бывает только у СБП, поэтому и терминал СБП
$terminalKey = $_ENV['TBANK_TERMINAL_KEY_FPS'] ?? '';
$password = $_ENV['TBANK_PASSWORD_FPS'] ?? '';

if ($terminalKey === '') {
    answer(500, ['ok' => false]);
}

$payload = [
    'TerminalKey' => $terminalKey,
    'PaymentId' => $paymentId,
];

if ($password !== '') {
    $payload['Token'] = makeToken($payload, $password);
}

$result = callBank(TBANK_GETSTATE_URL, $payload);

if ($result === null || empty($result['Success'])) {
    paymentLog('status_failed', [
        'paymentId' => $paymentId,
        'orderId' => $orderId,
        'errorCode' => (string) ($result['ErrorCode'] ?? ''),
        'message' => trim(($result['Message'] ?? 'нет ответа') . ' ' . ($result['Details'] ?? '')),
    ]);
    answer(502, ['ok' => false]);
}

if ((string) ($result['OrderId'] ?? '') !== $orderId) {
    paymentLog('status_mismatch', ['paymentId' => $paymentId, 'orderId' => $orderId]);
    answer(404, ['ok' => false]);
}

$status = (string) ($result['Status'] ?? '');

if (in_array($status, FINAL_STATUSES, true)) {
    paymentLog('status_final', ['paymentId' => $paymentId, 'orderId' => $orderId, 'status' => $status]);
}

answer(200, ['ok' => true, 'status' => $status]);
