<script setup>
import BaseModal from "@/blocks/BaseModal.vue";
import BaseButton from "@/blocks/ui/BaseButton.vue";
import {watch} from "vue";
import {getPageUrl, sendMetrikaEvent} from "@/service/utils/metrika.js";
import qrImage from "@/assets/images/digital-ruble-qr.png";

const visible = defineModel()

// Статический QR цифрового рубля, та же ссылка, что зашита в картинку
const PAYMENT_LINK = 'https://qr.nspk.ru/BS2A005F5Q57N1GT93UB1OOEPFIGIVDE'

// На телефоне свой экран не отсканировать, поэтому там главная кнопка открывает
// приложение банка, а QR остаётся для оплаты с другого устройства
const isTouchDevice = typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches

watch(
    () => visible.value,
    (isVisible) => {
        if (isVisible) {
            const browserScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = browserScrollbarWidth + 'px';

            const url = getPageUrl();
            sendMetrikaEvent('form_open', {form: 'digital-ruble', url});
        } else {
            document.body.style.paddingRight = '';
            document.body.style.overflow = '';
        }
    }
)
</script>

<template>
    <transition name="fade">
        <BaseModal v-if="visible" modal-id="digital_ruble_payment" @closeModal="visible = false">
            <template #body>
                <div class="ruble">
                    <div class="text-xl font-bold md:text-2xl">
                        Оплата цифровым рублём
                    </div>

                    <template v-if="isTouchDevice">
                        <BaseButton as="link" :href="PAYMENT_LINK" size="large" class="w-full" data-id="modal_digital_ruble_open_bank_link">
                            Открыть приложение банка
                        </BaseButton>

                        <p class="ruble__hint">
                            Выберите свой банк и подтвердите оплату в приложении
                        </p>

                        <img :src="qrImage" alt="QR-код для оплаты цифровым рублём" class="ruble__code ruble__code_small">

                        <p class="ruble__note">
                            Оплачиваете с другого устройства? Отсканируйте QR-код
                        </p>
                    </template>

                    <template v-else>
                        <img :src="qrImage" alt="QR-код для оплаты цифровым рублём" class="ruble__code">

                        <p class="ruble__hint">
                            Отсканируйте код камерой телефона или в приложении вашего банка
                        </p>
                    </template>

                    <dl class="ruble__purpose">
                        <dt>Назначение платежа:</dt>
                        <dd>укажите ФИО, номер КД</dd>
                    </dl>

                    <BaseButton
                        :class="isTouchDevice ? 'w-full' : 'button button_blue'"
                        :severity="isTouchDevice ? 'secondary' : 'primary'"
                        :size="isTouchDevice ? 'large' : 'medium'"
                        @click="visible = false"
                        data-id="btn_close_digital_ruble_payment_modal"
                    >
                        Закрыть
                    </BaseButton>
                </div>
            </template>
        </BaseModal>
    </transition>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.ruble {
    @apply flex flex-col items-center gap-4 text-center;

    &__code {
        @apply w-full max-w-[260px] rounded-lg bg-white;

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

    &__purpose {
        @apply flex flex-wrap justify-center gap-x-1.5 text-base md:text-lg;

        dt {
            @apply font-semibold;
        }
    }
}
</style>
