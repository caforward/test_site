<template>
    <div class="slider">
        <swiper class="swiper slider" :slides-per-view="2" :space-between="50" @swiper="onSwiper" :loop="true"
            :breakpoints="{ 1230: { slidesPerView: 6 }, 1022: { slidesPerView: 5 }, 639: { slidesPerView: 4 }, 520: { slidesPerView: 3 } }">

            <swiper-slide class="slider__slide" v-for="(item, index) in dataSlider" :key="index">
                <img :src="'/assets/images/' + item.img" :alt=item.name>
            </swiper-slide>

        </swiper>
        <div class="slider-nav__wrapper">
            <div class="slider-nav">
                <button class="slider-nav__button slider-nav__button_prev" @click="swiper.slidePrev()">
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M6.74036 11.7489C6.39417 12.0837 5.83288 12.0837 5.48669 11.7489L0.324553 6.75761C-0.108182 6.3392 -0.108187 5.66081 0.324553 5.24239L5.48669 0.251052C5.83288 -0.0836831 6.39417 -0.0836831 6.74036 0.251052C7.08655 0.585787 7.08655 1.1285 6.74036 1.46323L2.04834 6L6.74036 10.5368C7.08655 10.8715 7.08655 11.4142 6.74036 11.7489Z"
                            fill="#E3E6E8" />
                    </svg>
                </button>
                <button class="slider-nav__button slider-nav__button_next" @click="swiper.slideNext()">
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M6.74036 11.7489C6.39417 12.0837 5.83288 12.0837 5.48669 11.7489L0.324553 6.75761C-0.108182 6.3392 -0.108187 5.66081 0.324553 5.24239L5.48669 0.251052C5.83288 -0.0836831 6.39417 -0.0836831 6.74036 0.251052C7.08655 0.585787 7.08655 1.1285 6.74036 1.46323L2.04834 6L6.74036 10.5368C7.08655 10.8715 7.08655 11.4142 6.74036 11.7489Z"
                            fill="#E3E6E8" />
                    </svg>
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
                    name: "alpha-bank",
                    img: "suppliers/alpha.png",
                },
                {
                    name: "mdm-bank",
                    img: "suppliers/mdm.png",
                },
                {
                    name: "vtb-bank",
                    img: "suppliers/vtb.png",
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
                    name: "sberbank",
                    img: "suppliers/sber.png",
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
            
            filter: saturate(0);
            opacity: .5;
            transition: opacity .2s, filter .2s;
        }

        &.swiper-slide-active {
            img {
                filter: saturate(1);
                opacity: 1;
            }
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
</style>
