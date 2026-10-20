<?php

/*
 * Общее для запросов к API Т-Банка: подпись запроса и вызов через cURL.
 * Используют payment.php (создание платежа и QR для СБП) и payment-status.php
 * (статус платежа для окна с QR).
 */

require_once __DIR__ . '/payment-log.php';

// securepay.tinkoff.ru работает по сертификату УЦ Минцифры, которого нет
// в стандартном хранилище Linux. Возим корень с собой, иначе cURL не
// установит соединение. Домен tbank.ru не используем: поддержка банка
// подтвердила, что методов на нём официально не существует.
const TBANK_CA_BUNDLE = __DIR__ . '/certs/russian-trusted-ca.pem';

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
        paymentLog('bank_error', ['url' => $url, 'error' => 'нет файла сертификатов ' . TBANK_CA_BUNDLE]);
    }

    $raw = curl_exec($ch);
    $curlError = curl_error($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    curl_close($ch);

    if ($raw === false) {
        paymentLog('bank_error', ['url' => $url, 'error' => $curlError]);
        return null;
    }

    $decoded = json_decode($raw, true);

    if (!is_array($decoded)) {
        paymentLog('bank_error', ['url' => $url, 'http' => $httpCode, 'error' => 'неразбираемый ответ', 'raw' => mb_substr($raw, 0, 300)]);
        return null;
    }

    return $decoded;
}
