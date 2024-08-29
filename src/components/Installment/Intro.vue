<script setup>
import { ref } from 'vue'
import BaseBreadcrumb from "../../blocks/BaseBreadcrumb.vue";
import IntroBlock from "../../blocks/IntroBlock.vue";
import ModalForm from '../../layouts/ModalForm.vue';

const modalVisible = ref(false);

function scrollToCalculate() {
    const element = document.getElementById('calculate');
    element.scrollIntoView()
}
</script>

<template>
    <section class="section">
        <div class="container">
            <IntroBlock>
                <template v-slot:content>
                    <div class="intro-content">
                        <BaseBreadcrumb class="breadcrumb" />
                        <h1 class="intro-content__title">Получить рассрочку</h1>
                        <p class="intro-content__text">
                            Рассрочка платежей – один из вариантов взаимодействия с коллекторами, который может стать
                            для Вас решением даже очень сложной финансовой ситуации. Этот формат подразумевает, что Вы
                            сможете погасить долг частями в установленные сроки
                        </p>
                        <div class="intro-content__buttons">
                            <button class="button button_blue intro-content__button" @click="modalVisible = true">
                                Получить рассрочку
                            </button>
                            <button class="button intro-content__button" :onclick="scrollToCalculate">
                                Раcсчитать график платежей
                            </button>
                        </div>
                    </div>
                </template>
                <template v-slot:img>
                    <div class="intro__img">
                        <img src="/images/blocks/installment/intro/01.png" alt="" />
                    </div>
                </template>
            </IntroBlock>
        </div>
    </section>

    <ModalForm v-model="modalVisible" :type="'installment'" />
</template>

<style lang="scss" scoped>
section {
    background-color: $blue-white;
}

.container {
    min-height: 560px;
}

.breadcrumb {
    font-weight: 400;
    font-size: 14px;
    line-height: 143%;
    color: $gray-dark;
    margin-bottom: 30px;
}

.intro {
    &__img {
        width: 50%;
        height: 560px;

        img {
            object-position: bottom;
        }
    }

    &-content {
        padding: 60px 0 60px;
        width: 50%;

        &__title {
            margin-bottom: 25px;
        }

        &__subtitle {
            font-weight: 600;
            font-size: 18px;
            line-height: 162%;
            margin-bottom: 25px;
        }

        &__text {
            font-size: 16px;
            line-height: 167%;
            margin-bottom: 25px;
        }

        &__buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
            row-gap: 15px;
        }
    }
}

@include desktop {
    .intro {
        &-content {
            &__subtitle {
                font-size: 16px;
                margin-bottom: 20px;
            }

            &__text {
                font-size: 14px;
                line-height: 171%;
            }
        }
    }
}

@include laptop {
    .intro {
        &__img {
            position: relative;

            img {
                position: absolute;
                right: -20%;
                width: 120%;
            }
        }

        &-content {
            &__title {
                margin-bottom: 15px;
            }
        }
    }
}

@include tablet {
    .intro {
        &__img {
            img {
                bottom: -56px;
            }
        }

        &-content {
            padding-bottom: 100px;
        }
    }
}

@include mobile {
    .intro {
        &__img {
            width: 100%;
            padding-top: 0;
            height: 305px;

            img {
                position: static;
                right: 0;
                bottom: 0;
                width: 100%;
            }
        }

        &-content {
            padding-bottom: 0;
            width: 100%;

            &__title {
                margin-bottom: 15px;
            }

            &__subtitle,
            &__text {
                font-size: 14px;
            }

            &__text {
                margin-bottom: 15px;
            }

            &__button {
                width: 100%;
                max-width: 350px;
            }
        }
    }
}
</style>
