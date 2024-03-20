<template>
    <div>
        <div class="slide__img">
            <img :src="imgSrc" alt="">
        </div>
        <div class="slide-content">
            <div class="slide-content__title">
                {{ title }}
            </div>
            <div class="slide-content__text">
                <div v-html="text"></div>
            </div>
            <div class="slide-content__buttons">
                <!-- <BaseBlueButton text="Получить консультацию" /> -->
                <!-- <BaseButton text="Подробнее" /> -->
                <button class="slide__button">text</button>
            </div>
        </div>
    </div>
</template>

<script setup>
// import { ref } from 'vue'

// defineProps<{ msg: string }>()

const props = defineProps(['title', 'text', 'imgSrc'])

</script>

<style lang="scss" scoped>

* {
    color: #2e2e2e;
}
img {
    display: flex;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.slide__button {
    // @include blue-button;
    
}

.slide {
    &__img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }

    &-content {
        width: 50%;

        &__title {
            font-weight: 700;
            font-size: 48px;
            line-height: 104%;
            margin-bottom: 22px;
        }

        &__text {
            font-weight: 400;
            font-size: 16px;
            line-height: 175%;
            margin-bottom: 33px;
        }

        &__buttons {
            display: flex;

            &>*:not(:last-child) {
                margin-right: 30px;
            }
        }
    }
}
</style>