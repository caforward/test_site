<script setup>
import Button from 'primevue/button';
import PayForm from '../../blocks/PayForm.vue';
import Popover from 'primevue/popover';
import BaseModal from '../../blocks/BaseModal.vue';
import { ref, watch } from 'vue';

const secureTextModal = ref(false)
const securePopover = ref(null)

function toggle(event) {
    if (window.innerWidth > 1023) {
        securePopover.value.toggle(event);
    } else {
        secureTextModal.value = true
    }
}

function scrollToCalc() {
    window.location.href = '/installment-plan#calculate'
}

watch(
    secureTextModal,
    (modalActive) => {
        if (modalActive) {
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = '10px'
        } else {
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
        }
    }
)
</script>

<template>
    <div id="debt-form" class="scroll-fix-offset">
        <section class="section">
            <div class="container">
                <div class="debt-form__inner">
                    <div class="block__left">
                        <div class="title flex gap-2 items-center">
                            <h2 class="">
                                Оплатите задолженность онлайн
                            </h2>
                            <Button type="button" class="flex-none !border-green-500" icon="pi pi-shield text-green-500 !text-xl" label=""
                                rounded outlined @click="toggle" />
                        </div>

                        <!-- Форма оплаты -->
                        <PayForm class="payform" />
                    </div>
                    <div class="block__right">
                        <div class="card">
                            <div class="card__wrapper">
                                <div class="card__title">
                                    Рассчитать график платежей
                                </div>
                                <div class="card__text">
                                    Сделать это легко: просто выберите сумму вашего долга, настройте срок
                                    погашения
                                    – и вы увидите, каким будет ежемесячный платеж.
                                </div>
                                <button @click="scrollToCalc" class="button">
                                    Раcсчитать график платежей
                                </button>
                            </div>
                            <div class="card__img">
                                <img src="/images/offers/calc.png" alt="the was a img">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <transition name="fade">
        <BaseModal v-if="secureTextModal" @closeModal="secureTextModal = false">
            <template #body>
                <div class="mb-4">
                    <span class="text-2xl font-bold">
                        Безопасно
                    </span>
                    <i class="pi pi-shield text-green-400 !text-xl"></i>
                </div>
                <p class="mb-4">
                    Интернет-эквайринг Т-Банка использует технологию 3D-Secure, она повышает безопасность платежей.
                </p>
                <p class="mb-4">
                    3D-Secure помогает магазинам и банкам еще раз удостовериться, что покупку оплачивает владелец карты,
                    а не
                    мошенник.
                </p>
                <p class="mb-4">
                    Обычно покупатель вводит в платежной форме номер карты, срок ее действия и код CVC2.
                    С технологией 3D-Secure после ввода данных карты покупателю нужно дополнительно ввести код из СМС.
                    Этот код
                    отправляет банк, который выпустил карту, и ответственность за отправку лежит на нем.
                </p>

                <Button type="button" size="large" label="Понятно" @click="secureTextModal = false"  />
            </template>
        </BaseModal>
    </transition>
    <Popover ref="securePopover" class="text-sm max-w-[32rem]">
        <p class="mb-4">
            Интернет-эквайринг Т-Банка использует технологию 3D-Secure, она повышает безопасность платежей.
        </p>
        <p class="mb-4">
            3D-Secure помогает магазинам и банкам еще раз удостовериться, что покупку оплачивает владелец карты, а не
            мошенник.
        </p>
        <p>
            Обычно покупатель вводит в платежной форме номер карты, срок ее действия и код CVC2.
            С технологией 3D-Secure после ввода данных карты покупателю нужно дополнительно ввести код из СМС. Этот код
            отправляет банк, который выпустил карту, и ответственность за отправку лежит на нем.
        </p>
    </Popover>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

