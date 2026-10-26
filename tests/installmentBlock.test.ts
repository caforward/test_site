/*
 * Блок рассрочки в форме (требования заказчика от 26.10.2026): сумма, срок и дата платежа
 * по умолчанию пустые, пока нет суммы и срока - «Укажите сумму и срок» вместо платежа,
 * текста «без учёта скидки» нет. Пустые поля не уходят в письмо мусором вроде 01.01.1970.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import BaseFormInstallment from '@/blocks/form/BaseFormInstallment.vue'
import BaseSelect from '@/blocks/ui/BaseSelect.vue'

beforeEach(() => {
    ;(window as any).ym = vi.fn()
})

afterEach(() => {
    delete (window as any).ym
    document.body.innerHTML = ''
})

const mountBlock = () => mount(BaseFormInstallment, {
    global: {plugins: [PrimeVue]},
    attachTo: document.body,
})

type Wrapper = ReturnType<typeof mountBlock>

const shownText = (wrapper: Wrapper) => wrapper.text().replace(/\s+/g, ' ')
// строка «Ежемесячный платеж» и то, что под ней: платёж или подсказка
const monthly = (wrapper: Wrapper) => wrapper.findAll('.installment-title > *').map(el => el.text().replace(/\s+/g, ' '))
const value = (wrapper: Wrapper, selector: string) => (wrapper.find(selector).element as HTMLInputElement).value

async function enterAmount(wrapper: Wrapper, text: string) {
    const input = wrapper.find('input[name="paymentAmount"]')
    ;(input.element as HTMLInputElement).value = text
    await input.trigger('input')
    await input.trigger('blur')
}

describe('блок рассрочки', () => {
    it('сумма, срок и дата платежа по умолчанию пустые', () => {
        const wrapper = mountBlock()

        expect(value(wrapper, 'input[name="paymentAmount"]')).toBe('')
        expect(value(wrapper, 'input[name="paymentPeriod"]')).toBe('')
        expect(value(wrapper, '[data-field-id="paymentDate"] input')).toBe('')
    })

    it('без суммы и срока - «Укажите сумму и срок», текста «без учёта скидки» нет', () => {
        const wrapper = mountBlock()

        expect(monthly(wrapper)).toEqual(['Ежемесячный платеж:', 'Укажите сумму и срок'])
        expect(shownText(wrapper)).not.toContain('без учёта скидки')
        expect(shownText(wrapper)).not.toContain('₽')
    })

    it('одной суммы мало, нужен и срок', async () => {
        const wrapper = mountBlock()
        await enterAmount(wrapper, '150000')

        expect(monthly(wrapper)).toEqual(['Ежемесячный платеж:', 'Укажите сумму и срок'])
    })

    it('сумма и срок заданы - платёж в рублях', async () => {
        const wrapper = mountBlock()
        await enterAmount(wrapper, '150000')
        wrapper.findComponent(BaseSelect).vm.$emit('update:modelValue', {value: 6, label: 6})
        await nextTick()

        expect(monthly(wrapper)).toEqual(['Ежемесячный платеж:', '25 000 ₽'])
        expect(value(wrapper, 'input[name="paymentAmount"]')).toBe('150 000')
    })

    it('пустые поля уходят в отправку пустыми строками, а не null и 01.01.1970', () => {
        const data = (mountBlock().vm as any).exposeData

        expect(data).toEqual({paymentAmount: '', paymentPeriod: '', paymentDate: '', paymentMonthly: ''})
    })

    it('заполненные поля уходят как раньше', async () => {
        const wrapper = mountBlock()
        await enterAmount(wrapper, '150000')
        wrapper.findComponent(BaseSelect).vm.$emit('update:modelValue', {value: 6, label: 6})
        await nextTick()

        const data = (wrapper.vm as any).exposeData
        expect(data.paymentAmount).toBe(150000)
        expect(data.paymentPeriod).toBe(6)
        expect(data.paymentMonthly).toBe('25000.00')
    })
})
