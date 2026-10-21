// Причина, по которой платёж не удалось начать. Уходит в Метрику в событии payment_unavailable
// параметрами error (код причины) и message (текст): без них было видно только, что ошибка была.
// Коды error:
//   network        - запрос до сервера не дошёл: нет сети, оборвался, заблокирован
//   http_<код>     - сервер или хостинг ответил ошибкой, например http_400, http_502
//   bad_response   - ответ пришёл, но это не ответ нашего сервера (не JSON)
//   not_ok         - сервер ответил, но платёж не создан
//   no_payment_url - платёж создан, но банк не дал ссылку на оплату
//   no_qr          - по СБП банк не дал QR
//   script         - ошибка в коде страницы

export function paymentError(message, code, detail = '') {
    const error = new Error(message)
    error.code = code
    error.detail = detail
    return error
}

// Ответ payment.php: null, если платёж создан, иначе ошибка с кодом причины
export function checkPaymentResponse(response, result) {
    if (!response.ok) return paymentError(result?.message || 'Банк не принял заказ', `http_${response.status}`)
    if (!result) return paymentError('Банк не принял заказ', 'bad_response')
    if (!result.ok) return paymentError(result.message || 'Банк не принял заказ', 'not_ok')
    if (!result.paymentUrl) return paymentError('Банк не принял заказ', 'no_payment_url')
    return null
}

// Параметры для payment_unavailable. У сетевой ошибки message - текст браузера
// («Failed to fetch», «Load failed»), он отличается у Chrome, Safari и Firefox
export function paymentFailureParams(err) {
    const params = {error: err?.code || 'script'}
    const text = String(err?.detail || err?.message || '').trim()
    if (text) params.message = text.slice(0, 150)
    return params
}
