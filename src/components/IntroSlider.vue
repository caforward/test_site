<script setup>
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import ModalForm from '../layouts/ModalForm.vue';
import { ref } from 'vue';

const props = defineProps({
    light: {
        type: Boolean,
        default: false
    }
})

const modalVisible = ref(false)
const modalDefaultOption = ref(null)

const modules = [Navigation, Pagination, Autoplay];

function showModal() {
    modalDefaultOption.value = null;
    modalVisible.value = true;
}

function showInstallmentModal() {
    modalDefaultOption.value = 'installment';
    modalVisible.value = true;
}
</script>

<template>
    <section class="intro-slider">
        <div class="slider__inner">
            <swiper class="swiper" :modules="modules" :slides-per-view="1" :speed="700" :loop="true"
                :autoplay="{ delay: 15000 }"
                :navigation="{ nextEl: '.intro-slider-nav-button__next', prevEl: '.intro-slider-nav-button__prev' }"
                :pagination="{ clickable: true, el: '.intro-slider-pagination' }">
                <swiper-slide class="slider__slide slider__slide_fix">
                    <div class="custom-container">
                        <div class="slide-content">
                            <div class="slide-content__title">
                                Избавьтесь от <br> задолженности с нами!
                            </div>
                            <div class="slide-content__text">
                                <p>
                                    <b>
                                        Всем новым клиентам мы предлагаем скидки и рефинансирование на выгодных условиях
                                    </b>
                                </p>
                                <ol class="list">
                                    <li>
                                        Мы простим Вам <b>5%</b> от суммы долга сразу же после заполнения формы
                                        получения рассрочки
                                    </li>
                                    <li>
                                        Мы согласуем с Вами ежемесячный платеж, который будет удобен именно Вам и не
                                        обременителен для Вашего бюджета
                                    </li>
                                    <li>
                                        Мы передадим данные о погашении долга в Бюро кредитных историй
                                    </li>
                                </ol>
                                <p>
                                    <b>
                                        Чтобы воспользоваться предложением, свяжитесь с нами, по телефону горячей линии
                                        <a href="tel:88043334133" class="link">8 804 333 4133</a>
                                        <br> или направьте нам обращение по форме ниже.
                                    </b>
                                </p>
                            </div>
                            <div class="slide-content__buttons">
                                <a href="#" class="button button_blue slide__button"
                                    @click.prevent="showInstallmentModal">
                                    Получить рассрочку
                                </a>
                            </div>
                        </div>
                        <div class="slide__img">
                            <img :src='"/images/" + "introSlider/03.jpg"' alt="" />
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="slider__slide">
                    <div class="custom-container">
                        <div class="slide-content">
                            <div class="slide-content__title">
                                Платите столько, <br> сколько можете
                            </div>
                            <div class="slide-content__text">
                                <p>
                                    Сумма платежа рассчитывается таким образом, что
                                    остается комфортной для Вас! С нами Вы забудете
                                    что когда-то весь Ваш доход уходил на погашение задолженности.
                                </p>
                                <p>
                                    Наши специалисты помогут подобрать ту
                                    сумму, которую Вам будет комфортно вносить
                                    для погашения задолженности без ущерба для вашего бюджета.
                                    <br>
                                    Минимальный платеж - 1500 рублей в месяц.

                                </p>
                            </div>
                            <div class="slide-content__buttons">
                                <a href="#" class="button button_blue slide__button" @click.prevent="showModal">
                                    Получить консультацию
                                </a>
                            </div>
                        </div>
                        <div class="slide__img">
                            <img :src='"/images/" + "introSlider/01.jpg"' alt="There was img" />
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="slider__slide">
                    <div class="custom-container">
                        <div class="slide-content">
                            <div class="slide-content__title">
                                Улучшите свою <br> кредитную историю
                            </div>
                            <div class="slide-content__text">
                                <p>
                                    Сотрудничество с нами – это реальная возможность не только погасить
                                    задолженность, но и улучшить свою кредитную историю быстро и эффективно. Если
                                    Вы начинаете платить по составленному специально для вас графику, мы готовы
                                    заключить мировое соглашение на любой стадии производства по делу.

                                </p>
                                <p>
                                    Таким образом Вы сможете списать до 20% от общей суммы, а по
                                    окончании выплат получаете полный набор документов, включая справку о погашении
                                    задолженности.

                                </p>
                            </div>
                            <div class="slide-content__buttons">
                                <a href="#" class="button button_blue slide__button" @click.stop="showModal">
                                    Получить консультацию
                                </a>
                            </div>
                        </div>
                        <div class="slide__img">
                            <img :src="'/images/' + 'introSlider/02.jpg'
                                " alt="" />
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
            <div class="slider-nav__wrapper">
                <div class="custom-container">
                    <div class="slider-nav flex items-center">
                        <button
                            class="slider-nav-button intro-slider-nav-button__prev flex flex-none items-center justify-center border-2 border-white text-white rounded-full w-10 h-10 transition-colors hover:border-sky-500 hover:text-sky-500">
                            <i class="pi pi-angle-left !text-xl"></i>
                        </button>

                        <button
                            class="slider-nav-button intro-slider-nav-button__next flex flex-none items-center justify-center border-2 border-white text-white rounded-full w-10 h-10 transition-colors hover:border-sky-500 hover:text-sky-500">
                            <i class="pi pi-angle-right !text-xl"></i>
                        </button>
                        <!-- <Pagination /> -->
                        <div class="intro-slider-pagination"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <ModalForm v-model="modalVisible" :type="modalDefaultOption" />
