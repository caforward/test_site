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
    <div class="rounded-[30px] p-8 relative flex flex-col gap-4 cursor-pointer">
        <div
            class="absolute right-[30px] top-[30px] rounded-full bg-white w-[34px] h-[34px] flex items-center justify-center transition-colors group-hover:bg-sky-500 group-hover:text-white">
            <i class="pi pi-arrow-right"/>
        </div>

        <div class="h-40 flex">
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

        <div class="w-10/12 flex flex-col gap-4">
            <div v-if="props.promotion" class="border-2 border-sky-500 rounded-sm w-fit text-sky-500 text-sm/[28px] font-bold py-1 px-1.5">
                {{ props.promotion }}
            </div>

            <h3 class="text-[28px]/[30px] font-semibold">{{ props.title }}</h3>

            <p class="text-base/[28px]">{{ props.text }}</p>
        </div>
    </div>
</template>