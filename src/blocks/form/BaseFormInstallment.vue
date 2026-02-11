<script setup>
import {computed, reactive, ref, watch} from 'vue';
import BaseInput from '@/blocks/ui/BaseInput.vue';
import {useValueFormat} from '@/composable/useValueFormat.js';
import {getDottedDate} from '@/composable/useCalendar.js';

const inputRefs = ref(null)
const paymentMonthlyInputRef = ref(null)

const minMonthlyPayment = 1500
const maxPeriod = 24

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

const inputData = reactive({
    paymentAmount: 150000,
    paymentPeriod: {value: 6, label: 6},
    paymentDate: new Date(),
})

const paymentMonthly = computed(() => {
    const amount = inputData.paymentAmount
    const period = inputData.paymentPeriod?.value || 1
    const monthly = amount / period
    return isFinite(monthly) ? monthly.toFixed(2) : "0.00"
})

const paymentPeriodRange = computed(() => {
    let maxAvailablePeriod = maxPeriod;

    if (inputData.paymentAmount) {
        maxAvailablePeriod = Math.floor(inputData.paymentAmount / minMonthlyPayment) || 1;
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

const exposeData = computed(() => ({
    paymentAmount: inputData.paymentAmount,
    paymentPeriod: inputData.paymentPeriod?.value,
    paymentDate: getDottedDate(inputData.paymentDate),
    paymentMonthly: paymentMonthly.value
}))

watch(
    paymentPeriodRange,
    (newOptions) => {
        const currentPeriod = inputData.paymentPeriod?.value || 0
        const maxPeriod = newOptions[newOptions.length - 1]?.value || 0

        if (currentPeriod > maxPeriod) {
            inputData.paymentPeriod = newOptions[newOptions.length - 1]
        }
    }
)

defineExpose({
    inputRefs,
    exposeData,
})
</script>

<template>
    <div class="installment">
        <div class="installment-title">
            <span>Ежемесячный платеж <strong class="text-sky-500">без учёта скидки</strong>:</span>
            <div class="flex flex-wrap gap-4 items-center font-bold text-xl text-sky-500 sm:text-2xl">
                {{ useValueFormat(paymentMonthly) }} ₽
            </div>

            <BaseInput
                ref="paymentMonthlyInputRef"
                :value="useValueFormat(paymentMonthly)"
                name="paymentMonthly"
                type="text"
                class="hidden"
            />
        </div>

        <!-- installment inputs -->
        <template v-for="input in inputs" :key="input.name">
            <BaseInput
                ref="inputRefs"
                v-model="inputData[input.name]"
                :name="input.name"
                :type="input.type"
                :placeholder="input.placeholder"
                :required="input.required"
                :disabled="input.disabled"
                :options="input.name === 'paymentPeriod' ? paymentPeriodRange : input.options"
                :minDate="input.minDate"
            >
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