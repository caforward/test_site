<script setup>
import BaseInput from '@/blocks/ui/BaseInput.vue'
import RadioButton from 'primevue/radiobutton';
import BaseButton from './ui/BaseButton.vue';
import { ref, reactive, onBeforeMount, watch, computed, onMounted } from 'vue';
import BaseModal from './BaseModal.vue';

const terminalKeyCard = ref('1718781279447')
const terminalKeyFPS = ref('1731918302262')
const terminalKey = ref(null)

const formInputs = reactive({})
const inputRefs = ref(false)
const contactType = ref('phone')
const paymentType = ref('card')

const contactInput = ref(null)
const terminalKeyInput = ref(null)
const isFPSPaymentInited = ref(false)

const showFPSInfoModal = ref(false)
const form = ref(null)

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
                placeholder: 'Телефон',
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

function clearForm() {
    contactType.value = 'phone'
}

function invalidInputsHandler(inputRefs) {
    const invalidInputs = inputRefs.filter(inputRef => !inputRef.readyToSubmit)

    if (invalidInputs.length) {
        invalidInputs.forEach(inputRef => {
            inputRef.showErrorHandler()
            // console.log(inputRef.inputName)
        })

        return true
    }

    return false
}

function isFormValid() {
    const hasInvalidInputs = invalidInputsHandler(inputRefs.value)
    const hasInvalidContactInput = !contactInput.value[0].readyToSubmit

    if (!contactInput.value[0].readyToSubmit) {
        contactInput.value[0].showErrorHandler()
        // console.log(contactInput.value[0].inputName)
    }

    if (hasInvalidInputs || hasInvalidContactInput) {
        return false
    } else {
        return true
    }
}

function validateForm() {
    if (isFormValid()) {
        paymentPay()
    }
}

function createFPSPaymentData() {
    return {
        terminalKey: terminalKeyFPS.value,
        paymentItems: [
            {
                container: document.getElementById("FPS-payment-button"),
                paymentInfo: function () {
                    return {
                        paymentData: document.forms.TinkoffPayForm,
                    };
                },
            },
        ],
        paymentSystems: { TinkoffFps: {} },
    };
}

function paymentPay() {
    const TPF = form.value

    const { description, receipt, name, amount, email, phone, contractId } = TPF

    const { userAmount } = formInputs
    const unitAmount = Math.round(userAmount.value * 100)
    amount.value = userAmount.value

    description.value = contractId.value

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
        const widgetParameters = createFPSPaymentData()
        initPayments(widgetParameters)
        isFPSPaymentInited.value = true
    } else {
        pay(TPF)
    }
}

onBeforeMount(() => {
    props.inputs.forEach(input => {
        formInputs[input.name] = {
            value: input.value ? input.value : null,
        }
    })
})

watch(
    () => paymentType.value,
    (value) => {
        if (paymentType.value === 'fps') {
            terminalKey.value = terminalKeyFPS.value
        } else {
            terminalKey.value = terminalKeyCard.value
        }
    },
    { immediate: true }
)
</script>

