<script setup>
import Button from 'primevue/button';
import { watch } from 'vue';

const emit = defineEmits(['closeParentModal'])

const visible = defineModel('visible')
const status = defineModel('status')

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
</script>

<template>
    <transition name="fade">
        <div v-if="visible" class="overlay text-slate-900 flex flex-col items-center">
            <span v-if="status === null" class="icon">
                <i class="pi pi-spin pi-spinner !text-8xl text-sky-600"></i>
            </span>

            <div v-else class="flex flex-col items-center gap-4">
                <div v-if="status.ok" class="flex flex-col gap-4 items-center">
                    <span class="icon">
                        <i class="pi pi-check-circle !text-8xl text-sky-600"></i>
                    </span>
                    <div class="flex flex-col gap-1 items-center">
                        <div class="font-bold text-2xl">
                            Спасибо!
                        </div>
                        <p class="text-xl">
                            Ваше обращение отправлено.
                        </p>
                    </div>
                </div>

                <div v-else-if="!status.ok" class="flex flex-col gap-6 items-center">
                    <span class="icon">
                        <i class="pi pi-times-circle !text-8xl text-red-400"></i>
                    </span>
                    <div class="flex flex-col gap-1 items-center">
                        <div class="font-bold text-2xl">
                            Ошибка
                        </div>
                        <p class="text-xl text-center">
                            Кажется что-то пошло не так, попробуйте<br> отправить обращение ещё раз.
                        </p>
                    </div>
                </div>

                <div class="flex gap-4">
                    <Button label="Вернуться на страницу" size="large" severity="secondary" @click="closeModal" />
                    <Button label="К форме" size="large" icon="pi pi-arrow-right" iconPos="right" @click="closeOverlay" />
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    background-color: #fff;
    border-radius: 30px;
    z-index: 1;
}
</style>