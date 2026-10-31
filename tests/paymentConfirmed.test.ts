/*
 * Серверная цель payment_confirmed (заказчик одобрил 21.10): браузерная payment_success
 * теряет оплаты, если человек не вернулся на сайт после банка. Поэтому перед созданием
 * платежа форма берёт ClientID Метрики и передаёт его в payment.php, а когда банк
 * подтвердит оплату, цель в Метрику отправит сервер.
 * ClientID не пришёл (счётчик отключён или заблокирован) - оплата идёт как раньше.
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import PayForm from '@/blocks/PayForm.vue'
import { CLIENT_ID_TIMEOUT_MS, getClientId } from '@/service/utils/metrika.js'

const CLIENT_ID = '1761900000123456789'

// Счётчик: на getClientID отвечает clientId, если он задан, остальные вызовы только запоминает
function metrika(clientId?: unknown) {
    return vi.fn((_counter: number, method: string, callback?: unknown) => {
        if (method === 'getClientID' && clientId !== undefined) {
            ;(callback as (id: unknown) => void)(clientId)
        }
    })
}

afterEach(() => {
    delete (window as any).ym
    vi.useRealTimers()
    vi.unstubAllGlobals()
    sessionStorage.clear()
    document.body.innerHTML = ''
})

describe('ClientID Метрики', () => {
    it('берётся у счётчика 95726509', async () => {
        const ym = metrika(CLIENT_ID)
        ;(window as any).ym = ym

        await expect(getClientId()).resolves.toBe(CLIENT_ID)
        expect(ym).toHaveBeenCalledWith(95726509, 'getClientID', expect.any(Function))
    })

    it('счётчика нет (Метрика отключена для сотрудника) - пусто сразу', async () => {
        await expect(getClientId()).resolves.toBe('')
    })

    it('счётчик не ответил (заблокирован) - пусто через CLIENT_ID_TIMEOUT_MS', async () => {
        vi.useFakeTimers()
        ;(window as any).ym = metrika()

        let clientId: string | undefined
        getClientId().then(value => { clientId = value })

        await vi.advanceTimersByTimeAsync(CLIENT_ID_TIMEOUT_MS - 1)
        expect(clientId).toBeUndefined()

        await vi.advanceTimersByTimeAsync(1)
        expect(clientId).toBe('')
    })

    it('ошибка в счётчике - пусто', async () => {
        ;(window as any).ym = vi.fn(() => { throw new Error('tag.js') })

        await expect(getClientId()).resolves.toBe('')
    })

    it('не число - пусто', async () => {
        ;(window as any).ym = metrika('abc')
        await expect(getClientId()).resolves.toBe('')

        ;(window as any).ym = metrika(null)
        await expect(getClientId()).resolves.toBe('')
    })
})

describe('форма оплаты передаёт ClientID в payment.php', () => {
    const INPUTS = [
        {name: 'name', type: 'text', placeholder: 'ФИО*', required: true, value: 'test test'},
        {name: 'userAmount', type: 'number', placeholder: 'Сумма', required: true, value: 1000},
        {name: 'email', type: 'email', placeholder: 'E-mail', required: true, value: 'test@test.ru'},
        {name: 'phone', type: 'tel', placeholder: 'Номер телефона', required: true},
        {name: 'contractId', type: 'text', placeholder: 'Введите номер договора', required: true, value: '111'},
    ]

    // payment.php создал платёж по СБП и отдал QR: форма показывает его у себя, без ухода в банк
    function mountPayForm() {
        const fetchMock = vi.fn(async () => ({
            ok: true,
            status: 200,
            json: async () => ({
                ok: true,
                paymentUrl: 'https://pay.test/1',
                paymentId: '7001',
                orderId: '20261031120000-abc123',
                qrImage: 'data:image/svg+xml;base64,PHN2Zy8+',
            }),
        }))
        vi.stubGlobal('fetch', fetchMock)

        const wrapper = mount(PayForm, {
            props: {inputs: INPUTS},
            global: {plugins: [PrimeVue], stubs: {RouterLink: true}},
            attachTo: document.body,
        })

        const initCalls = () => fetchMock.mock.calls.filter(([url]) => url === '/backend/public/payment.php')
        const initBody = () => JSON.parse(initCalls()[0][1].body)

        return {wrapper, initCalls, initBody}
    }

    it('ClientID уходит вместе с платежом и tid', async () => {
        ;(window as any).ym = metrika(CLIENT_ID)
        const {wrapper, initCalls, initBody} = mountPayForm()

        await (wrapper.vm as any).paymentPay()
        await flushPromises()

        expect(initCalls()).toHaveLength(1)
        expect(initBody()).toMatchObject({method: 'fps', contractId: '111', clientId: CLIENT_ID})
        expect(initBody().tid).toMatch(/^\d{13}[A-Z]{4}$/)
        wrapper.unmount()
    })

    it('счётчик не ответил - платёж создаётся без ClientID, ожидание не дольше CLIENT_ID_TIMEOUT_MS', async () => {
        vi.useFakeTimers()
        ;(window as any).ym = metrika()
        const {wrapper, initCalls, initBody} = mountPayForm()

        ;(wrapper.vm as any).paymentPay()
        await vi.advanceTimersByTimeAsync(CLIENT_ID_TIMEOUT_MS - 1)
        expect(initCalls()).toHaveLength(0)

        await vi.advanceTimersByTimeAsync(1)
        await flushPromises()
        expect(initCalls()).toHaveLength(1)
        expect(initBody()).toMatchObject({method: 'fps', contractId: '111', clientId: ''})
        wrapper.unmount()
    })

    it('Метрика отключена - платёж создаётся без ClientID и без ожидания', async () => {
        const {wrapper, initCalls, initBody} = mountPayForm()

        await (wrapper.vm as any).paymentPay()
        await flushPromises()

        expect(initCalls()).toHaveLength(1)
        expect(initBody()).toMatchObject({method: 'fps', clientId: ''})
        wrapper.unmount()
    })
})
