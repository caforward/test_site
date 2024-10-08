<script setup>
import { defineComponent, onBeforeMount, onMounted, onUpdated, reactive, watch } from 'vue'
import DatePicker from 'primevue/datepicker'

const emit = defineEmits(['error', 'update:resetInputTrigger'])

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
    },
    required: {
        type: Boolean,
        default: false
    },
    options: {
        type: Array,
        default: []
    },
    disabled: {
        type: Boolean,
        default: false
    },
    resetInputTrigger: {
        type: Boolean,
        default: false
    }
})

const value = defineModel('value')
const isValid = defineModel('isValid')
const showError = defineModel('showError')
const resetInput = defineModel('resetInput')

const input = reactive({
    error: '',
    isValid: false,
    value: value.value,
    defaultClass: 'input',
    validClass: 'input_valid',
    errorClass: 'input_error',
    class: [],
})

onBeforeMount(() => {
    input.class.push(input.defaultClass)
    
    if (props.value) {
        updateInputState()
    }
})

// emit value и isValid инпута 
// для дальнейшего перехвата значений в родительском компоненте
onMounted(() => {
    input.value = value.value
    isValid.value = input.isValid
})

// Вызывает функцию обновления состояния инпута - updateStateInput
// и emit обновления value и isValid инпута
// для дальнейшего перехвата значений в родительском компоненте
watch(
    () => input.value,
    () => {
        updateInputState()

        value.value = input.value
        isValid.value = input.isValid
    },
)

// Вызывает функцию обновления состояния инпута - updateStateInput
// когда props.showErrorTrigger изменяется
watch(
    () => showError.value,
    () => {
        updateInputState()
    }
)

watch(
    () => resetInput.value,
    () => {
        resetInputHandler()
    }
)

watch(
    () => props.options,
    (options) => {
        if (input.value && !options.includes(input.value)) {
            input.value = options[options.length - 1]
        }
    }
)

// обновляет текст ошибки инпута и класс видимости ошибки
// emits событие @error для перехвата в родительском компоненте
function updateInputState() {
    input.error = checkInputError()

    if (input.error) {
        input.isValid = false
    } else {
        input.isValid = true
    }

    if (props.resetInputTrigger) {
        resetInputHandler()
        return
    }

    if (!input.isValid) {
        emitError()

        input.class = [input.defaultClass]

        if (props.required) {
            input.class = [input.defaultClass, input.errorClass]
        }
    }
    else if (input.isValid) {
        input.class = [input.defaultClass, input.validClass]
    }
}

function emitError() {
    emit('error', {
        error: input.error,
        isValid: input.isValid,
        value: input.value
    })
}

// Функция для сброса инпута
function resetInputHandler() {
    if (!props.disabled) {
        input.error = ''

        input.value = value.value

        if (input.isValid) {
            input.class = [input.defaultClass, input.validClass]
        } else {
            input.class = [input.defaultClass]
        }

        resetInput.value = false
        emit('update:resetInputTrigger', false)
    }
}

// Главная функция для проверки инпутов
function checkInputError() {
    if (!input.value) {
        return 'Заполните поле'
    }
    if (props.type === 'text') {
        return checkTextInputErrors()
    }
    if (props.type === 'tel') {
        return checkTelInputErrors()
    }
}

// Проверки на ошибки в зависимости от типа инпута
function checkTextInputErrors() {
    if (props.name === 'name' && !/\D{2,}\s+\D{2,}/g.test(input.value)) {
        return 'Имя и Фамилия должны содержать минимум 2 буквы'
    }

    return ''
}

function checkTelInputErrors() {
    if (input.value.length < 18) {
        return 'Заполните поле'
    }

    return ''
}

</script>

<template>
    <div class="input-wrapper">
        <div v-if="$slots.inputTitle" class="input-title">
            <slot name="inputTitle"></slot>
        </div>

        <v-select v-if="props.type === 'v-select'" :name="name" :class="input.class" :placeholder="placeholder"
            :options="props.options" v-model="input.value" :disabled="props.disabled" />

        <DatePicker v-else-if="props.type === 'date'" v-model="input.value" dateFormat="dd.mm.yy" showIcon
            iconDisplay="input" :manualInput="false" :minDate="new Date()" :name="input.name" :placeholder="placeholder"
            :class="input.class" :disabled="props.disabled" />

        <input v-else-if="props.type === 'tel'" :name="name" :type="type" :placeholder="placeholder"
            :class="input.class" v-model.trim="input.value" v-mask="'+7 (###) ###-##-##'" :disabled="props.disabled">

        <textarea v-else-if="props.type === 'textarea'" :name="name" :type="type" :placeholder="placeholder"
            :class="input.class" v-model.trim="input.value" :disabled="props.disabled"></textarea>

        <input v-else :name="name" :type="type" :placeholder="placeholder" :class="input.class"
            v-model.trim="input.value" :disabled="props.disabled">

        <span v-if="props.required && input.error" class="input-wrapper__error">
            {{ input.error }}
        </span>
    </div>
</template>

<style lang="scss" scoped>
textarea {
    resize: vertical;
    min-height: 50px;
    height: 100px;
    max-height: 160px;
}

.input {
    border: 1px solid transparent;
    transition: border-color .2s;

    &:focus {
        border-color: $blue;
    }

    &_valid {
        border-color: $blue;
    }

    &_error {
        border-color: #FF6464;
    }

    &-title {
        font-size: 14px;
    }

    &-wrapper {
        display: flex;
        gap: 5px;
        flex-direction: column;
        position: relative;
        border-radius: 5px;

        &__error {
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            display: flex;
            align-items: center;
            padding: 0 20px;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 1;
            width: 100%;
            background-color: #FF6464;
            height: 18px;
            font-size: 12px;
            color: #fff;
            transition: visibility .2s, opacity .2s;
        }
    }
}

:deep(.v-select) {
    &.input {
        @extend %input
    }

    &.vs {
        &--disabled {
            & .vs {
                &__dropdown-toggle {
                    background-color: transparent;
                }

                &__search {
                    background-color: transparent;
                }

                &__open-indicator {
                    background-color: transparent;
                }

                &__actions {
                    display: none;
                }
            }
        }
    }

    .vs {
        &__dropdown-toggle {
            padding: 0;
            margin: 0;
            border: none;
        }

        &__selected-options {
            padding: 0;
        }

        &__search {
            padding: 0;
            margin: 0;
            border: none;
            line-height: unset;
            font-size: unset;
            color: unset;

            &::placeholder {
                color: $gray-dark;
            }
        }

        &__selected {
            margin: 0;
            padding: 0;
        }
    }
}
</style>