<script setup>
import { watch, ref } from 'vue'
import BaseModal from '../blocks/BaseModal.vue';
import BaseButton from '../blocks/ui/BaseButton.vue';

const visible = defineModel()
const moreInfo = ref(false);
const showQR = ref(false);

function toggleInfo() {
    moreInfo.value = !moreInfo.value;

    if (!moreInfo.value) {
        showQR.value = false;
    }
}

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
        <BaseModal id="requisites" v-if="visible">
            <div class="modal-body">
                <div class="close-button" @click="visible = false">
                    <i class="pi pi-times !text-xl"></i>
                </div>
                <h2 class="mb-2">
                    Реквизиты для оплаты
                </h2>
                <div class="text-lg font-bold flex flex-col items-center mb-2 text-stone-700">
                    <span>
                        Перейти к оплате
                    </span>
                    <img class="w-64" src="/images/qr-less.png" alt="">
                </div>
                <div class="modal-body-content">
                    <ul class="modal-body-content__list">
                        <li>
                            ИНН:
                        </li>
                        <li>
                            5406796664
                        </li>
                        <li>
                            КПП:
                        </li>
                        <li>
                            540701001
                        </li>
                        <li class="mb-0">
                            Назначение платежа:
                        </li>
                        <li class="mb-0">
                            укажите ФИО , номер КД
                        </li>
                    </ul>
                    <ul v-show="moreInfo" class="modal-body-content__list">
                        <li>
                            Получатель:
                        </li>
                        <li>
                            ООО ПКО "Форвард"
                        </li>
                        <li>
                            Счет получателя:
                        </li>
                        <li>
                            40702810212000116303
                        </li>
                        <li>
                            БИК:
                        </li>
                        <li>
                            045004861
                        </li>
                        <li>
                            Наименование банка:
                        </li>
                        <li>
                            АО «Экспобанк» в г. Новосибирске
                        </li>
                        <li>
                            Корреспондентский счет:
                        </li>
                        <li>
                            30101810450040000861
                        </li>
                    </ul>
                    <div v-if="moreInfo" class="px-1 py-2 text-center text-sky-500 transition-colors hover:text-cyan-400 hover:cursor-pointer"
                        @click="showQR = !showQR">
                        <span v-if="!showQR">
                            Оплатить в приложении банка
                        </span>
                    </div>
                    <div v-if="showQR" class="modal-body-content__qr">
                        <div>
                            Оплата через приложение банка
                        </div>
                        <div>
                            <img src="/images/QR-code.png" alt="">
                        </div>
                    </div>
                    <div class="px-1 py-2 text-center text-sky-500 transition-colors hover:text-cyan-400 hover:cursor-pointer"
                        @click="toggleInfo">
                        <span v-if="moreInfo">
                            Скрыть
                        </span>
                        <span v-else>
                            Показать полные реквизиты
                        </span>
                    </div>
                    <div class="flex justify-center mt-6">
                        <BaseButton as="link" to="#payment" size="large" @click="visible = false">
                            К оплате
                        </BaseButton>
                    </div>
                </div>
            </div>
        </BaseModal>
    </transition>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/mixins.scss' as mixin;

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
    justify-content: center;
    align-items: flex-start;
    padding: 10px;
    display: flex;
    justify-content: center;
    overflow-y: auto;

    &-body {
        position: relative;
        padding: 40px;
        background-color: #fff;
        border-radius: 30px;
        width: 500px;
        padding: 40px;

        &-content {
            &__list {
                display: flex;
                flex-wrap: wrap;
                font-weight: 600;

                &:last-child {
                    margin-bottom: 20px;
                }

                &>:nth-child(2n) {
                    font-weight: 400;
                }

                &>* {
                    width: 50%;
                    margin-bottom: 20px;
                }
            }

            &__qr {
                display: flex;
                align-items: center;
                flex-direction: column;

                img {
                    width: 250px;
                    height: 250px;
                }
            }
        }
    }
}

.close-button {
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

@include mixin.mobile {
    .modal {
        &-body {
            padding: 30px 20px;

            &-content {
                &__list {
                    font-size: 14px;
                    font-weight: bold;

                    &>* {
                        width: 100%;
                        margin-bottom: 10px;
                    }

                    &>:nth-child(2n) {
                        font-weight: 400;
                    }
                }
            }
        }
    }
}
</style>