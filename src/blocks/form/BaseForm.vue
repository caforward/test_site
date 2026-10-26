<script setup>
// imports
import {ref, reactive, computed, watch, nextTick} from 'vue'

import BaseButton from '@/blocks/ui/BaseButton.vue';
import BaseFormInstallment from './BaseFormInstallment.vue';
import BaseInput from '@/blocks/ui/BaseInput.vue';
import BaseCheckbox from '@/blocks/ui/BaseCheckbox.vue';

// composables
import {useInputValidation, createFormData} from '@/composable/useForm.js'
import {FORM_TYPE_META, FORM_TYPES} from "@/constants/formTypes.js";
import {CONSENT_ERROR_TEXT, CONSENT_LABEL} from "@/constants/formFields.js";
import {createFieldStartTracker, getPageUrl, resolveFormId, resolveThemeId, sendMetrikaEvent} from "@/service/utils/metrika.js";

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
    },
    formMetrikaId: {
        type: String,
        default: '',
    },
    // id формы в событии form_start_field. Не задан - как form в form_open
    // и form_submitted модального окна: formMetrikaId или тема обращения
    startFieldFormId: {
        type: String,
        default: '',
    },
    // Где форма, для параметра from в событиях: body - в теле страницы, modal - в окне
    metrikaFrom: {
        type: String,
        default: 'body',
    }
})

// for form
const inputRefs = ref([])
const formInputs = reactive({})

const additionalFormBlock = ref(null)
const additionalInput = ref(null)

const consentRef = ref(null)
const consentValue = ref(null)

// Была неудачная попытка отправить: с этого момента над кнопкой виден список ошибок
const submitAttempted = ref(false)

// functions
function collectInputRefs() {
    const formInputRefs = inputRefs.value
        ? inputRefs.value.filter(ref => ref && ref.$el || ref)
        : [];

    if (additionalFormBlock.value) {
        formInputRefs.push(...additionalFormBlock.value.inputRefs)
    }
    if (additionalInput.value) {
        formInputRefs.push(additionalInput.value)
    }

    return formInputRefs
}

async function submitForm() {
    const formInputRefs = collectInputRefs()

    // по нажатию «Отправить» каждое поле проверяет своё текущее значение заново
    formInputRefs.forEach(inputRef => inputRef.validate?.())

    // check inputs validation and emit submit
    const isFormValid = useInputValidation([consentRef.value, ...formInputRefs])
    submitAttempted.value = !isFormValid

    if (isFormValid) {
        // Значения, которые проверка привела к виду (дата, телефон, сумма при отправке по Enter),
        // доходят до полей со следующей перерисовкой - собираем форму после неё
        await nextTick()

        const formData = createFormData(inputRefs.value)

        if (additionalFormBlock.value) {
            const extraData = additionalFormBlock.value.exposeData

            for (const key in extraData) {
                formData.append(key, extraData[key])
            }
        }

        emit('submitted', formData, formInputRefs, {theme: themeId.value})

    } else {
        // console.log('form is not valid')
    }
}

// Ошибки над кнопкой «Отправить» с названием поля: «Дата рождения: Заполните поле»
// (требование заказчика от 26.10.2026). Видны после неудачной попытки отправить
// и пропадают по мере исправления полей
const errorSummary = computed(() => {
    if (!submitAttempted.value) return []

    const list = collectInputRefs()
        .filter(inputRef => inputRef && !inputRef.readyToSubmit && inputRef.errorText)
        // в порядке полей на странице: в массиве ссылок поля стоят в порядке появления
        .sort((a, b) => a.$el && b.$el && a.$el.compareDocumentPosition(b.$el) & Node.DOCUMENT_POSITION_PRECEDING ? 1 : -1)
        .map(inputRef => `${inputRef.label}: ${inputRef.errorText}`)

    if (consentRef.value && !consentRef.value.readyToSubmit) {
        list.push(`${CONSENT_LABEL}: ${CONSENT_ERROR_TEXT}`)
    }

    return list
})

