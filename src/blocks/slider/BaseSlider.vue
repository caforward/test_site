<script setup>
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import Button from 'primevue/button';

const props = defineProps({
    light: {
        type: Boolean,
        default: false
    }
})

const onSwiper = (swiper) => console.log(swiper);
const onSlideChange = () => console.log('slide change');

const modules = [Navigation, Pagination];
</script>

<template>
    <div style="height: 500px;">
        <swiper :modules="modules" :slides-per-view="3" :space-between="50"
            :navigation="{ nextEl: '.slider-button__next', prevEl: '.slider-button__prev' }"
            :pagination="{ clickable: true, el: '.slider-pagination' }" @swiper="onSwiper" @slideChange="onSlideChange">

            <swiper-slide>Slide 1</swiper-slide>
            <swiper-slide>Slide 2</swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
        </swiper>

        <div class="flex gap-4 items-center">
            <div class="flex gap-2">
                <Button class="slider-button__prev bg-blue-500" icon="pi pi-angle-left !text-xl" outlined severity=""
                    rounded aria-label="next-element" />
                <Button class="slider-button__next bg-blue-500" icon="pi pi-angle-right !text-xl" outlined severity="secondary"
                    rounded aria-label="next-element" />
            </div>
            <div :class="['slider-pagination', props.light ? 'slider-pagination_light' : '']"></div>
        </div>
    </div>
</template>

<style lang="scss">
@import 'swiper/css';
@import 'swiper/css/navigation';
@import 'swiper/css/pagination';
@import 'swiper/css/scrollbar';

.swiper {
    &-pagination {
        &-bullet {
            background-color: #737373;

            &-active {
                background-color: #0284c7;
            }
        }
    }
}

.slider {
    &-pagination {
        &_light {
            .swiper-pagination-bullet {
                background-color: white;

                &-active {
                    background-color: #0284c7;
                }
            }
        }
    }
}
</style>