.payform {
    display: flex;
    flex-direction: column;
    gap: 15px;

    &__meta {
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-size: 14px;
        line-height: 171%;
    }

    &__bottom {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    &__inputs {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
}

:deep(.form-block) {
    padding: 0;
    background-color: transparent;
    border-radius: 0;
    color: var.$black;

    &::before {
        display: none;
    }

    .form-block-meta {
        flex: none;
    }

    .link {
        color: #20afce;
    }

    .input:not([type='checkbox']) {
        background-color: #EAECEE;
        transition: background-color .2s, border-color .2s;

        &.input_valid {
            background-color: transparent;
        }

        &:focus {
            background-color: transparent;
        }
    }

    input[type='checkbox'] {
        border: 1px solid#EAECEE;
    }
}

:deep(.payform) {
    .input {
        background-color: #EAECEE;

        &_valid {
            background-color: transparent;
        }
    }
}

/* Стили для классов транзиций */
.switcher-body-item-leave-active {
    position: absolute;
}

.switcher-body-item-enter-active,
.switcher-body-item-leave-active {
    transition: opacity 0.1s;
}

.switcher-body-item-enter,
.switcher-body-item-leave-to {
    opacity: 0;
}

.scroll-fix-offset {
    margin-top: -128px;
    padding-top: 128px;
}

.section {
    padding: 80px 0 150px;
    background-color: var.$gray-white;
}

.title {
    margin-bottom: 34px;
}

.input {
    background-color: rgba(234, 236, 238, 0.5);
    transition: background-color .2s;

    &:focus {
        background-color: #fff;
    }
}

.link {
    text-decoration: underline;
    color: var.$blue;

    &:hover {
        color: var.$blue-light;
    }

    &:active {
        color: #00b3ff;
    }

    &_phone {
        display: block;
        font-weight: 700;
        text-decoration: none;
    }
}

.debt-form {
    &__inner {
        display: flex;
        gap: 30px;

        &>* {
            width: 50%;
        }
    }
}

.switcher {
    &-body {
        position: relative;

        &__wrapper {
            display: flex;
            gap: 30px;

            &>* {
                width: 50%;
            }
        }

        &__tab {}
    }

    &__tabs {
        display: flex;
        border-bottom: 1px solid #e3e6e8;
        margin-bottom: 50px;
    }

    &-tab {
        font-size: 18px;
        line-height: 133%;
        padding: 0 30px;
        height: 55px;
        border-radius: 15px 15px 0 0;
        border: 1px solid #e3e6e8;
        border-bottom: none;
        background-color: #fff;


        &_active {
            background-color: var.$blue-light;
            border-color: var.$blue-light;
            color: #fff;
        }
    }

    &__steps {
        display: flex;
        gap: 10px;
        justify-content: space-between;
        margin-bottom: 50px;
    }

    &-step {
        display: flex;
        align-items: center;

        &_active {
            & .switcher-step__number {
                background-color: var.$blue-light;
                color: #fff;
            }
        }

        &__text {
            text-align: left;
            font-weight: 500;
            font-size: 16px;
            line-height: 187%;
            color: #000;
        }

        &__number {
            flex: none;
            margin-right: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 100%;
            width: 50px;
            height: 50px;
            font-weight: 500;
            font-size: 24px;
            line-height: 125%;
            color: #d9d9d9;
            background-color: #f2f3f5;

            transition: color .2s, background-color .2s;
        }
    }

    &-progressbar {
        width: 100%;
        height: 6px;
        background-color: #eceef0;
        margin-bottom: 40px;
        border-radius: 5px;
        overflow: hidden;

        &__thumb {
            display: block;
            width: 0%;
            height: 100%;
            border-radius: 5px;
            background-color: var.$blue-light;
            transition: width .3s;
        }
    }
}

.form {
    &__title {
        line-height: 187%;
        color: #000;
        margin-bottom: 30px;
    }

    &__inputs {
        margin-bottom: 30px;

        &>* {
            &:not(:last-child) {
                margin-bottom: 20px;
            }
        }
    }

    &-submit {
        max-width: 315px;
        width: 100%;
        margin-bottom: 35px;
    }

    &-bottom {
        display: flex;
        align-items: center;
        gap: 30px;

        &__metatext {
            width: 70%;
            font-size: 14px;
            line-height: 171%;
            color: #2e2e2e;
        }

        &__button {
            flex: none;
            min-width: 200px;
        }
    }

    &-data {
        margin-bottom: 35px;

        &__payment {
            margin-bottom: 25px;
        }

        &__title {
            line-height: 187%;
        }

        &__amount {
            font-weight: 700;
            font-size: 24px;
            line-height: 125%;
        }
    }
}

.block__right {
    padding-left: 115px;

}

.card {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border-radius: 30px;
    box-shadow: 0 15px 30px 0 rgba(0, 150, 216, 0.05);
    background-color: #e2e8f0;
    overflow: hidden;

    &__wrapper {
        padding: 50px 40px 0 40px;
        padding-bottom: 60px;

        & .button {
            line-height: normal;
        }
    }

    &__title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 15px;
    }

    &__text {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 24px;

        &>p {
            margin-bottom: 15px;
        }
    }

    &__img {
        margin-top: auto;
        width: 100%;
        height: 250px;

        img {
            object-position: bottom;
        }
    }
}

@include mixin.desktopXl {
    .section {
        padding-bottom: 120px;
    }

    .switcher {
        &-step {
            &__text {
                font-size: 14px;
            }
        }
    }

    .form {
        &__title {
            font-size: 14px;
            line-height: 171%;
        }

        &-bottom {
            flex-direction: column;
            align-items: start;
            gap: 20px;

            &__metatext {
                width: 100%;
            }
        }
    }

    .block__right {
        padding: 0;
    }

    .card {
        &__title {
            font-size: 16px;
        }

        &__text {
            font-size: 14px;
            margin-bottom: 20px;
        }
    }
}

@include mixin.laptop {
    .scroll-fix-offset {
        margin-top: -90px;
        padding-top: 90px;
    }

    .section {
        padding: 55px 0 100px;
    }

    .link {
        &_phone {
            display: inline;
        }
    }

    .debt-form {
        &__inner {
            flex-direction: column;

            &>* {
                width: 100%;
            }
        }
    }

    .switcher {
        &-body {
            &__wrapper {}
        }

        &-tab {
            font-size: 16px;
        }

        &-step {
            &__number {
                margin-right: 10px;
            }

            &__text {
                font-size: 13px;
                line-height: 154%;
            }
        }
    }

    .form {
        &__title {
            margin-bottom: 20px;
        }
    }

    .card {
        flex-direction: row;

        &__wrapper {
            width: 50%;
            flex: none;
            padding: 30px;
            padding-right: 0;
        }

        &__img {
            margin-top: unset;
            height: unset;
            min-height: 100%;

            img {
                width: 140%;
                margin-left: 50%;
                transform: translateX(-50%);
            }
        }
    }

    .button {
        padding: 0 10px;
    }
}

@include mixin.desktop {
    .scroll-fix-offset {
        margin-top: -50px;
        padding-top: 50px;
    }
}

@include mixin.tablet {
    .switcher {
        &__tabs {
            margin-bottom: 10px;
        }

        &-tab {
            text-align: left;
            padding: 0 30px;
            font-size: 14px;
            height: 50px;
        }

        &__steps {
            flex-direction: column;
            align-items: start;
            margin-bottom: 10px;
        }

        &-step {
            &__number {
                width: 35px;
                height: 35px;
                font-size: 20px;
            }
        }

        &-progressbar {
            margin-bottom: 20px;
        }
    }

    .form {
        &__title {
            margin-bottom: 15px;
        }

        &__inputs {
            margin-bottom: 20px;
        }

        &-bottom {
            gap: 15px;
        }
    }

    .card {
        flex-direction: column;

        &__wrapper {
            width: 100%;
            padding: 30px;
            padding-bottom: 0;

            & .button {
                width: 100%;
                max-width: 320px;
            }
        }

        &__img {
            height: 210px;

            img {
                width: 150%;
            }
        }
    }
}
</style>