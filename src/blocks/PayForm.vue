<script setup>
import BaseInput from '@/blocks/BaseInput.vue'
import { ref, onBeforeMount, watch, computed, onMounted } from 'vue';

const terminalKey = ref('1718781279200DEMO')
const resetInputTrigger = ref(false)
const checkErrorTrigger = ref(false)
const isFormValid = ref(false)

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

onBeforeMount(() => {
    props.inputs.forEach(input => {
        paymentData.value[input.name] = {
            value: '',
            isValid: false,
            required: input.required
        }
    })
})

function validateForm() {
    if (isFormValid.value) {
        paymentPay()
    } else {
        checkErrorTrigger.value = !checkErrorTrigger.value
    }
}

function paymentPay() {
    console.log('form valid')

    const TPF = form.value

    // const amount = paymentData.value.amount.value
    // const contractId = paymentData.value.contractId.value
    // const email = paymentData.value.email.value
    // const phone = paymentData.value.phone.value

    // const TPF = e.target
    // const { description, amount, email, phone, contractId, receipt } = TPF;

    // if (receipt) {
    //     // if (!email.value && !phone.value)
    //     //     return alert("Поле E-mail или Phone не должно быть пустым");

    //     TPF.receipt.value = JSON.stringify({
    //         "EmailCompany": "dolg.info@caforward.ru",
    //         "Taxation": "osn",
    //         "FfdVersion": "1.2",
    //         "Items": [
    //             {
    //                 "Name": `Погашение задолженности по договору #${contractId}`,
    //                 "Price": amount + '00',
    //                 "Quantity": 1.00,
    //                 "Amount": amount + '00',
    //                 "PaymentMethod": "credit_payment",
    //                 "PaymentObject": "service",
    //                 "Tax": "none",
    //                 "MeasurementUnit": 'pc'
    //             }
    //         ]
    //     });
    // }
    // console.log(TPF.receipt.value);
    // pay(TPF);
    console.log(form)
    pay(form.value);
}

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
</script>

<template>
    <form ref="form" class="payform" @submit.prevent="validateForm">
        <input class="payform__input" type="hidden" name="terminalkey" :value="terminalKey">
        <input class="payform__input" type="hidden" name="frame" value="false">
        <input class="payform__input" type="hidden" name="language" value="ru">
        <input class="payform__input" type="hidden" placeholder="Номер заказа" name="order">
        <input class="payform__input" type="hidden" name="receipt" value="">

        <div class="payform__inputs">
            <template v-for="input in props.inputs" :key="input">
                <BaseInput :name="input.name" :type="input.type" :placeholder="input.placeholder" :required="input.required"
                    :value="input.value" :options="input.options" :disabled="input.disabled"
                    :showErrorHandler="checkErrorTrigger" :resetInputHandler="resetInputTrigger"
                    @update:value="paymentData[input.name].value = $event"
                    @update:isValid="paymentData[input.name].isValid = $event"
                    @update:resetInputHandler="resetInputTrigger = $event" />
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
                    <a href="#" class="link">
                        политикой конфиденциальности.
                    </a>
                </div>
                <div>
                    Если у вас возникнут вопросы, пожалуйста, свяжитесь с нами по номеру телефона
                    <a href="tel:+74997020156" class="link">+7 (499) 702-01-56</a>
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
}
</style>