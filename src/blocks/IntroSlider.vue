<script setup>
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, Pagination } from "swiper/modules";

const imagesPath = "assets/images/"

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
        id: 2,
        img: "introSlider/03.jpg",
        title: "Платите столько, сколько можете",
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
            `
        ,
    },
    {
        id: 1,
        img: "introSlider/02.jpg",
        title: "Отзовем исполнительное производство",
        content: {},
    },
    {
        id: 2,
        img: "introSlider/01.jpg",
        title: "Улучшите свою кредитную историю",
        content: {},
    },
]

</script>

<template>
    <div class="slider__wrapper">
        <Swiper :modules="[Pagination]" :loop="true" :autoplay="false" :slides-per-view="1"
            :pagination="{ enabled: true, el: '.slider-nav__pagination' }">
            <SwiperSlide v-for="slide in sliderData" :key="slide.id" class="slider-slide">
                <div class="slider-slide__inner">
                    <div class="slider-slide__img">
                        <img :src="imagesPath + slide.img" alt="">
                    </div>
                    <div v-html="slide.content"></div>
                </div>
            </SwiperSlide>
        </Swiper>

        <!-- Навигация -->
        <div class="slider-nav__wrapper">
            <div class="container">
                <div class="slider-nav">
                    <div class="slider-nav__buttons">
                        <button class="slider-nav__button slider-nav__button_prev" @click="this.swiper.slidePrev()">
                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M0.259642 0.251051C0.605832 -0.0836838 1.16712 -0.0836838 1.51331 0.251051L6.67545 5.24239C7.10818 5.6608 7.10819 6.33919 6.67545 6.75761L1.51331 11.7489C1.16712 12.0837 0.605832 12.0837 0.259642 11.7489C-0.0865475 11.4142 -0.0865475 10.8715 0.259642 10.5368L4.95166 6L0.259642 1.46323C-0.0865475 1.1285 -0.0865475 0.585786 0.259642 0.251051Z"
                                    fill="white" />
                            </svg>
                        </button>
                        <button class="slider-nav__button slider-nav__button_next" @click="this.swiper.slideNext()">
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
@import "swiper/css";
@import "swiper/css/pagination";

// .slider {
//     &__wrapper {
//         position: relative;
//         z-index: 1;
//     }

//     &-slide {
//         height: auto;

//         &__inner {
//             position: relative;
//             height: 100%;
//         }

//         &__img {
//             position: absolute;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;

//             img {
//                 object-fit: cover;
//             }
//         }
//     }

//     &-nav {
//         display: flex;
//         align-items: center;
//         gap: 10px;

//         &__wrapper {
//             position: absolute;
//             bottom: 0;
//             width: 100%;
//             z-index: 1;
//         }

//         &__buttons {
//             display: flex;
//             align-items: center;
//             gap: 10px;
//         }

//         &__button {
//             border: 2px solid #fff;
//             border-radius: 30px;
//             width: 40px;
//             height: 40px;

//             &_prev {
//                 rotate: 180deg;
//             }
//         }

//         &__pagination {
//             &>* {
//                 width: 7px;
//                 height: 7px;
//                 margin: 0;
//             }
//         }
//     }
// }
</style>