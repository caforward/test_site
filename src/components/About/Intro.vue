<template>
    <section class="section about">
        <div class="container">
            <div class="about__inner">
                <div class="about-content">
                    <Breadcrumb class="about__breadcrumb" />
                    <h1 class="about-content__title">ООО ПКО «Форвард»</h1>
                    <h3 class="about-content__subtitle">
                        Коллекторское агентство, осуществляющее деятельность по
                        возврату просроченной задолженности в качестве основного
                        вида деятельности.
                    </h3>
                    <p class="about-content__text">
                        Компания действует в соответствии с действующим
                        законодательством и договорами, заключенными с
                        кредитными и иными организациями.
                    </p>
                    <button class="button button_blue">
                        Получить консультацию
                    </button>
                </div>
                <div class="about__img">
                    <img
                        src="/assets/images/blocks/about/intro/01.png"
                        alt=""
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Breadcrumb from "../../blocks/Breadcrumb.vue";

export default {
    name: "Intro",
    components: {
        Breadcrumb,
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
@import "/public/assets/scss/index.scss";

section {
    background-color: $gray-light;
}

.about {
    &__breadcrumb {
        font-weight: 400;
        font-size: 14px;
        line-height: 143%;
        color: $gray-dark;
        margin-bottom: 30px;
    }
    &__inner {
        display: flex;
        gap: 15px;
    }
    &__img {
        width: 50%;
    }
    &-content {
        padding: 60px 0 130px;
        width: 50%;
        &__title {
            margin-bottom: 25px;
        }
        &__subtitle {
            margin-bottom: 25px;
        }
        &__text {
            font-size: 16px;
            line-height: 167%;
            margin-bottom: 25px;
        }
    }
}
</style>
