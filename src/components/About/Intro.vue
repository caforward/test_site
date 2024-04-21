<template>
    <section class="section">
        <div class="container">
            <IntroBlock>
                <template v-slot:content>
                    <div class="intro-content">
                        <Breadcrumb class="breadcrumb" />
                        <h1 class="intro-content__title">ООО ПКО «Форвард»</h1>
                        <h3 class="intro-content__subtitle">
                            Коллекторское агентство, осуществляющее деятельность по
                            возврату просроченной задолженности в качестве основного
                            вида деятельности.
                        </h3>
                        <p class="intro-content__text">
                            Компания действует в соответствии с действующим
                            законодательством и договорами, заключенными с
                            кредитными и иными организациями.
                        </p>
                        <button class="button button_blue">
                            Получить консультацию
                        </button>
                    </div>
                </template>
                <template v-slot:img>
                    <div class="intro__img">
                        <img src="/assets/images/blocks/about/intro/01.png" alt="" />
                    </div>
                </template>
            </IntroBlock>
        </div>
    </section>
</template>

<script>
import Breadcrumb from "../../blocks/Breadcrumb.vue";
import IntroBlock from "../../blocks/IntroBlock.vue";

export default {
    name: "Intro",
    components: {
        Breadcrumb,
        IntroBlock
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped>


section {
    background-color: $gray-light;
}

.container {
    min-height: 560px;
}

.breadcrumb {
    font-weight: 400;
    font-size: 14px;
    line-height: 143%;
    color: $gray-dark;
    margin-bottom: 30px;
}

.intro {
    &__img {
        width: 50%;
        height: 560px;
    }

    &-content {
        padding: 60px 0 60px;
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
