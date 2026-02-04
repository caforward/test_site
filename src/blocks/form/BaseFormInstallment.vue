<script setup>
import {computed, onBeforeMount, onMounted, reactive, ref, watch} from 'vue';
import Badge from 'primevue/badge';
import BaseInput from '@/blocks/ui/BaseInput.vue';
import {useValueFormat} from '@/composable/useValueFormat.js';
import {getDottedDate} from '@/composable/useCalendar.js';


const exposeData = ref({})
const inputData = reactive({})
const inputRefs = ref(null)
const paymentMonthlyDiscountInputRef = ref(null)
const discount = 0.95
const minMonthlyPayment = 1500
const maxPeriod = 24

defineExpose({
    inputRefs,
    exposeData,
})

const paymentPeriodRange = computed(() => {
    let maxAvailablePeriod = maxPeriod;

    if (inputData.paymentAmount) {
        maxAvailablePeriod = Math.floor(inputData.paymentAmount.value / (minMonthlyPayment / discount)) || 1;
        if (maxAvailablePeriod > maxPeriod) maxAvailablePeriod = maxPeriod;
    }

    return Array.from(
        {length: maxAvailablePeriod},
        (_, index) => ({
            value: index + 1,
            label: index + 1,
        })
    )
})

const getPaymentMonthly = computed(() => {
    if (!inputData.paymentPeriod.value) {
        return 0
    }

    const amount = inputData.paymentAmount.value
    const period = inputData.paymentPeriod.value?.value

    const monthly = Number((amount / period).toFixed(2))

    return isFinite(monthly) ? monthly : 0
})

const getPaymentMonthlyDiscount = computed(() => {
    return (paymentMonthlyFull.value * discount).toFixed(2)
})

const inputs = reactive([
    {
        name: 'paymentAmount',
        type: 'number',
        placeholder: 'Введите сумму вашего долга',
        value: 150000,
        required: true
    },
    {
        name: 'paymentPeriod',
        type: 'select',
        placeholder: 'Выберите срок погашения',
        value: {value: 6, label: 6},
        options: ref(paymentPeriodRange),
        required: true
    },
    {
        name: 'paymentDate',
        type: 'date',
        value: new Date(),
        minDate: new Date(),
        placeholder: 'Дата ежемесячного платежа',
        required: true
    },
])

const paymentMonthlyFull = getPaymentMonthly

// computed, get value

const getPaymentDate = (computed(() => {
    return getDottedDate(inputData.paymentDate.value)
}))

const getPaymentPeriod = computed(() => {
    return inputData.paymentPeriod.value
})

const getPaymentAmount = computed(() => {
    return inputData.paymentAmount.value
})

// hooks

onBeforeMount(() => {
    inputs.forEach(input => {
        inputData[input.name] = {
            value: ref(input.value ? input.value : ''),
            isValid: !!input.value,
            required: !!input.required,
        }
    })

    inputData.paymentMonthlyDiscount = getPaymentMonthlyDiscount

    exposeData.value.paymentMonthlyDiscount = getPaymentMonthlyDiscount
    exposeData.value.paymentPeriod = getPaymentPeriod
    exposeData.value.paymentDate = getPaymentDate
    exposeData.value.paymentAmount = getPaymentAmount
})

onMounted(() => {
    paymentMonthlyDiscountInputRef.value.value = getPaymentMonthlyDiscount
    inputRefs.value.push(paymentMonthlyDiscountInputRef.value)
})

watch(
    paymentPeriodRange,
    (newOptions) => {
        const currentPeriod = inputData.paymentPeriod.value?.value || 0
        const maxPeriod = newOptions[newOptions.length - 1].value || 0

        if (currentPeriod > maxPeriod) {
            inputData.paymentPeriod.value = newOptions[newOptions.length - 1]
        }
    }
)
</script>

<template>
    <div class="installment">
        <div class="installment-title">
            <span>
                Сумма ежемесячного платежа
            </span>
            <div class="flex flex-wrap gap-4 items-center font-bold">
                <strong class="sm:text-lg text-base line-through text-gray-500">
                    {{ useValueFormat(paymentMonthlyFull) }} ₽
                </strong>
                <span>
                    <i class="pi pi-arrow-right"></i>
                </span>
                <div class="sm:text-xl text-lg text-sky-500 flex items-center gap-2">
                    <strong>
                        {{ useValueFormat(inputData.paymentMonthlyDiscount) }} ₽
                    </strong>
                    <Badge value="-5%" severity="info"/>
                </div>
            </div>

            <BaseInput ref="paymentMonthlyDiscountInputRef" :value="useValueFormat(inputData.paymentMonthlyDiscount)"
                       name="paymentMonthlyDiscount" type="text" class="hidden"/>
        </div>

        <!-- installment inputs -->
        <template v-for="(input, idx) in inputs" :key="idx">
            <BaseInput ref="inputRefs" v-model="inputData[input.name].value" :name="input.name" :type="input.type"
                       :placeholder="input.placeholder" :required="input.required" :disabled="input.disabled"
                       :options="input.options" :minDate="input.minDate">

                <template #inputTitle>
                    {{ input.placeholder }}
                </template>
            </BaseInput>
        </template>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

.installment {
    display: flex;
    flex-direction: column;
    gap: 15px;

    &-title {
        display: flex;
        font-size: 18px;
        flex-direction: column;
        gap: 8px;
        font-weight: 500;

        &-amount {
            display: flex;
            align-items: center;
            gap: 15px;

            &__discount {
                display: flex;
                align-items: center;
                gap: 5px;
                font-size: 20px;
            }

            &__full {
                font-size: 20px;
                color: var.$gray-dark;
                text-decoration: line-through;
            }
        }
    }
}
</style>