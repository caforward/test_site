<template>
    <section class="section">
        <div class="container">
            <IntroBlock>
                <template v-slot:content>
                    <div class="intro-content">
                        <Breadcrumb class="breadcrumb" />
                        <h1 class="intro-content__title">Партнерам</h1>
                        <h3 class="intro-content__subtitle">
                            ООО ПКО «Форвард» разместил коммерческие облигации бездокументарные с централизованным
                            учетом прав серии КО-П03 на общую сумму 200 млн рублей. Срок обращения облигаций составляет
                            2 года с офертой через один год после даты размещения. 
                        </h3>
                        <p class="intro-content__text">
                            Несмотря на текущую макроэкономическую ситуацию, сделка вызвала интерес у инвесторов, и
                            купонная ставка по итогам размещения составила 10,1% годовых. 
                        </p>
                        <button class="button button_blue">
                            Стать партнером
                        </button>
                    </div>
                </template>
                <template v-slot:img>
                    <div class="intro__img">
                        <img src="/assets/images/blocks/partners/intro/01.png" alt="" />
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
    background-color: $light-green;
}

.container {
    min-height: 560px;
}

.breadcrumb {
    font-weight: 400;
    font-size: 14px;
    line-height: 143%;
    color: $gray-dark;
    margin-bottom: 35px;
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
            margin-bottom: 20px;
        }

        &__subtitle {
            margin-bottom: 20px;
        }

        &__text {
            font-size: 16px;
            line-height: 167%;
            margin-bottom: 20px;
        }
    }
}
</style>
