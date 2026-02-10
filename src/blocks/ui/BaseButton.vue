<script setup>
import {computed} from 'vue';

const props = defineProps({
    as: {
        type: String,
        default: 'button'
    },
    to: {
        type: String,
        default: '#'
    },
    severity: {
        type: String,
        default: 'primary'
    },
    size: {
        type: String,
        default: 'medium'
    },
    circle: {
        type: Boolean,
        default: false
    },
    metrikaId: { // для яндекс метрики (только для <button>)
        type: String,
        default: ''
    },
    isLoading: {
        type: Boolean,
        default: false
    }
})

const baseClass = 'flex items-center justify-center font-medium border rounded-full relative transition-colors hover:cursor-pointer disabled:opacity-75 disabled:pointer-events-none'

const colorsClass = computed(() => {
    switch (props.severity) {
        case 'primary':
            return 'border-sky-500 bg-sky-500 text-white hover:bg-cyan-500 hover:border-cyan-500 active:bg-cyan-600 active:border-cyan-600'
        case 'secondary':
            return 'border-slate-100 bg-slate-100 text-slate-900 hover:bg-sky-500 hover:border-sky-500 hover:text-white active:bg-sky-600'
        default:
            return ''
    }
})

const sizeClass = computed(() => {
    switch (props.size) {
        case 'small':
            return props.circle
                ? 'w-[30px] h-[30px] flex-none'
                : 'px-4 h-[30px] text-sm'
        case 'medium':
            return props.circle
                ? 'w-10 h-10 flex-none'
                : 'px-6 h-10'
        case 'large':
            return props.circle
                ? 'w-[50px] h-[50px] flex-none'
                : 'px-6 h-[50px]'
        default:
            return props.circle
                ? 'w-10 h-10 flex-none'
                : 'px-6 h-10'
    }
})
</script>

<template>
    <template v-if="props.as === 'button'">
        <button
            :class="baseClass + ' ' + colorsClass + ' ' + sizeClass"
            :data-metrika-id="props.metrikaId"
            :disabled="props.isLoading"
        >
            <i
                v-if="props.isLoading"
                class="pi pi-spin pi-spinner absolute inset-0 m-auto flex items-center justify-center text-xl"
            ></i>

            <span :class="{'invisible': props.isLoading}" class="flex items-center justify-center gap-2">
                <slot></slot>
            </span>
        </button>
    </template>

    <template v-else-if="props.as === 'link'">
        <a :href="props.to" :class="baseClass + ' ' + colorsClass + ' ' + sizeClass">
            <slot></slot>
        </a>
    </template>

    <template v-else-if="props.as === 'router-link'">
        <router-link :to="props.to" :class="baseClass + ' ' + colorsClass + ' ' + sizeClass">
            <slot></slot>
        </router-link>
    </template>
</template>