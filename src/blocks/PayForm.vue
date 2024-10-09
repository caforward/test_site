<script setup>
import BaseInput from '@/blocks/ui/BaseInput.vue'
import RadioButton from 'primevue/radiobutton';
import { ref, reactive, onBeforeMount, watch, computed, onMounted } from 'vue';

const terminalKey = ref('1718781279447')

const formInputs = reactive({})
const inputRefs = ref(false)
const contactType = ref('phone')
const contactInput = ref(null)

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

    pay(TPF)
}

onBeforeMount(() => {
    props.inputs.forEach(input => {
        formInputs[input.name] = {
            value: input.value ? input.value : null,
        }
    })
})
</script>

<template>
    <form ref="form" novalidate class="payform" @submit.prevent="validateForm">
        <input class="payform__input" type="hidden" name="terminalkey" :value="terminalKey">
        <input class="payform__input" type="hidden" name="frame" value="false">
        <input class="payform__input" type="hidden" name="language" value="ru">
        <input class="payform__input" type="hidden" name="order">
        <input class="payform__input" type="hidden" name="description">
        <input class="payform__input" type="hidden" name="receipt" value="">
        <input class="payform-tinkoff-row" type="hidden" name="amount" value="">
        <input class="payform-tinkoff-row" type="hidden" name="DATA" value="">

        <div class="payform__inputs">
            <template v-for="input in props.inputs" :key="input">
                <BaseInput v-if="input.type !== 'tel' && input.type !== 'email'" ref="inputRefs"
                    v-model="formInputs[input.name].value" :name="input.name" :type="input.type"
                    :placeholder="input.placeholder" :required="input.required" :disabled="input.disabled"
                    :options="input.options" />
            </template>
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
            <button class="button button_blue payform__button" @click="">
                Оплатить картой
            </button>
            <div class="payform__meta">
                <div>
                    Нажимая кнопку «Оплатить картой», вы соглашаетесь с
                    <a href="#" class="link">
                        Договором оферты
                    </a>
                    и
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
</template>

<style lang="scss" scoped>
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