// computed
const formAttributeType = computed(() => {
    const messageType = formInputs.messageType?.value?.value
    return messageType || FORM_TYPES[props.formType];
})

const metrikaSuffix = computed(() => {
    return props.formMetrikaId || formAttributeType.value || 'form'
})

const formTypeMeta = computed(() => {
    return FORM_TYPE_META[formAttributeType.value] || {
        title: 'Заполните поля в форме ниже, и мы свяжемся с Вами.',
        description: '',
        showFSSP: false
    }
})

// Начало заполнения полей. Учёт свой у каждой формы: закрыли окно - форма
// пропала вместе с учётом, при новом открытии события пойдут снова
const fieldsFormId = computed(() => props.startFieldFormId || resolveFormId(props.formMetrikaId, props.inputs))

// Тема обращения для параметра theme. Только у форм, где тему выбирает человек: debt-info и форма вакансий jobs
const THEME_FORMS = ['debt-info', 'jobs']
const themeId = computed(() => THEME_FORMS.includes(fieldsFormId.value) ? resolveThemeId(formInputs.messageType?.value) : undefined)

const fieldStartTracker = createFieldStartTracker(() => ({form: fieldsFormId.value, theme: themeId.value, from: props.metrikaFrom}))

// Человек сам выбрал тему в форме debt-info. Тема по умолчанию и подставленная кодом события не дают
function onUserSelect(name, option) {
    if (name !== 'messageType' || fieldsFormId.value !== 'debt-info') return

    sendMetrikaEvent('form_choice_theme', {
        form: fieldsFormId.value,
        theme: resolveThemeId(option),
        from: props.metrikaFrom,
        url: getPageUrl(),
    })
}

// Ссылки на поля из v-for Vue ведёт сам: поле появилось - добавил, пропало - убрал.
// Прежнее обнуление массива перед каждой перерисовкой теперь зациклило бы список ошибок,
// который от этого массива зависит

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
                <a href="https://fssp.gov.ru/iss/ip/" class="link" :data-id="`form_fssp_link_${metrikaSuffix}`">https://fssp.gov.ru/iss/ip/</a>
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
        :data-metrika-id="formMetrikaId || undefined"
        :data-form-id="fieldsFormId"
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
                        v-if="formInputs[input.name] && !(input.name === 'file_attachment' && formAttributeType !== 'refund') && !(input.name === 'claim' && formAttributeType !== 'claim')"
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
                        :max="input.maxLength"
                        @field-start="fieldStartTracker.start"
                        @field-reset="fieldStartTracker.reset"
                        @user-select="onUserSelect(input.name, $event)"
                    />
                </template>

                <!-- optional info, choosed by message type select -->
                <template v-if="formInputs.messageType && formInputs.messageType.value">
                    <!-- installment block -->
                    <BaseFormInstallment
                        v-if="formAttributeType === 'installment'"
                        ref="additionalFormBlock"
                        @field-start="fieldStartTracker.start"
                        @field-reset="fieldStartTracker.reset"
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
                        Даю согласие на обработку своих персональных данных,
                        <a target="_blank" href="/policy" class="link" :data-id="`form_confidential_link_${metrikaSuffix}`">политика конфиденциальности</a>
                    </template>
                </BaseCheckbox>

                <!-- ошибки полей над кнопкой -->
                <ul v-if="errorSummary.length" class="form-errors">
                    <li v-for="error in errorSummary" :key="error">{{ error }}</li>
                </ul>

                <!-- submit button -->
                <BaseButton
                    class="sm:w-fit w-full min-w-60"
                    size="large"
                    @click.prevent="submitForm"
                    :data-id="`btn_submit_form_${metrikaSuffix}`"
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

    &-errors {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 14px;
        line-height: 1.3;
        color: #FF6464;
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