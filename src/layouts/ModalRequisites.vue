<script setup>
import { watch } from 'vue'
import BaseModal from '../blocks/BaseModal.vue';

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
        <BaseModal id="requisites" v-if="visible">
            <div class="modal-body">
                <div class="close-button" @click="visible = false">
                    <i class="pi pi-times !text-xl"></i>
                </div>
                <h2 class="modal-body__title">
                    Реквизиты для оплаты
                </h2>
                <div class="modal-body-content">
                    <ul class="modal-body-content__list">
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
                        <li>
                            Назначение платежа:
                        </li>
                        <li>
                            укажите ФИО , номер КД
                        </li>
                    </ul>
                    <div class="modal-body-content__qr">
                        <div>
                            Оплата через приложение банка
                        </div>
                        <div>
                            <img src="/images/QR-code.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </BaseModal>
    </transition>
</template>

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

        &__title {
            margin-bottom: 20px;
        }

        &-content {
            &__list {
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 20px;
                font-weight: 600;

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

@include mobile {
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