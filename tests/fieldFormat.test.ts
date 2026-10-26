/*
 * Разбор, проверка и показ значений полей форм заявок: телефон, дата рождения, сумма долга.
 * Требования заказчика от 26.10.2026: значение приводится к виду после ввода и при вставке,
 * во время ввода меняется только запятая на точку; в письмо уходят прежние форматы.
 */
import { describe, expect, it } from 'vitest'
import {
    DATE_FORMAT_TEXT,
    DATE_FUTURE_TEXT,
    DATE_NO_SUCH_DAY_TEXT,
    PHONE_LONG_TEXT,
    PHONE_SHORT_TEXT,
    REQUIRED_TEXT,
    amountTypingText,
    dateTypingText,
    formatAmount,
    formatPhoneDisplay,
    parseAmount,
    parseBirthDate,
    phoneDigits,
    phoneError,
    phoneTypingText,
    phoneValue,
} from '@/service/utils/fieldFormat.js'

describe('телефон: текст поля во время набора', () => {
    it('остаются только цифры, буквы и прочие символы игнорируются', () => {
        expect(phoneTypingText('9a9(9)*1#2')).toBe('99912')
    })

    it('+7 в начале отбрасывается: код страны уже показан подписью', () => {
        expect(phoneTypingText('+79991234567')).toBe('9991234567')
        expect(phoneTypingText('+7 (999) 123-45-67')).toBe('999 123-45-67')
        expect(phoneTypingText(' + 7999')).toBe('999')
    })

    it('одиночный «+» в начале ждёт следующего символа, «+» не перед 7 пропадает', () => {
        expect(phoneTypingText('+')).toBe('+')
        expect(phoneTypingText('+9')).toBe('9')
        expect(phoneTypingText('99+7')).toBe('997')
    })

    it('7 и 8 в начале - обычные цифры, пока цифр меньше 11', () => {
        expect(phoneTypingText('7999')).toBe('7999')
        expect(phoneTypingText('8999123456')).toBe('8999123456')
    })

    it('на одиннадцатой цифре ведущая 8 удаляется', () => {
        expect(phoneTypingText('89991234567')).toBe('9991234567')
        expect(phoneTypingText('8 999 123-45-67')).toBe('999 123-45-67')
    })

    it('ведущая 7 на одиннадцатой цифре остаётся, это ошибка «лишние цифры»', () => {
        expect(phoneTypingText('79991234567')).toBe('79991234567')
    })

    it('больше 11 цифр не набрать', () => {
        expect(phoneTypingText('999123456789999')).toBe('99912345678')
    })

    it('пробелы и дефисы после форматирования не мешают править номер', () => {
        expect(phoneTypingText('999 123-4-67')).toBe('999 123-4-67')
    })
})

describe('телефон: цифры, вид и значение', () => {
    it('цифры номера из значения формы и из текста поля', () => {
        expect(phoneDigits('+7 999 123-45-67')).toBe('9991234567')
        expect(phoneDigits('+7 7')).toBe('7')
        expect(phoneDigits('8 (999) 123-45-67')).toBe('9991234567')
        expect(phoneDigits('')).toBe('')
        expect(phoneDigits('+')).toBe('')
        expect(phoneDigits(undefined)).toBe('')
    })

    it('10 цифр показываются как 999 123-45-67, иначе как набраны', () => {
        expect(formatPhoneDisplay('9991234567')).toBe('999 123-45-67')
        expect(formatPhoneDisplay('99912')).toBe('99912')
        expect(formatPhoneDisplay('79991234567')).toBe('79991234567')
        expect(formatPhoneDisplay('')).toBe('')
    })

    it('значение для формы и письма - как с прежней маской', () => {
        expect(phoneValue('9991234567')).toBe('+7 999 123-45-67')
        expect(phoneValue('99912')).toBe('+7 99912')
        expect(phoneValue('')).toBe('')
    })

    it('ошибки по числу цифр', () => {
        expect(phoneError('')).toBe(REQUIRED_TEXT)
        expect(phoneError('99912')).toBe(PHONE_SHORT_TEXT)
        expect(phoneError('79991234567')).toBe(PHONE_LONG_TEXT)
        expect(phoneError('9991234567')).toBe('')
        expect(PHONE_SHORT_TEXT).toBe('Номер телефона указан не полностью')
        expect(PHONE_LONG_TEXT).toBe('Номер телефона содержит лишние цифры')
    })
})

