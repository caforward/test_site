<script setup>
import BaseModal from "@/blocks/BaseModal.vue";
import BaseButton from "@/blocks/ui/BaseButton.vue";
import {onBeforeUnmount, ref, watch} from "vue";
import {getPageUrl, sendMetrikaEvent} from "@/service/utils/metrika.js";

const visible = defineModel()

const props = defineProps({
    image: {
        type: String,
        default: ''
    },
    link: {
        type: String,
        default: ''
    },
    amount: {
        type: [String, Number],
        default: null
    },
    // По ним окно спрашивает у сервера статус платежа
    paymentId: {
        type: String,
        default: ''
    },
    orderId: {
        type: String,
        default: ''
    },
})

const emit = defineEmits(['paid'])

// На телефоне свой экран не отсканировать, поэтому там главная кнопка открывает
// приложение банка, а QR остаётся для оплаты с другого устройства
const isTouchDevice = typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches

// По СБП человек платит в приложении банка, и на сайт его никто не возвращает.
// Пока окно открыто, раз в несколько секунд спрашиваем у сервера статус, при оплате
// показываем «спасибо». Дольше 15 минут не спрашиваем: QR к тому времени уже не нужен
const PAYMENT_STATUS_URL = '/backend/public/payment-status.php'
const POLL_INTERVAL_MS = 3000
const POLL_LIMIT_MS = 15 * 60 * 1000
const FAILED_STATUSES = ['REJECTED', 'DEADLINE_EXPIRED', 'CANCELED', 'AUTH_FAIL']

// waiting - ждём оплату, paid - оплачено, failed - банк отказал
const paymentState = ref('waiting')
let pollTimer = null
let pollStartedAt = 0
// номер открытия окна: ответ, пришедший после закрытия, к новому открытию не относится
let pollRun = 0

function stopPolling() {
    clearTimeout(pollTimer)
    pollTimer = null
}

async function checkStatus(run) {
    try {
        const response = await fetch(PAYMENT_STATUS_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({paymentId: props.paymentId, orderId: props.orderId}),
        })
        const result = await response.json().catch(() => null)

        if (run !== pollRun || !visible.value) return

        if (result?.ok && result.status === 'CONFIRMED') {
            paymentState.value = 'paid'
            emit('paid')
            return
        }

        if (result?.ok && FAILED_STATUSES.includes(result.status)) {
            paymentState.value = 'failed'
            return
        }
    } catch (e) {
        // сеть моргнула - спросим ещё раз
    }

    if (run === pollRun && visible.value && Date.now() - pollStartedAt < POLL_LIMIT_MS) {
        pollTimer = setTimeout(() => checkStatus(run), POLL_INTERVAL_MS)
    }
}

watch(visible, (newVal) => {
    stopPolling()
    pollRun++

    if (newVal) {
        // Метрика
        const url = getPageUrl()
        sendMetrikaEvent('modal_open', {id: 'sbp_payment', url})

        paymentState.value = 'waiting'

        if (props.paymentId && props.orderId) {
            const run = pollRun
            pollStartedAt = Date.now()
            pollTimer = setTimeout(() => checkStatus(run), POLL_INTERVAL_MS)
        }
    }
})

onBeforeUnmount(() => {
    stopPolling()
    pollRun++
})
</script>

<template>
    <BaseModal v-if="visible" modal-id="fps_payment" @closeModal="visible = false">
        <template #body>
            <div class="qr">
                <div class="text-xl font-bold md:text-2xl">
                    Оплата через СБП
                </div>

                <div v-if="amount && paymentState !== 'failed'" class="qr__amount">
                    {{ amount }} ₽
                </div>

                <p v-if="paymentState === 'paid'" class="qr__hint qr__paid">
                    Платёж прошёл, спасибо. Квитанция придёт на указанные вами контакты.
                </p>

                <p v-else-if="paymentState === 'failed'" class="qr__hint">
                    Платёж не прошёл. Попробуйте ещё раз или оплатите по реквизитам.
                </p>

                <template v-else-if="isTouchDevice && link">
                    <BaseButton as="link" :href="link" size="large" class="w-full" data-id="modal_qr_open_bank_link">
                        Открыть приложение банка
                    </BaseButton>

                    <p class="qr__hint">
                        Выберите свой банк и подтвердите оплату в приложении
                    </p>

                    <img v-if="image" :src="image" alt="QR-код для оплаты через СБП" class="qr__code qr__code_small">

                    <p class="qr__note">
                        Оплачиваете с другого устройства? Отсканируйте QR-код
                    </p>
                </template>

                <template v-else>
                    <img v-if="image" :src="image" alt="QR-код для оплаты через СБП" class="qr__code">

                    <p class="qr__hint">
                        Отсканируйте код камерой телефона или в приложении вашего банка
                    </p>

                    <a v-if="link" :href="link" class="link underline" data-id="modal_qr_open_bank_link">
                        Открыть в приложении банка
                    </a>
                </template>

                <BaseButton
                    :class="isTouchDevice && link ? 'w-full' : 'button button_blue'"
                    :severity="isTouchDevice && link ? 'secondary' : 'primary'"
                    :size="isTouchDevice && link ? 'large' : 'medium'"
                    @click="visible = false"
                    data-id="btn_clos_qr_payment_modal"
                >
                    Закрыть
                </BaseButton>
            </div>
        </template>
    </BaseModal>
</template>

<style lang="scss" scoped>
.qr {
    @apply flex flex-col items-center gap-4 text-center;

    &__amount {
        @apply text-2xl font-bold;
    }

    &__code {
        @apply w-full max-w-[260px] rounded-lg bg-white p-3;

        &_small {
            @apply max-w-[160px];
        }
    }

    &__hint {
        @apply text-base md:text-lg;
    }

    &__note {
        @apply text-sm text-slate-500;
    }

    &__paid {
        @apply font-semibold text-green-600;
    }
}
</style>
