<script setup>
// imports
import { ref, onBeforeMount, watch, onMounted, reactive, computed } from 'vue'
import BaseInput from './ui/BaseInput.vue'
import Badge from 'primevue/badge';
import Checkbox from 'primevue/checkbox';

// composables

import { useFetchPost } from '@/composable/useFetch.js'
import { getDottedDate } from '@/composable/useCalendar.js'
import { useValueFormat } from '@/composable/useValueFormat.js'
import BaseInstallment from './BaseInstallment.vue';

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
const formInputs = reactive({})
const formDOMElement = ref(null)

const inputRefs = ref(null)
const consent = ref(null)
const response = ref(null)

const consentInvalid = (computed(() => {
    if (consent.value === null) {
        return null
    }

    return !consent.value
}))


function isFormValid() {
    const invalidInputs = inputRefs.value.filter(inputRef => !inputRef.readyToSubmit)

    if (consent.value === null) {
        consent.value = false
    }

    if (invalidInputs.length || consentInvalid.value) {
        // Показать пользователю ошибки на инпутах
        invalidInputs.forEach(inputRef => {
            inputRef.showErrorHandler()
            console.log(inputRef.inputName, inputRef.readyToSubmit)
        })

        if (consentInvalid.value) {
            console.log('consent', consent.value)
        }

        return false
    } else {
        return true
    }
}

function submitForm() {
    if (isFormValid()) {
        const formData = new FormData()

        Object.keys(formInputs).forEach(key => {
            if (key === 'messageType') {
                formData.append(key, formInputs[key].value.name)
            } else {
                formData.append(key, formInputs[key].value)
            }
        })

        // formData.entries().forEach(key => {
        //     console.log(key)
        // })

        response.value = fetch('/email.php', {
            method: 'POST',
            body: formData
        })

        emit('submitted', response.value)

        console.log('submit')
    } else {
        console.log('form is not valid')
    }
}

onBeforeMount(() => {
    props.inputs.forEach(input => {
        formInputs[input.name] = {
            value: input.value ? input.value : '',
            isValid: input.value ? true : false,
            required: input.required ? true : false,
        }
    })
})

onMounted(() => {
    if (props.grayForm) {
        formDOMElement.value.classList.add('form_gray')
    }
})

// watchers
watch(
    () => formInputs,
    (value) => {
        // console.log('changed', value)
    },
    {
        deep: true,
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
                    <BaseInput ref="inputRefs" v-model="formInputs[input.name].value" :name="input.name"
                        :type="input.type" :placeholder="input.placeholder" :required="input.required"
                        :disabled="input.disabled" :options="input.options" />
                </template>

                <!-- installment info -->
                <!-- <BaseInstallment /> -->

                <!-- <div v-if="formData.messageType === false" class="form-installment"> -->
                <!-- <div class="form-installment-title">
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
                    </div> -->

                <!-- installment inputs -->
                <!-- <template v-for="(input, idx) in paymentInputs" :key="idx">

                        <BaseInput v-model:value="formData[input.name]" :name='input.name' :type='input.type'
                            :placeholder='input.placeholder' :required="input.required" :options="input.options"
                            v-model:showError='showErrorTrigger' :resetInputTrigger='resetInputTrigger'
                            @update:resetInputTrigger='resetInputTrigger = $event'>

                            <template #inputTitle>
                                {{ input.placeholder }}
                            </template>
                        </BaseInput>

                    </template> -->
                <!-- </div> -->
            </div>

            <div v-if="$slots.afterUserInputs">
                <slot name="afterUserInputs"></slot>
            </div>
            <div class="form-bottom">
                <div class="form-bottom-meta">
                    <Checkbox :invalid="consentInvalid" inputId="form-input-consent" v-model="consent" :binary="true" />
                    <label for="form-input-consent" class="form-bottom-meta__label">
                        Даю согласие на
                        <a href="#" class="link">обработку своих персональных данных</a>,
                        <a target="_blank" href="/policy" class="link">политика конфиденциальности</a>
                    </label>
                </div>
                <button class="button button_blue form-bottom__button" @click.prevent="submitForm">
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