<template>
    <div>
        <form ref="form" name="TinkoffPayForm" novalidate class="payform" @submit.prevent="validateForm">
            <input v-if="paymentType === 'card'" class="payform__input" type="hidden" name="frame" value="false">

            <input class="payform__input" type="hidden" name="terminalkey" :value="terminalKey">
            <input class="payform__input" type="hidden" name="language" value="ru">
            <input class="payform__input" type="hidden" name="receipt" value="">
            <input class="payform__input" type="hidden" name="order">
            <input class="payform__input" type="hidden" name="description">
            <input class="payform__input" type="hidden" name="amount" value="">
            <input class="payform__input" type="hidden" name="DATA" value="">

            <div class="payform__inputs">
                <!-- radio for phone/email -->
                <div class="flex gap-3 flex-col">
                    <div class="flex gap-2 items-center">

                        <RadioButton type="radio" v-model="paymentType" inputId="payment-payment-type-card"
                            name="payment-contact-type" value="card" />
                        <label for="payment-payment-type-card" class="flex gap-2 items-center">
                            <span>Оплата картой</span>
                            <i class="pi pi-credit-card !text-xl text-sky-500"></i>
                        </label>

                    </div>
                    <div class="flex items-center gap-2">
                        <div class="flex gap-2 items-center">

                            <RadioButton type="radio" v-model="paymentType" inputId="payment-payment-type-fps"
                                name="payment-contact-type" value="fps" />
                            <label for="payment-payment-type-fps" class="flex gap-2 items-center">
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
                <template v-for="input in props.inputs" :key="input">
                    <BaseInput v-if="input.type !== 'tel' && input.type !== 'email'" ref="inputRefs"
                        v-model="formInputs[input.name].value" :name="input.name" :type="input.type"
                        :placeholder="input.placeholder" :required="input.required" :disabled="input.disabled"
                        :options="input.options" />
                </template>

                <!-- radio for phone/email -->
                <div class="payform-radios">
                    <div class="">
                        <RadioButton type="radio" v-model="contactType" inputId="payment-contact-type-phone"
                            name="payment-contact-type" value="phone" />
                        <label for="payment-contact-type-phone">
                            Телефон
                        </label>
                    </div>
                    <div class="">
                        <RadioButton type="radio" v-model="contactType" inputId="payment-contact-type-email"
                            name="payment-contact-type" value="email" />
                        <label for="payment-contact-type-email">
                            E-mail
                        </label>
                    </div>
                </div>

                <template v-for="input in props.inputs" :key="input">
                    <BaseInput ref="contactInput" v-if="input.type === 'tel' && contactType === 'phone'"
                        v-model="formInputs[input.name].value" :name="input.name" :type="input.type"
                        :placeholder="input.placeholder" :required="input.required" :disabled="input.disabled" />

                    <BaseInput ref="contactInput" v-else-if="input.type === 'email' && contactType === 'email'"
                        v-model="formInputs[input.name].value" :name="input.name" :type="input.type"
                        :placeholder="input.placeholder" :required="input.required" :disabled="input.disabled" />
                </template>
            </div>

            <div class="payform__bottom">
                <BaseButton v-if="paymentType === 'card'" size="large">
                    Оплатить картой
                </BaseButton>
                <template v-else>
                    <BaseButton v-if="!isFPSPaymentInited" size="large" class="text-md !bg-green-500 !border-green-500 hover:!bg-emerald-500 hover:!border-emerald-500 active:!bg-green-600 active:!border-green-600">
                        Оплатить через СБП
                    </BaseButton>
                    <div v-show="isFPSPaymentInited" id="FPS-payment-button"></div>
                </template>

                <div class="payform__meta">
                    <div>
                        Нажимая кнопку «Оплатить картой» или «Оплатить через СБП», вы соглашаетесь с
                        <!-- <a href="#" class="link">
                        Договором оферты
                    </a>
                    и -->
                        <a href="/policy" target="_blank" class="link">
                            политикой конфиденциальности.
                        </a>
                    </div>
                    <div>
                        Если у вас возникнут вопросы, пожалуйста, свяжитесь с нами по номеру телефона
                        <a href="tel:+78043334133" class="link">+7 (804) 333-41-33</a>
                    </div>
                    <!-- <div>
                    Если у вас возникнут сложности с оплатой через нашу форму, Вы можете воспользоваться
                    <a href="https://pay.mandarinbank.com/?m=4971" class="link" target="_blank">
                        оплатой через MANDARIN
                    </a>
                    (Взимается комиссия 3%).
                </div> -->
                </div>
            </div>
        </form>

        <BaseModal v-if="showFPSInfoModal" @closeModal="showFPSInfoModal = false">
            <template #body>
                <div>
                    <div class="text-xl font-bold mb-4 md:text-2xl">
                        Что такое СБП?
                    </div>
                    <p class="mb-4 text-base md:text-lg">
                        <strong>
                            Система быстрых платежей (СБП)
                        </strong>
                        - это современный способ оплаты,
                        который позволяет моментально переводить деньги на счет
                        <span class="text-sky-500">без дополнительных комиссий</span>.
                        Используя СБП, вы сможете оплтатить долг быстро и удобно:
                    </p>

                    <ul class="list-decimal pl-6 text-base md:text-lg font-medium mb-5">
                        <li>На странице оплаты выберите опцию «Оплата через СБП».</li>
                        <li>Введите ваше данные.</li>
                        <li>Отсканируйте предоставленный QR-код с помощью
                            приложения вашего банка.</li>
                        <li>Подтвердите оплату в банковском приложении.</li>
                        <li>Готово! Средства зачисляются мгновенно.</li>
                    </ul>

                    <div class="flex justify-center">
                        <BaseButton class="button button_blue" @click="showFPSInfoModal = false">
                            Закрыть
                        </BaseButton>
                    </div>
                </div>
            </template>
        </BaseModal>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

.payform {
    display: flex;
    flex-direction: column;
    gap: 25px;

    &__meta {
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-size: 14px;
        line-height: 171%;
    }

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