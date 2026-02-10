<script setup>
import BaseInput from '@/blocks/ui/BaseInput.vue'
import RadioButton from 'primevue/radiobutton';
import BaseButton from '@/blocks/ui/BaseButton.vue';
import {ref, reactive, watch, onBeforeUpdate, computed} from 'vue';
import ModalForm from "@/layouts/ModalForm.vue";
import ModalAboutFPS from "@/layouts/ModalAboutFPS.vue";

const TERMINAL_KEY = {
    CARD: import.meta.env.VITE_TERMINAL_KEY_CARD,
    FPS: import.meta.env.VITE_TERMINAL_KEY_FPS,
}

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
const paymentType = ref('card')
const contactType = ref('phone')
const isFPSPaymentInited = ref(false)
const isFPSLoading = ref(false)
const showFPSInfoModal = ref(false)
const isModalVisible = ref(false)

// Валидация
const inputRefs = ref([])
const contactInput = ref([])

const curTerminalKey = computed(() => {
    return paymentType.value === 'fps'
        ? TERMINAL_KEY.FPS
        : TERMINAL_KEY.CARD
})

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

function paymentPay() {
    const TPF = form.value
    if (!TPF) return

    const {userAmount, contractId} = formInputs
    const unitAmount = Math.round(userAmount.value * 100)

    TPF.amount.value = userAmount.value
    TPF.description.value = contractId.value

    TPF.DATA.value = JSON.stringify({
        "Paymentpurpose": `Оплата по договору номер ${contractId.value}`,
    })

    TPF.receipt.value = JSON.stringify({
        "EmailCompany": "dolg.info@caforward.ru",
        "Taxation": "osn",
        "FfdVersion": "1.2",
        "Items": [
            {
                "Name": `Оплата по договору номер ${contractId.value}`,
                "Price": unitAmount,
                "Quantity": 1.00,
                "Amount": unitAmount,
                "PaymentMethod": "credit_payment",
                "PaymentObject": "payment",
                "Tax": "none",
                "MeasurementUnit": 'pc'
            }
        ]
    });

    if (paymentType.value === 'fps') {
        isFPSLoading.value = true
        const widgetParameters = createFPSPaymentData()

        initPayments(widgetParameters)
            .then(() => {
                isFPSPaymentInited.value = true
            })
            .catch(err => {
                console.error('Ошибка генерации qr кода T-банк', err)
            })
            .finally(() => {
                isFPSLoading.value = false
            })
    } else {
        pay(TPF)
    }
}

function createFPSPaymentData() {
    return {
        terminalKey: TERMINAL_KEY.FPS,
        paymentItems: [{
            container: document.getElementById("FPS-payment-button"),
            paymentInfo: () => ({paymentData: form.value})
        }],
        paymentSystems: {TinkoffFps: {}},
    };
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
        <form ref="form" name="TinkoffPayForm" novalidate class="payform" @submit.prevent="validateForm">
            <input v-if="paymentType === 'card'" class="payform__input" type="hidden" name="frame" value="false">

            <input class="payform__input" type="hidden" name="terminalkey" :value="curTerminalKey">
            <input class="payform__input" type="hidden" name="language" value="ru">
            <input class="payform__input" type="hidden" name="receipt" value="">
            <input class="payform__input" type="hidden" name="order">
            <input class="payform__input" type="hidden" name="description">
            <input class="payform__input" type="hidden" name="amount" value="">
            <input class="payform__input" type="hidden" name="DATA" value="">

            <div class="payform__inputs">
                <!-- radio for phone/email -->
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                            <i
                                class="pi pi-question-circle !text-xl transition-colors text-sky-500 hover:cursor-pointer hover:text-sky-700"></i>
                        </span>
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
                            />

                            <BaseButton
                                v-if="input.name === 'contractId'"
                                class="rounded-md h-auto"
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
                    <div class="payform-radio">
                        <RadioButton
                            v-model="contactType"
                            type="radio"
                            inputId="payment-contact-type-email"
                            name="payment-contact-type" value="email"
                        />
                        <label
                            for="payment-contact-type-email"
                            class="payform-radio__label"
                            :class="{'!text-gray-500': contactType === 'phone'}"
                        >
                            E-mail
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
                <p class="payform__meta">
                    Нажимая кнопку «Оплатить картой» или «Оплатить через СБП», вы соглашаетесь с
                    <a href="/policy" target="_blank" class="link underline inline">
                        политикой конфиденциальности.
                    </a>
                </p>

                <BaseButton
                    v-if="paymentType === 'card'"
                    class="w-fit"
                    size="large"
                >
                    Оплатить картой
                </BaseButton>

                <template v-else>
                    <BaseButton
                        v-if="!isFPSPaymentInited"
                        size="large"
                        class="w-fit text-md !bg-green-500 !border-green-500 hover:!bg-emerald-500 hover:!border-emerald-500 active:!bg-green-600 active:!border-green-600"
                        :is-loading="isFPSLoading"
                    >
                        Оплатить через СБП
                    </BaseButton>
                    <div
                        v-show="isFPSPaymentInited"
                        id="FPS-payment-button"
                    ></div>
                </template>
            </div>
        </form>
    </div>

    <ModalAboutFPS v-model="showFPSInfoModal"/>
    <ModalForm v-model="isModalVisible" type="get-contract-id"/>
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