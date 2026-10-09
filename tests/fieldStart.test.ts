/*
 * Событие Метрики form_start_field: человек начал заполнять поле формы.
 *
 * Что просил заказчик:
 * - событие одно на поле: перешёл на другое поле и вернулся - второго нет;
 * - форму закрыли и поля очистились - события снова;
 * - можно срабатывать не с первого символа, у отдельных полей свой порог
 *   по их id, настройки в начале скрипта;
 * - для начала текстовые поля с первого символа, дата при начале ввода
 *   или выборе в календаре, списки и файлы при выборе;
 * - параметры form - id формы, field - id поля, у однотипных полей
 *   в разных формах id одинаковый, id поля виден в html.
 *
 * Общий порог берём из той же константы, что и код: если его поменяют,
 * тесты останутся верными. Проверки «меньше общего порога» имеют смысл,
 * только пока он больше одного символа. Свой порог поля проверяется всегда.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import BaseInput from '@/blocks/ui/BaseInput.vue'
import {
    FIELD_START_MIN_LENGTH as MIN,
    FIELD_START_MIN_LENGTH_BY_FIELD as BY_FIELD,
    createFieldStartTracker,
    isFieldStarted,
    resolveFieldId,
} from '@/service/utils/metrika.js'

const ym = vi.fn()
let savedByField: Record<string, number> = {}

function clearByField(): void {
    for (const key of Object.keys(BY_FIELD)) delete (BY_FIELD as any)[key]
}

beforeEach(() => {
    ym.mockClear()
    ;(window as any).ym = ym
    // тесты идут без своих порогов из настроек, нужные задают сами
    savedByField = { ...BY_FIELD }
    clearByField()
})

afterEach(() => {
    delete (window as any).ym
    clearByField()
    Object.assign(BY_FIELD, savedByField)
})

// Отправленные form_start_field в виде «форма:поле»
function sentFields(): string[] {
    return ym.mock.calls
        .filter(call => call[2] === 'form_start_field')
        .map(call => `${call[3].form}:${call[3].field}`)
}

// Телефон так, как его отдаёт маска +7 999 999-99-99: не введённые цифры - подчёркивания
function maskedPhone(digits: string): string {
    const slots = (digits + '_'.repeat(10)).slice(0, 10)
    return `+7 ${slots.slice(0, 3)} ${slots.slice(3, 6)}-${slots.slice(6, 8)}-${slots.slice(8, 10)}`
}

describe('id поля', () => {
    it('однотипные поля разных форм получают один id', () => {
        expect(resolveFieldId('phone')).toBe('tel')
        expect(resolveFieldId('tel')).toBe('tel')
        expect(resolveFieldId('claim')).toBe('message')
        expect(resolveFieldId('complaintMessage')).toBe('message')
        expect(resolveFieldId('message')).toBe('message')
    })

    it('остальные поля сохраняют свой name', () => {
        expect(resolveFieldId('name')).toBe('name')
        expect(resolveFieldId('email')).toBe('email')
        expect(resolveFieldId('contractId')).toBe('contractId')
    })
})

describe('когда поле считается начатым', () => {
    it('текст, почта и обращение - с порога, пробелы по краям не считаются', () => {
        expect(isFieldStarted('text', 'и'.repeat(MIN))).toBe(true)
        expect(isFieldStarted('email', 'a'.repeat(MIN))).toBe(true)
        expect(isFieldStarted('textarea', 'a'.repeat(MIN))).toBe(true)
        expect(isFieldStarted('text', ' '.repeat(MIN + 2))).toBe(false)
    })

    it.runIf(MIN > 1)('текст короче порога ещё не начат', () => {
        expect(isFieldStarted('text', ' ' + 'и'.repeat(MIN - 1) + ' ')).toBe(false)
    })

    it('телефон - только цифры, которые ввёл человек, без +7 и маски', () => {
        expect(isFieldStarted('tel', maskedPhone(''))).toBe(false)
        expect(isFieldStarted('tel', maskedPhone('9'.repeat(MIN)))).toBe(true)
        // номер может начинаться с семёрки, это не код страны
        expect(isFieldStarted('tel', maskedPhone('7'.repeat(MIN)))).toBe(true)
    })

    it.runIf(MIN > 1)('телефон: цифр меньше порога - ещё не начат', () => {
        expect(isFieldStarted('tel', maskedPhone('9'.repeat(MIN - 1)))).toBe(false)
        expect(isFieldStarted('tel', maskedPhone('7'.repeat(MIN - 1)))).toBe(false)
    })

    it('сумма - по цифрам числа', () => {
        expect(isFieldStarted('number', Number('1'.repeat(MIN)))).toBe(true)
        expect(isFieldStarted('number', 150000)).toBe(true)
    })

    it.runIf(MIN > 1)('сумма: цифр меньше порога - ещё не начата', () => {
        expect(isFieldStarted('number', Number('1'.repeat(MIN - 1)))).toBe(false)
    })

    it('список, файл и дата из календаря - сразу при выборе', () => {
        expect(isFieldStarted('select', { value: 'debt-info', label: 'Информация о долге' })).toBe(true)
        expect(isFieldStarted('select', 'Другое')).toBe(true)
        expect(isFieldStarted('file', new File(['x'], 'claim.docx'))).toBe(true)
        expect(isFieldStarted('date', new Date())).toBe(true)
    })

    it('пустое значение не начато ни у какого типа', () => {
        for (const type of ['text', 'email', 'textarea', 'tel', 'number', 'select', 'file', 'date']) {
            expect(isFieldStarted(type, '')).toBe(false)
            expect(isFieldStarted(type, null)).toBe(false)
            expect(isFieldStarted(type, undefined)).toBe(false)
        }
    })
})

describe('свой порог у отдельных полей', () => {
    it('поле со своим порогом начато с него, остальные поля по общему', () => {
        BY_FIELD.name = MIN + 2

        expect(isFieldStarted('text', 'и'.repeat(MIN + 1), 'name')).toBe(false)
        expect(isFieldStarted('text', 'и'.repeat(MIN + 2), 'name')).toBe(true)
        expect(isFieldStarted('text', 'и'.repeat(MIN), 'email')).toBe(true)
        expect(isFieldStarted('text', 'и'.repeat(MIN))).toBe(true)
    })

    it('свой порог работает и у телефона, и у суммы, и у даты, набранной руками', () => {
        BY_FIELD.tel = 3
        BY_FIELD.userAmount = 2
        BY_FIELD.birthdayDate = 3

        expect(isFieldStarted('tel', maskedPhone('99'), 'tel')).toBe(false)
        expect(isFieldStarted('tel', maskedPhone('999'), 'tel')).toBe(true)
        expect(isFieldStarted('number', 5, 'userAmount')).toBe(false)
        expect(isFieldStarted('number', 50, 'userAmount')).toBe(true)
        expect(isFieldStarted('text', '12', 'birthdayDate')).toBe(false)
        expect(isFieldStarted('text', '12.', 'birthdayDate')).toBe(true)
    })

    it('у списка, файла и даты из календаря порога нет: засчитываются при выборе', () => {
        BY_FIELD.messageType = 10
        BY_FIELD.file_attachment = 10
        BY_FIELD.birthdayDate = 10

        expect(isFieldStarted('select', { value: 'refund', label: 'О возврате' }, 'messageType')).toBe(true)
        expect(isFieldStarted('file', new File(['x'], 'claim.docx'), 'file_attachment')).toBe(true)
        expect(isFieldStarted('date', new Date(), 'birthdayDate')).toBe(true)
    })
})

describe('учёт начатых полей формы', () => {
    it('одно событие на поле: переходы между полями его не повторяют', () => {
        const tracker = createFieldStartTracker(() => 'callback')

        tracker.start('name')
        tracker.start('tel')
        tracker.start('name')
        tracker.start('tel')

        expect(sentFields()).toEqual(['callback:name', 'callback:tel'])
    })

    it('параметры события: form, field и адрес страницы без якоря', () => {
        window.history.replaceState(null, '', '/about?utm_source=x#contacts')
        const tracker = createFieldStartTracker(() => 'footer-about')

        tracker.start('email')

        expect(ym).toHaveBeenCalledWith(95726509, 'reachGoal', 'form_start_field', {
            form: 'footer-about',
            field: 'email',
            url: `${window.location.origin}/about?utm_source=x`,
        })
    })

    it('очищенное поле снова даёт событие', () => {
        const tracker = createFieldStartTracker(() => 'calculator')

        tracker.start('name')
        tracker.reset('name')
        tracker.start('name')

        expect(sentFields()).toEqual(['calculator:name', 'calculator:name'])
    })

    it('у каждой формы свой учёт: заново открытое окно и соседняя форма шлют события', () => {
        const footer = createFieldStartTracker(() => 'footer-about')
        const firstOpen = createFieldStartTracker(() => 'callback')
        const secondOpen = createFieldStartTracker(() => 'callback')

        footer.start('name')
        firstOpen.start('name')
        secondOpen.start('name')

        expect(sentFields()).toEqual(['footer-about:name', 'callback:name', 'callback:name'])
    })
})

describe('BaseInput: сигнал о начале заполнения', () => {
    function mountInput(props: Record<string, unknown>) {
        return mount(BaseInput, {
            props,
            global: { plugins: [PrimeVue] },
        })
    }

    // Набор цифр так, как это делает браузер: keydown, затем keypress.
    // InputNumber вставляет символ сам и обычного события input не даёт
    async function typeDigits(wrapper: ReturnType<typeof mountInput>, el: HTMLInputElement, digits: string) {
        for (const char of digits) {
            const init = { key: char, code: `Digit${char}`, bubbles: true, cancelable: true }

            if (el.dispatchEvent(new KeyboardEvent('keydown', init))) {
                el.dispatchEvent(new KeyboardEvent('keypress', init))
            }
            await wrapper.vm.$nextTick()
        }
    }

    it('текст: событие с порога, id поля виден в html', async () => {
        const wrapper = mountInput({ type: 'text', name: 'name' })
        const input = wrapper.find('input')

        expect(input.attributes('data-field-id')).toBe('name')

        await input.setValue('и'.repeat(MIN))
        expect(wrapper.emitted('fieldStart')).toEqual([['name']])
    })

    it.runIf(MIN > 1)('текст короче порога события не даёт', async () => {
        const wrapper = mountInput({ type: 'text', name: 'name' })

        await wrapper.find('input').setValue('и'.repeat(MIN - 1))
        expect(wrapper.emitted('fieldStart')).toBeUndefined()
    })

    it('свой порог поля из настроек: ФИО с третьего символа', async () => {
        BY_FIELD.name = 3
        const wrapper = mountInput({ type: 'text', name: 'name' })
        const input = wrapper.find('input')

        await input.setValue('Ив')
        expect(wrapper.emitted('fieldStart')).toBeUndefined()

        await input.setValue('Ива')
        expect(wrapper.emitted('fieldStart')).toEqual([['name']])
    })

    it('свой порог ищется по id поля, а не по name: поле phone подчиняется настройке tel', async () => {
        BY_FIELD.tel = 99
        const wrapper = mountInput({ type: 'text', name: 'phone' })

        await wrapper.find('input').setValue('999')
        expect(wrapper.emitted('fieldStart')).toBeUndefined()
    })

    it('телефон из формы оплаты виден в html как tel, как в остальных формах', () => {
        const wrapper = mountInput({ type: 'tel', name: 'phone' })

        expect(wrapper.find('input').attributes('data-field-id')).toBe('tel')
    })

    it('сумма: событие во время набора, не дожидаясь ухода из поля', async () => {
        const wrapper = mountInput({ type: 'number', name: 'userAmount' })
        const input = wrapper.find('input')

        expect(input.attributes('data-field-id')).toBe('userAmount')

        await typeDigits(wrapper, input.element as HTMLInputElement, '1'.repeat(MIN))

        expect(wrapper.emitted('fieldStart')?.[0]).toEqual(['userAmount'])
        // сама сумма уходит в модель только на blur
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('дата, введённая руками: событие по набранным символам, пока это ещё не дата', async () => {
        const wrapper = mountInput({ type: 'date', name: 'birthdayDate' })

        await wrapper.find('input').setValue('1'.repeat(MIN))
        expect(wrapper.emitted('fieldStart')?.[0]).toEqual(['birthdayDate'])
    })

    it('очистка после отправки: поле сбрасывается, нового события о начале заполнения нет', async () => {
        const wrapper = mountInput({ type: 'text', name: 'name' })

        await wrapper.find('input').setValue('Иван Петров')
        ;(wrapper.vm as any).clearValue()
        await wrapper.vm.$nextTick()

        expect(wrapper.emitted('fieldReset')).toEqual([['name']])
        expect(wrapper.emitted('fieldStart')).toEqual([['name']])
    })

    it('очистка поля со значением по умолчанию: значение вернулось кодом, события нет', async () => {
        const wrapper = mountInput({ type: 'number', name: 'paymentAmount', modelValue: 150000 })

        await wrapper.setProps({ modelValue: 90000 })
        ;(wrapper.vm as any).clearValue()
        await wrapper.vm.$nextTick()

        expect(wrapper.emitted('fieldReset')).toEqual([['paymentAmount']])
        expect(wrapper.emitted('fieldStart')).toBeUndefined()
    })
})
