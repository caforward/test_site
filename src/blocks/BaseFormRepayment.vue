<script setup>
import { ref, onBeforeMount, watch, onMounted, reactive, computed } from 'vue'
import BaseSliderDot from '@/blocks/BaseSliderDot.vue';
import BaseInput from './BaseInput.vue'
import { useFetchPost } from '@/composable/useFetch.js'

const emit = defineEmits(['submitted'])

const props = defineProps({
    inputs: {
        type: Array,
        required: true
    },
    grayForm: {
        type: Boolean,
        default: false
    }
})

// for form
const consent = ref(false)
const formIsValid = ref(false)
const formData = reactive({})
const formInputs = ref({})
const repaymentCalc = reactive({
    amount: {
        title: 'Сумма вашего долга:',
        value: ref(338000),
        min: 10000,
        max: 500000,
        step: 100,
    },
    period: {
        title: 'Срок погашения:',
        value: ref(6),
        min: 1,
        max: 24,
        step: 1,
    },
    monthlyPaymentDate: ref(0),
    monthlyPayment: ref(0)
})

// for inputs
const showErrorTrigger = ref(false)
const resetInputTrigger = ref(false)

// DOM elements
const formDOMElement = ref(null)
const consentDOMElement = ref(null)

function clearInputs() {
    props.inputs.forEach(input => {
        formData.value[input.name] = ''
        formInputs.value[input.name].isValid = false
    })
}

// Убрать в миксин потом
async function handleSubmit() {
    // Проверяеем наличие ошибок
    showErrorTrigger.value = true

    if (!consent.value) {
        consentDOMElement.value.classList.add('checkbox_error')

        setTimeout(() => {
            consentDOMElement.value.classList.remove('checkbox_error')
        }, 300)

        return
    }

    // Проверяем валидна ли форма
    console.log(formIsValid.value, 'form is valid')
    if (formIsValid.value) {
        // Отправляем данные на сервер
        const postData = new FormData()

        Object.keys(formData).forEach(key => {
            postData[key] = formData[key]
        })

        const response = useFetchPost("email.php", postData)

        if (response.ok) {
            console.log("Сообщение успешно отправлено");

            resetInputTrigger.value = true
            clearInputs()
            emit("submitted")
        } else {
            console.error("Ошибка при отправке сообщения");
        }
    }
}

function formatValue(number) {
    return new Intl.NumberFormat('ru-RU').format(number)
}

const getMonthlyPayment = computed(() => {
    const rawMonthlyPayment = repaymentCalc.amount.value / repaymentCalc.period.value
    repaymentCalc.monthlyPayment = rawMonthlyPayment.toFixed(2)
    return rawMonthlyPayment.toFixed()
})

onBeforeMount(() => {
    // Инициализация данных для валидации
    props.inputs.forEach(input => {
        if (input.value) {
            formData[input.name] = input.value
            formInputs.value[input.name] = { isValid: true, required: input.required }
        } else {
            formData[input.name] = ''
            formInputs.value[input.name] = { isValid: false, required: input.required }
        }

    })
})

onMounted(() => {
    if (props.grayForm) {
        formDOMElement.value.classList.add('form_gray')
    }
})

watch(
    () => formInputs,
    (inputs) => {
        const inputsNames = Object.keys(inputs.value)
        formIsValid.value = true

        const invalidInputs = inputsNames.find(inputName => inputs.value[inputName].required && !inputs.value[inputName].isValid)

        if (invalidInputs) {
            formIsValid.value = false
        }
        console.log(formData, formInputs.value)
    },
    { deep: true }
)
</script>

