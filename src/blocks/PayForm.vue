<script setup>
import BaseInput from '@/blocks/BaseInput.vue'
import RadioButton from 'primevue/radiobutton';
import { ref, onBeforeMount, watch, computed, onMounted } from 'vue';

const terminalKey = ref('1718781279447')
const resetInputTrigger = ref(false)
const checkErrorTrigger = ref(false)
const isFormValid = ref(false)
const contactType = ref('phone')
const formError = ref(null)

const paymentData = ref({})
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
                name: 'amount',
                type: 'number',
                placeholder: 'Сумма',
                required: true
            },
            {
                name: 'email',
                type: 'email',
                placeholder: 'E-mail',
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
    resetInputTrigger.value = !resetInputTrigger.value

    Object.keys(paymentData.value).forEach((input) => {
        paymentData.value[input].value = ''
    })

    contactType.value = 'phone'
}

function validateForm() {
    if (isFormValid.value) {
        try {
            paymentPay()
            clearForm()
        } catch (e) {
            console.log(e)
        }
    } else {
        checkErrorTrigger.value = !checkErrorTrigger.value
    }
}

function paymentPay() {
    const TPF = form.value

    const { description, amount, email, phone, contractId, receipt } = TPF

    TPF.receipt.value = JSON.stringify({
        "EmailCompany": "dolg.info@caforward.ru",
        "Taxation": "osn",
        "FfdVersion": "1.2",
        "Items": [
            {
                "Name": `Погашение задолженности по договору номер ${contractId.value}`,
                "Price": amount.value + '00',
                "Quantity": 1.00,
                "Amount": amount.value + '00',
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
        paymentData.value[input.name] = {
            value: '',
            isValid: false,
            required: input.required
        }
    })
})

watch(
    () => paymentData.value,
    (value) => {
        const paymentDataKeys = Object.keys(paymentData.value)

        const invalidInputNames = paymentDataKeys.filter(inputName => {
            const paymentInput = paymentData.value[inputName]

            if (paymentInput.required && !paymentInput.isValid) {
                return paymentInput
            }
        })

        if (!invalidInputNames.length) {
            isFormValid.value = true
        } else {
            isFormValid.value = false
        }
    },
    { deep: true }
)

watch(
    () => contactType.value,
    (value) => {
        if (value === 'phone') {
            paymentData.value.email.required = false
            paymentData.value.phone.required = true
        } else if (value === 'email') {
            paymentData.value.phone.required = false
            paymentData.value.email.required = true
        }
    }
)
</script>

<template>
    <form ref="form" class="payform" @submit.prevent="validateForm">
        <input class="payform__input" type="hidden" name="terminalkey" :value="terminalKey">
        <input class="payform__input" type="hidden" name="frame" value="false">
        <input class="payform__input" type="hidden" name="language" value="ru">
        <input class="payform__input" type="hidden" placeholder="Номер заказа" name="order">
        <input class="payform__input" type="hidden" name="receipt" value="">

        {{ }}
        <div class="payform__inputs">
            <template v-for="input in props.inputs" :key="input">
                <BaseInput v-if="input.type !== 'tel' && input.type !== 'email'" :name="input.name" :type="input.type"
                    :placeholder="input.placeholder" :required="input.required" :options="input.options"
                    :disabled="input.disabled" v-model:value="paymentData[input.name].value"
                    v-model:isValid="paymentData[input.name].isValid" v-model:showError="checkErrorTrigger"
                    v-model:resetInput="resetInputTrigger" />
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
                <BaseInput v-if="input.type === 'tel' && contactType === 'phone'" :name="input.name" :type="input.type"
                    :placeholder="input.placeholder" :options="input.options" :disabled="input.disabled"
                    :required="paymentData[input.name].required" v-model:value="paymentData[input.name].value"
                    v-model:isValid="paymentData[input.name].isValid" v-model:showError="checkErrorTrigger"
                    v-model:resetInput="resetInputTrigger" />

                <BaseInput v-else-if="input.type === 'email' && contactType === 'email'" :name="input.name"
                    :type="input.type" :placeholder="input.placeholder" :options="input.options"
                    :disabled="input.disabled" :required="paymentData[input.name].required"
                    v-model:value="paymentData[input.name].value" v-model:isValid="paymentData[input.name].isValid"
                    v-model:showError="checkErrorTrigger" v-model:resetInput="resetInputTrigger" />
            </template>
        </div>

        <div class="payform__bottom">
            <button class="button button_blue payform__button">
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
                <div>
                    Если у вас возникнут сложности с оплатой через нашу форму, Вы можете воспользоваться
                    <a href="https://pay.mandarinbank.com/?m=4971" class="link" target="_blank">оплатой через MANDARIN</a>
                    (Взимается комиссия 3%).
                </div>
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