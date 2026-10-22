// Как отправлять формы на бэкенд.
// С 22.10.2026 хостинг (reg.ru) после критических уязвимостей PHP CVE-2026-109618 и CVE-2026-109619
// отвечает 403 на любой POST multipart/form-data, а FormData браузер отправляет именно так.
// Форму без файла поэтому шлём как application/x-www-form-urlencoded: PHP читает её в $_POST так же.
// Форма с файлом уходит как раньше, multipart: файл иначе не передать, до снятия блокировки она получит 403.

// Текст для человека, когда хостинг не пропустил форму с файлом
export const FILE_BLOCKED_TEXT = 'Сейчас не получается отправить файл. Отправьте обращение с файлом на почту dolg.info@caforward.ru или попробуйте позже.'

export function formHasFile(formData) {
    for (const [, value] of formData.entries()) {
        if (typeof Blob !== 'undefined' && value instanceof Blob) return true
    }
    return false
}

export function formRequestBody(formData) {
    if (formHasFile(formData)) return formData

    const params = new URLSearchParams()
    for (const [key, value] of formData.entries()) {
        params.append(key, value)
    }
    return params
}

// Ответ сервера на форму: хостинг не пропустил форму с файлом
export function isFileBlocked(response, withFile) {
    return withFile && response?.status === 403
}
