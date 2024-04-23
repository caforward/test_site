<template>
    <section class="">

        <div class="slider">
            <swiper class="swiper" :slides-per-view="1" @swiper="onSwiper">
                <swiper-slide class="slider__slide">
                    <div class="container">
                        <div class="slide-content">
                            <div class="slide-content__title">
                                Платите столько, <br> сколько можете
                            </div>
                            <div class="slide-content__text">
                                <p>
                                    Сумма платежа рассчитывается, исходя из
                                    ваших возможностей таким образом, что
                                    остается комфортной для вас(но не менее 1500
                                    рублей в месяц)! С нами вам не нужно
                                    бояться, что весь ваш доход будет уходить на
                                    погашение долга!
                                </p>
                                <p>
                                    Наши специалисты помогут вам подобрать ту
                                    сумму, которую вам будет комфортно вносить
                                    для погашения долга без ущерба для вашего
                                    бюджета
                                </p>
                            </div>
                            <div class="slide-content__buttons">
                                <button @click="showModal" class="button button_blue slide__button">
                                    Получить консультацию
                                </button>
                                <button class="button slide__button">
                                    Подробнее
                                </button>
                            </div>
                        </div>
                        <div class="slide__img">
                            <img :src='"assets/images/" + "introSlider/01.jpg"' alt="There was img" />
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="slider__slide slider__slide_fix">
                    <div class="container">
                        <div class="slide-content">
                            <div class="slide-content__title">
                                Отзовем<br> исполнительное <br>производство
                            </div>
                            <div class="slide-content__text">
                                <p>
                                    <b>
                                        Попали в трудное положение? <br />
                                        Нечем платить долги по кредитам и
                                        займам?
                                    </b>
                                </p>
                                <p>
                                    Наши специалисты готовы идти на встречу
                                    клиентам, <br />
                                    а их компетенция позволяет быстро и
                                    эффективно выходить из даже, казалось бы,
                                    безвыходных ситуаций
                                </p>
                            </div>
                            <div class="slide-content__buttons">
                                <button @click="showModal" class="button button_blue slide__button">
                                    Получить консультацию
                                </button>
                                <button class="button slide__button">
                                    Подробнее
                                </button>
                            </div>
                        </div>
                        <div class="slide__img">
                            <img :src='"assets/images/" + "introSlider/03.jpg"
                ' alt="" />
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="slider__slide">
                    <div class="container">
                        <div class="slide-content">
                            <div class="slide-content__title">
                                Улучшите свою <br> кредитную историю
                            </div>
                            <div class="slide-content__text">
                                <p>
                                    Сотрудничество с нами – это возможность восстановить положительную кредитную историю
                                    быстро и эффективно. Если вы начинаете платить по составленному специально для вас
                                    графику, мы готовы заключить мировое соглашение на любой стадии производства по
                                    делу. 
                                </p>
                                <p>
                                    Таким образом вы сможете списать до 70% от суммы основного долга, а по окончании
                                    выплат получаете полный набор документов, включая справку о погашении
                                    задолженности. 
                                </p>
                            </div>
                            <div class="slide-content__buttons">
                                <button @click="showModal" class="button button_blue slide__button">
                                    Получить консультацию
                                </button>
                                <button class="button slide__button">
                                    Подробнее
                                </button>
                            </div>
                        </div>
                        <div class="slide__img">
                            <img :src="'/assets/images/' + 'introSlider/02.jpg'
                " alt="" />
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
            <div class="slider-nav__wrapper">
                <div class="container">
                    <div class="slider-nav">
                        <button class="slider-nav__button slider-nav__button_prev" @click="swiper.slidePrev()">
                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M0.259642 0.251051C0.605832 -0.0836838 1.16712 -0.0836838 1.51331 0.251051L6.67545 5.24239C7.10818 5.6608 7.10819 6.33919 6.67545 6.75761L1.51331 11.7489C1.16712 12.0837 0.605832 12.0837 0.259642 11.7489C-0.0865475 11.4142 -0.0865475 10.8715 0.259642 10.5368L4.95166 6L0.259642 1.46323C-0.0865475 1.1285 -0.0865475 0.585786 0.259642 0.251051Z"
                                    fill="white" />
                            </svg>
                        </button>
                        <button class="slider-nav__button slider-nav__button_next" @click="swiper.slideNext()">
                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M0.259642 0.251051C0.605832 -0.0836838 1.16712 -0.0836838 1.51331 0.251051L6.67545 5.24239C7.10818 5.6608 7.10819 6.33919 6.67545 6.75761L1.51331 11.7489C1.16712 12.0837 0.605832 12.0837 0.259642 11.7489C-0.0865475 11.4142 -0.0865475 10.8715 0.259642 10.5368L4.95166 6L0.259642 1.46323C-0.0865475 1.1285 -0.0865475 0.585786 0.259642 0.251051Z"
                                    fill="white" />
                            </svg>
                        </button>
                    </div>
                    <!-- <Pagination /> -->
                </div>
            </div>

        </div>
   
    </section>
    <ModalConsultation :visible="modalVisible" @close="closeModal"/>
