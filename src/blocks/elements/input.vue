<template>
    <div>
        <input :name="name" :type="type" :placeholder="placeholder" :class="input.class" v-model="input.value">
        <span v-if="!input.isValid">
            {{ input.error }}
        </span>
    </div>
</template>

<script setup>
import { defineComponent, reactive } from 'vue'

const props = defineProps({
    name: {
        type: String,
        default: 'name'
    },
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: 'Введите текст'
    },
    value: {
        type: String,
        default: ''
    }
})

const input = reactive({
    error: '',
    isValid: false,
    class: 'input',
    value: ''
})
</script>

<style lang="scss" scoped></style>