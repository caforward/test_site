<script setup>
import BaseModal from "@/blocks/BaseModal.vue";
import BaseButton from "@/blocks/ui/BaseButton.vue";
import {watch} from "vue";
import {sendMetrikaEvent} from "@/service/utils/metrika.js";

const visible = defineModel()

defineProps({
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
})

// На телефоне свой экран не отсканировать, поэтому там главная кнопка открывает
// приложение банка, а QR остаётся для оплаты с другого устройства
const isTouchDevice = typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches

watch(visible, (newVal) => {
    // Метрика
    if (newVal) {
        const url = window.location.href.split('#')[0]
        sendMetrikaEvent('modal_open', {id: 'sbp_payment', url})
    }
})
</script>

<template>
    <BaseModal v-if="visible" modal-id="fps_payment" @closeModal="visible = false">
        <template #body>
            <div class="qr">
                <div class="text-xl font-bold md:text-2xl">
                    Оплата через СБП
                </div>

                <div v-if="amount" class="qr__amount">
                    {{ amount }} ₽
                </div>

                <template v-if="isTouchDevice && link">
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
}
</style>
