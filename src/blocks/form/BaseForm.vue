<script setup>
// imports
import { ref, onBeforeMount, watch, onMounted, reactive, computed } from 'vue'

import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import BaseFormInstallment from './BaseFormInstallment.vue';
import BaseInput from '../ui/BaseInput.vue';
import BaseFormComplaint from './BaseFormComplaint.vue';

// composables
import { useFormValidation, createFormData } from '@/composable/useForm.js'

// variables

const emit = defineEmits(['submitted'])

const props = defineProps({
    showTitle: {
        type: Boolean,
        default: false,
    },
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
const additionalFormBlock = ref(null)
const additionalInput = ref(null)
const formDOMElement = ref(null)
const inputRefs = ref(null)
const consent = ref(null)

// functions

const consentInvalid = (computed(() => {
    if (consent.value === null) {
        return null
    }

    return !consent.value
}))

function submitForm() {
    let formInputRefs = [...inputRefs.value]

    if (additionalFormBlock.value) {
        formInputRefs.push(...additionalFormBlock.value.inputRefs)
    }

    if (additionalInput.value) {
        formInputRefs.push(additionalInput.value)
    }

    const isFormValid = useFormValidation(formInputRefs, consent)

    if (isFormValid) {
        const formData = createFormData(formInputRefs)

        // emit('submitted', formData)
    } else {
        console.log('form is not valid')
    }
}

// hooks

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

</script>

<template>
    <div v-if="props.showTitle">
        <template v-if="!formInputs.messageType || !formInputs.messageType.value">
            <div class="sm:text-2xl text-xl font-bold mb-5">
                Заполните поля в форме ниже, и мы свяжемся с Вами. 
            </div>
        </template>
        <template v-else>
            <template v-if="formInputs.messageType.value.code === 'installment'">
                <div class="sm:text-2xl text-xl font-bold mb-5">
                    Получить рассрочку
                </div>
            </template>
            <template v-else-if="formInputs.messageType.value.code === 'callback'">
                <div class="sm:text-2xl text-xl font-bold mb-2">
                    Заказать звонок
                </div>
                <p class="sm:text-base text-sm mb-6 font-normal">
                    Просто введите свои контактные данные и ждите, когда Мы свяжемся с Вами, чтобы
                    проконсультировать по
                    вашей финансовой ситуации.
                </p>
            </template>
            <template v-else>
                <div class="sm:text-2xl text-xl font-bold mb-5">
                    Заполните поля в форме ниже, и мы свяжемся с Вами.
                </div>
            </template>
        </template>
    </div>

    <form ref="formDOMElement" action="" class="form" @submit.prevent="handleSubmit">
        <div class="form-container">
            <div v-if="$slots.beforeUserInputs">
                <slot name="beforeUserInputs"></slot>
            </div>
            <div class="form__inputs">

                <!-- user info -->
                <template v-for="(input, idx) in inputs" :key="idx">
                    <BaseInput ref="inputRefs" v-model="formInputs[input.name].value" class="input__wrapper"
                        :name="input.name" :type="input.type" :placeholder="input.placeholder"
                        :required="input.required" :disabled="input.disabled" :options="input.options" />
                </template>

                <template v-if="formInputs.messageType && formInputs.messageType.value">

                    <!-- installment block -->
                    <template v-if="formInputs.messageType.value.code === 'installment'">
                        <BaseFormInstallment ref="additionalFormBlock" />
                    </template>

                    <!-- complaint block -->
                    <template v-else-if="formInputs.messageType.value.code === 'complaint'">
                        <BaseFormComplaint ref="additionalFormBlock" />
                    </template>

                    <!-- default -->
                    <template v-else>
                        <BaseInput ref="additionalInput" type="textarea" name="message"
                            placeholder="Кратко опишите Ваш вопрос*" />
                    </template>
                </template>
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
                <Button class="sm:w-fit w-full min-w-60" label="Отправить" size="large" @click.prevent="submitForm" />
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