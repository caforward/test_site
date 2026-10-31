<?php

/*
 * Серверная цель payment_confirmed в Метрике через Measurement Protocol.
 *
 * Браузерная цель payment_success теряет оплаты: её отправляет страница, когда
 * человек вернулся из банка или окно с QR узнало об оплате. Закрыл сайт раньше -
 * цели нет. payment_confirmed отправляет сервер по уведомлению банка CONFIRMED,
 * и по карте, и по СБП, с теми же параметрами tid, number и type.
 *
 * Метрике нужен ClientID посетителя, иначе цель не к чему привязать. Его присылает
 * форма оплаты, payment.php сохраняет его с номером заказа в папку metrika-visits
 * рядом с журналом платежей, payment-notify.php забирает его оттуда.
 *
 * Токен Measurement Protocol - ключ METRIKA_MP_TOKEN в .env. Без него цель
 * не уходит, оплата работает как раньше.
 */

require_once __DIR__ . '/payment-log.php';

const METRIKA_COUNTER_ID = 95726509;
const METRIKA_COLLECT_URL = 'https://mc.yandex.ru/collect/';
const METRIKA_GOAL_CONFIRMED = 'payment_confirmed';

// Страница с формой оплаты, сюда же банк возвращает после оплаты картой
const METRIKA_PAGE_URL = 'https://caforward.ru/';

// Номер заказа, который выдаёт payment.php. Другие в имя файла не пускаем
const METRIKA_ORDER_ID_PATTERN = '/^\d{14}-[0-9a-f]{6}$/';

// Метрика добавляет событие к визиту, только пока визит не закончился: по умолчанию
// через 30 минут без действий. Если с создания платежа прошло больше 25 минут, визит
// мог закончиться, а новый Метрика открывает только просмотром страницы, без него
// событие пропало бы. Тогда в том же запросе сначала отправляем просмотр
const METRIKA_VISIT_FRESH_SECONDS = 25 * 60;

// Сколько хранить файлы. Неоплаченный платёж - 3 дня: ссылка на оплату живёт сутки.
// Отправленный - 30 дней: по нему повтор уведомления не задвоит цель
const METRIKA_PENDING_TTL = 3 * 86400;
const METRIKA_SENT_TTL = 30 * 86400;

function metrikaVisitDir(): string
{
    return paymentLogDir() . '/metrika-visits';
}

/*
 * Запоминает ClientID платежа. Не вышло - оплата идёт дальше, не будет только цели,
 * причина остаётся в журнале платежей.
 */
function saveMetrikaVisit(string $orderId, string $clientId, string $tid, string $type): void
{
    try {
        $dir = metrikaVisitDir();

        if (!is_dir($dir) && !@mkdir($dir, 0700) && !is_dir($dir)) {
            throw new RuntimeException('не удалось создать папку ' . $dir);
        }

        $visit = ['clientId' => $clientId, 'tid' => $tid, 'type' => $type, 'time' => time()];

        if (@file_put_contents("$dir/$orderId.json", json_encode($visit), LOCK_EX) === false) {
            throw new RuntimeException('не удалось записать файл в ' . $dir);
        }
    } catch (Throwable $e) {
        paymentLog('metrika_visit_failed', ['orderId' => $orderId, 'error' => $e->getMessage()]);
    }
}

/*
 * Забирает ClientID платежа ровно один раз: файл переименовывается в .sent.
 * rename атомарный, поэтому из двух уведомлений об одной оплате, даже пришедших
 * одновременно, цель отправит только одно. Причину отказа кладёт в $reason.
 */
function takeMetrikaVisit(string $orderId, ?string &$reason): ?array
{
    if (!preg_match(METRIKA_ORDER_ID_PATTERN, $orderId)) {
        $reason = 'номер заказа не с сайта';
        return null;
    }

    $pending = metrikaVisitDir() . "/$orderId.json";
    $sent = metrikaVisitDir() . "/$orderId.sent";

    if (!@rename($pending, $sent)) {
        $reason = is_file($sent)
            ? 'цель уже отправлена'
            : 'нет ClientID: Метрика на странице отключена, заблокирована или не ответила';
        return null;
    }

    $visit = json_decode((string) @file_get_contents($sent), true);

    if (!is_array($visit) || !is_string($visit['clientId'] ?? null) || $visit['clientId'] === '') {
        $reason = 'файл с ClientID не читается';
        return null;
    }

    return $visit;
}