</template>

<script lang="ts">
import { ref } from "vue";
import Slide from "../blocks/IntroSlider/Slide.vue";
import ModalConsultation from "../layouts/ModalConsultation.vue"
import { Swiper, SwiperSlide } from "swiper/vue";
// import { Pagination } from "swiper/modules";

// swiper style
import "swiper/css";

export default {
    name: "IntroSlider",
    components: {
        ModalConsultation,
        Slide,
        Swiper,
        SwiperSlide,
        // Pagination
    },

    props: {},
    data() {
        return {
            modalVisible: false,
            sliderData: [
                {
                    img: "introSlider/01.jpg",
                    title: "Платите столько, сколько можете",
                    content: {},
                },
                {
                    img: "introSlider/02.jpg",
                    title: "Отзовем исполнительное производство",
                    content: {},
                },
                {
                    img: "introSlider/03.jpg",
                    title: "Улучшите свою кредитную историю",
                    content: {},
                },
            ],
        };
    },
    methods: {
        showModal() {
            this.modalVisible = true;
        },
        closeModal() {
            this.modalVisible = false;
        },
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

<style scoped lang="scss">
section {
    margin-top: -130px;
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.slider {
    position: relative;
    overflow: hidden;
    background-color: #eaecee;

    &__container {
        display: flex;
        flex-wrap: nowrap;
        transition: transform 0.2s;
    }

    &__slide {
        padding-top: 160px;
        padding-bottom: 70px;
        height: 960px;
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
            bottom: 70px;
            width: 100%;
            z-index: 1;
        }

        &__button {
            border: 2px solid #fff;
            border-radius: 30px;
            width: 40px;
            height: 40px;

            &_prev {
                rotate: 180deg;
            }
        }
    }
}

.slide {
    &__img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-color: $white-blue;
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

@include desktop {
    .slider {
        &__slide {
            height: 750px;
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

@include laptop {
    section {
        margin-top: -80px;
    }

    .slider {
        &__slide {
            padding-top: 120px;
            &_fix {
                padding-top: 20px;
            }
        }
    }

    .slide {
        &__img {
            img {
                object-position: 54%;
            }
        }

        &-content {
            width: 285px;

            &__title {
                font-size: 30px;
                margin-bottom: 10px;
            }

            &__text {
                width: 279px;
                line-height: 171%;
                margin-bottom: 25px;
            }
        }
    }
}

@include mobile {
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
            position: static;
            padding-top: 260px;

            img {
                object-position: 80%;
            }
        }

        &-content {
            width: 280px;

            &__title {
                margin-bottom: 25px;
            }

            &__text {
                display: none;
            }

            &__buttons {
                flex-direction: column;
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

@include mobileS {
    .slide {
        &__img {
            padding-top: 300px;

            img {
                object-position: 90%;
            }
        }

        &-content {
            &__title {
                font-size: 20px;
            }
        }
    }
}
</style>
