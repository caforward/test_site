<script setup>
import PayForm from '@/blocks/PayForm.vue';
import BaseButton from '@/blocks/ui/BaseButton.vue';
</script>

<template>
    <section class="payment">
        <div id="payment" class="custom-container">
            <div class="heading-2 mb-6">
                Попрощайтесь с долгами онлайн <br> на своих условиях
            </div>
            <div class="payment__blocks">
                <div class="payment-block">
                    <h3 class="payment-block__title">
                        Оплатите задолженность онлайн!
                    </h3>
                    <p class="payment-block__text mb-6 font-medium">
                        С ООО ПКО «Форвард» вы можете легко оплатить задолженность онлайн и 
                        <span class="text-sky-500">без дополнительных комиссий!</span>
                        Вам не нужно никуда идти, поэтому
                        погашение вашего долга будет максимально безопасным.
                    </p>
                    <p class="mb-6">
                        Заполните необходимые поля:
                    </p>

                    <PayForm />
                </div>
                <div class="payment-block payment-block_right relative">
                    <div>
                        <h3 class="payment-block__title">
                            Рассчитать график платежей
                        </h3>
                        <p class="text-body mb-5">
                            Воспользуйтесь этой формой, чтобы рассчитать удобный для вас график платежей. Сделать это
                            легко:
                            просто выберите сумму вашего долга, настройте срок погашения – и вы увидите, каким будет
                            ежемесячный платеж. Если сумма вас устраивает, то следующий ваш шаг – звонок нам, чтобы
                            обсудить
                            детали, заключить договор и получить скидку на ваш долг!
                        </p>

                        <BaseButton as="router-link" to="/installment-plan" severity="secondary" size="large" class="hover:!bg-slate-300">
                            Раcсчитать график платежей
                        </BaseButton>
                    </div>

                    <div class="payment__img">
                        <img src="/images/blocks/partners/intro/01.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

.payment {
    padding: 60px 0;
    background-color: #F9FAFB;

    &__title {
        font-size: 36px;
        margin-bottom: 30px;
    }

    &__blocks {
        display: flex;
        gap: 30px;
    }

    &-block {
        padding: 50px 65px;
        background: white;
        border-radius: 30px;
        box-shadow: 0 15px 30px 0 rgba(0, 150, 216, 0.05);
        width: 50%;

        &_right {
            background: #E2E8F0;
        }

        &__title {
            font-size: 28px;
            font-weight: 500;
            line-height: 32px;
            margin-bottom: 15px;
        }

        &__text {
            font-size: 16px;
            line-height: 24px;
        }
    }

    &__img {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;

        img {
            max-width: 420px;
        }
    }
}

@include mixin.desktopXl {
    .payment {
        &-block {
            padding: 45px 60px;
        }
    }
}

@include mixin.desktop {
    .payment {
        &__title {
            font-size: 30px;
        }

        &__blocks {
            flex-direction: column;
        }

        &-block {
            padding: 40px 50px;
            width: 100%;

            &__title {
                font-size: 22px;
                line-height: 28px;
            }
        }

        &__img {
            position: relative;
            margin-bottom: -40px;

            img {
                max-width: 300px;
            }
        }
    }
}

@include mixin.laptop {
    .payment {
        padding: 40px 0 40px;

        &__blocks {
            gap: 20px;
        }

        &-block {
            width: 100%;
        }
    }
}

@include mixin.tablet {
    .payment {
        &__title {
            font-size: 24px;
        }

        &-block {
            padding: 30px;
        }

        &__img {
            margin-bottom: -30px;
        }
    }
}

@include mixin.mobileS {
    .payment {
        &__blocks {
            gap: 0;
        }

        &-block {
            border-radius: 0;
            padding: 25px 15px;
            margin: 0 -15px;
            width: unset;
        }

        &__img {
            margin-bottom: -25px;
        }
    }
}
</style>