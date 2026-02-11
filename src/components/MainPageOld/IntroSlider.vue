<script setup>
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import ModalForm from '@/layouts/ModalForm.vue';
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

function showUnblockAccauntModal() {
    modalDefaultOption.value = 'account-unblock';
    modalVisible.value = true;
}
function showCancelIPModal() {
  modalDefaultOption.value = 'cancel-ip';
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
                                <span>
                                    Избавьтесь от <br> задолженности с нами!
                                </span>
                            </div>
                            <div class="mb-4 slide-content__text slide-content__text_mobile">
                                <ol class="list">
                                    <li>
                                        Мы простим Вам <b>до 75%</b> от суммы долга сразу же после заполнения формы
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
                            </div>
                            <div class="slide-content__text">
                                <p>
                                    <b>
                                        Всем новым клиентам мы предлагаем скидки и рефинансирование на выгодных условиях
                                    </b>
                                </p>
                                <ol class="list">
                                    <li>
                                        Мы простим Вам <b>до 75%</b> от суммы долга сразу же после заполнения формы
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
                                    @click.prevent="showModal">
                                    Оставить обращение
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
                                Разблокируем счет
                            </div>
                            <div class="mb-4 slide-content__text slide-content__text_mobile">
                                <ol class="list">
                                    <li>
                                        Разблокируем счет - мы поможем вам вернуть доступ к вашим финансам!
                                    </li>
                                    <li>
                                        Отзовем исполнительные документы - избавьтесь от долговых обязательств и проблем
                                        с приставами!
                                    </li>
                                    <li>
                                        Начните новую жизнь без долгов - дайте себе второй шанс на финансовую свободу!
                                    </li>
                                </ol>
                            </div>
                            <div class="slide-content__text">
                                <ol class="list">
                                    <li>
                                        Разблокируем счет - мы поможем вам вернуть доступ к вашим финансам!
                                    </li>
                                    <li>
                                        Отзовем исполнительные документы - избавьтесь от долговых обязательств и проблем
                                        с приставами!
                                    </li>
                                    <li>
                                        Начните новую жизнь без долгов - дайте себе второй шанс на финансовую свободу!
                                    </li>
                                </ol>
                            </div>
                            <div class="slide-content__buttons">
                                <a href="#" class="button button_blue slide__button"
                                    @click.prevent="showUnblockAccauntModal">
                                    Разблокировать счет
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
                                Отзовём исполнительное <br> производство из ФССП
                            </div>
                            <div class="mb-4 slide-content__text slide-content__text_mobile">
                                <ol class="list">
                                    <li>
                                        Отзовём исполнительные документы — избавим от давления приставов.
                                    </li>
                                    <li>
                                        Удалим данные из базы ФССП — вернём репутацию и спокойствие.
                                    </li>
                                    <li>
                                        Официально прекратим взыскание — действуйте, обратитесь к нам!
                                    </li>
                                </ol>
                            </div>
                            <div class="slide-content__text">
                                <ol class="list">
                                    <li>
                                        Отзываем исполнительные документы — избавим вас от давления приставов и постоянных проверок!
                                    </li>
                                    <li>
                                        Удалим информацию из базы ФССП — восстановите свою репутацию и спокойствие!
                                    </li>
                                    <li>
                                        Прекращаем взыскание официально —  возьмите ситуацию в свои руки и обратитесь к нам сегодня!
                                    </li>
                                </ol>
                            </div>
                            <div class="slide-content__buttons">
                                <a href="#" class="button button_blue slide__button" @click.prevent="showCancelIPModal">
                                    Отозвать производство
                                </a>
                            </div>
                        </div>
                        <div class="slide__img">
                            <img :src='"/images/" + "introSlider/04.png"' alt="There was img" />
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="slider__slide">
                    <div class="custom-container">
                        <div class="slide-content">
                            <div class="slide-content__title">
                                Улучшите свою <br> кредитную историю
                            </div>
                            <div class="mb-4 slide-content__text slide-content__text_mobile">
                                <ol class="list">
                                    <li>
                                        Списание до <b>20%</b> от общей суммы долга.
                                    </li>
                                    <li>
                                        Мы готовы заключить мировое соглашение на любой стадии производства.
                                    </li>
                                    <li>
                                        После выплат Вы получите все необходимые документы, включая справку о погашении.
                                    </li>
                                </ol>
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



@media (min-width: 799px) {
    .mobile {
        display: none !important;
    }
}

@media (max-width: 798px) {
    .desktop {
        display: none !important;
    }
}

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
            top: 0;
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

                &_mobile {
                    display: none;
                    font-size: 16px;
                    line-height: 1;
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
                    
                    &_both {
                        display: unset;
                    }

                    &_mobile {
                        display: block;
                        width: unset;
                        font-size: 16px;
                        line-height: normal;
                        margin-top: -12px; // TODO: нужно будет убрать
                        margin-bottom: 14px;
                    }
                }

                &__buttons {
                    flex-wrap: wrap;
                    gap: 10px;

                    &>* {
                        width: fit-content;
                        height: 40px;

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
                padding-top: 400px;
            }

            &-content__title {
                font-size: 26px;
            }
        }

        .list {
            font-size: 16px;

            &>li::marker {
                left: 10px;
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
