<script setup>
</script>

<template>
    <section class="hero-banner">
        <div class="custom-container">
            <div class="banner">
                <div class="banner-content">
                    <div class="banner-content__title">
                                <span>
                                    Избавьтесь от <br> задолженности с нами!
                                </span>
                    </div>
                    <div class="mb-4 banner-content__text">
                        <p>
                            ООО ПКО «Форвард» работает на основании законодательства Российской Федерации. Наша основная
                            цель — помочь вам исправить финансовую ситуацию: погасить задолженность и улучшить кредитную
                            историю.
                        </p>
                    </div>
                </div>
                <div class="banner__img">
                    <img src="/images/introSlider/mobile_banner.png" alt="Мобильный баннер"/>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

@use 'swiper/css';
@use 'swiper/css/navigation';
@use 'swiper/css/pagination';
@use 'swiper/css/scrollbar';

.hero-banner {
    position: relative;
    padding: 2rem 0;
    @apply bg-gradient-to-b from-[#CBE6FF] to-[#DFF2FE];
}

.banner {
    &__img {
        position: absolute;
        z-index: 1;
        bottom: 0;
        right: 0;

        img {
            height: 240px;
        }
    }

    &-content {
        position: relative;
        z-index: 2;

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
            margin-bottom: 0;
        }
    }
}

@include mixin.desktop {
    .banner-content {
        &__title {
            font-size: 30px;
        }

        &__text {
            font-size: 14px;
        }
    }
}

@include mixin.laptop {
    .banner-content {
        &__title {
            font-size: 20px;
            line-height: 30px;
            margin-bottom: 12px;
        }

        &__text {
            width: 55%;
            line-height: 24px;
        }
    }
}

@include mixin.mobile {
    .banner-content {
        &__title {
            font-size: 14px;
            line-height: 20px;
        }

        &__text {
            width: unset;
            font-size: 13px;
            line-height: 20px;
        }
    }
}
</style>