describe('дата рождения', () => {
    const today = new Date(2026, 9, 26, 15, 30)
    const parse = (text: string) => parseBirthDate(text, today)

    it('во время ввода запятая меняется на точку, остальное как набрано', () => {
        expect(dateTypingText('1,9,90')).toBe('1.9.90')
        expect(dateTypingText('010990')).toBe('010990')
    })

    it.each([
        ['01.09.1990'],
        ['1.9.1990'],
        ['1,9,1990'],
        ['01.09.90'],
        ['1.9.90'],
        ['010990'],
        ['01091990'],
        ['01 09 1990'],
        ['1/9/1990'],
        ['01-09-1990'],
        [' 01.09.1990. '],
    ])('%s → 01.09.1990 без ошибки', text => {
        expect(parse(text)).toEqual({ text: '01.09.1990', error: '' })
    })

    it('двузначный год: 00-30 - 2000-е, 31-99 - 1900-е', () => {
        expect(parse('01.01.00').text).toBe('01.01.2000')
        expect(parse('01.01.25').text).toBe('01.01.2025')
        expect(parse('01.01.31').text).toBe('01.01.1931')
        expect(parse('01.01.99').text).toBe('01.01.1999')
        expect(parse('01.01.30')).toEqual({ text: '01.01.2030', error: DATE_FUTURE_TEXT })
    })

    it.each([['11290'], ['1121990'], ['01.091990'], ['01.09.199'], ['01.09.1990г'], ['abc'], ['01..']])(
        '%s - неверный формат, текст в поле не меняется',
        text => {
            expect(parse(text)).toEqual({ text: text.trim(), error: DATE_FORMAT_TEXT })
        },
    )

    it.each([
        ['31.02.1990', '31.02.1990'],
        ['29.02.2023', '29.02.2023'],
        ['29.02.1900', '29.02.1900'],
        ['31.04.1990', '31.04.1990'],
        ['00.01.1990', '00.01.1990'],
        ['01.13.1990', '01.13.1990'],
        ['310290', '31.02.1990'],
    ])('%s - такого дня нет, дата приведена к виду %s', (text, shown) => {
        expect(parse(text)).toEqual({ text: shown, error: DATE_NO_SUCH_DAY_TEXT })
    })

    it('високосные годы: 29 февраля 2024 и 2000 есть', () => {
        expect(parse('29.02.2024').error).toBe('')
        expect(parse('29.02.2000').error).toBe('')
    })

    it('сегодня можно, завтра - дата в будущем', () => {
        expect(parse('26.10.2026').error).toBe('')
        expect(parse('27.10.2026')).toEqual({ text: '27.10.2026', error: DATE_FUTURE_TEXT })
    })

    it('пустое поле', () => {
        expect(parse('')).toEqual({ text: '', error: REQUIRED_TEXT })
        expect(parse('   ')).toEqual({ text: '', error: REQUIRED_TEXT })
        expect(parseBirthDate(undefined as unknown as string, today)).toEqual({ text: '', error: REQUIRED_TEXT })
    })

    it('тексты ошибок как у заказчика', () => {
        expect(DATE_FORMAT_TEXT).toBe('Дата должна быть в формате День.Месяц.Год, например: 21.01.1990')
        expect(DATE_NO_SUCH_DAY_TEXT).toBe('Такого дня не существует')
        expect(DATE_FUTURE_TEXT).toBe('Дата рождения не может быть в будущем')
        expect(REQUIRED_TEXT).toBe('Заполните поле')
    })
})

describe('сумма долга', () => {
    it('во время ввода запятая меняется на точку, остаются цифры, одна точка и пробелы', () => {
        expect(amountTypingText('150000,5')).toBe('150000.5')
        expect(amountTypingText('15a0 000')).toBe('150 000')
        expect(amountTypingText('1.2.3')).toBe('1.23')
        expect(amountTypingText('10.505')).toBe('10.50')
        expect(amountTypingText('-5')).toBe('5')
    })

    it('число из текста поля', () => {
        expect(parseAmount('150 000.50')).toBe(150000.5)
        expect(parseAmount('150000,5')).toBe(150000.5)
        expect(parseAmount('150000.')).toBe(150000)
        expect(parseAmount('')).toBeNull()
        expect(parseAmount('.')).toBeNull()
        expect(parseAmount(undefined as unknown as string)).toBeNull()
    })

    it('после ввода - пробелы по тысячам, копейки через точку', () => {
        expect(formatAmount(150000)).toBe('150 000')
        expect(formatAmount(150000.5)).toBe('150 000.50')
        expect(formatAmount(999)).toBe('999')
        expect(formatAmount(1234567.89)).toBe('1 234 567.89')
        expect(formatAmount(null)).toBe('')
        expect(formatAmount('')).toBe('')
    })
})
