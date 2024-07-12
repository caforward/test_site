<script setup>
import { ref, onBeforeMount, watch, onMounted, reactive, computed } from 'vue'
import BaseSliderDot from '@/blocks/BaseSliderDot.vue'
import BaseInput from './BaseInput.vue'
import { useFetchPost } from '@/composable/useFetch.js'
import Badge from 'primevue/badge';

const emit = defineEmits(['submitted'])

const props = defineProps({
    inputs: {
        type: Array,
        required: true
    },
    grayForm: {
        type: Boolean,
        default: false
    },
    additionalData: {
        type: Object,
        default: {}
    }
})

// for form
const consent = ref(false)
const formIsValid = ref(false)
const formData = reactive({})
const formInputs = ref({})
const paymentInputs = reactive([
    {
        name: 'paymentAmount',
        type: 'number',
        placeholder: 'Сумма вашего долга',
        value: 150000,
        required: true
    },
    {
        name: 'paymentPeriod',
        type: 'v-select',
        placeholder: 'Срок погашения',
        value: 6,
        options: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
        ],
        required: true
    },
    {
        name: 'paymentDate',
        type: 'date',
        value: new Date(),
        placeholder: 'Дата ежемесячного платежа',
        required: true
    },
])

// for inputs
const showErrorTrigger = ref(false)
const resetInputTrigger = ref(false)
const date = ref('')

// DOM elements
const formDOMElement = ref(null)
const consentDOMElement = ref(null)

function clearInputs() {
    resetInputTrigger.value = !resetInputTrigger.value

    props.inputs.forEach(input => {
        if (input.value) {
            formData[input.name] = input.value
            formInputs.value[input.name] = { isValid: true, required: input.required }
        } else {
            formData[input.name] = ''
            formInputs.value[input.name] = { isValid: false, required: input.required }
        }
    })
    console.log(formData)
}

const getPaymentMonthly = computed(() => {
    let monthly = (formData.paymentAmount / formData.paymentPeriod).toFixed(2)
    monthly = Number(monthly)

    if (isNaN(monthly)) {
        return 0
    }

    return monthly
})

const getPaymentMonthlyDiscount = computed(() => {
    return (formData.paymentMonthlyFull * 0.95).toFixed(2)
})

function getCalendarDate(instanceDate) {
    const date = new Date(instanceDate)

    let day = date.getDate()
    let month = date.getMonth()
    const year = date.getFullYear()

    day = day < 10 ? `0${day}` : day
    month = month < 10 ? `0${month}` : month

    return `${day}.${month}.${year}`
}

// Убрать в composable потом
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
    if (formIsValid.value) {

        // получаем дополнительные данные если есть
        Object.keys(props.additionalData).forEach((key) => {
            formData.value[key] = props.additionalData[key]
        })

        // Отправляем данные на сервер
        const postData = new FormData()

        Object.keys(formData).forEach(key => {
            if (key === 'paymentDate') {
                const date = getCalendarDate(formData.paymentDate)
                postData.append(key, date)
            } else {
                postData.append(key, formData[key])
            }
        })
        clearInputs()

        const response = await fetch("email.php", {
            method: "POST",
            body: postData
        })

        if (response.ok) {
            console.log("Сообщение успешно отправлено");

            resetInputTrigger.value = true
            emit("submitted")
        } else {
            console.error("Ошибка при отправке сообщения");
        }
    }
}

function formatValue(number) {
    return new Intl.NumberFormat('ru-RU').format(number)
}

function addInputsToDataByMessageType(messageType) {
    if (messageType === 'Рассрочка') {
        paymentInputs.forEach(input => {
            if (input.value) {
                formData[input.name] = input.value
                formInputs.value[input.name] = { isValid: true, required: input.required }
            } else {
                formData[input.name] = ''
                formInputs.value[input.name] = { isValid: false, required: input.required }
            }
        })

        formData.paymentMonthlyFull = getPaymentMonthly
        formData.paymentMonthlyDiscount = getPaymentMonthlyDiscount
    } else {
        paymentInputs.forEach(input => {
            delete formData[input.name]
            delete formInputs.value[input.name]
        })
    }
}

onBeforeMount(() => {
    // Инициализация данных для валидации
    clearInputs()
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
    },
    { deep: true }
)

watch(
    () => formData.messageType,
    (messageType) => {
        addInputsToDataByMessageType(messageType)
    }
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
            <div v-if="formData.messageType === 'Рассрочка'" class="form-installment">
                <div class="form-installment-title">
                    <span>
                        Сумма ежемесячного платежа
                    </span>
                    <span class="form-installment-title-amount">
                        <strong class="form-installment-title-amount__full">
                            {{ formatValue(formData.paymentMonthlyFull) }} ₽
                        </strong>
                        <i class="pi pi-arrow-right"></i>
                        <div class="form-installment-title-amount__discount">
                            <strong>
                                {{ formatValue(formData.paymentMonthlyDiscount) }} ₽
                            </strong>
                            <Badge value="-5%" severity="info" />
                        </div>
                    </span>
                </div>
                <template v-for="(input, idx) in paymentInputs" :key="idx">

                    <BaseInput v-model:value="formData[input.name]" :name='input.name' :type='input.type'
                        :placeholder='input.placeholder' :required="input.required" :options="input.options"
                        v-model:showError='showErrorTrigger' :resetInputTrigger='resetInputTrigger'
                        @update:resetInputTrigger='resetInputTrigger = $event'>

                        <template #inputTitle>
                            {{ input.placeholder }}
                        </template>
                    </BaseInput>
                </template>
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
        gap: 10px;
        margin-bottom: 25px;
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
                transition: border-color .2s, background-color .3s;

                &.checkbox_error {
                    background-color: #FF6464;
                }

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

    &-installment {
        display: flex;
        flex-direction: column;
        gap: 15px;

        &-title {
            display: flex;
            font-size: 18px;
            flex-direction: column;
            gap: 15px;
            font-weight: 500;

            &-amount {
                display: flex;
                align-items: center;
                gap: 15px;

                &__discount {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 20px;
                }

                &__full {
                    font-size: 20px;
                    color: $gray-dark;
                    text-decoration: line-through;
                }
            }
        }
    }
}

@include laptop {
    .form {
        &-installment {
            &-title {
                font-size: 16px;
                gap: 10px;

                &-amount {
                    font-size: 18px;
                }
            }
        }
    }
}
</style>