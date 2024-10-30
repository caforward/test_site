<script setup>
import Checkbox from 'primevue/checkbox';
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
    checkboxId: {
        type: String,
        required: true
    },
    binary: {
        type: Boolean,
        default: true
    },
    required: {
        type: Boolean,
        default: false
    },
    checkboxName: {
        type: String,
        default: 'checkbox'
    }
})

const value = defineModel()
const input = ref(null)
const inputName = ref(null)
const isInvalid = ref(null)

const readyToSubmit = (computed(() => {
    if (props.required) {

        if (value.value === null) {
            return false
        } else {
            return !isInvalid.value
        }

    } else {
        return true
    }
}))

function showErrorHandler() {
    if (props.required) {
        if (isInvalid.value === null) {
            isInvalid.value = true
        }
    }
}

defineExpose({
    input,
    value,
    inputName,
    readyToSubmit,
    showErrorHandler
})

function checkboxChanged() {
    if (value.value) {
        isInvalid.value = true
    } else {
        isInvalid.value = false
    }
}

onMounted(() => {
    inputName.value = props.checkboxName
    // console.log('checkbox', value.value)
})
</script>

<template>
    <div class="flex gap-2">
        <Checkbox ref="input" :inputId="checkboxId" v-model="value" :invalid="isInvalid" :binary="true"
            :name="checkboxName" @change="checkboxChanged" />

        <label :for="checkboxId">
            <slot name="label"></slot>
        </label>
    </div>
</template>