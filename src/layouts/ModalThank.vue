<script setup>
import { watch } from 'vue';
import BaseModal from '../blocks/BaseModal.vue'

const visible = defineModel()

watch(
    () => visible.value,
    () => {
        if (visible.value) {
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = '10px'
        } else {
            document.body.style.paddingRight = ''
            document.body.style.overflow = ''
        }
    }
)
</script>

<template>
    <transition name="fade">
        <BaseModal v-if="visible">
            <div class="modal-body">
                <div class="modal__close" @click="visible = false">
                    <img src="/assets/images/close_x/Vector.png" alt="krestik" />
                </div>
                <div class="modal__title">
                    Спасибо!
                </div>
                <p class="modal__text">
                    Мы скоро свяжемся с Вами!
                </p>
            </div>
        </BaseModal>
    </transition>
</template>

<style lang="scss" scoped>
.modal {
    display: flex;
    align-items: center;

    &-body {
        top: 37%;
        position: relative;
        border-radius: 30px;
        background-color: #fff;
        padding: 60px 30px;
        width: 100%;
        max-width: 600px;
        text-align: center;
        margin: 0 auto;
    }

    &__title {
        font-size: 34px;
        color: $blue;
        font-weight: 700;
        margin-bottom: 15px;
    }

    &__text {
        font-size: 18px;
    }

    &__close {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
    }
}
</style>