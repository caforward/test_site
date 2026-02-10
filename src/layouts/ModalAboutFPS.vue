<script setup>
import BaseModal from "@/blocks/BaseModal.vue";
import BaseButton from "@/blocks/ui/BaseButton.vue";

const visible = defineModel()
</script>

<template>
    <BaseModal v-if="visible" @closeModal="visible = false">
        <template #body>
            <div>
                <div class="text-xl font-bold mb-4 md:text-2xl">
                    Что такое СБП?
                </div>
                <p class="mb-4 text-base md:text-lg">
                    <strong>
                        Система быстрых платежей (СБП)
                    </strong>
                    - это современный способ оплаты,
                    который позволяет моментально переводить деньги на счет
                    <span class="text-sky-500">без дополнительных комиссий</span>.
                    Используя СБП, вы сможете оплатить долг быстро и удобно:
                </p>

                <ul class="list-decimal pl-6 text-base md:text-lg font-medium mb-5">
                    <li>На странице оплаты выберите опцию «Оплата через СБП».</li>
                    <li>Введите ваше данные.</li>
                    <li>Отсканируйте предоставленный QR-код с помощью
                        приложения вашего банка.
                    </li>
                    <li>Подтвердите оплату в банковском приложении.</li>
                    <li>Готово! Средства зачисляются мгновенно.</li>
                </ul>

                <div class="flex justify-center">
                    <BaseButton class="button button_blue" @click="visible = false">
                        Закрыть
                    </BaseButton>
                </div>
            </div>
        </template>
    </BaseModal>
</template>