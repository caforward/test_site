<template>
    <transition name="fade">
        <Modal v-if="visible">
            <div class="modal-body">
                <div class="modal__close" @click="closeModal">
                    <img src="/assets/images/close_x/Vector.png" alt="krestik" />
                </div>
                <div class="modal__title">
                    Спасибо!
                </div>
                <p class="modal__text">
                    Мы скоро свяжемся с Вами
                </p>
            </div>
        </Modal>
    </transition>
</template>

<script>
import Modal from '../blocks/Modal.vue'

export default {
    name: "ModalThank",
    components: {
        Modal
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        closeModal() {
            this.$emit('close')
        }
    },
    watch: {
        visible: {
            handler(value) {
                if (value) {
                    document.body.style.overflow = 'hidden'
                    document.body.style.paddingRight = '10px'
                } else {
                    document.body.style.paddingRight = ''
                    document.body.style.overflow = ''
                }
            },
            immediate: true
        }
    },
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.modal {
    display: flex;
    align-items: center;

    &-body {
        position: relative;
        border-radius: 30px;
        background-color: #fff;
        padding: 30px;
        width: 100%;
        max-width: 600px;
        text-align: center;
        margin: 0 auto;
    }

    &__title {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 15px;
    }

    &__text {}

    &__close {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
    }
}
</style>