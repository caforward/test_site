<script setup>
import BaseInput from '@/blocks/ui/BaseInput.vue'
import RadioButton from 'primevue/radiobutton';
import BaseButton from '@/blocks/ui/BaseButton.vue';
import {ref, reactive, watch, onBeforeUpdate} from 'vue';
import ModalForm from "@/layouts/ModalForm.vue";
import ModalAboutFPS from "@/layouts/ModalAboutFPS.vue";
import ModalRequisites from "@/layouts/ModalRequisites.vue";

// Заказ регистрирует наш бэкенд, а не виджет Т-Банка.
// Скрипт виджета раздавался с securepay.tinkoff.ru по сертификату УЦ Минцифры,
// которого нет на обычных iPhone и Android: соединение не устанавливалось, скрипт
// не грузился, оплата не работала совсем. Теперь в банк ходит сервер, а браузер
// уходит на pay.tbank.ru - этот домен доверен всеми хранилищами сертификатов.
const PAYMENT_INIT_URL = '/backend/public/payment.php'

// Т-Банк не принимает по СБП меньше 10 рублей
const FPS_MIN_AMOUNT = 10

const PAY_FAILED_TEXT = 'Не удалось начать оплату. Попробуйте ещё раз или оплатите по реквизитам.'

const METRIKA_ID = 95726509

const props = defineProps({
    inputs: {
        type: Array,
        default: [
            {
                name: 'name',
                type: 'text',
                placeholder: 'ФИО*',
                required: true
            },
            {
                name: 'userAmount',
                type: 'number',
                placeholder: 'Сумма',
                required: true
            },
            {
                name: 'email',
                type: 'email',
                placeholder: 'E-mail',
                required: true
            },
            {
                name: 'phone',
                type: 'tel',
                placeholder: 'Номер телефона',
                required: true
            },
            {
                name: 'contractId',
                type: 'text',
                placeholder: 'Введите номер договора',
                required: true
            },
        ]
    }
})

// Состояние
const form = ref(null)
const formInputs = reactive({})
const paymentType = ref('fps')
const contactType = ref('email')
const showFPSInfoModal = ref(false)
const isModalVisible = ref(false)
const isPayLoading = ref(false)
const isRequisitesVisible = ref(false)
const payError = ref('')

// Валидация
const inputRefs = ref([])
const contactInput = ref([])

// без этого о проблеме знали только по жалобам, без цифр
function reportPaymentIssue(reason) {
    try {
        if (typeof window.ym === 'function') {
            window.ym(METRIKA_ID, 'reachGoal', 'payment_unavailable', {reason})
        }
    } catch (e) {
        // метрика не должна ломать оплату
    }
}

function isFormValid() {
    // простые инпуты
    const invalidInputs = inputRefs.value.filter(ref => ref && !ref.readyToSubmit)
    invalidInputs.forEach(ref => ref.showErrorHandler())

    // поле для контактной информации
    const activeContact = contactInput.value.find(el => el)
    const isContactInvalid = activeContact && !activeContact.readyToSubmit

    if (isContactInvalid) {
        activeContact.showErrorHandler()
    }

    return invalidInputs.length === 0 && !isContactInvalid // возвращает true или false
}

function validateForm() {
    if (!isFormValid()) return
    paymentPay()
}

async function paymentPay() {
    if (isPayLoading.value) return

    payError.value = ''
    isPayLoading.value = true

    const {name, userAmount, contractId, email, phone} = formInputs

    try {
        const response = await fetch(PAYMENT_INIT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                method: paymentType.value,
                name: name.value,
                amount: userAmount.value,
                contractId: contractId.value,
                email: contactType.value === 'email' ? email.value : '',
                phone: contactType.value === 'phone' ? phone.value : '',
            }),
        })

        const result = await response.json().catch(() => null)

        if (!response.ok || !result?.ok || !result.paymentUrl) {
            throw new Error(result?.message || 'Банк не принял заказ')
        }

        // на успехе браузер уходит в банк, поэтому загрузку не снимаем
        window.location.href = result.paymentUrl
    } catch (err) {
        console.error('Ошибка регистрации платежа', err)
        payError.value = err.message && err.message !== 'Failed to fetch'
            ? err.message
            : PAY_FAILED_TEXT
        reportPaymentIssue(paymentType.value)
        isPayLoading.value = false
    }
}

onBeforeUpdate(() => {
    inputRefs.value = []
    contactInput.value = []
})

watch(
    () => props.inputs,
    (newInputs) => {
        newInputs.forEach(input => {
            if (!(input.name in formInputs)) {
                const defaultValue = input.type === 'number' ? null : ''
                formInputs[input.name] = {value: input.value || defaultValue}
            }
        })
    },
    {immediate: true}
)

defineExpose({validateForm, isFormValid, paymentPay})
</script>