/*
 * Отправляет цель одним запросом. Общие tid и ms в адресе, каждый хит отдельной
 * строкой в теле, это пакетная загрузка Measurement Protocol.
 */
function sendPaymentConfirmed(string $orderId, array $visit, string $terminal, string $token): array
{
    $now = time();

    $params = [];

    if (($visit['tid'] ?? '') !== '') {
        $params['tid'] = (string) $visit['tid'];
    }

    $params['number'] = $orderId;
    $params['type'] = (string) ($visit['type'] ?? $terminal);

    $hits = [[
        'cid' => $visit['clientId'],
        't' => 'event',
        'ea' => METRIKA_GOAL_CONFIRMED,
        'dl' => METRIKA_PAGE_URL,
        'et' => $now,
        'params' => json_encode($params, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
    ]];

    $withPageview = $now - (int) ($visit['time'] ?? 0) > METRIKA_VISIT_FRESH_SECONDS;

    if ($withPageview) {
        array_unshift($hits, ['cid' => $visit['clientId'], 't' => 'pageview', 'dl' => METRIKA_PAGE_URL, 'et' => $now - 1]);
    }

    $url = METRIKA_COLLECT_URL . '?' . http_build_query(['tid' => METRIKA_COUNTER_ID, 'ms' => $token]);
    $body = implode("\n", array_map(fn(array $hit) => http_build_query($hit, '', '&', PHP_QUERY_RFC3986), $hits));

    // Тайм-ауты короткие: без PHP-FPM банк получает ответ только после конца скрипта,
    // а ждёт его не дольше 10 секунд. curl_close не нужен с PHP 8, в 8.5 он устарел
    $ch = curl_init($url);

    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 2,
        CURLOPT_TIMEOUT => 3,
    ]);

    $raw = curl_exec($ch);
    $http = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);

    // в адресе токен, поэтому ни адрес, ни тело в журнал не пишем
    if ($raw === false) {
        $result = ['result' => 'error', 'message' => curl_error($ch) ?: 'нет ответа'];
    } elseif ($http !== 200) {
        // Метрика объясняет отказ HTML-комментарием: <!-- Invalid measurement protocol token -->
        $result = ['result' => 'error', 'http' => $http, 'message' => trim(str_replace(['<!--', '-->'], '', mb_substr((string) $raw, 0, 300)))];
    } else {
        $result = ['result' => 'ok', 'http' => $http];
    }

    return $result + ['pageview' => $withPageview];
}

// Убирает файлы неоплаченных платежей и давно отправленных целей
function cleanMetrikaVisits(): void
{
    $now = time();

    foreach ([['*.json', METRIKA_PENDING_TTL], ['*.sent', METRIKA_SENT_TTL]] as [$pattern, $ttl]) {
        foreach (glob(metrikaVisitDir() . '/' . $pattern) ?: [] as $file) {
            if ($now - (int) @filemtime($file) > $ttl) {
                @unlink($file);
            }
        }
    }
}

/*
 * Банк подтвердил оплату: цель payment_confirmed с ClientID этого платежа.
 * Вызывается уже после ответа банку, итог пишется в журнал платежей.
 */
function reportPaymentConfirmed(string $orderId, string $terminal): void
{
    $token = trim((string) ($_ENV['METRIKA_MP_TOKEN'] ?? ''));
    $reason = '';

    if ($token === '') {
        paymentLog('metrika_skipped', ['orderId' => $orderId, 'reason' => 'нет METRIKA_MP_TOKEN в .env']);
    } elseif (($visit = takeMetrikaVisit($orderId, $reason)) === null) {
        paymentLog('metrika_skipped', ['orderId' => $orderId, 'reason' => $reason]);
    } else {
        paymentLog('metrika_confirmed', ['orderId' => $orderId] + sendPaymentConfirmed($orderId, $visit, $terminal, $token));
    }

    cleanMetrikaVisits();
}
