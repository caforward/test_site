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
                        <h1 class="intro-content__title">Партнерам</h1>
                        <h3 class="intro-content__subtitle">
                            ООО ПКО «Форвард» разместило коммерческие облигации бездокументарные с централизованным
                            учетом прав серии КО-П03 на общую сумму 200 млн рублей. Срок обращения облигаций составляет
                            2 года с офертой через один год после даты размещения. 
                        </h3>
                        <p class="intro-content__text">
                            Несмотря на текущую макроэкономическую ситуацию, сделка вызвала интерес у инвесторов, и
                            купонная ставка по итогам размещения составила 10,1% годовых. 
                        </p>
                        <a href="#" class="button button_blue intro-content__button">
                            Стать партнером
                        </a>
                    </div>
                </template>
                <template v-slot:img>
                    <div class="intro__img">
                        <img src="/assets/images/blocks/partners/intro/01.png" alt="" />
                    </div>
                </template>
            </IntroBlock>
        </div>
    </section>
</template>

<style lang="scss" scoped>
section {
    background-color: #e7f9f8;
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

@include desktop {
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

@include laptop {
    .intro {
        &__img {
            padding: 80px 0 60px;
            width: 50%;

            img {
                width: 155%;
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

@include mobile {
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
