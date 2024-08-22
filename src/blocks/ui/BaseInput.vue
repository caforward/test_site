<script setup>
import DatePicker from 'primevue/datepicker';
import FloatLabel from 'primevue/floatlabel';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import { onMounted, ref, watch, computed } from 'vue';

const props = defineProps({
    name: {
        type: String,
        default: 'name'
    },
    type: {
        type: String,
        default: 'text',
    },
    placeholder: {
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    options: {
        type: Array,
        default: []
    },
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: undefined
    }
})

const value = defineModel()
const isInvalid = ref(null)

const input = ref(null)
const inputName = ref(null)
const errorText = ref('Заполните поле')
const showError = ref(false)

const readyToSubmit = (computed(() => {
    if (props.required) {

        if (isInvalid.value === null) {
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

        showError.value = true
    }
}

defineExpose({
    input,
    inputName,
    readyToSubmit,
    showErrorHandler
})

onMounted(() => {
    inputName.value = props.name

    if (value.value) {
        isInvalid.value = false
        showError.value = true
        errorText.value = ''
    }
})

function validateInputValue(inputValue) {

    if (props.required) {

        if (props.name === 'name') {
            validateInputUserName(inputValue)
        }
        else if (props.type === 'email') {
            validateInputEmail(inputValue)
        }
        else if (props.type === 'tel') {
            validateInputTel(inputValue)
        }
        else {
            isEmpty(inputValue)
        }

    } else {
        console.log('no validation')
    }
}

function validateInputUserName(value) {
    const hasAtLeastTwoWords = /\D{2,}\s+\D{2,}/g.test(value)

    if (value && hasAtLeastTwoWords) {
        isInvalid.value = false
        errorText.value = ''
    } else {
        isInvalid.value = true
        errorText.value = 'Заполните поле'
    }
}

function validateInputEmail(value) {
    if (value) {
        isInvalid.value = false
        errorText.value = ''
    } else {
        isInvalid.value = true
        errorText.value = 'Заполните поле'
    }
}

function validateInputTel(value) {
    if (input.value.isCompleted()) {
        isInvalid.value = false
        errorText.value = ''
    } else {
        isInvalid.value = !input.value.isCompleted()
        errorText.value = 'Заполните поле'
    }
}

function isEmpty(value) {
    if (!!value) {
        isInvalid.value = false
        errorText.value = ''
    } else {
        isInvalid.value = true
        errorText.value = 'Заполните поле'
    }
}

</script>

<template>
    <div class="relative flex flex-col gap-1">
        <slot name="inputTitle"></slot>
        <!-- ФИО -->
        <InputText ref="input" v-if="props.type === 'text'" :invalid="isInvalid" v-model="value" type="text"
            class="w-full" :placeholder="props.placeholder" :disabled='props.disabled'
            @update:modelValue="validateInputValue" @blur="showErrorHandler" />

        <!-- E-mail -->
        <InputText ref="input" v-if="props.type === 'email'" :invalid="isInvalid" v-model="value" type="email"
            class="w-full" :placeholder="props.placeholder" :disabled='props.disabled'
            @update:modelValue="validateInputValue" @blur="showErrorHandler" />

        <!-- Number -->
        <InputNumber ref="input" v-if="props.type === 'number'" :invalid="isInvalid" v-model="value" type="email"
            class="w-full" :placeholder="props.placeholder" :disabled='props.disabled'
            @update:modelValue="validateInputValue" @blur="showErrorHandler" :minFractionDigits="0"
            :maxFractionDigits="2" />

        <!-- Телефон -->
        <InputMask ref="input" v-if="props.type === 'tel'" :invalid="isInvalid" v-model="value" type="tel"
            class="w-full" mask="+7 999 999-99-99" :autoClear="false" :placeholder="props.placeholder"
            :disabled='props.disabled' @update:modelValue="validateInputValue" @blur="showErrorHandler" />

        <!-- Select -->
        <Select ref="input" v-if="props.type === 'select'" :invalid="isInvalid" v-model="value" class="w-full"
            :options="options" optionLabel="name" :placeholder="props.placeholder" showClear :disabled='props.disabled'
            @update:modelValue="validateInputValue" @blur="showErrorHandler" />

        <!-- Textarea -->
        <Textarea ref="input" v-if="props.type === 'textarea'" :invalid="isInvalid" v-model="value" type="textarea"
            class="w-full max-h-48 min-h-28" :placeholder="props.placeholder" :disabled='props.disabled'
            @update:modelValue="validateInputValue" @blur="showErrorHandler" />

        <!-- Date picker -->
        <DatePicker ref="input" v-if="props.type === 'date'" :invalid="isInvalid" v-model="value" showIcon fluid
            iconDisplay="input" :placeholder="props.placeholder" :disabled='props.disabled'
            @update:modelValue="validateInputValue" @blur="showErrorHandler" :minDate="new Date()" />

        <!-- Ошибка инпута -->
        <transition name="fade">
            <span v-if="showError"
                class="absolute bottom-0 left-0 w-full bg-red-400 px-5 text-xs text-white rounded-b-md">
                {{ errorText }}
            </span>
        </transition>
    </div>
</template>
