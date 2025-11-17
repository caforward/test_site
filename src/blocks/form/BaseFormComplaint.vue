<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import BaseInput from '@/blocks/ui/BaseInput.vue';

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
            isValid: !!input.value,
            required: !!input.required,
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
@use '@/assets/scss/base/variables.scss' as var;

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