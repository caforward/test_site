<script setup>
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref } from 'vue';

const props = defineProps({
    light: {
        type: Boolean,
        default: false
    }
})

const modules = [Navigation, Pagination];
const dataSlider = ref([
    {
        name: "sberbank",
        img: "suppliers/sber.png",
    },
    {
        name: "vtb-bank",
        img: "suppliers/vtb.png",
    },
    {
        name: "alpha-bank",
        img: "suppliers/alpha.png",
    },
    {
        name: "mdm-bank",
        img: "suppliers/mdm.png",
    },
    {
        name: "expo-bank",
        img: "suppliers/expo.png",
    },
    {
        name: "home-credit",
        img: "suppliers/home.png",
    },
    {
        name: "otp-bank",
        img: "suppliers/otp.png",
    },
    {
        name: "rossselhoz-bank",
        img: "suppliers/rosselhoz.png",
    },
    {
        name: "rusfinance-bank",
        img: "suppliers/russfinance.png",
    },
    {
        name: "yuni-bank",
        img: "suppliers/uni.png",
    },
    {
        name: "quatro",
        img: "suppliers/quatro.svg",
    },
    {
        name: "kredito-24",
        img: "suppliers/kredito-24.svg",
    },
    {
        name: "mig-kredit",
        img: "suppliers/mig-kredit.svg",
    },
    {
        name: "turbozaim",
        img: "suppliers/turbozaim.svg",
    },
    {
        name: "finmoll",
        img: "suppliers/finmoll.png",
    },
    {
        name: "viva",
        img: "suppliers/viva.svg",
    },
    {
        name: "tkb",
        img: "suppliers/tkb.png",
    },
    {
        name: "zaimer",
        img: "suppliers/zaimer.svg",
    },
    {
        name: "bistrodengi",
        img: "suppliers/bistrodengi.svg",
    },
])

</script>

<template>
    <div class="comspanies-slider">
        <swiper class="swiper slider" :modules="modules" :slides-per-view="2" :space-between="50"
            :navigation="{ nextEl: '.comspanies-slider-nav-button__next', prevEl: '.comspanies-slider-nav-button__prev' }"
            :pagination="{ clickable: true, el: '.comspanies-slider-pagination' }" :breakpoints="{
                1230: {
                    slidesPerView: 6,
                    slidesPerGroup: 5
                },
                1022: {
                    slidesPerView: 5,
                    slidesPerGroup: 5
                },
                639:
                {
                    slidesPerView: 4,
                    slidesPerGroup: 4
                }, 520: {
                    slidesPerView: 3,
                    slidesPerGroup: 2
                }
            }">

            <swiper-slide class="slider__slide" v-for="(item, index) in dataSlider" :key="index">
                <img :src="'/images/' + item.img" :alt=item.name>
            </swiper-slide>

        </swiper>
        <div class="slider-nav__wrapper">
            <div class="slider-nav flex items-center">
                <button
                    class="slider-nav-button comspanies-slider-nav-button__prev flex flex-none items-center justify-center border-2 border-gray text-gray-300 rounded-full w-10 h-10 transition-colors hover:border-sky-500 hover:text-sky-500">
                    <i class="pi pi-angle-left !text-xl"></i>
                </button>
                <button
                    class="slider-nav-button comspanies-slider-nav-button__next flex flex-none items-center justify-center border-2 border-gray text-gray-300 rounded-full w-10 h-10 transition-colors hover:border-sky-500 hover:text-sky-500">
                    <i class="pi pi-angle-right !text-xl"></i>
                </button>
                <!-- <Pagination /> -->
                <div class="comspanies-slider-pagination"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import 'swiper/css';
@import 'swiper/css/navigation';
@import 'swiper/css/pagination';
@import 'swiper/css/scrollbar';

.comspanies-slider {

    &-pagination {
        .swiper-pagination-bullet {
            margin: 0 2px !important;
            width: 6px;
            height: 6px;
            opacity: 1;
            background-color: $gray;

            &-active {
                background-color: $blue;
            }
        }
    }

    .swiper {
        margin-bottom: 30px;
    }

    .slider {
        &__slide {
            height: 80px;

            img {
                object-fit: contain;
                width: 100%;
                height: 100%;
            }
        }

        &-nav {
            display: flex;
            gap: 10px;

            &__button {
                border: 2px solid $gray-milk;
                border-radius: 30px;
                width: 40px;
                height: 40px;

                &_next {
                    rotate: 180deg;
                }
            }
        }
    }
}
</style>
