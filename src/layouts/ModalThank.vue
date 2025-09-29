<script setup>
import { watch } from 'vue';
import BaseModal from '../blocks/BaseModal.vue'
import BaseFormRate from '../blocks/form/BaseFormRate.vue';

const props = defineProps({
    needRate: {
        default: true,
        type: Boolean
    },
    promise: {
        default: null,
        type: Promise
    }
})

const visible = defineModel()

watch(
    () => visible.value,
    () => {
        if (visible.value) {
            const browserScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = browserScrollbarWidth + 'px'
        } else {
            document.body.style.paddingRight = ''
            document.body.style.overflow = ''
        }
    }
)
</script>

<template>
    <transition name="fade">
        <BaseModal v-if="visible" @closeModal="visible = false">
            <template #body>
                <div class="content">
                    <div class="modal__title">
                        Спасибо!
                    </div>
                    <p class="modal__text">
                        Ваше обращение отправлено
                    </p>

                    <BaseFormRate v-if="needRate" @close="visible = false" />

                    <button v-else class="button button_blue" @click="visible = false">
                        Вернуться на сайт
                    </button>
                </div>
            </template>
        </BaseModal>
    </transition>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

:deep(.modal__body) {
    top: 15%;
}

.modal {
    text-align: center;

    .content {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 15px;
    }

    &__title {
        font-size: 34px;
        color: var.$blue;
        font-weight: 700;
    }

    &__text {
        font-size: 21px;
    }
}
</style>