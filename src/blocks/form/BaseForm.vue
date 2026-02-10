<script setup>
// imports
import {ref, reactive, computed, watch, onBeforeUpdate} from 'vue'

import BaseButton from '@/blocks/ui/BaseButton.vue';
import BaseFormInstallment from './BaseFormInstallment.vue';
import BaseInput from '@/blocks/ui/BaseInput.vue';
import BaseCheckbox from '@/blocks/ui/BaseCheckbox.vue';

// composables
import {useInputValidation, createFormData} from '@/composable/useForm.js'
import {FORM_TYPE_META, FORM_TYPES} from "@/constants/formTypes.js";

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
        default: () => ({})
    },
    formType: {
        type: String,
    }
})

// for form
const inputRefs = ref([])
const formInputs = reactive({})

const additionalFormBlock = ref(null)
const additionalInput = ref(null)

const consentRef = ref(null)
const consentValue = ref(null)

// functions
function submitForm() {
    // collect input refs from form
    let formInputRefs = inputRefs.value
        ? inputRefs.value.filter(ref => ref && ref.$el || ref)
        : [];

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

        emit('submitted', formData, formInputRefs)

    } else {
        // console.log('form is not valid')
    }
}

// computed
const formAttributeType = computed(() => {
    const messageType = formInputs.messageType?.value?.value
    return messageType || FORM_TYPES[props.formType];
})

const formTypeMeta = computed(() => {
    return FORM_TYPE_META[formAttributeType.value] || {
        title: 'Заполните поля в форме ниже, и мы свяжемся с Вами.',
        description: '',
        showFSSP: false
    }
})

// Обнуление ссылок при обновлении DOM
onBeforeUpdate(() => {
    inputRefs.value = []
})

watch(
    () => props.inputs,
    (newInputs) => {
        newInputs.forEach(input => {
            if (!formInputs[input.name]) {
                formInputs[input.name] = {value: input.value || ''}
            }
        })
    },
    {immediate: true, deep: true}
)
</script>

<template>
    <!-- form title, choosed by message type select -->
    <div v-if="props.showTitle">
        <div class="sm:text-2xl text-xl font-bold mb-2">
            {{ formTypeMeta.title }}
        </div>

        <p v-if="formTypeMeta.description" class="sm:text-base text-sm mb-6 font-normal">
            {{ formTypeMeta.description }}
        </p>

        <div v-if="formTypeMeta.showFSSP" class="text-lg mb-4 flex flex-wrap gap-x-1.5 items-baseline">
            Проверить задолженность:
            <div class="flex gap-1.5 items-center">
                <a href="https://fssp.gov.ru/iss/ip/" class="link">https://fssp.gov.ru/iss/ip/</a>
                <div class="w-8">
                    <img src="/images/fssp_logo.svg" alt="ФССП" title="ФССП">
                </div>
            </div>
        </div>
    </div>

    <slot name="preformText"></slot>
    <!-- form -->
    <form
        action=""
        :id="formAttributeType"
        :class="[ 'form', { 'form_gray': props.grayForm } ]"
    >
        <div class="form-container">

            <!-- slot for before inputs -->
            <div v-if="$slots.beforeUserInputs">
                <slot name="beforeUserInputs"></slot>
            </div>

            <!-- form inputs wrapper -->
            <div class="form__inputs">

                <!-- user info -->
                <template v-for="input in inputs" :key="input.name">
                    <BaseInput
                        v-if="formInputs[input.name] && !(input.name === 'file_attachment' && formAttributeType !== 'refund')"
                        ref="inputRefs"
                        v-model="formInputs[input.name].value"
                        class="input__wrapper"
                        :name="input.name"
                        :type="input.type"
                        :placeholder="input.placeholder"
                        :required="input.required"
                        :disabled="input.disabled"
                        :visible="input.visible"
                        :options="input.options"
                        :minDate="input.minDate"
                    />
                </template>

                <!-- optional info, choosed by message type select -->
                <template v-if="formInputs.messageType && formInputs.messageType.value">
                    <!-- installment block -->
                    <BaseFormInstallment
                        v-if="formAttributeType === 'installment'"
                        ref="additionalFormBlock"
                    />

                    <!-- refund download button -->
                    <BaseButton
                        v-if="formAttributeType === 'refund'"
                        as="link"
                        href="/assets/docs/Заявление на возврат.docx"
                        download
                    >
                        Скачать шаблон заявления
                    </BaseButton>
                </template>
            </div>

            <!-- slot for after inputs -->
            <div v-if="$slots.afterUserInputs">
                <slot name="afterUserInputs"></slot>
            </div>

            <!-- form bottom -->
            <div class="form-bottom">

                <!-- personal data checkbox -->
                <BaseCheckbox
                    ref="consentRef"
                    v-model="consentValue"
                    class="text-sm"
                    checkboxId="personal-data-consent"
                    checkboxName="consent-checkbox"
                    :required="true"
                >
                    <template #label>
                        Даю согласие на
                        <a href="#" class="link">обработку своих персональных данных</a>,
                        <a target="_blank" href="/policy" class="link">политика конфиденциальности</a>
                    </template>
                </BaseCheckbox>

                <!-- submit button -->
                <BaseButton
                    class="sm:w-fit w-full min-w-60"
                    size="large"
                    @click.prevent="submitForm"
                >
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