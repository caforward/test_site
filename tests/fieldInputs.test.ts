/*
 * Поля телефона, даты рождения и суммы долга (требования заказчика от 26.10.2026).
 * Ввод имитируется как в браузере: beforeinput, который поле может отменить, затем текст
 * в поле и событие input с типом ввода. Вставка - input с типом insertFromPaste.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import BaseInput from '@/blocks/ui/BaseInput.vue'

beforeEach(() => {
    ;(window as any).ym = vi.fn()
})

afterEach(() => {
    delete (window as any).ym
})

function mountInput(props: Record<string, unknown>) {
    return mount(BaseInput, {
        props: { required: true, ...props },
        global: { plugins: [PrimeVue] },
        attachTo: document.body,
    })
}

type Wrapper = ReturnType<typeof mountInput>

async function typeText(wrapper: Wrapper, el: HTMLInputElement, chars: string) {
    for (const data of chars) {
        const allowed = el.dispatchEvent(new InputEvent('beforeinput', { inputType: 'insertText', data, bubbles: true, cancelable: true }))
        if (allowed) {
            const start = el.selectionStart ?? el.value.length
            const end = el.selectionEnd ?? start
            el.value = el.value.slice(0, start) + data + el.value.slice(end)
            el.setSelectionRange(start + 1, start + 1)
            el.dispatchEvent(new InputEvent('input', { inputType: 'insertText', data, bubbles: true }))
        }
        await wrapper.vm.$nextTick()
    }
}

async function pressBackspace(wrapper: Wrapper, el: HTMLInputElement) {
    const caret = el.selectionStart ?? el.value.length
    el.value = el.value.slice(0, caret - 1) + el.value.slice(caret)
    el.setSelectionRange(caret - 1, caret - 1)
    el.dispatchEvent(new InputEvent('input', { inputType: 'deleteContentBackward', bubbles: true }))
    await wrapper.vm.$nextTick()
}

async function paste(wrapper: Wrapper, el: HTMLInputElement, text: string) {
    const start = el.selectionStart ?? el.value.length
    const end = el.selectionEnd ?? start
    el.value = el.value.slice(0, start) + text + el.value.slice(end)
    el.dispatchEvent(new InputEvent('input', { inputType: 'insertFromPaste', bubbles: true }))
    await wrapper.vm.$nextTick()
}

async function focus(wrapper: Wrapper) {
    await wrapper.find('input').trigger('focus')
}

async function blur(wrapper: Wrapper) {
    await wrapper.find('input').trigger('blur')
}

const input = (wrapper: Wrapper) => wrapper.find('input').element as HTMLInputElement
const lastModel = (wrapper: Wrapper) => wrapper.emitted('update:modelValue')?.at(-1)?.[0]
const shownError = (wrapper: Wrapper) => (wrapper.find('.error_span').exists() ? wrapper.find('.error_span').text() : '')

describe('телефон', () => {
    const mountPhone = () => mountInput({ type: 'tel', name: 'tel', placeholder: 'Номер телефона*' })

    it('обычное поле с id для Метрики, без маски', () => {
        const wrapper = mountPhone()
        const el = wrapper.find('input')

        expect(el.attributes('data-field-id')).toBe('tel')
        expect(el.attributes('name')).toBe('tel')
        expect(el.attributes('type')).toBe('tel')
        expect(el.element.value).toBe('')
    })

    it('подпись +7 видна при фокусе, без фокуса пустое поле показывает подсказку', async () => {
        const wrapper = mountPhone()
        const prefix = () => wrapper.find('.phone-input__prefix')

        expect(prefix().isVisible()).toBe(false)
        expect(wrapper.find('input').attributes('placeholder')).toBe('Номер телефона*')

        await focus(wrapper)
        expect(prefix().isVisible()).toBe(true)
        expect(prefix().text()).toBe('+7')
        expect(wrapper.find('input').attributes('placeholder')).toBe('')
    })

    it('во время набора номер не форматируется, после ухода из поля - 999 123-45-67', async () => {
        const wrapper = mountPhone()
        await focus(wrapper)
        await typeText(wrapper, input(wrapper), '9991234567')

        expect(input(wrapper).value).toBe('9991234567')
        expect(lastModel(wrapper)).toBe('+7 999 123-45-67')

        await blur(wrapper)
        expect(input(wrapper).value).toBe('999 123-45-67')
        expect(shownError(wrapper)).toBe('')
    })

    it('буквы и прочие символы не набираются', async () => {
        const wrapper = mountPhone()
        await typeText(wrapper, input(wrapper), '9a9-(9)')

        expect(input(wrapper).value).toBe('999')
    })

    it('набранный +7 в начале отбрасывается', async () => {
        const wrapper = mountPhone()
        await typeText(wrapper, input(wrapper), '+79991234567')

        expect(input(wrapper).value).toBe('9991234567')
        expect(lastModel(wrapper)).toBe('+7 999 123-45-67')
    })

    it('на одиннадцатой цифре ведущая 8 удаляется', async () => {
        const wrapper = mountPhone()
        await typeText(wrapper, input(wrapper), '8999123456')
        expect(input(wrapper).value).toBe('8999123456')

        await typeText(wrapper, input(wrapper), '7')
        expect(input(wrapper).value).toBe('9991234567')
    })

    it('больше 11 цифр не набрать, 11 цифр с 7 - лишние цифры', async () => {
        const wrapper = mountPhone()
        await typeText(wrapper, input(wrapper), '799912345678')
        expect(input(wrapper).value).toBe('79991234567')

        await blur(wrapper)
        expect(shownError(wrapper)).toBe('Номер телефона содержит лишние цифры')
    })

    it('неполный номер после ухода из поля - ошибка', async () => {
        const wrapper = mountPhone()
        await typeText(wrapper, input(wrapper), '99912')
        await blur(wrapper)

        expect(input(wrapper).value).toBe('99912')
        expect(shownError(wrapper)).toBe('Номер телефона указан не полностью')
    })

    it('вставка сразу показывает номер так же, как после ввода', async () => {
        const wrapper = mountPhone()
        await focus(wrapper)
        await paste(wrapper, input(wrapper), '+7 (999) 123-45-67')

        expect(input(wrapper).value).toBe('999 123-45-67')
        expect(lastModel(wrapper)).toBe('+7 999 123-45-67')
    })

    it('правка отформатированного номера не сбивает пробелы и дефисы', async () => {
        const wrapper = mountPhone()
        await typeText(wrapper, input(wrapper), '9991234567')
        await blur(wrapper)
        await focus(wrapper)
        input(wrapper).setSelectionRange(13, 13)
        await pressBackspace(wrapper, input(wrapper))

        expect(input(wrapper).value).toBe('999 123-45-6')
        expect(lastModel(wrapper)).toBe('+7 999123456')
    })

    it('выделенный номер заменяется набором', async () => {
        const wrapper = mountPhone()
        await typeText(wrapper, input(wrapper), '9991234567')
        input(wrapper).setSelectionRange(0, input(wrapper).value.length)
        await typeText(wrapper, input(wrapper), '5')

        expect(input(wrapper).value).toBe('5')
    })

    it('начало заполнения - с первой цифры', async () => {
        const wrapper = mountPhone()
        await typeText(wrapper, input(wrapper), '9')

        expect(wrapper.emitted('fieldStart')).toEqual([['tel']])
    })

    it('очистка формы после отправки очищает поле', async () => {
        const wrapper = mountPhone()
        await typeText(wrapper, input(wrapper), '9991234567')
        ;(wrapper.vm as any).clearValue()
        await wrapper.vm.$nextTick()

        expect(input(wrapper).value).toBe('')
    })

    it('проверка по «Отправить» без ухода из поля (Enter) приводит номер к виду', async () => {
        const wrapper = mountPhone()
        await typeText(wrapper, input(wrapper), '+79991234567')

        expect((wrapper.vm as any).validate()).toBe(true)
        await wrapper.vm.$nextTick()
        expect(input(wrapper).value).toBe('999 123-45-67')
        expect(lastModel(wrapper)).toBe('+7 999 123-45-67')
    })

    it('повторная проверка по «Отправить»: пустое поле - «Заполните поле»', async () => {
        const wrapper = mountPhone()
        const vm = wrapper.vm as any

        expect(vm.validate()).toBe(false)
        expect(vm.errorText).toBe('Заполните поле')
        expect(vm.label).toBe('Номер телефона')
    })
})

describe('дата рождения', () => {
    const mountDate = () => mountInput({ type: 'birthdate', name: 'birthdayDate', placeholder: 'Дата рождения*' })

    it('обычное поле без календаря, на телефоне цифры с разделителем', () => {
        const wrapper = mountDate()
        const el = wrapper.find('input')

        expect(el.attributes('data-field-id')).toBe('birthdayDate')
        expect(el.attributes('inputmode')).toBe('decimal')
        expect(wrapper.find('.p-datepicker').exists()).toBe(false)
    })

    it('во время ввода запятая меняется на точку, остальное после ухода из поля', async () => {
        const wrapper = mountDate()
        await typeText(wrapper, input(wrapper), '1,9,90')

        expect(input(wrapper).value).toBe('1.9.90')

        await blur(wrapper)
        expect(input(wrapper).value).toBe('01.09.1990')
        expect(lastModel(wrapper)).toBe('01.09.1990')
        expect(shownError(wrapper)).toBe('')
    })

    it('без разделителей: ДДММГГ', async () => {
        const wrapper = mountDate()
        await typeText(wrapper, input(wrapper), '010990')
        await blur(wrapper)

        expect(input(wrapper).value).toBe('01.09.1990')
    })

    it('несуществующий день - ошибка, дата приведена к виду', async () => {
        const wrapper = mountDate()
        await typeText(wrapper, input(wrapper), '310290')
        await blur(wrapper)

        expect(input(wrapper).value).toBe('31.02.1990')
        expect(shownError(wrapper)).toBe('Такого дня не существует')
    })

    it('вставка сразу приводит дату к виду', async () => {
        const wrapper = mountDate()
        await paste(wrapper, input(wrapper), '01091990')

        expect(input(wrapper).value).toBe('01.09.1990')
        expect(lastModel(wrapper)).toBe('01.09.1990')
    })

    it('пустое поле после ухода - «Заполните поле»', async () => {
        const wrapper = mountDate()
        await focus(wrapper)
        await blur(wrapper)

        expect(shownError(wrapper)).toBe('Заполните поле')
    })

    it('начало заполнения - с первого символа', async () => {
        const wrapper = mountDate()
        await typeText(wrapper, input(wrapper), '0')

        expect(wrapper.emitted('fieldStart')).toEqual([['birthdayDate']])
    })

    it('название в списке ошибок', () => {
        expect((mountDate().vm as any).label).toBe('Дата рождения')
    })

    it('проверка по «Отправить» без ухода из поля (Enter) приводит дату к виду', async () => {
        const wrapper = mountDate()
        await typeText(wrapper, input(wrapper), '1.9.1990')

        expect((wrapper.vm as any).validate()).toBe(true)
        await wrapper.vm.$nextTick()
        expect(input(wrapper).value).toBe('01.09.1990')
        expect(lastModel(wrapper)).toBe('01.09.1990')
    })
})

describe('сумма долга', () => {
    const mountAmount = () => mountInput({ type: 'amount', name: 'paymentAmount', placeholder: 'Введите сумму вашего долга' })

    it('во время ввода без пробелов по тысячам, запятая меняется на точку, сумма в модель не уходит', async () => {
        const wrapper = mountAmount()
        await typeText(wrapper, input(wrapper), '150000,5')

        expect(input(wrapper).value).toBe('150000.5')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        // повторы поле шлёт на каждый символ, одно событие на поле оставляет учёт формы
        expect(wrapper.emitted('fieldStart')?.[0]).toEqual(['paymentAmount'])
    })

    it('после ухода из поля - 150 000.50 и число в модели', async () => {
        const wrapper = mountAmount()
        await typeText(wrapper, input(wrapper), '150000,5')
        await blur(wrapper)

        expect(input(wrapper).value).toBe('150 000.50')
        expect(lastModel(wrapper)).toBe(150000.5)
    })

    it('вставка сразу приводит сумму к виду', async () => {
        const wrapper = mountAmount()
        await paste(wrapper, input(wrapper), '1500000')

        expect(input(wrapper).value).toBe('1 500 000')
        expect(lastModel(wrapper)).toBe(1500000)
    })

    it('проверка по «Отправить» без ухода из поля (Enter) берёт набранную сумму', async () => {
        const wrapper = mountAmount()
        await typeText(wrapper, input(wrapper), '150000')

        expect((wrapper.vm as any).validate()).toBe(true)
        await wrapper.vm.$nextTick()
        expect(input(wrapper).value).toBe('150 000')
        expect(lastModel(wrapper)).toBe(150000)
    })

    it('пустая сумма после ухода - «Заполните поле»', async () => {
        const wrapper = mountAmount()
        await focus(wrapper)
        await blur(wrapper)

        expect(shownError(wrapper)).toBe('Заполните поле')
        expect((wrapper.vm as any).label).toBe('Сумма долга')
    })
})
