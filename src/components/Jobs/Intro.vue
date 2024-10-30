<script setup>
import BaseBreadcrumb from "../../blocks/BaseBreadcrumb.vue";
import IntroBlock from "../../blocks/IntroBlock.vue";
</script>

<template>
    <section class="section">
        <div class="container">
            <IntroBlock>
                <template v-slot:content>
                    <div class="intro-content">
                        <BaseBreadcrumb class="breadcrumb" />
                        <div class="intro-content__wrapper">
                            <h1 class="intro-content__title">
                                Будь в команде мечты Развивайся и покоряй высоты
                            </h1>
                            <p class="intro-content__text">
                                На данный момент в ООО Форвард открыты следующие вакансии. Если вы хотите работать в
                                современной и перспективной финансовой компании – свяжитесь с нами.
                            </p>
                        </div>
                        <!-- <a href="#" class="button button_blue intro-content__button">
                            Смотреть вакансии
                        </a> -->
                    </div>
                </template>
                <template v-slot:img>
                    <div class="intro__img">
                        <img src="/images/jobs/img1.png" alt="" />
                    </div>
                </template>
            </IntroBlock>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

section {
    background-color: #F3F7FA;
}

.container {
    min-height: 560px;
}

.breadcrumb {
    font-weight: 400;
    font-size: 14px;
    line-height: 143%;
    color: var.$gray-dark;
}

.intro {
    &-block {
        height: 560px;

        &>* {
            height: 100%;
        }
    }

    &__img {
        width: 50%;
        position: relative;

        img {
            position: absolute;
            bottom: -1px;
            left: 0;
            height: 100%;
            min-width: 240px;
            object-position: bottom;
        }
    }

    &-content {
        padding: 60px 0 60px;
        width: 50%;

        &__wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
        }

        &__title {
            margin-bottom: 25px;
        }

        &__subtitle {
            font-weight: 600;
            font-size: 18px;
            line-height: 162%;
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

@include mixin.tablet {
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
                width: 130%;
            }
        }

        &-content {
            &__title {
                margin-bottom: 15px;
            }

            &__text {
                line-height: 170%;
            }
        }
    }
}

@include mixin.tablet {
    .intro {
        &-block {
            height: unset;
        }
    }
}

@include mixin.tablet {
    .intro {
        &__img {
            width: 100%;
            padding: 0;
            height: 305px;

            img {
                width: 100%;
                object-position: center bottom;
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
