/*
 * Связь оплаты с визитом Метрики, задача заказчика от 19.10:
 * - перед платежом идентификатор tid (время в миллисекундах и четыре заглавные
 *   латинские буквы) сразу уходит событием track_id;
 * - окно с QR для СБП само узнаёт у сервера, что платёж прошёл, показывает
 *   «спасибо» и сообщает форме, а та шлёт payment_success с tid, number и type.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import ModalPaymentQr from '@/layouts/ModalPaymentQr.vue'
import PayForm from '@/blocks/PayForm.vue'
import { sendTrackId } from '@/service/utils/metrika.js'

const ym = vi.fn()

beforeEach(() => {
    ym.mockClear()
    ;(window as any).ym = ym
})

afterEach(() => {
    delete (window as any).ym
    vi.useRealTimers()
    vi.unstubAllGlobals()
})

describe('track_id', () => {
    it('tid - время в миллисекундах и четыре заглавные буквы, сразу событием track_id', () => {
        const before = Date.now()
        const tid = sendTrackId()

        expect(tid).toMatch(/^\d{13}[A-Z]{4}$/)
        expect(Number(tid.slice(0, 13))).toBeGreaterThanOrEqual(before)
        expect(ym).toHaveBeenCalledWith(95726509, 'reachGoal', 'track_id', { tid })
    })

    it('каждый раз новый', () => {
        const tids = new Set(Array.from({ length: 20 }, () => sendTrackId()))

        expect(tids.size).toBe(20)
    })
})

// Просьба заказчика 02.11: тот же tid и в payment_qr_shown, и в payment_redirect.
// 03.11: и номер заказа (number), как в payment_success и payment_confirmed
describe('tid и номер заказа в событиях начала оплаты', () => {
    const ORDER_ID = '20261102120000-abc123'

    const INPUTS = [
        { name: 'name', type: 'text', placeholder: 'ФИО*', required: true, value: 'test test' },
        { name: 'userAmount', type: 'number', placeholder: 'Сумма', required: true, value: 1000 },
        { name: 'email', type: 'email', placeholder: 'E-mail', required: true, value: 'test@test.ru' },
        { name: 'phone', type: 'tel', placeholder: 'Номер телефона', required: true },
        { name: 'contractId', type: 'text', placeholder: 'Введите номер договора', required: true, value: '111' },
    ]

    function mountPayForm(answer: Record<string, unknown>) {
        // счётчик сразу отдаёт ClientID, остальные вызовы только запоминает
        ym.mockImplementation((_counter: number, method: string, callback?: unknown) => {
            if (method === 'getClientID') (callback as (id: string) => void)('1761900000123456789')
        })
        const fetchMock = vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ ok: true, paymentId: '7001', orderId: ORDER_ID, ...answer }) }))
        vi.stubGlobal('fetch', fetchMock)

        const wrapper = mount(PayForm, {
            props: { inputs: INPUTS },
            global: { plugins: [PrimeVue], stubs: { RouterLink: true } },
            attachTo: document.body,
        })
        const sentTid = () => JSON.parse(fetchMock.mock.calls[0][1].body).tid
        const goal = (name: string) => ym.mock.calls.find(call => call[1] === 'reachGoal' && call[2] === name)

        return { wrapper, sentTid, goal }
    }

    afterEach(() => {
        ym.mockReset()
        sessionStorage.clear()
        document.body.innerHTML = ''
    })

    it('СБП: payment_qr_shown с тем же tid, что track_id и платёж, и номером заказа', async () => {
        const { wrapper, sentTid, goal } = mountPayForm({ paymentUrl: 'https://pay.test/1', qrImage: 'data:image/svg+xml;base64,PHN2Zy8+' })

        await (wrapper.vm as any).paymentPay()
        await flushPromises()

        const tid = sentTid()
        expect(tid).toMatch(/^\d{13}[A-Z]{4}$/)
        expect(goal('track_id')?.[3]).toEqual({ tid })
        expect(goal('payment_qr_shown')?.[3]).toMatchObject({ form: 'payment_form', reason: 'fps', tid, number: ORDER_ID })
        wrapper.unmount()
    })

    it('карта: payment_redirect с тем же tid, что track_id и платёж, и номером заказа', async () => {
        // уход на страницу банка - по таймеру, в тесте до него не доходит
        vi.useFakeTimers()
        const { wrapper, sentTid, goal } = mountPayForm({ paymentUrl: 'https://pay.test/1' })
        await wrapper.find('#payment-payment-type-card').trigger('change')

        await (wrapper.vm as any).paymentPay()
        await flushPromises()

        const tid = sentTid()
        expect(goal('track_id')?.[3]).toEqual({ tid })
        expect(goal('payment_redirect')?.[3]).toMatchObject({ form: 'payment_form', reason: 'card', tid, number: ORDER_ID })
        wrapper.unmount()
    })
})

describe('окно СБП узнаёт об оплате', () => {
    function mountQr(statuses: string[]) {
        const fetchMock = vi.fn(async () => {
            const status = statuses.length > 1 ? statuses.shift() : statuses[0]
            return { ok: true, json: async () => ({ ok: true, status }) }
        })
        vi.stubGlobal('fetch', fetchMock)

        const wrapper = mount(ModalPaymentQr, {
            props: { modelValue: false, image: 'data:image/svg+xml;base64,PHN2Zy8+', link: '', amount: 100, paymentId: '7001', orderId: '20261021003000-abc123' },
            global: { plugins: [PrimeVue], stubs: { RouterLink: true } },
            attachTo: document.body,
        })

        return { wrapper, fetchMock }
    }

    async function open(wrapper: ReturnType<typeof mount>) {
        await wrapper.setProps({ modelValue: true })
    }

    async function tick() {
        await vi.advanceTimersByTimeAsync(3000)
        await flushPromises()
    }

    it('спрашивает статус по paymentId и orderId, пока не оплачено, потом «спасибо» и paid', async () => {
        vi.useFakeTimers()
        const { wrapper, fetchMock } = mountQr(['NEW', 'FORM_SHOWED', 'CONFIRMED'])

        await open(wrapper)
        await tick()
        await tick()
        expect(wrapper.emitted('paid')).toBeUndefined()

        await tick()
        expect(wrapper.emitted('paid')).toHaveLength(1)
        expect(document.body.textContent).toContain('Платёж прошёл, спасибо')
        expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({ paymentId: '7001', orderId: '20261021003000-abc123' })

        await tick()
        expect(fetchMock).toHaveBeenCalledTimes(3)
        wrapper.unmount()
    })

    it('отказ банка - сообщение и больше не спрашивает', async () => {
        vi.useFakeTimers()
        const { wrapper, fetchMock } = mountQr(['REJECTED'])

        await open(wrapper)
        await tick()
        await tick()

        expect(wrapper.emitted('paid')).toBeUndefined()
        expect(document.body.textContent).toContain('Платёж не прошёл')
        expect(fetchMock).toHaveBeenCalledTimes(1)
        wrapper.unmount()
    })

    it('закрыли окно - больше не спрашивает', async () => {
        vi.useFakeTimers()
        const { wrapper, fetchMock } = mountQr(['NEW'])

        await open(wrapper)
        await tick()
        await wrapper.setProps({ modelValue: false })
        await tick()
        await tick()

        expect(fetchMock).toHaveBeenCalledTimes(1)
        wrapper.unmount()
    })

    it('без номера платежа не спрашивает вовсе', async () => {
        vi.useFakeTimers()
        const { wrapper, fetchMock } = mountQr(['CONFIRMED'])
        await wrapper.setProps({ paymentId: '' })

        await open(wrapper)
        await tick()

        expect(fetchMock).not.toHaveBeenCalled()
        wrapper.unmount()
    })
})
