<?php

/*
 * Журнал платежей: каждый запрос к банку и каждое уведомление о статусе
 * записываются строкой JSON в файл за месяц. Системный журнал PHP на хостинге
 * не сохраняется (log_errors выключен), поэтому пишем в свой файл.
 *
 * Файлы лежат в папке private домашнего каталога хостинга: она вне сайта
 * и наружу не отдаётся. Путь можно задать ключом PAYMENT_LOG_DIR в .env.
 *
 * Журнал не должен ломать оплату: ошибки записи глушим, ведь уведомлению банка
 * нужно ответить вовремя и ровно "OK".
 */

function paymentLogDir(): string
{
    $configured = trim((string) ($_ENV['PAYMENT_LOG_DIR'] ?? ''));

    if ($configured !== '') {
        return rtrim($configured, '/\\');
    }

    // backend лежит в httpdocs/caforwardtest.ru/backend, а private на три уровня выше
    $private = dirname(__DIR__, 3) . '/private';

    return is_dir($private) ? $private : sys_get_temp_dir();
}

function paymentLog(string $event, array $fields = []): void
{
    try {
        $entry = ['time' => date('c'), 'event' => $event] + $fields;
        // битая кодировка в чужом тексте не должна обнулять всю запись
        $line = json_encode($entry, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE) . "\n";
        $file = paymentLogDir() . '/payments-' . date('Y-m') . '.log';

        if (@file_put_contents($file, $line, FILE_APPEND | LOCK_EX) === false) {
            @error_log('payment-log: не удалось записать в ' . $file . ': ' . $line);
        }
    } catch (Throwable $e) {
        // журнал не должен ломать оплату
    }
}
