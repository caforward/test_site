<script setup>
import { computed, onBeforeMount, onMounted, reactive, ref, watch } from 'vue';
import Badge from 'primevue/badge';
import BaseInput from '../ui/BaseInput.vue';
import { useValueFormat } from '@/composable/useValueFormat.js';
import { getDottedDate } from '@/composable/useCalendar.js';


const exposeData = ref({})
const inputData = reactive({})
const inputRefs = ref(null)
const paymentMonthlyDiscountInputRef = ref(null)
const discount = 0.95
const minMonthlyPayment = 1500

defineExpose({
    inputRefs,
    exposeData,
})

const paymentPeriodRange = computed(() => {
    let currentPeriod = inputData.paymentPeriod.value
    const maxPeriod = 24

    const getPeriods = (N) => [...Array(N).keys()].map(i => i + 1)
    let periods = getPeriods(maxPeriod)

    if (inputData.paymentAmount) {
        let maxAvailablePeriod = Math.floor(inputData.paymentAmount.value / (minMonthlyPayment / discount))
        maxAvailablePeriod = maxAvailablePeriod === 0 ? 1 : maxAvailablePeriod

        if (maxAvailablePeriod < maxPeriod) {
            periods = getPeriods(maxAvailablePeriod)
        }
    }

    const options = []
    periods.forEach(period => {
        options.push(period)
    })

    if (currentPeriod && !periods.includes(currentPeriod)) {
        inputData.paymentPeriod.value = periods[periods.length - 1]
    }

    return options
})

const getPaymentMonthly = computed(() => {
    if (inputData.paymentPeriod.value) {
        let monthly = (inputData.paymentAmount.value / inputData.paymentPeriod.value).toFixed(2)
        monthly = Number(monthly)

        if (isNaN(monthly)) {
            return 0
        }

        return monthly
    } else {
        return 0
    }
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
        value: { name: 6 },
        options: ref(paymentPeriodRange),
        required: true
    },
    {
        name: 'paymentDate',
        type: 'date',
        value: new Date(),
        placeholder: 'Дата ежемесячного платежа',
        required: true
    },
])

const paymentMonthlyFull = getPaymentMonthly

// computed, get value

const getPaymentDate = (computed(() => {
    console.log()
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
            isValid: input.value ? true : false,
            required: input.required ? true : false,
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
                    <Badge value="-5%" severity="info" />
                </div>
            </div>

            <BaseInput ref="paymentMonthlyDiscountInputRef" :value="useValueFormat(inputData.paymentMonthlyDiscount)"
                name="paymentMonthlyDiscount" type="text" class="hidden" />
        </div>

        <!-- installment inputs -->
        <template v-for="(input, idx) in inputs" :key="idx">
            <BaseInput ref="inputRefs" v-model="inputData[input.name].value" :name="input.name" :type="input.type"
                :placeholder="input.placeholder" :required="input.required" :disabled="input.disabled"
                :options="input.options" :min="input.min">

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