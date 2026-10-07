/*
 * Ввод дробной суммы в числовое поле.
 *
 * PrimeVue InputNumber принимает как десятичный разделитель только тот символ,
 * который даёт локаль браузера: в русской - запятую, в английской - точку.
 * Чужой символ гасится в onInputKeyPress и в поле не попадает: "10.50"
 * превращается в 1050, то есть сумма в сто раз больше задуманной.
 *
 * Поле суммы платежа должно принимать оба разделителя независимо от локали.
 */
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import BaseInput from '@/blocks/ui/BaseInput.vue'

// Код клавиши нужен PrimeVue: onInputKeyPress отдельно смотрит event.code
const CODES: Record<string, string> = {
    '.': 'Period',
    ',': 'Comma',
}

function codeOf(char: string): string {
    return CODES[char] ?? `Digit${char}`
}

/**
 * Печать символа так, как это делает браузер: сначала keydown, и только если
 * его не отменили - keypress. Отменённый keydown keypress не порождает.
 */
function typeChar(el: HTMLInputElement, char: string): void {
    const code = codeOf(char)
    const allowed = el.dispatchEvent(
        new KeyboardEvent('keydown', { key: char, code, bubbles: true, cancelable: true }),
    )

    if (allowed) {
        el.dispatchEvent(
            new KeyboardEvent('keypress', { key: char, code, bubbles: true, cancelable: true }),
        )
    }
}

async function typeAmount(text: string) {
    const wrapper = mount(BaseInput, {
        props: { type: 'number', name: 'userAmount' },
        global: { plugins: [PrimeVue] },
    })

    const input = wrapper.find('input').element as HTMLInputElement

    for (const char of text) {
        typeChar(input, char)
        await wrapper.vm.$nextTick()
    }

    // InputNumber отдаёт значение в модель не на каждой клавише, а по blur
    input.dispatchEvent(new FocusEvent('blur', { bubbles: false }))
    await wrapper.vm.$nextTick()

    const emitted = wrapper.emitted('update:modelValue')
    const last = emitted?.at(-1)?.[0] ?? null

    return { value: last, displayed: input.value }
}

describe('BaseInput type=number: разделитель дробной части', () => {

    it('принимает запятую: 10,50 это десять рублей пятьдесят копеек', async () => {
        const { value } = await typeAmount('10,50')
        expect(value).toBe(10.5)
    })

    it('принимает точку: 10.50 это десять рублей пятьдесят копеек, а не 1050', async () => {
        const { value } = await typeAmount('10.50')
        expect(value).toBe(10.5)
    })

    it('целое число не ломается', async () => {
        const { value } = await typeAmount('1050')
        expect(value).toBe(1050)
    })

    it('копейки доходят до модели полностью', async () => {
        const { value } = await typeAmount('0.05')
        expect(value).toBe(0.05)
    })

    // Точка не должна вести себя «по-своему»: чего бы ни делал InputNumber
    // с запятой, с точкой он обязан делать ровно то же самое
    it.each([
        ['10.5.5', '10,5,5'],
        ['10.505', '10,505'],
        ['.5', ',5'],
        ['10.', '10,'],
    ])('точка в %s равносильна запятой в %s', async (withDot, withComma) => {
        const dot = await typeAmount(withDot)
        const comma = await typeAmount(withComma)

        expect(dot.value).toBe(comma.value)
        expect(dot.displayed).toBe(comma.displayed)
    })
})