<template>
    <div>
        <div class="mb-4">
            <BaseButton class="w-full mb-2" @click="isRequisitesVisible = true">
                Оплатить по реквизитам
            </BaseButton>
            <div class="text-center">или</div>
        </div>

        <form ref="form" name="TinkoffPayForm" novalidate class="payform" @submit.prevent="validateForm">
            <div class="payform__inputs">
                <!-- radio for phone/email -->
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div class="flex items-center gap-2">
                        <div class="payform-radio">
                            <RadioButton
                                v-model="paymentType"
                                type="radio"
                                inputId="payment-payment-type-fps"
                                name="payment-contact-type"
                                value="fps"
                            />
                            <label
                                for="payment-payment-type-fps"
                                class="payform-radio__label"
                                :class="{'!text-gray-500': paymentType === 'card'}"
                            >
                                <span>Оплата через СБП</span>
                                <img src="/images/sbp.svg" alt="СБП" class="w-5">
                            </label>
                        </div>
                        <span @click="showFPSInfoModal = true">
                            <i class="pi pi-question-circle !text-xl transition-colors text-sky-500 hover:cursor-pointer hover:text-sky-700">
                            </i>
                        </span>
                    </div>
                    <div class="payform-radio">
                        <RadioButton
                            type="radio"
                            v-model="paymentType"
                            inputId="payment-payment-type-card"
                            name="payment-contact-type"
                            value="card"
                        />
                        <label
                            for="payment-payment-type-card"
                            class="payform-radio__label"
                            :class="{'!text-gray-500': paymentType === 'fps'}"
                        >
                            <span>Оплата картой</span>
                            <i class="pi pi-credit-card !text-xl text-sky-500"></i>
                        </label>
                    </div>
                </div>

                <!-- inputs -->
                <template
                    v-for="input in props.inputs"
                    :key="input.name"
                >
                    <template v-if="input.type !== 'tel' && input.type !== 'email'">

                        <div class="flex gap-1">
                            <BaseInput
                                ref="inputRefs"
                                class="w-full"
                                v-model="formInputs[input.name].value"
                                :name="input.name"
                                :type="input.type"
                                :placeholder="input.placeholder"
                                :required="input.required"
                                :disabled="input.disabled"
                                :options="input.options"
                                :min="input.name === 'userAmount' && paymentType === 'fps' ? FPS_MIN_AMOUNT : 0"
                            />

                            <BaseButton
                                v-if="input.name === 'contractId'"
                                class="!rounded-2xl h-auto text-lg w-[45px]"
                                circle
                                @click.prevent="isModalVisible = true"
                            >
                                ?
                            </BaseButton>
                        </div>

                    </template>
                </template>

                <!-- radio for phone/email -->
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div class="payform-radio">
                        <RadioButton
                            v-model="contactType"
                            type="radio"
                            inputId="payment-contact-type-email"
                            name="payment-contact-type"
                            value="email"
                        />
                        <label
                            for="payment-contact-type-email"
                            class="payform-radio__label"
                            :class="{'!text-gray-500': contactType === 'phone'}"
                        >
                            E-mail
                        </label>
                    </div>
                    <div class="payform-radio">
                        <RadioButton
                            v-model="contactType"
                            type="radio"
                            inputId="payment-contact-type-phone"
                            name="payment-contact-type"
                            value="phone"
                        />
                        <label
                            for="payment-contact-type-phone"
                            class="payform-radio__label"
                            :class="{'!text-gray-400': contactType === 'email'}"
                        >
                            Телефон
                        </label>
                    </div>
                </div>

                <template v-for="input in props.inputs" :key="input.name">
                    <BaseInput
                        ref="contactInput"
                        v-if="input.type === 'tel' && contactType === 'phone'"
                        v-model="formInputs[input.name].value"
                        :name="input.name"
                        :type="input.type"
                        :placeholder="input.placeholder"
                        :required="input.required"
                        :disabled="input.disabled"
                    />

                    <BaseInput
                        ref="contactInput"
                        v-else-if="input.type === 'email' && contactType === 'email'"
                        v-model="formInputs[input.name].value"
                        :name="input.name"
                        :type="input.type"
                        :placeholder="input.placeholder"
                        :required="input.required"
                        :disabled="input.disabled"
                    />
                </template>
            </div>

            <div class="payform__bottom">
                <div v-if="payError" class="payform__error">
                    <p>{{ payError }}</p>

                    <button
                        type="button"
                        class="link underline w-fit"
                        @click.prevent="isRequisitesVisible = true"
                    >
                        Оплатить по реквизитам
                    </button>
                </div>

                <p class="payform__meta">
                    Нажимая кнопку «Оплатить картой» или «Оплатить через СБП», вы соглашаетесь с
                    <a href="/policy" target="_blank" class="link underline inline">
                        политикой конфиденциальности.
                    </a>
                </p>

                <BaseButton
                    v-show="paymentType === 'card'"
                    class="w-fit"
                    size="large"
                    :is-loading="isPayLoading"
                >
                    Оплатить картой
                </BaseButton>

                <BaseButton
                    v-show="paymentType === 'fps'"
                    size="large"
                    class="w-fit text-md !bg-green-500 !border-green-500 hover:!bg-emerald-500 hover:!border-emerald-500 active:!bg-green-600 active:!border-green-600"
                    :is-loading="isPayLoading"
                >
                    Оплатить через СБП
                </BaseButton>
            </div>
        </form>
        <ModalAboutFPS v-model="showFPSInfoModal"/>
        <ModalForm v-model="isModalVisible" type="get-contract-id"/>
        <ModalRequisites v-model="isRequisitesVisible"/>
    </div>
</template>

<style lang="scss" scoped>
.payform {
    &-radio {
        @apply
        flex gap-[12px] items-center;

        &__label {
            @apply
            flex gap-[10px] items-center transition-colors text-sm/[24px];
        }
    }

    &__meta {
        @apply
        sm:text-[14px]/[24px]
        text-[14px]/[20px];
    }

    &__error {
        @apply
        flex flex-col gap-2
        rounded-2xl border border-red-200 bg-red-50
        px-5 py-4 text-[14px]/[20px] text-red-700;
    }
}

.payform {
    display: flex;
    flex-direction: column;
    gap: 16px;

    &__bottom {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    &__inputs {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    &-radios {
        display: flex;
        gap: 20px;
    }
}
</style>