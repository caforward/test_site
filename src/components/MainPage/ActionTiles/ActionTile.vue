<script setup>
import {computed} from "vue";

const props = defineProps({
    title: String,
    text: String,
    imagePath: String,
    promotion: String,
})

const imageName = computed(() => props.imagePath.split('.')[0])
</script>

<template>
    <button class="tile" :data-metrika-id="props.title">
        <div class="tile__button">
            <i class="pi pi-arrow-right"/>
        </div>

        <div class="tile__image">
            <picture>
                <source
                    :srcset="`/images/${imageName}.webp`"
                    type="image/webp"
                >
                <img
                    :src="'/images/' + props.imagePath"
                    :alt="props.imagePath"
                />
            </picture>
        </div>

        <div class="tile__info">
            <div class="flex flex-wrap gap-2 items-center">
                <h3 class="title">{{ props.title }}</h3>
                <div v-if="props.promotion" class="promotion">
                    {{ props.promotion }}
                </div>
            </div>

            <p class="text">{{ props.text }}</p>
        </div>
    </button>
</template>

<style lang="scss" scoped>
.tile {
    @apply
    lg:p-[30px]
    flex relative rounded-[16px] gap-3 p-4 text-left cursor-pointer;

    &__button {
        @apply
        lg:w-[34px]
        lg:h-[34px]
        lg:top-[30px]
        lg:right-[30px]
        w-6 h-6 absolute top-4 right-4 rounded-full bg-white flex items-center justify-center transition-colors group-hover:bg-sky-500 group-hover:text-white;
    }

    &__image {
        @apply
        sm:w-auto
        sm:h-40
        flex w-[60px] flex-none;
    }

    &__info {
        @apply
        lg:gap-4
        sm:gap-2
        flex flex-col gap-1;

        .promotion {
            @apply
            lg:text-[13px]/[28px]
            border border-sky-500 rounded-sm w-fit text-sky-500 text-[10px]/[15px] font-bold py-1 px-1.5;
        }

        .title {
            @apply
            xl:text-[28px]/[30px]
            lg:text-[24px]/[30px]
            sm:text-[18px]/[26px]
            text-[14px]/[20px] font-semibold;
        }

        .text {
            @apply
            xl:w-10/12
            xl:text-base/[28px]
            lg:w-full
            sm:w-11/12
            sm:text-sm/[24px]
            sm:display-unset
            hidden;
        }
    }
}
</style>