</template>

<style lang="scss">
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

@use 'swiper/css';
@use 'swiper/css/navigation';
@use 'swiper/css/pagination';
@use 'swiper/css/scrollbar';

.intro-slider {
    margin-top: -80px;

    &-pagination {
        .swiper-pagination-bullet {
            margin: 0 2px !important;
            width: 6px;
            height: 6px;
            opacity: 1;
            background-color: var.$white;

            &-active {
                background-color: var.$blue;
            }
        }
    }

    .list {
        &>li {
            line-height: 140%;
            margin-bottom: 10px;
            font-weight: 500;

            b {
                color: var.$blue;
            }
        }
    }

    .slider {
        &__inner {
            position: relative;
            overflow: hidden;
            background-color: #eaecee;
        }

        &__container {
            display: flex;
            flex-wrap: nowrap;
            transition: transform 0.2s;
        }

        &__slide {
            padding-top: 130px;
            padding-bottom: 100px;
            height: 800px;
            display: flex;
            align-items: center;

            position: relative;
            z-index: 1;
            min-width: 100%;
        }

        &-nav {
            display: flex;
            gap: 10px;

            &__wrapper {
                position: absolute;
                bottom: 30px;
                width: 100%;
                z-index: 1;
            }
        }
    }

    .slide {
        &__img {
            position: absolute;
            top: 17px;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background-color: var.$white-blue;

            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, #e3e6eb 30%, transparent 50%)
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        &-content {

            &__title {
                font-weight: 700;
                font-size: 48px;
                line-height: 104%;
                margin-bottom: 22px;
            }

            &__text {
                width: 540px;
                font-size: 16px;
                line-height: 175%;
                margin-bottom: 33px;

                p:not(:last-child) {
                    margin-bottom: 15px;
                }
            }

            &__buttons {
                display: flex;

                &>*:not(:last-child) {
                    margin-right: 30px;
                }
            }
        }
    }
}

@include mixin.desktop {
    .intro-slider {
        .slider {
            &__slide {
                // height: 750px;
            }

            &-nav {
                &__wrapper {
                    bottom: 30px;
                }
            }
        }

        .slide {
            &__img {
                img {
                    object-position: 47%;
                }

                &::before {
                    background: linear-gradient(90deg, #e3e6eb 30%, transparent 70%)
                }
            }

            &-content {
                &__title {
                    font-size: 44px;
                }

                &__text {
                    width: 363px;
                    font-size: 14px;
                }

                &__buttons {
                    &>*:not(:last-child) {
                        margin-right: 15px;
                    }
                }
            }
        }
    }
}

@include mixin.laptop {
    .intro-slider {
        margin-top: -80px;

        .slider {
            &__slide {
                padding-top: 120px;
                height: 750px;

                &_fix {
                    padding-top: 100px;
                }
            }
        }

        .slide {
            &__img {
                img {
                    object-position: 54%;
                }

                &::before {
                    background: linear-gradient(90deg, #e3e6eb 30%, transparent 80%)
                }
            }

            &-content {
                &__title {
                    font-size: 30px;
                    margin-bottom: 10px;
                }

                &__text {
                    // width: 279px;
                    width: 450px;
                    line-height: 171%;
                    margin-bottom: 25px;
                }
            }
        }
    }
}

@include mixin.tablet {
    .intro-slider {

        .slider {
            &__slide {
                align-items: start;
                height: unset;
                padding-bottom: 240px;

                &_fix {
                    padding-top: 120px;
                }
            }

            &-nav {
                &__wrapper {
                    bottom: 20px;
                }
            }
        }

        .slide {
            &__img {
                padding-top: 190px;

                img {
                    object-position: 80%;
                }

                &::before {
                    background: transparent
                }
            }

            &-content {
                &__title {
                    margin-bottom: 25px;
                }

                &__text {
                    display: none;
                }

                &__buttons {
                    flex-wrap: wrap;
                    gap: 10px;

                    &>* {
                        width: fit-content;

                        &:not(:last-child) {
                            margin: 0;
                        }
                    }
                }
            }
        }
    }
}

@include mixin.mobile {
    .intro-slider {
        .slide {
            &__img {
                padding-top: 240px;
            }
        }
    }
}

// @include mixin.mobileS {
//     .intro-slider {
//         .slide {
//             &__img {
//                 padding-top: 300px;

//                 img {
//                     object-position: 90%;
//                 }
//             }

//             &-content {
//                 &__title {
//                     font-size: 20px;
//                 }
//             }
//         }
//     }
// }</style>
