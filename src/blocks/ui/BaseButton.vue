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
    }
})

const baseClass = 'flex items-center justify-center font-medium border rounded-full transition-colors hover:cursor-pointer'

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
                ? 'w-[30px] h-[30px]'
                : 'px-4 h-[30px] text-sm'
        case 'medium':
            return props.circle
                ? 'w-10 h-10'
                : 'px-6 h-10'
        case 'large':
            return props.circle
                ? 'w-[50px] h-[50px]'
                : 'px-6 h-[50px]'
        default:
            return ''
    }
})
</script>

<template>
    <template v-if="props.as === 'button'">
        <button :class="baseClass + ' ' + colorsClass + ' ' + sizeClass">
            <slot></slot>
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