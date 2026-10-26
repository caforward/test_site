/*
 * Баннер cookies (требования заказчика от 26.10.2026):
 * - когда открыто окно с формой, баннер под ним: окно формы на уровне 10, баннер ниже;
 * - после успешной отправки формы согласие считается данным, баннер больше не показывается.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import BaseCookie from '@/blocks/modals/BaseCookie.vue'
import FormBlock from '@/blocks/FormBlock.vue'
import { acceptCookies, cookieBannerVisible, showCookieBannerIfNeeded } from '@/service/utils/cookieConsent.js'

beforeEach(() => {
    localStorage.clear()
    cookieBannerVisible.value = false
    ;(window as any).ym = vi.fn()
    ;(window as any).checkCookiesAccepted = vi.fn()
    ;(window as any).cookiePlateVisible = true
})

afterEach(() => {
    delete (window as any).ym
    delete (window as any).checkCookiesAccepted
    vi.unstubAllGlobals()
    document.body.innerHTML = ''
})

describe('согласие с cookies', () => {
    it('баннер показывается, пока согласия нет', () => {
        showCookieBannerIfNeeded()
        expect(cookieBannerVisible.value).toBe(true)

        localStorage.setItem('cookiesAccepted', 'true')
        showCookieBannerIfNeeded()
        expect(cookieBannerVisible.value).toBe(false)
    })

    it('принятое согласие запоминается, баннер скрывается, виджет звонка опускается на место', () => {
        cookieBannerVisible.value = true
        acceptCookies()

        expect(localStorage.getItem('cookiesAccepted')).toBe('true')
        expect(cookieBannerVisible.value).toBe(false)
        expect((window as any).cookiePlateVisible).toBe(false)
        expect((window as any).checkCookiesAccepted).toHaveBeenCalled()
    })
})

describe('баннер под окном формы', () => {
    it('уровень баннера 9: выше страницы, ниже окна формы (10)', async () => {
        const wrapper = mount(BaseCookie, {
            global: {plugins: [PrimeVue], stubs: {RouterLink: true}},
            attachTo: document.body,
        })
        await nextTick()
        await nextTick()

        const mask = document.querySelector('.p-dialog-mask') as HTMLElement
        expect(mask).not.toBeNull()
        expect(mask.style.zIndex).toBe('9')

        wrapper.unmount()
    })
})

describe('успешная отправка формы - согласие получено', () => {
    const mountForm = () => mount(FormBlock, {
        props: {
            formMetrikaId: 'partners',
            inputs: [{name: 'name', type: 'text', placeholder: 'ФИО*', required: true}],
        },
        global: {plugins: [PrimeVue], stubs: {RouterLink: true}},
        attachTo: document.body,
    })

    async function fillAndSend(wrapper: ReturnType<typeof mountForm>) {
        await wrapper.find('input[name="name"]').setValue('Иван Петров')
        await wrapper.find('input[type="checkbox"]').setValue(true)
        await wrapper.find('[data-id^="btn_submit_form_"]').trigger('click')
        await flushPromises()
    }

    it('сервер ответил успехом - баннер больше не нужен', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ok: true, status: 200}))
        cookieBannerVisible.value = true

        await fillAndSend(mountForm())

        expect(localStorage.getItem('cookiesAccepted')).toBe('true')
        expect(cookieBannerVisible.value).toBe(false)
    })

    it('ошибка отправки - согласие не засчитывается', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ok: false, status: 500}))
        cookieBannerVisible.value = true

        await fillAndSend(mountForm())

        expect(localStorage.getItem('cookiesAccepted')).toBeNull()
        expect(cookieBannerVisible.value).toBe(true)
    })
})
