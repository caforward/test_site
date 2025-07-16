<script setup>
import {onMounted, ref} from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

const isVisible = ref(false);

function onAcceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    isVisible.value = false;
    window.cookiePlateVisible = false // Дикий колхоз
    window.checkCookiesAccepted() // Колхоз
}

function onClose() {
    window.cookiePlateVisible = false // Дикий колхоз
    window.checkCookiesAccepted() // Колхоз
}

onMounted(() => {
    if (localStorage.getItem('cookiesAccepted')) {
        isVisible.value = false;
    } else {
        isVisible.value = true;
    }
})
</script>

<template>
    <Dialog
        v-model:visible="isVisible"
        class="modal-ui max-w-[700px] w-full mx-auto rounded-lg shadow-lg border border-gray-300 !shadow-none lg:!-translate-y-2 md:!-translate-y-20 !-translate-y-16"
        position="bottomright"
        header="Использование cookie"
        :draggable="false"
        :dismissableMask="false"
        @after-hide="onClose"
    >
        <div class="sm:text-base xs:text-sm text-xs text-gray-800">
            ООО ПКО «Форвард» защищает персональные данные пользователей сайта и
            обрабатывает Cookies только для персонализации сервисов. Запретить обработку
            Cookies можно в настройках вашего браузера. Нажимая кнопку “Принять”, вы
            соглашаетесь с
            <router-link to="/policy" class="text-sky-500 hover:text-sky-600 transition-colors">
                Условиями обработки персональных данных
            </router-link>
            и Cookies.
        </div>

        <template #footer>
            <div class="w-full flex md:justify-end justify-center -m-2">
                <Button
                    label="Принять"
                    @click="onAcceptCookies"
                    class="bg-orange-500 border-none hover:bg-orange-600 transition text-white px-5 py-2 rounded text-base"
                />
            </div>
        </template>
    </Dialog>
</template>

<style scoped>
.modal-ui:deep(.p-dialog-header) {
    background: red !important;
    padding: 0 !important;
}
</style>
