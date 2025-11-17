<script setup>
import { ref } from 'vue';
import BaseBreadcrumb from "@/blocks/BaseBreadcrumb.vue";
import IntroBlock from "@/blocks/IntroBlock.vue";
import ModalForm from '@/layouts/ModalForm.vue';

const modalVisible = ref(false)
</script>

<template>
    <section class="section">
        <div class="custom-container">
            <IntroBlock>
                <template v-slot:content>
                    <div class="intro-content">
                        <BaseBreadcrumb class="breadcrumb" />
                        <h1 class="intro-content__title">ООО ПКО «Форвард»</h1>
                        <h3 class="intro-content__subtitle">
                            Коллекторское агентство, осуществляющее деятельность по
                            возврату просроченной задолженности в качестве основного
                            вида деятельности.
                        </h3>
                        <p class="intro-content__text">
                            Компания действует в соответствии с действующим
                            законодательством и договорами, заключенными с
                            кредитными и иными организациями.
                        </p>
                        <a href="#" class="button button_blue intro-content__button"
                            @click="modalVisible = true">
                            Получить консультацию
                        </a>
                    </div>
                </template>
                <template v-slot:img>
                    <div class="intro__img">
                        <img src="/images/blocks/about/intro/01.png" alt="" />
                    </div>
                </template>
            </IntroBlock>
        </div>
    </section>
    <ModalForm v-model="modalVisible" />
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

section {
    background-color: var.$gray-light;
}

.container {
    min-height: 560px;
}

.breadcrumb {
    font-weight: 400;
    font-size: 14px;
    line-height: 143%;
    color: var.$gray-dark;
    margin-bottom: 30px;
}

.intro {
    &__img {
        width: 50%;
        height: 560px;
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
        &__button {
            min-width: 200px;
            width: fit-content;
        }
    }
}

@include mixin.desktop {
    .intro {
        &__img {
            width: 65%;
        }

        &-content {
            &__subtitle {
                font-size: 16px;
                margin-bottom: 20px;
            }

            &__text {
                font-size: 14px;
                line-height: 214%;
            }
        }
    }
}

@include mixin.laptop {
    .intro {
        &__img {
            padding: 80px 0 60px;
            width: 50%;

            img {
                object-position: top;
            }
        }

        &-content {
            &__title {
                margin-bottom: 15px;
            }
        }
    }
}

@include mixin.tablet {
    .intro {
        &__img {
            width: 100%;
            padding-top: 0;
            height: 305px;

            img {
                object-position: center;
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
                line-height: 171%;
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
