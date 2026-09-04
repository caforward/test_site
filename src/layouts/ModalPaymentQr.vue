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

watch(visible, (newVal) => {
    // Метрика
    if (newVal) {
        const url = window.location.href.split('#')[0]
        sendMetrikaEvent('modal_open', {id: 'sbp_payment', url})
    }
})
</script>

<template>
    <BaseModal v-if="visible" @closeModal="visible = false">
        <template #body>
            <div class="qr">
                <div class="text-xl font-bold md:text-2xl">
                    Оплата через СБП
                </div>

                <div v-if="amount" class="qr__amount">
                    {{ amount }} ₽
                </div>

                <img v-if="image" :src="image" alt="QR-код для оплаты через СБП" class="qr__code">

                <p class="qr__hint">
                    Отсканируйте код камерой телефона или в приложении вашего банка
                </p>

                <a v-if="link" :href="link" class="link underline">
                    Открыть в приложении банка
                </a>

                <BaseButton class="button button_blue" @click="visible = false">
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
    }

    &__hint {
        @apply text-base md:text-lg;
    }
}
</style>
