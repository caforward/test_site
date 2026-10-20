/*
 * Метрика форм, задача заказчика от 19.10:
 * - url во всех событиях без якоря и без хвоста после «?» (utm, ysclid, pv_id);
 * - form_start_field: form, theme, from, url, field; theme только у формы debt-info;
 * - form_choice_theme, когда человек сам выбрал тему в debt-info: form, theme, from, url;
 * - у каждой темы свой id в theme, у тем без своего value он задан полем theme.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import BaseForm from '@/blocks/form/BaseForm.vue'
import BaseInput from '@/blocks/ui/BaseInput.vue'
import { createFieldStartTracker, getPageUrl, resolveThemeId } from '@/service/utils/metrika.js'

const ym = vi.fn()

const THEMES = [
    {value: 'debt-info', label: 'Информация о долге'},
    {value: 'installment', label: 'Запрос на оферту'},
    {value: '', theme: 'refusal', label: 'Отказ от взаимодействия'},
]

beforeEach(() => {
    ym.mockClear()
    ;(window as any).ym = ym
    window.history.replaceState(null, '', '/about?ysclid=mv5iwbdfsx83544539&pv_id_3=5#payment')
})

afterEach(() => {
    delete (window as any).ym
})

const pageUrl = () => `${window.location.origin}/about`

function sent(eventName: string) {
    return ym.mock.calls.filter(call => call[2] === eventName).map(call => call[3])
}

function mountForm(props: Record<string, unknown>) {
    return mount(BaseForm, {
        props: {
            inputs: [
                {name: 'name', type: 'text', placeholder: 'ФИО*', required: true},
                {name: 'messageType', type: 'select', placeholder: 'Тема обращения*', required: true, value: THEMES[0], options: THEMES},
            ],
            ...props,
        },
        global: {plugins: [PrimeVue], stubs: {RouterLink: true}},
    })
}

function field(wrapper: ReturnType<typeof mountForm>, name: string) {
    return wrapper.findAllComponents(BaseInput).find(input => input.props('name') === name)!
}

describe('адрес страницы в событиях', () => {
    it('без якоря и без хвоста после ?', () => {
        expect(getPageUrl()).toBe(pageUrl())
    })
})

describe('id темы', () => {
    it('value темы, а у темы без value - свой id из theme', () => {
        expect(resolveThemeId(THEMES[0])).toBe('debt-info')
        expect(resolveThemeId(THEMES[1])).toBe('installment')
        expect(resolveThemeId(THEMES[2])).toBe('refusal')
    })

    it('не тема - нет id', () => {
        expect(resolveThemeId(null)).toBeUndefined()
        expect(resolveThemeId('Прошу перезвонить')).toBeUndefined()
    })
})

describe('form_start_field', () => {
    it('параметры form, theme, from, url, field', () => {
        const tracker = createFieldStartTracker(() => ({form: 'debt-info', theme: 'refusal', from: 'modal'}))

        tracker.start('name')

        expect(sent('form_start_field')).toEqual([
            {form: 'debt-info', theme: 'refusal', from: 'modal', url: pageUrl(), field: 'name'},
        ])
    })

    it('без темы параметра theme нет', () => {
        const tracker = createFieldStartTracker(() => ({form: 'calculator', from: 'body'}))

        tracker.start('name')

        expect(sent('form_start_field')).toEqual([
            {form: 'calculator', from: 'body', url: pageUrl(), field: 'name'},
        ])
    })
})

describe('форма debt-info', () => {
    it('человек выбрал тему - form_choice_theme с form, theme, from, url', () => {
        const wrapper = mountForm({formMetrikaId: 'debt-info', metrikaFrom: 'modal'})

        field(wrapper, 'messageType').vm.$emit('userSelect', THEMES[2])

        expect(sent('form_choice_theme')).toEqual([
            {form: 'debt-info', theme: 'refusal', from: 'modal', url: pageUrl()},
        ])
    })

    it('тема по умолчанию при открытии формы события не даёт', () => {
        mountForm({formMetrikaId: 'debt-info'})

        expect(sent('form_choice_theme')).toEqual([])
    })

    it('начатое поле несёт выбранную тему, from по умолчанию body', async () => {
        const wrapper = mountForm({startFieldFormId: 'debt-info'})

        field(wrapper, 'messageType').vm.$emit('update:modelValue', THEMES[1])
        await nextTick()
        field(wrapper, 'name').vm.$emit('fieldStart', 'name')

        expect(sent('form_start_field')).toEqual([
            {form: 'debt-info', theme: 'installment', from: 'body', url: pageUrl(), field: 'name'},
        ])
    })
})

describe('форма не debt-info', () => {
    it('выбор в списке не даёт form_choice_theme, у начатых полей нет theme', () => {
        const wrapper = mountForm({startFieldFormId: 'footer-jobs'})

        field(wrapper, 'messageType').vm.$emit('userSelect', THEMES[2])
        field(wrapper, 'name').vm.$emit('fieldStart', 'name')

        expect(sent('form_choice_theme')).toEqual([])
        expect(sent('form_start_field')).toEqual([
            {form: 'footer-jobs', from: 'body', url: pageUrl(), field: 'name'},
        ])
    })
})
