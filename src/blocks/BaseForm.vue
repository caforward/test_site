<script setup>
import { ref, onBeforeMount, watch } from 'vue'
import BaseInput from './BaseInput.vue'

const emit = defineEmits(['submitted'])

const props = defineProps({
    inputs: {
        type: Array,
        required: true
    },
})

const consent = ref(false)
const formIsValid = ref(false)

const checkErrorTrigger = ref(true)
const resetInputTrigger = ref(false)
const consentDOMElement = ref(null)

const formData = ref(new FormData())
const formInputs = ref({})

function clearInputs() {
    props.inputs.forEach(input => {
        formData.value[input.name] = ''
        formInputs.value[input.name].isValid = false
    })
}

// Убрать в миксин потом
async function handleSubmit() {
    // Проверяеем наличие ошибок
    checkErrorTrigger.value = !checkErrorTrigger.value

    if (!consent.value) {
        consentDOMElement.value.classList.add('checkbox_error')

        setTimeout(() => {
            consentDOMElement.value.classList.remove('checkbox_error')
        }, 300)

        return
    }

    // Проверяем валидна ли форма
    if (formIsValid.value) {
        // Отправляем данные на сервер
        try {
            const response = await fetch("email.php", {
                method: "POST",
                body: formData.value
            });

            if (response.ok) {
                console.log("Сообщение успешно отправлено");

                resetInputTrigger.value = true

                clearInputs()
                emit("submitted")
            } else {
                console.error("Ошибка при отправке сообщения");
            }
        } catch (error) {
            console.error("Ошибка при отправке сообщения:", error);
        }
    }
}

onBeforeMount(() => {
    // Инициализация данных для валидации
    props.inputs.forEach(input => {
        formData.value[input.name] = ''
        formInputs.value[input.name] = { isValid: false, required: input.required }
    })
})

watch(
    () => formInputs,
    (inputs) => {
        const inputsNames = Object.keys(inputs)
        formIsValid.value = true

        inputsNames.forEach(name => {
            if (inputs[name].required && !inputs[name].isValid) {
                formIsValid.value = false
            }
        })
    },
    { deep: true }
)
</script>

<template>
    <form action="" class="form form_gray" @submit.prevent="handleSubmit">
        <div class="form__inputs">
            <template v-for="(input, idx) in inputs" :key="idx">
                <BaseInput :name="input.name" :type="input.type" :placeholder="input.placeholder"
                    :required="input.required" :value="input.value" :options="input.options" :disabled="input.disabled"
                    @update:value="formData[input.name] = $event"
                    @update:isValid="formInputs[input.name].isValid = $event" :showErrorHandler="checkErrorTrigger"
                    :resetInputHandler="resetInputTrigger" @update:resetInputHandler="resetInputTrigger = $event" />
            </template>
        </div>
        <div class="form__bottom">
            <div class="form-meta">
                <input ref="consentDOMElement" id="personal-data-agree-checkbox" type="checkbox"
                    class="checkbox form-meta__checkbox" v-model="consent">
                <label for="personal-data-agree-checkbox" class="form-meta__label">
                    Даю согласие на
                    <a href="#" class="link">обработку своих персональных данных</a>,
                    <a target="_blank" href="/policy" class="link">политика конфиденциальности</a>
                </label>
            </div>
            <button class="button button_blue form__button">
                Отправить
            </button>
        </div>
    </form>
</template>

<style lang="scss" scoped>
.form {

    &_gray {
        :deep(.input-wrapper) {
            .input {
                background-color: #EAECEE;
                transition: background-color .2s, border-color .2s;
            }
        }
    }

    &__inputs {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
}
</style>