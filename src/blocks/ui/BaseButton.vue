<script setup>
import { onMounted, ref } from 'vue';

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
})

const defaultClass = ref('font-medium border rounded-full transition-colors hover:cursor-pointer')
const colorsClass = ref(null)
const sizeClass = ref(null)

function setButtonStyle() {
    switch (props.severity) {
        case 'primary':
            colorsClass.value = 'border-sky-500 bg-sky-500 text-white hover:bg-cyan-500 hover:border-cyan-500 active:bg-cyan-600 active:border-cyan-600'
            break;
        case 'secondary':
            colorsClass.value = 'border-slate-100 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-700 hover:border-slate-200 active:bg-slate-300 active:border-slate-300 active:text-slate-800'
            break;
        default:
            colorsClass.value = ''
    }

    switch (props.size) {
        case 'medium':
            sizeClass.value = 'px-3 py-2'
            break;
        case 'large':
            sizeClass.value = 'px-7 py-2.5 text-lg'
            break;
        default:
            sizeClass.value = ''
    }
}

onMounted(() => {
    setButtonStyle()
})
</script>

<template>
    <template v-if="props.as === 'button'">
        <button :class="defaultClass + ' ' + colorsClass + ' ' + sizeClass">
            <slot></slot>
        </button>
    </template>

    <template v-else-if="props.as === 'link'">
        <a :href="props.to" :class="defaultClass + ' ' + colorsClass + ' ' + sizeClass">
            <slot></slot>
        </a>
    </template>

    <template v-else-if="props.as === 'router-link'">
        <router-link :to="props.to" :class="defaultClass + ' ' + colorsClass + ' ' + sizeClass">
            <slot></slot>
        </router-link>
    </template>
</template>