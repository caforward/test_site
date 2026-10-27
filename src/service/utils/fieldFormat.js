// Разбор, проверка и показ значений полей форм заявок: телефон, дата рождения, сумма долга.
// Требования заказчика от 26.10.2026: значение приводится к виду после ввода (уход из поля)
// и при вставке, во время ввода меняется только запятая на точку. Показ значения не должен
// мешать выделять и править текст, поэтому во время набора текст поля не переписывается,
// убираются только недопустимые символы.
// В письмо уходят прежние форматы: телефон +7 999 123-45-67, дата 01.09.1990, сумма 150000.

export const REQUIRED_TEXT = 'Заполните поле'

/* Телефон. Код страны +7 показан подписью перед полем, в тексте поля только номер */

export const PHONE_MAX_DIGITS = 11
export const PHONE_SHORT_TEXT = 'Номер телефона указан не полностью'
export const PHONE_LONG_TEXT = 'Номер телефона содержит лишние цифры'

// «+7» в начале набранного или вставленного текста - код страны, он уже показан подписью
const PHONE_COUNTRY_CODE = /^\s*\+\s*7/

/**
 * Текст поля телефона во время набора. Остаются цифры, а также пробелы и дефисы,
 * которые поле само ставит после ввода, чтобы правка номера их не сбивала.
 * «+7» в начале отбрасывается, одиночный «+» в начале ждёт следующего символа.
 * Цифр не больше 11, а когда их стало 11 и первая из них 8, она удаляется.
 */
export function phoneTypingText(raw) {
    let text = String(raw ?? '')

    const countryCode = text.match(PHONE_COUNTRY_CODE)
    if (countryCode) text = text.slice(countryCode[0].length)
    if (/^\s*\+\s*$/.test(text)) return '+'

    text = text.replace(/[^\d -]/g, '')

    let count = 0
    text = text.replace(/\d/g, digit => (++count > PHONE_MAX_DIGITS ? '' : digit))

    const digits = text.replace(/\D/g, '')
    if (digits.length === PHONE_MAX_DIGITS && digits[0] === '8') text = text.replace('8', '')

    return text.replace(/^[\s-]+/, '')
}

// Цифры номера из текста поля или из значения формы вида +7 999 123-45-67
export function phoneDigits(text) {
    return phoneTypingText(text).replace(/\D/g, '')
}

// Разбивка номера по мере ввода: 999, 999 1, 999 123-4, 999 123-45-67. Цифры сверх десяти
// стоят отдельно впереди: 11 цифр - 7 999 123-45-67, так видно, какую убрать
export function formatPhoneDisplay(digits) {
    if (digits.length > 10) {
        const extra = digits.length - 10
        return `${digits.slice(0, extra)} ${formatPhoneDisplay(digits.slice(extra))}`
    }

    let text = digits.slice(0, 3)
    if (digits.length > 3) text += ' ' + digits.slice(3, 6)
    if (digits.length > 6) text += '-' + digits.slice(6, 8)
    if (digits.length > 8) text += '-' + digits.slice(8, 10)
    return text
}

// Позиция в тексте сразу после count-й цифры
function positionAfterDigits(text, count) {
    if (count <= 0) return 0

    let seen = 0
    for (let i = 0; i < text.length; i++) {
        if (/\d/.test(text[i]) && ++seen === count) return i + 1
    }
    return text.length
}

/**
 * Правка поля телефона с разбивкой по мере ввода (заказчик 27.10.2026: разбивать при вводе,
 * если это не мешает вводу и правке). Браузер уже применил ввод: raw - текст поля после него,
 * caret - курсор, prev - текст до правки, inputType - тип ввода из события input.
 * - Курсор остаётся после того же числа цифр, что и до разбивки.
 * - Пробел и дефис ставит поле само: их стирание стирает соседнюю цифру, иначе разбивка
 *   вернула бы их на место и Backspace топтался бы на месте.
 * - Двенадцатая цифра при наборе не принимается, набранные не трогаются; из вставки лишние
 *   цифры отбрасываются. Когда цифр 11 и первая из них 8, она удаляется.
 * - «+7» в начале - код страны, он показан подписью; одиночный «+» ждёт следующего символа.
 * Возвращает {text, caret}.
 */
export function phoneEdit(prev, raw, caret, inputType = '') {
    const before = String(prev ?? '')
    let text = String(raw ?? '')
    let position = Math.max(0, Math.min(caret ?? text.length, text.length))

    const countryCode = text.match(PHONE_COUNTRY_CODE)
    if (countryCode) {
        text = text.slice(countryCode[0].length)
        position = Math.max(0, position - countryCode[0].length)
    }
    if (/^\s*\+\s*$/.test(text)) return { text: '+', caret: 1 }

    let digits = text.replace(/\D/g, '')
    let digitsBefore = text.slice(0, position).replace(/\D/g, '').length

    if (digits === before.replace(/\D/g, '') && text !== before) {
        if (inputType === 'deleteContentBackward' && digitsBefore > 0) {
            digits = digits.slice(0, digitsBefore - 1) + digits.slice(digitsBefore)
            digitsBefore -= 1
        } else if (inputType === 'deleteContentForward' && digitsBefore < digits.length) {
            digits = digits.slice(0, digitsBefore) + digits.slice(digitsBefore + 1)
        }
    }

    if (digits.length > PHONE_MAX_DIGITS) {
        // вставка, перетаскивание и автозаполнение приходят без типа insertText
        const bulk = inputType !== 'insertText'
        if (!bulk) return { text: before, caret: Math.max(0, position - (text.length - before.length)) }

        digits = digits.slice(0, PHONE_MAX_DIGITS)
        digitsBefore = Math.min(digitsBefore, PHONE_MAX_DIGITS)
    }

    if (digits.length === PHONE_MAX_DIGITS && digits[0] === '8') {
        digits = digits.slice(1)
        if (digitsBefore > 0) digitsBefore -= 1
    }

    const formatted = formatPhoneDisplay(digits)
    return { text: formatted, caret: positionAfterDigits(formatted, digitsBefore) }
}

