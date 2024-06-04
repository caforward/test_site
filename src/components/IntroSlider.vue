<template>
    <section class="">
        <div class="slider">
            <swiper class="swiper" @swiper="onSwiper" :slides-per-view="1" :speed="700">
                <swiper-slide class="slider__slide slider__slide_fix">
                    <div class="container">
                        <div class="slide-content">
                            <div class="slide-content__title">
                                Рефинансируйте <br> задолженность с нами!
                            </div>
                            <div class="slide-content__text">
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
                            </div>
                            <div class="slide-content__buttons">
                                <button class="button button_blue slide__button" @click.stop="showModal($event)">
                                    Получить консультацию
                                </button>
                                <!-- <button class="button slide__button">
                                    Подробнее
                                </button> -->
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
                                <a href="#" class="button button_blue slide__button" @click.stop="showModal($event)">
                                    Получить консультацию
                                </a>
                                <!-- <button class="button slide__button">
                                    Подробнее
                                </button> -->
                            </div>
                        </div>
                        <div class="slide__img">
                            <img :src='"assets/images/" + "introSlider/01.jpg"' alt="There was img" />
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
                                <button class="button button_blue slide__button" @click.stop="showModal($event)">
                                    Получить консультацию
                                </button>
                                <!-- <button class="button slide__button">
                                    Подробнее
                                </button> -->
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
                    <div class="swiper-pagination"></div>
                </div>
            </div>
        </div>
    </section>
    <ModalConsultation :visible="modalVisible" @close="closeModal" />
</template>

<script>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import ModalConsultation from "../layouts/ModalConsultation.vue";
// import { Pagination, Autoplay } from "swiper/modules";

// swiper style
import "swiper/css";

export default {
    name: "IntroSlider",
    components: {
        Swiper,
        SwiperSlide,
        ModalConsultation
        // Pagination
    },
    methods: {
        showSwiper(e) {
            console.log(this.swiper)
        },
        showModal(event) {
            event.preventDefault();
            this.modalVisible = true;
        },
        closeModal() {
            this.modalVisible = false;
        },
        onSwiper(swiper) {
            this.swiper = swiper;
        },
    },
    data() {
        return {
            swiper: null,
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
    mounted() {
        // let rewind = false

        // const intervalID = setInterval(() => {
        //     this.swiper.slideNext()

        //     if (this.swiper.activeIndex === this.swiper.slides.length - 1) {
        //         if (rewind) {
        //             this.swiper.slideTo(0)
        //         }

        //         rewind = true
        //     } else {
        //         rewind = false
        //     }
        // }, 8000)

        // this.swiper.on('destroy', () => {
        //     clearInterval(intervalID)
        // })
    }
};
</script>

<style scoped lang="scss">
section {
    margin-top: -80px;
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.link {
    color: $blue;
}

.list {
    &>li {
        line-height: 140%;
        margin-bottom: 10px;
    }
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
        top: 17px;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-color: $white-blue;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #e3e6eb 30%, transparent 50%)
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

@include desktopXl {
    .slider__slide {
        // padding-top: 80px;
        // height: 660px;
    }
}

@include desktop {
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

@include laptop {
    section {
        margin-top: -80px;
    }

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
            padding-top: 260px;

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
