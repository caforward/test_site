<script setup>
import { ref, watch } from 'vue';
import BaseForm from '../form/BaseForm.vue';
import BaseModal from '../BaseModal.vue';
import ModalForm from '../../layouts/ModalForm.vue';

const visible = ref(true);
const modalVisible = ref(false);

const inputs = ref([
    {
        name: 'name',
        type: 'text',
        placeholder: 'ФИО*',
        required: true,
    },
    {
        name: 'tel',
        type: 'tel',
        placeholder: 'Номер телефона*',
        required: true
    },
    {
        name: 'email',
        type: 'email',
        placeholder: 'E-mail*',
    },
])

</script>

<template>
    <div v-if="visible">
        <div
            class="fixed bottom-20 md:bottom-24 lg:bottom-3 right-3 bg-sky-500 text-white py-6 px-6 md:py-8 md:px-6 rounded-2xl z-[1] border border-sky-400">
            <button class="absolute top-0 right-0 py-1.5 px-2.5 z-20" @click.stop="visible = false">
                <i class="pi pi-times !text-xl"></i>
            </button>

            <a href="#" class="absolute right-0 top-0 left-0 bottom-0 z-10" @click.prevent="modalVisible = true"></a>

            <div>
                <h5 class="text-base md:text-xl font-bold">
                    У вас поменялся номер?
                </h5>
                <span class="text-base md:text-lg">
                    Обновите контактные данные!
                </span>
            </div>
        </div>

        <ModalForm v-model="modalVisible" :inputs="inputs" fetchUrl="changeTel.php" :showTitle="false">
            <template #topBodyContent>
                <h5 class="text-2xl font-bold mb-2">
                    Обновить данные - погасить быстрее
                </h5>
                <p class="text-base font-medium mb-4">
                    Обновите свои контактные данные, и мы ускорим процесс погашения задолженности.
                    Должники с актуальной информацией получают приоритет в обработке платежей и 
                    обращений.
                </p>
            </template>
        </ModalForm>
    </div>
</template>

<style lang="scss" scoped></style>