<template>
    <form ref="formDOMElement" action="" class="form" @submit.prevent="handleSubmit">
        <div v-if="$slots.beforeUserInputs">
            <slot name="beforeUserInputs"></slot>
        </div>
        <div class="form__inputs">
            <template v-for="(input, idx) in inputs" :key="idx">
                <BaseInput :name="input.name" :type="input.type" :placeholder="input.placeholder"
                    :required="input.required" :options="input.options" :disabled="input.disabled"
                    v-model:value="formData[input.name]" v-model:isValid="formInputs[input.name].isValid"
                    v-model:showError="showErrorTrigger" :resetInputTrigger="resetInputTrigger"
                    @update:resetInputTrigger="resetInputTrigger = $event" />
            </template>

            <div class="input-wrapper ">
                <input type="date" v-model="repaymentCalc.monthlyPaymentDate" class="input">
            </div>

            <div class="repayment-total">
                <span class="repayment-total__title">
                    Eжемесячный платеж:
                </span>
                <span class="repayment-total__value">
                    <strong>
                        {{ formatValue(getMonthlyPayment) }} ₽
                    </strong>
                </span>
            </div>

            <div class="slider-wrapper">
                <div class="slider__title">
                    <span>
                        {{ repaymentCalc.amount.title }}
                    </span>
                    <span>
                        <strong>
                            {{ formatValue(repaymentCalc.amount.value) }} ₽
                        </strong>
                    </span>
                </div>
                <BaseSliderDot v-model="repaymentCalc.amount.value" :min="repaymentCalc.amount.min"
                    :max="repaymentCalc.amount.max" :step="repaymentCalc.amount.step" />
                <div class="slider__tooltip">
                    <span>
                        от 10 000 ₽
                    </span>
                    <span>
                        до 500 000 ₽
                    </span>
                </div>
            </div>
            <div class="slider-wrapper">
                <div class="slider__title">
                    <span>
                        {{ repaymentCalc.period.title }}
                    </span>
                    <span>
                        <strong>
                            {{ formatValue(repaymentCalc.period.value) }}
                        </strong>
                    </span>
                </div>
                <BaseSliderDot v-model="repaymentCalc.period.value" :min="repaymentCalc.period.min"
                    :max="repaymentCalc.period.max" :step="repaymentCalc.period.step" />
                <div class="slider__tooltip">
                    <span>
                        от 1 месяца
                    </span>
                    <span>
                        до 24 месяцев
                    </span>
                </div>
            </div>
        </div>

        <div v-if="$slots.afterUserInputs">
            <slot name="afterUserInputs"></slot>
        </div>
        <div class="form-bottom">
            <div class="form-bottom-meta">
                <input ref="consentDOMElement" name="personal-data-agree-checkbox" type="checkbox"
                    class="checkbox form-bottom-meta__checkbox" v-model="consent">
                <label for="personal-data-agree-checkbox" class="form-bottom-meta__label">
                    Даю согласие на
                    <a href="#" class="link">обработку своих персональных данных</a>,
                    <a target="_blank" href="/policy" class="link">политика конфиденциальности</a>
                </label>
            </div>
            <button class="button button_blue form-bottom__button">
                Отправить
            </button>
        </div>
    </form>
</template>

<style lang="scss" scoped>
.slider {
    &__title {
        display: flex;
        align-items: flex-end;
        gap: 10px;
        margin-bottom: 25px;

        strong {
            font-size: 20px;
        }
    }

    &__tooltip {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        margin-top: 10px;
        font-weight: 400;
        font-size: 14px;
        line-height: 214%;
        color: $gray-dark;
    }
}

.repayment {
    &-total {
        display: flex;
        flex-direction: column;
        gap: 20px;

        &__title {}

        &__value {
            font-size: 24px;
        }
    }
}

.form {
    display: flex;
    flex-direction: column;
    gap: 30px;

    &_gray {
        :deep(.input-wrapper) {
            .input {
                background-color: #EAECEE;
                transition: background-color .2s, border-color .2s;

                &:focus {
                    background-color: white;
                }

                &_valid {
                    background-color: white;
                }
            }
        }
    }

    &__inputs {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    &__bottom {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    &-bottom {
        display: flex;
        flex-direction: column;
        gap: 20px;

        &-meta {
            display: flex;
            gap: 10px;

            &__checkbox {
                border: 1px solid $gray;
                transition: border-color .2s;

                &:checked {
                    border-color: $blue;
                }
            }

            &__label {
                font-weight: 400;
                font-size: 14px;
                line-height: 143%;

                .link {
                    display: inline;
                }
            }
        }

        &__button {
            width: 100%;
            max-width: 270px
        }
    }
}
</style>