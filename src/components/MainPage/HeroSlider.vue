<script setup>
import {Navigation, Pagination, Autoplay} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/vue';
import ModalForm from '@/layouts/ModalForm.vue';
import {ref} from 'vue';

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
            <swiper
                class="swiper"
                :modules="modules"
                :slides-per-view="1"
                :speed="700"
                :loop="true"
                :navigation="{ nextEl: '.intro-slider-nav-button__next', prevEl: '.intro-slider-nav-button__prev' }"
                :pagination="{ clickable: true, el: '.intro-slider-pagination' }"
            >
                <!--                :autoplay="{ delay: 15000 }"-->
                <swiper-slide class="slider__slide slider__slide_fix">
                    <div class="custom-container slide__container">
                        <div class="slide-content">
                            <div class="slide-content__title">
                                <span>
                                    Избавьтесь от <br> задолженности с нами!
                                </span>
                            </div>
                            <div class="mb-4 slide-content__text slide-content__text_mobile">
                                <p>
                                    ООО ПКО «Форвард» работает на основании законодательства Российской Федерации. Мы
                                    готовы согласовать индивидуальные условия для погашения задолженности.
                                </p>
                            </div>
                            <div class="slide-content__text">
                                <p>
                                    ООО ПКО «Форвард» работает на основании законодательства Российской Федерации. Мы
                                    готовы согласовать индивидуальные условия для погашения задолженности.
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
                            <img class="hidden sm:block" :src='"/images/" + "introSlider/03.png"' alt=""/>
                            <img class="sm:hidden" src="/images/introSlider/mobile_banner.png" alt="Мобильный баннер"/>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="slider__slide">
                    <div class="custom-container slide__container">
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
                            <img class="hidden sm:block" :src='"/images/" + "introSlider/01.png"' alt="There was img"/>
                            <img class="sm:hidden" src="/images/introSlider/mobile_banner.png" alt="Мобильный баннер"/>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="slider__slide">
                    <div class="custom-container slide__container">
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
                                </ol>
                            </div>
                            <div class="slide-content__text">
                                <ol class="list">
                                    <li>
                                        Отзываем исполнительные документы — избавим вас от давления приставов и
                                        постоянных проверок!
                                    </li>
                                    <li>
                                        Удалим информацию из базы ФССП — восстановите свою репутацию и спокойствие!
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
                            <img class="hidden sm:block" :src='"/images/" + "introSlider/04.png"' alt="There was img"/>
                            <img class="sm:hidden" src="/images/introSlider/mobile_banner.png" alt="Мобильный баннер"/>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="slider__slide">
                    <div class="custom-container slide__container">
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
                                        После выплат Вы получите все необходимые документы, включая справку о погашении.
                                    </li>
                                </ol>
                            </div>
                            <div class="slide-content__text">
                                <p>
                                    Сотрудничество с нами – это реальная возможность улучшить свою кредитную историю
                                    быстро и эффективно. Мы готовы заключить мировое соглашение на любой стадии
                                    производства по делу.
                                </p>
                                <p>
                                    Вы сможете списать до 20% от общей суммы, а по окончании выплат получите полный
                                    набор документов, включая справку о погашении задолженности.
                                </p>
                            </div>
                            <div class="slide-content__buttons">
                                <a href="#" class="button button_blue slide__button" @click.stop="showModal">
                                    Получить консультацию
                                </a>
                            </div>
                        </div>
                        <div class="slide__img">
                            <img class="hidden sm:block" :src="'/images/' + 'introSlider/02.png'" alt=""/>
                            <img class="sm:hidden" src="/images/introSlider/mobile_banner.png" alt="Мобильный баннер"/>
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

    <ModalForm v-model="modalVisible" :type="modalDefaultOption"/>
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
        & > li {
            line-height: 140%;
            margin-bottom: 10px;

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
            height: 560px;
            display: flex;
            align-items: center;

            position: relative;
            z-index: 1;
            min-width: 100%;
            //background-color: var.$white-blue;
            @apply bg-gradient-to-b from-[#CBE6FF] to-[#DFF2FE];

            //&::before {
            //    content: '';
            //    position: absolute;
            //    top: 0;
            //    left: 0;
            //    width: 100%;
            //    height: 100%;
            //    background: linear-gradient(90deg, #e3e6eb 30%, transparent 50%);
            //    z-index: -1;
            //}
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
        &__container {
            @apply flex items-center h-full relative;
        }

        &__img {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 885px;
            height: 100%;
            z-index: -1;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                object-position: bottom;
            }
        }

        &-content {
            margin-top: -50px;

            &__title {
                font-weight: 700;
                font-size: 36px;
                line-height: 40px;
                margin-bottom: 24px;
            }

            &__text {
                width: 51%;
                font-size: 16px;
                line-height: 28px;
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

                & > *:not(:last-child) {
                    margin-right: 30px;
                }
            }
        }
    }
}

@include mixin.desktop {
    .intro-slider {
        .slider {
            &-nav {
                &__wrapper {
                    bottom: 30px;
                }
            }
        }

        .slide {
            &__img {
                width: 815px;

                &::before {
                    background: linear-gradient(90deg, #e3e6eb 30%, transparent 70%)
                }
            }

            &-content {
                &__title {
                    font-size: 30px;
                }

                &__text {
                    font-size: 14px;
                }

                & .list {
                    font-size: 14px;
                }

                &__buttons {
                    & > *:not(:last-child) {
                        margin-right: 15px;
                    }
                }
            }
        }
    }
}

@include mixin.laptop {
    .intro-slider {
        .slider {
            &__slide {
                height: 400px;
            }

            &-nav__wrapper {
                bottom: 15px;
            }
        }

        .slide {
            &__img {
                width: 475px;

                &::before {
                    background: linear-gradient(90deg, #e3e6eb 30%, transparent 80%)
                }
            }

            &-content {
                &__title {
                    font-size: 20px;
                    line-height: 30px;
                    margin-bottom: 12px;
                }

                &__text {
                    display: none;
                    width: 55%;
                    margin-bottom: 25px;
                    line-height: 24px;

                    &_both {
                        display: unset;
                    }

                    &_mobile {
                        display: block;
                    }

                    & .list li {
                        margin-bottom: 5px;
                    }
                }

                &__buttons {
                    flex-wrap: wrap;
                    gap: 10px;

                    & > * {
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
        .slider__slide {
            height: 320px;
        }

        .slide {
            &__img {
                height: 175px;
                width: 66%;

                img {
                    object-position: bottom right;
                }
            }

            &-content {
                margin-top: -60px;

                &__title {
                    font-size: 14px;
                    line-height: 20px;
                }

                &__text {
                    width: unset;
                    font-size: 13px;
                    line-height: 20px;
                    margin-bottom: 12px;
                }

                & .list {
                    font-size: 13px;
                    line-height: 20px;
                }
            }
        }

        .list {
            font-size: 16px;

            & > li::marker {
                left: 10px;
            }
        }
    }
}
</style>
