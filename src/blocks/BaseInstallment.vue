<script setup>
import { reactive, ref, computed, onMounted } from 'vue';
import { useValueFormat } from '@/composable/useValueFormat.js'
import BaseInput from './ui/BaseInput.vue';
import Badge from 'primevue/badge';

const inputData = reactive({})

const paymentPeriodRange = computed(() => {
    const discount = 0.95
    const minMontlyPayment = 1500
    const maxPeriod = 24

    const getPeriods = (N) => [...Array(N).keys()].map(i => i + 1)
    let periods = getPeriods(maxPeriod)

    if (inputData.paymentAmount) {
        let maxAvailablePeriod = Math.floor(inputData.paymentAmount / (minMontlyPayment / discount))
        maxAvailablePeriod = maxAvailablePeriod === 0 ? 1 : maxAvailablePeriod

        if (maxAvailablePeriod < maxPeriod) {
            periods = getPeriods(maxAvailablePeriod)
        }
    }

    return periods
})

const inputs = reactive([
    {
        name: 'paymentAmount',
        type: 'number',
        placeholder: 'Сумма вашего долга',
        value: 150000,
        required: true
    },
    {
        name: 'paymentPeriod',
        type: 'v-select',
        placeholder: 'Срок погашения',
        value: 6,
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
    let monthly = (inputData.paymentAmount / inputData.paymentPeriod).toFixed(2)
    monthly = Number(monthly)
    
    if (isNaN(monthly)) {
        return 0
    }

    return monthly
})

const getPaymentMonthlyDiscount = computed(() => {
    return (inputData.paymentMonthlyFull * 0.95).toFixed(2)
})

onMounted(() => {
    inputs.forEach(input => {
        inputData[input.name] = {
            value: input.value,
            isValid: input.isValid,
            required: input.required,
        }
    })

    inputData.paymentMonthlyFull = getPaymentMonthly
    inputData.paymentMonthlyDiscount = getPaymentMonthlyDiscount
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

            <BaseInput v-model:value="inputData[input.name]" :name='input.name' :type='input.type'
                :placeholder='input.placeholder' :required="input.required" :options="input.options">
                <!-- v-model:showError='showErrorTrigger' 
                :resetInputTrigger='resetInputTrigger'
                @update:resetInputTrigger='resetInputTrigger = $event' -->

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
                color: var.$gray-dark;
                text-decoration: line-through;
            }
        }
    }
}
</style>