/*
 * Причина ошибки оплаты в payment_unavailable (заказчик 21.10): 21.10 в Метрике было три ошибки,
 * а в журнале платежей пусто - запросы до сервера не дошли, и причину было не узнать.
 * Теперь в событии есть error (код причины) и message (текст).
 */
import { describe, expect, it } from 'vitest'
import { checkPaymentResponse, paymentError, paymentFailureParams } from '@/service/utils/paymentError.js'

const res = (status: number) => ({ ok: status >= 200 && status < 300, status })

describe('ответ payment.php', () => {
    it('платёж создан - ошибки нет', () => {
        expect(checkPaymentResponse(res(200), { ok: true, paymentUrl: 'https://pay.test/1' })).toBeNull()
    })

    it('сервер отказал с текстом - http_<код> и текст сервера', () => {
        const err = checkPaymentResponse(res(400), { ok: false, message: 'Минимальная сумма - 10 руб.' })
        expect(paymentFailureParams(err)).toEqual({ error: 'http_400', message: 'Минимальная сумма - 10 руб.' })
    })

    it('ошибка хостинга без JSON - http_<код>', () => {
        const err = checkPaymentResponse(res(502), null)
        expect(paymentFailureParams(err)).toEqual({ error: 'http_502', message: 'Банк не принял заказ' })
    })

    it('ответ 200, но не JSON - bad_response', () => {
        expect(paymentFailureParams(checkPaymentResponse(res(200), null)).error).toBe('bad_response')
    })

    it('ответ 200 с ok: false - not_ok', () => {
        expect(paymentFailureParams(checkPaymentResponse(res(200), { ok: false, message: 'нет' }))).toEqual({ error: 'not_ok', message: 'нет' })
    })

    it('нет ссылки на оплату - no_payment_url', () => {
        expect(paymentFailureParams(checkPaymentResponse(res(200), { ok: true })).error).toBe('no_payment_url')
    })
})

describe('параметры payment_unavailable', () => {
    it('сетевая ошибка: в message текст браузера, а не текст для человека', () => {
        const err = paymentError('Не удалось начать оплату.', 'network', 'Load failed')
        expect(err.message).toBe('Не удалось начать оплату.')
        expect(paymentFailureParams(err)).toEqual({ error: 'network', message: 'Load failed' })
    })

    it('по СБП нет QR - no_qr', () => {
        expect(paymentFailureParams(paymentError('Не удалось получить QR-код.', 'no_qr')).error).toBe('no_qr')
    })

    it('исключение в коде страницы - script с текстом исключения', () => {
        expect(paymentFailureParams(new TypeError('x is undefined'))).toEqual({ error: 'script', message: 'x is undefined' })
    })

    it('длинный текст обрезается до 150 символов', () => {
        const params = paymentFailureParams(paymentError('a'.repeat(400), 'not_ok'))
        expect(params.message).toHaveLength(150)
    })
})
