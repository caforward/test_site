// Как отправлять формы на бэкенд.
// С 22.10.2026 хостинг (reg.ru) после критических уязвимостей PHP CVE-2026-109618 и CVE-2026-109619
// отвечает 403 на любой POST multipart/form-data, а FormData браузер отправляет именно так.
// Поэтому форма уходит как application/x-www-form-urlencoded: PHP читает её в $_POST так же.
// Файл едет в том же запросе строкой base64: содержимое в поле <имя>_b64, имя файла в <имя>_name,
// email.php собирает из них вложение.

// Самый большой файл, который примет email.php. В base64 файл вырастает на треть,
// запрос с 5 МБ - около 7,1 МБ, это укладывается в лимит PHP post_max_size 8 МБ
export const MAX_FILE_SIZE = 5 * 1024 * 1024

export const FILE_TOO_BIG_TEXT = 'Файл больше 5 МБ, прикрепите файл поменьше'

// Текст для человека, когда хостинг не пропустил форму с файлом
export const FILE_BLOCKED_TEXT = 'Сейчас не получается отправить файл. Отправьте обращение с файлом на почту dolg.info@caforward.ru или попробуйте позже.'

export function formHasFile(formData) {
    for (const [, value] of formData.entries()) {
        if (typeof Blob !== 'undefined' && value instanceof Blob) return true
    }
    return false
}

// Ошибка у поля с файлом или пустая строка, если файл подходит
export function fileError(file) {
    if (!file) return 'Прикрепите файл'
    if (file.size > MAX_FILE_SIZE) return FILE_TOO_BIG_TEXT
    return ''
}

// Содержимое файла строкой base64, без начала data:...;base64,
export function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            const dataUrl = String(reader.result)
            const comma = dataUrl.indexOf(',')
            resolve(comma === -1 ? '' : dataUrl.slice(comma + 1))
        }
        reader.onerror = () => reject(reader.error)
        reader.readAsDataURL(file)
    })
}

export async function formRequestBody(formData) {
    const params = new URLSearchParams()
    for (const [key, value] of formData.entries()) {
        if (typeof Blob !== 'undefined' && value instanceof Blob) {
            params.append(key + '_b64', await fileToBase64(value))
            params.append(key + '_name', value.name || 'file')
        } else {
            params.append(key, value)
        }
    }
    return params
}

// Ответ сервера на форму с файлом: хостинг не пропустил запрос (403) или он слишком большой (413)
export function isFileBlocked(response, withFile) {
    return withFile && [403, 413].includes(response?.status)
}
