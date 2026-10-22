/*
 * Отправка форм в обход блокировки хостинга (22.10.2026): после уязвимостей PHP CVE-2026-109618 и
 * CVE-2026-109619 nginx на хостинге отвечает 403 на любой POST multipart/form-data. Форма уходит как
 * application/x-www-form-urlencoded, файл - в том же запросе строкой base64 (<имя>_b64 и <имя>_name).
 */
import { describe, expect, it } from 'vitest'
import { FILE_TOO_BIG_TEXT, MAX_FILE_SIZE, fileError, formHasFile, formRequestBody, isFileBlocked } from '@/service/utils/formRequest.js'

function form(fields: Record<string, string>, file?: File) {
    const data = new FormData()
    for (const [key, value] of Object.entries(fields)) data.append(key, value)
    if (file) data.append('file_attachment', file)
    return data
}

// псевдослучайные байты: у сжатого docx base64 похож на случайный, в нём больше всего + и /
function bytes(size: number) {
    const out = new Uint8Array(size)
    let x = 2463534242
    for (let i = 0; i < size; i++) {
        x ^= x << 13; x ^= x >>> 17; x ^= x << 5
        out[i] = x & 0xff
    }
    return out
}

describe('formRequestBody', () => {
    it('форма без файла - URLSearchParams с теми же полями, кириллица и символы на месте', async () => {
        const body = await formRequestBody(form({ name: 'Иван Петров', tel: '+7 (999) 123-45-67', messageType: 'Запрос на оферту', claim: 'a&b=c' }))

        expect(body).toBeInstanceOf(URLSearchParams)
        expect(body.get('name')).toBe('Иван Петров')
        expect(body.get('tel')).toBe('+7 (999) 123-45-67')
        expect(body.get('messageType')).toBe('Запрос на оферту')
        expect(body.get('claim')).toBe('a&b=c')
    })

    it('повторяющиеся поля сохраняются все', async () => {
        const data = form({ a: '1' })
        data.append('a', '2')

        expect((await formRequestBody(data)).getAll('a')).toEqual(['1', '2'])
    })

    it('файл уходит строкой base64 и именем, самого файла и multipart в запросе нет', async () => {
        const data = form({ name: 'Иван', messageType: 'О возврате денежных средств' }, new File(['test'], 'Заявление на возврат.docx'))

        expect(formHasFile(data)).toBe(true)
        const body = await formRequestBody(data)
        expect(body).toBeInstanceOf(URLSearchParams)
        expect(body.get('file_attachment_b64')).toBe('dGVzdA==')
        expect(body.get('file_attachment_name')).toBe('Заявление на возврат.docx')
        expect(body.has('file_attachment')).toBe(false)
        expect(body.get('name')).toBe('Иван')
        expect(body.get('messageType')).toBe('О возврате денежных средств')
    })

    it('двоичный файл после base64 и urlencoded собирается обратно байт в байт', async () => {
        const raw = bytes(3000)
        const body = await formRequestBody(form({ name: 'Иван' }, new File([raw], 'x.docx')))
        // так поле читает PHP: из строки запроса, потом base64_decode
        const b64 = new URLSearchParams(body.toString()).get('file_attachment_b64') as string

        expect(Buffer.from(b64, 'base64').equals(Buffer.from(raw))).toBe(true)
    })

    it('запрос с файлом в 5 МБ укладывается в post_max_size 8 МБ', async () => {
        const body = await formRequestBody(form({ name: 'Иван Петров', tel: '+7 (999) 123-45-67', email: 'ivan@mail.ru' }, new File([bytes(MAX_FILE_SIZE)], 'zayavlenie.docx')))

        const size = body.toString().length
        expect(size).toBeGreaterThan(MAX_FILE_SIZE * 4 / 3)
        expect(size).toBeLessThan(8 * 1024 * 1024)
    })

    it('пустой файл - пустая строка base64, а не обрывок data:', async () => {
        const body = await formRequestBody(form({}, new File([], 'empty.docx')))

        expect(body.get('file_attachment_b64')).toBe('')
    })

    it('пустая форма - пустые URLSearchParams', async () => {
        expect(String(await formRequestBody(new FormData()))).toBe('')
    })
})

describe('fileError', () => {
    it('нет файла - «Прикрепите файл», больше 5 МБ - про размер, иначе пусто', () => {
        expect(fileError(null)).toBe('Прикрепите файл')
        expect(fileError({ size: MAX_FILE_SIZE + 1 })).toBe(FILE_TOO_BIG_TEXT)
        expect(fileError({ size: MAX_FILE_SIZE })).toBe('')
        expect(fileError({ size: 10 })).toBe('')
    })
})

describe('isFileBlocked', () => {
    it('403 или 413 у формы с файлом - файл не прошёл, человеку текст про почту', () => {
        expect(isFileBlocked({ status: 403 }, true)).toBe(true)
        expect(isFileBlocked({ status: 413 }, true)).toBe(true)
    })

    it('без файла или другая ошибка с файлом - общий текст ошибки', () => {
        expect(isFileBlocked({ status: 403 }, false)).toBe(false)
        expect(isFileBlocked({ status: 500 }, true)).toBe(false)
        expect(isFileBlocked(null, true)).toBe(false)
    })
})
