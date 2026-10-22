/*
 * Отправка форм в обход блокировки хостинга (22.10.2026): после уязвимостей PHP CVE-2026-109618 и
 * CVE-2026-109619 nginx на хостинге отвечает 403 на любой POST multipart/form-data. Форма без файла
 * уходит как application/x-www-form-urlencoded, форма с файлом - как раньше, multipart.
 */
import { describe, expect, it } from 'vitest'
import { formHasFile, formRequestBody, isFileBlocked } from '@/service/utils/formRequest.js'

function form(fields: Record<string, string>, file?: File) {
    const data = new FormData()
    for (const [key, value] of Object.entries(fields)) data.append(key, value)
    if (file) data.append('file_attachment', file)
    return data
}

describe('formRequestBody', () => {
    it('форма без файла - URLSearchParams с теми же полями, кириллица и символы на месте', () => {
        const body = formRequestBody(form({ name: 'Иван Петров', tel: '+7 (999) 123-45-67', messageType: 'Запрос на оферту', claim: 'a&b=c' }))

        expect(body).toBeInstanceOf(URLSearchParams)
        const params = body as URLSearchParams
        expect(params.get('name')).toBe('Иван Петров')
        expect(params.get('tel')).toBe('+7 (999) 123-45-67')
        expect(params.get('messageType')).toBe('Запрос на оферту')
        expect(params.get('claim')).toBe('a&b=c')
    })

    it('повторяющиеся поля сохраняются все', () => {
        const data = form({ a: '1' })
        data.append('a', '2')

        expect((formRequestBody(data) as URLSearchParams).getAll('a')).toEqual(['1', '2'])
    })

    it('форма с файлом остаётся FormData', () => {
        const data = form({ name: 'Иван' }, new File(['test'], 'zayavlenie.docx'))

        expect(formHasFile(data)).toBe(true)
        expect(formRequestBody(data)).toBe(data)
    })

    it('пустая форма - пустые URLSearchParams', () => {
        expect(String(formRequestBody(new FormData()))).toBe('')
    })
})

describe('isFileBlocked', () => {
    it('403 у формы с файлом - блокировка хостинга', () => {
        expect(isFileBlocked({ status: 403 }, true)).toBe(true)
    })

    it('403 без файла или другая ошибка с файлом - общий текст ошибки', () => {
        expect(isFileBlocked({ status: 403 }, false)).toBe(false)
        expect(isFileBlocked({ status: 500 }, true)).toBe(false)
        expect(isFileBlocked(null, true)).toBe(false)
    })
})
