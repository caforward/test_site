<script setup>
import { ref, watch } from 'vue';
import Button from 'primevue/button';
import Rating from 'primevue/rating';
import BaseInput from '../blocks/ui/BaseInput.vue';
import BaseButton from '../blocks/ui/BaseButton.vue';

const emit = defineEmits(['closeParentModal', 'sendRating'])

// models
const visible = defineModel('visible')
const status = defineModel('status')

// props
const props = defineProps({
    isModal: {
        type: Boolean,
        default: false,
    }
})

// variables
const rating = ref(null)
const ratingMessage = ref('')
const ratingVisible = ref(true)

// functions
function showStatus() {
    console.log(status.value)
}

function closeOverlay() {
    visible.value = false
    status.value = null
}

function closeModal() {
    closeOverlay()
    emit('closeParentModal')
}

function sendRating() {
    ratingVisible.value = false

    emit('sendRating', {
        rateValue: rating,
        rateMessage: ratingMessage
    })
}
</script>

<template>
    <transition name="fade">
        <div v-if="visible"
            :class="['overlay', 'text-slate-900', isModal ? 'min-h-96' : 'px-6 py-4 absolute top-0 left-0']">
            <span v-if="status === null" class="icon">
                <i class="pi pi-spin pi-spinner !text-8xl text-sky-600"></i>
            </span>

            <div v-else class="flex flex-col items-center gap-4 w-full">
                <div v-if="status.ok" class="flex flex-col items-center w-full">
                    <span class="border-8 border-sky-600 rounded-full flex items-center justify-center w-24 h-24 mb-6">
                        <i class="pi pi-check text-sky-600 !font-bold !text-6xl"></i>
                    </span>
                    <div class="flex flex-col gap-1 items-center mb-6">
                        <div class="font-bold text-2xl">
                            Спасибо!
                        </div>
                        <p class="text-xl text-center">
                            Ваше обращение отправлено.
                        </p>
                    </div>
                    <transition name="rating-animation">
                        <form v-if="ratingVisible" class="flex flex-col items-center w-full mb-4">
                            <Rating v-model="rating" :stars="5" class="mb-2" />

                            <transition name="fade-feedback">
                                <BaseInput v-if="rating && rating < 5" v-model="ratingMessage" class="w-full max-w-96"
                                    type="textarea" name="message" placeholder="Напишите, что бы мы могли улучшить"
                                    style="will-change: auto;" />
                            </transition>

                            <transition name="fade">
                                <a v-if="rating" href="#" @click.prevent="sendRating">
                                    Подтвердить
                                </a>
                            </transition>
                        </form>
                    </transition>

                    <div class="flex gap-4">
                        <BaseButton v-if="!isModal" size="large" @click="closeModal">
                            Вернуться на страницу
                        </BaseButton>

                        <BaseButton v-else as="router-link" to="/" severity="secondary" size="large"
                            @click="closeModal">
                            Вернуться на страницу
                        </BaseButton>
                    </div>
                </div>

                <div v-else-if="!status.ok" class="flex flex-col items-center">
                    <span class="icon mb-6">
                        <i class="pi pi-times-circle !text-8xl text-red-400"></i>
                    </span>
                    <div class="flex flex-col gap-1 items-center mb-6">
                        <div class="font-bold text-2xl">
                            Ошибка
                        </div>
                        <p class="text-xl text-center">
                            Кажется что-то пошло не так, попробуйте<br> отправить обращение ещё раз.
                        </p>
                    </div>
                    <div class="flex gap-4 flex-wrap max-sm:justify-center">
                        <template v-if="!isModal">
                            <BaseButton size="large" severity="secondary" @click="closeModal">
                                Вернуться на страницу
                            </BaseButton>

                            <BaseButton size="large" @click="closeOverlay">
                                <div class="flex items-center gap-2">
                                    <span>
                                        К форме
                                    </span>
                                    <i class="pi pi-arrow-right"></i>
                                </div>
                            </BaseButton>
                        </template>

                        <template v-else>
                            <BaseButton as="router-link" to="/" severity="secondary" size="large" @click="closeModal">
                                Вернуться на главную
                            </BaseButton>

                            <BaseButton size="large" @click="closeModal">
                                <div class="flex items-center gap-2">
                                    <span>
                                        К форме
                                    </span>
                                    <i class="pi pi-arrow-right"></i>
                                </div>
                            </BaseButton>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

.fade-enter-active,
.fade-leave-active {
    transition: opacity .4s ease;
    overflow: hidden;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.rating-animation-enter-active,
.rating-animation-leave-active {
    transition: opacity .4s ease, margin-bottom .4s, max-height .4s;
    max-height: 195px;
    overflow: hidden;
}

.rating-animation-enter-from,
.rating-animation-leave-to {
    opacity: 0;
    max-height: 0;
    margin-bottom: 0;
}

.fade-feedback-enter-active,
.fade-feedback-leave-active {
    transition: opacity .4s ease, height .4s;
    height: 112px;
    overflow: hidden;
}

.fade-feedback-enter-from,
.fade-feedback-leave-to {
    opacity: 0;
    height: 0;
    overflow: hidden;
}

.overlay {
    // position: absolute;
    // top: 0;
    // left: 0;

    width: 100%;
    height: 100%;
    justify-content: center;
    background-color: #fff;
    border-radius: 30px;
    z-index: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>