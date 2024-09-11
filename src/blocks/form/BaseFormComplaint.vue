<script setup>
import { computed, onBeforeMount, reactive, ref, watch } from 'vue';
import Badge from 'primevue/badge';
import BaseInput from '../ui/BaseInput.vue';
import { useValueFormat } from '@/composable/useValueFormat.js';
import { getDottedDate } from '@/composable/useCalendar.js';


const exposeData = ref({})
const inputData = reactive({})
const inputRefs = ref(null)

defineExpose({
    inputRefs,
    exposeData,
})

const inputs = reactive([
    {
        name: 'employeeName',
        type: 'text',
        placeholder: 'Введите имя сотрудника',
    },
    {
        name: 'complaintMessage',
        type: 'textarea',
        placeholder: 'Опишите Вашу жалобу',
        required: true,
    }
])

// hooks

onBeforeMount(() => {
    inputs.forEach(input => {
        inputData[input.name] = {
            value: ref(input.value ? input.value : ''),
            isValid: input.value ? true : false,
            required: input.required ? true : false,
        }
    })
})

</script>

<template>
    <div class="installment">
        <!-- complaint inputs -->
        <template v-for="(input, idx) in inputs" :key="idx">
            <BaseInput ref="inputRefs" v-model="inputData[input.name].value" :name="input.name" :type="input.type"
                :placeholder="input.placeholder" :required="input.required" :disabled="input.disabled"
                :options="input.options" :min="input.min">

                <!-- <template #inputTitle>
                    {{ input.placeholder }}
                </template> -->
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