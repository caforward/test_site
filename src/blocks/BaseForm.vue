<script setup>
// imports
import { ref, onBeforeMount, watch, onMounted, reactive, computed } from 'vue'
import BaseSliderDot from '@/blocks/BaseSliderDot.vue'
import BaseInput from './BaseInput.vue'
// import OverlayThank from '@/layouts/OverlayThank.vue';
import Badge from 'primevue/badge';

// composables

// import { useFetchPost } from '@/composable/useFetch.js'
import { getDottedDate } from '@/composable/useCalendar.js'
import { useValueFormat } from '@/composable/useValueFormat.js'

// variables

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
const overlayVisible = ref(false)
const response = ref(null)
const consent = ref(false)
const formIsValid = ref(false)
const formData = reactive({})
const formInputs = ref({})

const paymentPeriodRange = computed(() => {
    const discount = 0.95
    const minMontlyPayment = 1500
    const maxPeriod = 24

    const getPeriods = (N) => [...Array(N).keys()].map(i => i + 1)
    let periods = getPeriods(maxPeriod)

    if (formData.paymentAmount) {
        let maxAvailablePeriod = Math.floor(formData.paymentAmount/(minMontlyPayment/discount))
        maxAvailablePeriod = maxAvailablePeriod === 0 ? 1 : maxAvailablePeriod

        if (maxAvailablePeriod < maxPeriod) {
            periods = getPeriods(maxAvailablePeriod)
        }
    }

    return periods
})

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
        options: ref(paymentPeriodRange),
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


// DOM elements
const formDOMElement = ref(null)
const consentDOMElement = ref(null)

// functions

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
                const date = getDottedDate(formData.paymentDate)
                postData.append(key, date)
            } else {
                postData.append(key, formData[key])
            }
        })

        response.value = await fetch("email.php", {
            method: "POST",
            body: postData
        })

        if (response.value.ok) {
            console.log("Сообщение успешно отправлено");
            
            resetInputTrigger.value = true
            clearInputs()
            emit("submitted")
        } else {
            console.error("Ошибка при отправке сообщения");
        }
    }
}

function clearInputs() {
    props.inputs.forEach(input => {
        if (input.value) {
            formData[input.name] = input.value
            formInputs.value[input.name] = { isValid: true, required: input.required }
        } else {
            formData[input.name] = ''
            formInputs.value[input.name] = { isValid: false, required: input.required }
        }
    })
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

function showOverlay() {
    console.log(response.value.status)
    overlayVisible.value = true
}

// hooks

onBeforeMount(() => {
    // Инициализация данных для валидации
    clearInputs()
})

onMounted(() => {
    if (props.grayForm) {
        formDOMElement.value.classList.add('form_gray')
    }
})

// watchers

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
        <div class="form-container">
            <div v-if="$slots.beforeUserInputs">
                <slot name="beforeUserInputs"></slot>
            </div>
            <div class="form__inputs">

                <!-- user info -->
                <template v-for="(input, idx) in inputs" :key="idx">
                    <BaseInput :name="input.name" :type="input.type" :placeholder="input.placeholder"
                        :required="input.required" :options="input.options" :disabled="input.disabled"
                        v-model:value="formData[input.name]" v-model:isValid="formInputs[input.name].isValid"
                        v-model:showError="showErrorTrigger" v-model:resetInput="resetInputTrigger" />
                </template>

                <!-- installment info -->
                <div v-if="formData.messageType === 'Рассрочка'" class="form-installment">
                    <div class="form-installment-title">
                        <span>
                            Сумма ежемесячного платежа
                        </span>
                        <span class="form-installment-title-amount">
                            <strong class="form-installment-title-amount__full">
                                {{ useValueFormat(formData.paymentMonthlyFull) }} ₽
                            </strong>
                            <i class="pi pi-arrow-right"></i>
                            <div class="form-installment-title-amount__discount">
                                <strong>
                                    {{ useValueFormat(formData.paymentMonthlyDiscount) }} ₽
                                </strong>
                                <Badge value="-5%" severity="info" />
                            </div>
                        </span>
                    </div>

                    <!-- installment inputs -->
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
    &-container {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

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