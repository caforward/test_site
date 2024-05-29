<template>
    <div>
        <input :type="props.parameters.type" :name="props.parameters.name" :placeholder="props.parameters.placeholder">
        <span v-if="!input.isValid">
            {{ input.error }}
        </span>
    </div>
</template>

<script setup>
import { defineComponent, reactive } from 'vue'

const props = defineProps({
    parameters: {
        type: {
            type: String,
            default: 'text'
        },
        name: {
            type: String,
            default: 'name'
        },
        placeholder: {
            type: String,
            default: 'Введите текст'
        },
    }
})

const input = reactive({
    error: '',
    isValid: false
})
</script>

<style lang="scss" scoped></style>