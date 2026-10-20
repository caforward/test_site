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
