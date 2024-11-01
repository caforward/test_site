<script setup>
import CompaniesSlider from "../blocks/CompaniesSlider.vue";

</script>

<template>
    <section class="suppliers">
        <div class="custom-container">
            <h2 class="suppliers__title">
                Нам доверяют не только клиенты, <br> но и многие компании
            </h2>
            <p class="suppliers__text">
                Мы активно расширяем ряды наших партнеров. Они выбрали нас, потому что мы имеем общие ценности: для нас
                важен не только постоянный рост и высокая
                эффективность бизнеса, но и человеческий подход, когда каждый клиент ценен и важен.
                <br>
                Если Вас заинтересовало сотрудничество с ООО ПКО «Форвард» – свяжитесь с нами любым удобным способом, и
                мы предложим вам уникальный и взаимовыгодный вариант партнерства.
            </p>
            <CompaniesSlider />
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

.suppliers {
    padding: 100px 0 50px;

    &__title {
        font-size: 36px;
        font-weight: 700;
        line-height: 40px;
        margin-bottom: 33px;
    }

    &__text {
        font-weight: 400;
        font-size: 16px;
        line-height: 187%;
        width: 76%;
        margin-bottom: 30px;
    }
}

.slider {
    &__container {
        display: flex;
        flex-wrap: nowrap;
        transition: transform .2s;
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
        &__button {
            border: 2px solid #fff;
            border-radius: 30px;
            width: 40px;
            height: 40px;
        }
    }
}

@include mixin.desktop {
    .suppliers {
        padding: 60px 0 50px;
    }
}

@include mixin.tablet {
    .suppliers {
        padding: 40px 0 40px;

        &__title {
            font-size: 24px;
            line-height: normal;
            margin-bottom: 25px;
        }

        &__text {
            font-size: 14px;
            margin-bottom: 25px;
            width: 100%;
        }
    }
}
</style>