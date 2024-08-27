<template>
    <div class="slider">
        <swiper class="swiper slider" :slides-per-view="2" :space-between="50" @swiper="onSwiper" :breakpoints="{
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
            <div class="slider-nav">
                <button
                    class="flex items-center justify-center border-2 border-gray-300 text-gray-300 rounded-full w-10 h-10 transition-colors hover:border-sky-500 hover:text-sky-500"
                    @click="swiper.slidePrev()">
                    <i class="pi pi-angle-left !text-xl"></i>
                </button>
                <button
                    class="flex items-center justify-center border-2 border-gray-300 text-gray-300 rounded-full w-10 h-10 transition-colors hover:border-sky-500 hover:text-sky-500"
                    @click="swiper.slideNext()">
                    <i class="pi pi-angle-right !text-xl"></i>
                </button>
                <!-- <Pagination /> -->
                <!-- <div class="slider-pagination"></div> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";

export default {
    name: "CompaniesSlider",
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            windowWidth: window.innerWidth,
            slidesPerView: {
                desktop: 6,
                laptop: 5,
                tablet: 4,
                mobile: 2
            },
            breakpoint: {
                laptop: 1230,
                tablet: 1022,
                mobile: 639,
                mobileS: 374
            },
            dataSlider: [
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
            ],
        };
    },
    setup() {
        const swiper = ref();
        return {
            swiper,
            onSwiper: (instance: typeof swiper) => (swiper.value = instance),
        };
    },
};
</script>

<style lang="scss" scoped>
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

            // filter: saturate(0);
            // opacity: .5;
            // transition: opacity .2s, filter .2s;
        }

        // &.swiper-slide-active {
        //     img {
        //         filter: saturate(1);
        //         opacity: 1;
        //     }
        // }
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
</style>