// Значение для формы и письма: +7 999 123-45-67, как с прежней маской; пустое поле - пустая строка
export function phoneValue(digits) {
    return digits ? `+7 ${formatPhoneDisplay(digits)}` : ''
}

export function phoneError(digits) {
    if (!digits) return REQUIRED_TEXT
    if (digits.length < 10) return PHONE_SHORT_TEXT
    if (digits.length > 10) return PHONE_LONG_TEXT
    return ''
}

/* Дата рождения */

export const DATE_FORMAT_TEXT = 'Дата должна быть в формате День.Месяц.Год, например: 21.01.1990'
export const DATE_NO_SUCH_DAY_TEXT = 'Такого дня не существует'
export const DATE_FUTURE_TEXT = 'Дата рождения не может быть в будущем'

const DATE_SEPARATORS = /[.,/\s-]+/
const DATE_EDGE_SEPARATORS = /^[.,/\s-]+|[.,/\s-]+$/g

// Во время ввода даты меняется только запятая на точку: на телефоне цифровая клавиатура с запятой
export function dateTypingText(raw) {
    return String(raw ?? '').replace(/,/g, '.')
}

const twoDigits = number => String(number).padStart(2, '0')

/**
 * Разбор даты рождения. Принимается День.Месяц.Год с годом из 4 или 2 цифр, с разделителями
 * можно без ведущих нулей (1.9.1990), без разделителей - ровно 6 или 8 цифр (ДДММГГ, ДДММГГГГ):
 * в 11290 не понять, где день, а где месяц. Двузначный год 00-30 - 2000-е, 31-99 - 1900-е.
 * text - как показать в поле: ДД.ММ.ГГГГ, если дату удалось разобрать, иначе как набрано.
 * error - текст ошибки или пустая строка.
 */
export function parseBirthDate(raw, today = new Date()) {
    const input = String(raw ?? '').trim()
    if (!input) return { text: '', error: REQUIRED_TEXT }

    const core = input.replace(DATE_EDGE_SEPARATORS, '')
    let parts = core.split(DATE_SEPARATORS)
    if (parts.length === 1 && /^(\d{6}|\d{8})$/.test(core)) {
        parts = [core.slice(0, 2), core.slice(2, 4), core.slice(4)]
    }

    const [d, m, y] = parts
    const recognized = parts.length === 3
        && /^\d{1,2}$/.test(d) && /^\d{1,2}$/.test(m) && /^(\d{2}|\d{4})$/.test(y)
    if (!recognized) return { text: input, error: DATE_FORMAT_TEXT }

    const day = Number(d)
    const month = Number(m)
    let year = Number(y)
    if (y.length === 2) year += year <= 30 ? 2000 : 1900

    const text = `${twoDigits(day)}.${twoDigits(month)}.${String(year).padStart(4, '0')}`

    // setFullYear, а не new Date(год, ...): у new Date годы до 100 уезжают в 1900-е
    const date = new Date(2000, 0, 1)
    date.setFullYear(year, month - 1, day)
    const exists = month >= 1 && month <= 12 && day >= 1
        && date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
    if (!exists) return { text, error: DATE_NO_SUCH_DAY_TEXT }

    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    if (date > startOfToday) return { text, error: DATE_FUTURE_TEXT }

    return { text, error: '' }
}

/* Сумма долга в рассрочке */

// Во время ввода запятая меняется на точку, остаются цифры, одна точка и пробелы,
// которые поле само ставит после ввода; после точки не больше двух цифр
export function amountTypingText(raw) {
    let text = String(raw ?? '').replace(/,/g, '.').replace(/[^\d. ]/g, '')

    const dot = text.indexOf('.')
    if (dot !== -1) {
        const fraction = text.slice(dot + 1).replace(/[. ]/g, '').slice(0, 2)
        text = text.slice(0, dot + 1) + fraction
    }

    return text.replace(/^ +/, '')
}

// Число из текста поля суммы или null, если суммы нет
export function parseAmount(text) {
    const clean = String(text ?? '').replace(/,/g, '.').replace(/[^\d.]/g, '')
    if (!/\d/.test(clean)) return null

    const value = Number.parseFloat(clean)
    return Number.isFinite(value) ? Math.round(value * 100) / 100 : null
}

// Сумма после ввода: пробелы по тысячам, копейки через точку - 150 000, 150 000.50
export function formatAmount(value) {
    if (value === null || value === undefined || value === '') return ''

    const number = Number(value)
    if (!Number.isFinite(number)) return ''

    const [whole, fraction] = number.toFixed(2).split('.')
    const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    return fraction === '00' ? grouped : `${grouped}.${fraction}`
}
