<template>
    <div class="slider">
        <swiper class="swiper" :slides-per-view="6" :space-between="50" @swiper="onSwiper">
            <swiper-slide v-for="item in dataSlider" :key="item"> 
                <img :src="'/assets/images/' + item.img" alt="">   
            </swiper-slide>
        </swiper>
        <div class="slider-nav__wrapper">
            <div class="slider-nav">
                <button
                    class="slider-nav__button slider-nav__button_prev"
                    @click="swiper.slidePrev()"
                >
                    <svg
                        width="7"
                        height="12"
                        viewBox="0 0 7 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M6.74036 11.7489C6.39417 12.0837 5.83288 12.0837 5.48669 11.7489L0.324553 6.75761C-0.108182 6.3392 -0.108187 5.66081 0.324553 5.24239L5.48669 0.251052C5.83288 -0.0836831 6.39417 -0.0836831 6.74036 0.251052C7.08655 0.585787 7.08655 1.1285 6.74036 1.46323L2.04834 6L6.74036 10.5368C7.08655 10.8715 7.08655 11.4142 6.74036 11.7489Z"
                            fill="#E3E6E8"
                        />
                    </svg>
                </button>
                <button
                    class="slider-nav__button slider-nav__button_next"
                    @click="swiper.slideNext()"
                >
                    <svg
                        width="7"
                        height="12"
                        viewBox="0 0 7 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M6.74036 11.7489C6.39417 12.0837 5.83288 12.0837 5.48669 11.7489L0.324553 6.75761C-0.108182 6.3392 -0.108187 5.66081 0.324553 5.24239L5.48669 0.251052C5.83288 -0.0836831 6.39417 -0.0836831 6.74036 0.251052C7.08655 0.585787 7.08655 1.1285 6.74036 1.46323L2.04834 6L6.74036 10.5368C7.08655 10.8715 7.08655 11.4142 6.74036 11.7489Z"
                            fill="#E3E6E8"
                        />
                    </svg>
                </button>
                <!-- <Pagination /> -->
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
                    name: "home-credit",
                    img: "suppliers/home.png",
                },
                {
                    name: "sberbank",
                    img: "suppliers/sber.png",
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
@import "../assets/scss/index.scss";

.swiper {
    margin-bottom: 30px;
}

.slider {
    &__container {
        display: flex;
        flex-wrap: nowrap;
        transition: transform 0.2s;
        width: 100%;
    }

    &__slide {
        flex: 1;
        position: relative;
        z-index: 1;
        width: calc(100% / 5);

        &:not(:last-child) {
            margin-right: 50px;
        }

        img {
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
</style>
