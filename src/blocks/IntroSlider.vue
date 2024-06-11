<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";

const imagesPath = "assets/images/"
let swiperRef = ref(null)

function setSwiperRef(swiper) {
    swiperRef = swiper
    return swiperRef
}

const sliderOptions = {
    modules: [Autoplay, Pagination],
    loop: true,
    pagination: {
        enabled: true,
        el: '.pagination'
    },
    autoplay: true
}

const sliderData = [
    {
        id: 0,
        img: "introSlider/03.jpg",
        title: "Платите столько, сколько можете",
        content:
            `
            <p>
                                    <b>
                                        Всем новым клиентам мы предлагаем погашение задолженности на выгодных условиях:
                                    </b>
                                </p>
                                <ol class="list">
                                    <li>
                                        Мы снизим/уменьшим значительную часть Вашей задолженности
                                    </li>
                                    <li>
                                        Мы предложим Вам длительную рассрочку
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
            `,
    },
    {
        id: 1,
        img: "introSlider/02.jpg",
        title: "Отзовем исполнительное производство",
        content:
            `
            <p>
                text
            </p>
            <p>
                <b>
                    text
                </b>
            </p>
            `,
    },
    {
        id: 2,
        img: "introSlider/01.jpg",
        title: "Улучшите свою кредитную историю",
        content:
            `
            <p>
                text
            </p>
            <p>
                <b>
                    text
                </b>
            </p>
            `,
    },
]
</script>

<template>
    <div class="slider__wrapper">
        <Swiper :onSwiper="setSwiperRef" :modules="[Pagination]" :loop="true" :autoplay="false" :slides-per-view="1"
            :pagination="{ enabled: true, el: '.slider-nav__pagination' }">
            <SwiperSlide v-for="slide in sliderData" :key="slide.id" class="slider-slide">
                <div class="slider-slide__inner">
                    <div class="container">
                        <div class="slider-slide__img">
                            <img :src="imagesPath + slide.img" :alt="slide.title">
                        </div>
                        <div class="slider-slide-content">
                            <h2 class="slider-slide-content__title">
                                {{ slide.title }}
                            </h2>
                            <div class="slider-slide-content__text" v-html="slide.content"></div>
                            <div class="slider-slide-content__buttons">
                                <button class="button button_blue slide__button" @click.stop="showModal($event)">
                                    Получить консультацию
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>

        <!-- Навигация -->
        <div class="slider-nav__wrapper">
            <div class="container">
                <div class="slider-nav">
                    <!-- Кнопки -->
                    <div class="slider-nav__buttons">
                        <button class="slider-nav__button slider-nav__button_prev" @click="swiperRef.slidePrev()">
                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M0.259642 0.251051C0.605832 -0.0836838 1.16712 -0.0836838 1.51331 0.251051L6.67545 5.24239C7.10818 5.6608 7.10819 6.33919 6.67545 6.75761L1.51331 11.7489C1.16712 12.0837 0.605832 12.0837 0.259642 11.7489C-0.0865475 11.4142 -0.0865475 10.8715 0.259642 10.5368L4.95166 6L0.259642 1.46323C-0.0865475 1.1285 -0.0865475 0.585786 0.259642 0.251051Z"
                                    fill="white" />
                            </svg>
                        </button>
                        <button class="slider-nav__button slider-nav__button_next" @click="swiperRef.slideNext()">
                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M0.259642 0.251051C0.605832 -0.0836838 1.16712 -0.0836838 1.51331 0.251051L6.67545 5.24239C7.10818 5.6608 7.10819 6.33919 6.67545 6.75761L1.51331 11.7489C1.16712 12.0837 0.605832 12.0837 0.259642 11.7489C-0.0865475 11.4142 -0.0865475 10.8715 0.259642 10.5368L4.95166 6L0.259642 1.46323C-0.0865475 1.1285 -0.0865475 0.585786 0.259642 0.251051Z"
                                    fill="white" />
                            </svg>
                        </button>
                    </div>
                    <!-- <Pagination /> -->
                    <div class="slider-nav__pagination"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "swiper/css/pagination";



.slider {
    &__wrapper {
        position: relative;
        z-index: 1;
    }

    &-slide {
        min-height: 600px;
        height: auto;

        &__inner {
            position: relative;
            height: 100%;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
        }

        &__img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;

            img {
                object-fit: cover;
            }

            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, #e3e6eb 35%, transparent 55%);
            }
        }

        &-content {
            display: flex;
            width: 50%;
            flex-direction: column;
            padding: 40px 0 100px;

            &__title {
                font-size: 48px;
                font-weight: 700;
                line-height: 104%;
                margin-bottom: 20px;
            }

            &__text {
                font-weight: 400;
                font-size: 16px;
                line-height: 175%;

                &>* {
                    margin-bottom: 15px;
                }
            }
        }
    }

    &-nav {
        display: flex;
        align-items: center;
        gap: 10px;

        &__wrapper {
            position: absolute;
            bottom: 35px;
            width: 100%;
            z-index: 1;
        }

        &__buttons {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        &__button {
            border: 2px solid #fff;
            border-radius: 30px;
            width: 40px;
            height: 40px;
            transition: border-color .1s;

            &_prev {
                rotate: 180deg;
            }

            & svg path {
                transition: fill .1s;
            }

            &:hover {
                border-color: $blue;

                & svg path {
                    fill: $blue;
                }
            }
        }

        &__pagination {
            display: flex;
            gap: 5px;

            &>* {
                display: flex;
                background-color: #fff;
                border-radius: 100%;
                width: 7px;
                height: 7px;
                margin: 0;
            }

            &:deep(.swiper-pagination-bullet-active) {
                background: $blue;
            }
        }
    }
}
</style>