/*
 * Формы заявок по требованиям заказчика от 26.10.2026:
 * - ошибки полей дополнительно видны над кнопкой «Отправить»: «Дата рождения: Заполните поле»;
 * - по нажатию «Отправить» поля проверяются заново;
 * - в тексте согласия «обработку своих персональных данных» без ссылки, она не работала;
 * - дата рождения второй после ФИО, без календаря; в письмо уходит ДД.ММ.ГГГГ.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import BaseForm from '@/blocks/form/BaseForm.vue'
import BaseInput from '@/blocks/ui/BaseInput.vue'
import ModalForm from '@/layouts/ModalForm.vue'
import FormBlock from '@/blocks/FormBlock.vue'
import AboutFormFooter from '@/components/About/FormFooter.vue'

beforeEach(() => {
    ;(window as any).ym = vi.fn()
})

afterEach(() => {
    delete (window as any).ym
    document.body.innerHTML = ''
})

const INPUTS = [
    {name: 'name', type: 'text', placeholder: 'ФИО*', required: true},
    {name: 'birthdayDate', type: 'birthdate', placeholder: 'Дата рождения*', required: true},
    {name: 'tel', type: 'tel', placeholder: 'Номер телефона*', required: true},
    {name: 'email', type: 'email', placeholder: 'E-mail*'},
]

function mountForm(inputs = INPUTS) {
    return mount(BaseForm, {
        props: {inputs},
        global: {plugins: [PrimeVue], stubs: {RouterLink: true}},
        attachTo: document.body,
    })
}

type Wrapper = ReturnType<typeof mountForm>

const field = (wrapper: Wrapper, name: string) =>
    wrapper.findAllComponents(BaseInput).find(input => input.props('name') === name)!

const errors = (wrapper: Wrapper) => wrapper.findAll('.form-errors li').map(li => li.text())

async function submit(wrapper: Wrapper) {
    await wrapper.find('[data-id^="btn_submit_form_"]').trigger('click')
    await nextTick()
}

// Значение целиком, как при вставке, и уход из поля
async function enter(wrapper: Wrapper, name: string, text: string) {
    const input = field(wrapper, name).find('input')
    ;(input.element as HTMLInputElement).value = text
    await input.trigger('input')
    await input.trigger('blur')
}

async function fillValid(wrapper: Wrapper) {
    await field(wrapper, 'name').find('input').setValue('Иван Петров')
    await enter(wrapper, 'birthdayDate', '1.9.1990')
    await enter(wrapper, 'tel', '9991234567')
    await wrapper.find('input[type="checkbox"]').setValue(true)
}

describe('ошибки над кнопкой «Отправить»', () => {
    it('до нажатия «Отправить» списка нет', () => {
        expect(mountForm().find('.form-errors').exists()).toBe(false)
    })

    it('пустая форма: ошибки обязательных полей с названием поля и согласие', async () => {
        const wrapper = mountForm()
        await submit(wrapper)

        expect(errors(wrapper)).toEqual([
            'ФИО: Заполните поле',
            'Дата рождения: Заполните поле',
            'Номер телефона: Заполните поле',
            'Согласие на обработку данных: Поставьте галочку',
        ])
        expect(wrapper.emitted('submitted')).toBeUndefined()
    })

    it('список стоит над кнопкой отправки', async () => {
        const wrapper = mountForm()
        await submit(wrapper)

        const list = wrapper.find('.form-errors').element
        const button = wrapper.find('[data-id^="btn_submit_form_"]').element
        expect(list.compareDocumentPosition(button) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    })

    it('исправленное поле пропадает из списка, текст ошибки - как у поля', async () => {
        const wrapper = mountForm()
        await submit(wrapper)
        await field(wrapper, 'name').find('input').setValue('Иван Петров')
        await enter(wrapper, 'tel', '99912')

        expect(errors(wrapper)).toEqual([
            'Дата рождения: Заполните поле',
            'Номер телефона: Номер телефона указан не полностью',
            'Согласие на обработку данных: Поставьте галочку',
        ])
    })

    it('заполненная форма отправляется, списка нет', async () => {
        const wrapper = mountForm()
        await fillValid(wrapper)
        await submit(wrapper)

        expect(wrapper.emitted('submitted')).toHaveLength(1)
        expect(wrapper.find('.form-errors').exists()).toBe(false)
    })
})

describe('повторная проверка по «Отправить»', () => {
    it('значение, поменянное без ввода человека, проверяется при отправке', async () => {
        const wrapper = mountForm()
        await fillValid(wrapper)

        ;(field(wrapper, 'tel').vm as any).value = '+7 999'
        await nextTick()
        await submit(wrapper)

        expect(wrapper.emitted('submitted')).toBeUndefined()
        expect(errors(wrapper)).toEqual(['Номер телефона: Номер телефона указан не полностью'])
    })
})

describe('что уходит в письмо', () => {
    it('дата рождения ДД.ММ.ГГГГ, телефон +7 999 123-45-67', async () => {
        const wrapper = mountForm()
        await fillValid(wrapper)
        await submit(wrapper)

        const formData = wrapper.emitted('submitted')![0][0] as FormData
        expect(formData.get('birthdayDate')).toBe('01.09.1990')
        expect(formData.get('tel')).toBe('+7 999 123-45-67')
    })
})

describe('отправка по Enter, не уходя из поля', () => {
    // набор в поле без ухода из него: значение ещё не приведено к виду
    async function typeWithoutBlur(wrapper: Wrapper, name: string, text: string) {
        const el = field(wrapper, name).find('input').element as HTMLInputElement
        el.value = text
        el.dispatchEvent(new InputEvent('input', {inputType: 'insertText', data: text.slice(-1), bubbles: true}))
        await nextTick()
    }

    it('дата рождения всё равно уходит в письмо как ДД.ММ.ГГГГ', async () => {
        const wrapper = mountForm()
        await field(wrapper, 'name').find('input').setValue('Иван Петров')
        await enter(wrapper, 'tel', '9991234567')
        await wrapper.find('input[type="checkbox"]').setValue(true)
        await typeWithoutBlur(wrapper, 'birthdayDate', '1.9.1990')

        // Enter в поле нажимает кнопку отправки, поле при этом фокус не теряет
        await submit(wrapper)
        await nextTick()

        const formData = wrapper.emitted('submitted')![0][0] as FormData
        expect(formData.get('birthdayDate')).toBe('01.09.1990')
    })
})

describe('согласие', () => {
    it('«обработку своих персональных данных» - обычный текст, ссылка только на политику', () => {
        const label = mountForm().find('label[for="personal-data-consent"]')

        expect(label.text()).toContain('обработку своих персональных данных')
        expect(label.findAll('a').map(link => link.text())).toEqual(['политика конфиденциальности'])
    })
})

describe('дата рождения в формах второй после ФИО, без календаря', () => {
    const defaultInputs = (component: any) => component.props.inputs.default

    it.each([
        ['окна обращений', defaultInputs(ModalForm)],
        ['формы внизу страниц', defaultInputs(FormBlock)],
        ['форма внизу «О компании»', (AboutFormFooter as any).data().inputs],
    ])('%s', (_title, inputs) => {
        expect(inputs.slice(0, 3).map((input: any) => input.name)).toEqual(['name', 'birthdayDate', 'tel'])
        expect(inputs[1].type).toBe('birthdate')
    })
})
