<script setup>
import { reactive, ref, computed, onBeforeMount, onMounted } from 'vue';

import BaseInput from '../ui/BaseInput.vue';
import Badge from 'primevue/badge';
import { useValueFormat } from '@/composable/useValueFormat.js'

const inputData = reactive({})
const inputRefs = ref(null)
const discount = 0.95
const minMonthlyPayment = 1500

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
        options.push({ name: period })
    })

    if (currentPeriod && !options.includes(currentPeriod)) {
        inputData.paymentPeriod.value.name = periods[periods.length - 1]
    }

    return options
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

const getPaymentMonthly = computed(() => {
    if (inputData.paymentPeriod.value) {
        let monthly = (inputData.paymentAmount.value / inputData.paymentPeriod.value.name).toFixed(2)
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
    return (inputData.paymentMonthlyFull * discount).toFixed(2)
})

// hooks

onBeforeMount(() => {
    inputs.forEach(input => {
        inputData[input.name] = {
            value: input.value ? input.value : '',
            isValid: input.value ? true : false,
            required: input.required ? true : false,
        }
    })

    inputData.paymentMonthlyFull = getPaymentMonthly
    inputData.paymentMonthlyDiscount = getPaymentMonthlyDiscount
})

onMounted(() => {
    inputRefs.value.forEach(input => {
        console.log(input.inputName, input.readyToSubmit)
    })
})

</script>

<template>
    <div class="installment">
        <div class="installment-title">
            <span>
                Сумма ежемесячного платежа
            </span>
            <span class="installment-title-amount">
                <strong class="installment-title-amount__full">
                    {{ useValueFormat(inputData.paymentMonthlyFull) }} ₽
                </strong>
                <i class="pi pi-arrow-right"></i>
                <div class="installment-title-amount__discount">
                    <strong>
                        {{ useValueFormat(inputData.paymentMonthlyDiscount) }} ₽
                    </strong>
                    <Badge value="-5%" severity="info" />
                </div>
            </span>
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
.installment {
    display: flex;
    flex-direction: column;
    gap: 15px;

    &-title {
        display: flex;
        font-size: 18px;
        flex-direction: column;
        gap: 15px;
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
                color: $gray-dark;
                text-decoration: line-through;
            }
        }
    }
}
</style>