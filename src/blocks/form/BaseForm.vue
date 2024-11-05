<script setup>
// imports
import { ref, onBeforeMount, watch, onMounted, reactive, computed } from 'vue'

import BaseButton from '../ui/BaseButton.vue';
import Checkbox from 'primevue/checkbox';
import BaseFormInstallment from './BaseFormInstallment.vue';
import BaseInput from '../ui/BaseInput.vue';
import BaseFormComplaint from './BaseFormComplaint.vue';
import BaseCheckbox from '../ui/BaseCheckbox.vue';

// composables
import { useInputValidation, createFormData } from '@/composable/useForm.js'

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
const inputRefs = ref(null)
const formInputs = reactive({})

const additionalFormBlock = ref(null)
const additionalInput = ref(null)

const consentRef = ref(null)
const consentValue = ref(null)

const formDOMElement = ref(null)

// functions

function submitForm() {
    // collect input refs from form
    let formInputRefs = [...inputRefs.value]

    if (additionalFormBlock.value) {
        formInputRefs.push(...additionalFormBlock.value.inputRefs)
    }
    if (additionalInput.value) {
        formInputRefs.push(additionalInput.value)
    }

    // check inputs validation and emit submit
    const isFormValid = useInputValidation([consentRef.value, ...formInputRefs])

    if (isFormValid) {
        const formData = createFormData(formInputRefs)

        emit('submitted', formData)
    } else {
        // console.log('form is not valid')
    }
}

// hooks

onBeforeMount(() => {
    props.inputs.forEach(input => {
        formInputs[input.name] = {
            value: input.value ? input.value : '',
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
    <!-- form title, choosed by message type select -->
    <div v-if="props.showTitle">
        <!-- default title -->
        <template v-if="!formInputs.messageType || !formInputs.messageType.value">
            <div class="sm:text-2xl text-xl font-bold mb-5">
                Заполните поля в форме ниже, и мы свяжемся с Вами. 
            </div>
        </template>

        <template v-else>
            <!-- installment title. select - Рассрочка -->
            <template v-if="formInputs.messageType.value === 'Рассрочка'">
                <div class="sm:text-2xl text-xl font-bold mb-5">
                    Получить рассрочку
                </div>
            </template>

            <!-- callback title. select - Перезвоните мне -->
            <template v-else-if="formInputs.messageType.value === 'Прошу перезвонить'">
                <div class="sm:text-2xl text-xl font-bold mb-2">
                    Заказать звонок
                </div>
                <p class="sm:text-base text-sm mb-6 font-normal">
                    Просто введите свои контактные данные и ждите, когда Мы свяжемся с Вами, чтобы
                    проконсультировать по
                    вашей финансовой ситуации.
                </p>
            </template>

            <!-- default -->
            <template v-else>
                <div class="sm:text-2xl text-xl font-bold mb-5">
                    Заполните поля в форме ниже, и мы свяжемся с Вами.
                </div>
            </template>
        </template>
    </div>

    <!-- form -->
    <form ref="formDOMElement" action="" class="form">
        <div class="form-container">

            <!-- slot for before inputs -->
            <div v-if="$slots.beforeUserInputs">
                <slot name="beforeUserInputs"></slot>
            </div>

            <!-- form inputs wrapper -->
            <div class="form__inputs">

                <!-- user info -->
                <template v-for="(input, idx) in inputs" :key="idx">
                    <BaseInput ref="inputRefs" v-model="formInputs[input.name].value" class="input__wrapper"
                        :name="input.name" :type="input.type" :placeholder="input.placeholder"
                        :required="input.required" :disabled="input.disabled" :options="input.options" />
                </template>

                <!-- optional info, choosed by message type select -->
                <template v-if="formInputs.messageType && formInputs.messageType.value">

                    <!-- installment block -->
                    <template v-if="formInputs.messageType.value === 'Рассрочка'">
                        <BaseFormInstallment ref="additionalFormBlock" />
                    </template>

                    <!-- complaint block -->
                    <!-- <template v-else-if="formInputs.messageType.value === 'Жалоба'">
                        <BaseFormComplaint ref="additionalFormBlock" />
                    </template> -->

                    <!-- default -->
                    <template v-else>
                        <BaseInput ref="additionalInput" type="textarea" name="message"
                            placeholder="Кратко опишите Ваш вопрос*" />
                    </template>

                </template>
            </div>

            <!-- slot for after inputs -->
            <div v-if="$slots.afterUserInputs">
                <slot name="afterUserInputs"></slot>
            </div>

            <!-- form bottom -->
            <div class="form-bottom">

                <!-- personal data checkbox -->
                <BaseCheckbox ref="consentRef" checkboxId="personal-data-consent" checkboxName="consent-checkbox"
                    :required="true" v-model="consentValue" class="text-sm">
                    <template #label>
                        Даю согласие на
                        <a href="#" class="link">обработку своих персональных данных</a>,
                        <a target="_blank" href="/policy" class="link">политика конфиденциальности</a>
                    </template>
                </BaseCheckbox>

                <!-- submit button -->
                <BaseButton class="sm:w-fit w-full min-w-60" size="large" @click.prevent="submitForm">
                    Отправить
                </BaseButton>
            </div>
        </div>
    </form>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

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
        color: var.$gray-dark;
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
                border: 1px solid var.$gray;
                transition: border-color .2s, background-color .3s;

                &.checkbox_error {
                    background-color: #FF6464;
                }

                &:checked {
                    border-color: var.$blue;
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

@include mixin.laptop {
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