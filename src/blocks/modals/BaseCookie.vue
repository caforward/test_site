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
        class="w-full mx-auto rounded-lg shadow-lg border border-gray-300 !shadow-none !rounded-none !mb-[4.5rem] md:!mb-24 !mx-0 lg:!m-0"
        position="bottomright"
        :draggable="false"
        :dismissableMask="false"
        @after-hide="onClose"
        :closable="false"
        :show-header="false"
    >
        <div class="flex items-center flex-col md:flex-row gap-4 md:gap-10 pt-6">
            <p class="sm:text-base xs:text-sm text-xs text-gray-800 flex-1">
                Сайт ООО ПКО «Форвард» обрабатывает персональные данные с использованием Cookies.
                Нажимая кнопку “Принять”, вы соглашаетесь с
                <router-link to="/policy" class="text-sky-500 hover:text-sky-600 transition-colors">
                    Условиями обработки персональных данных
                </router-link>
                и Cookies.
            </p>
            <div>
                <Button
                    label="Согласен"
                    @click="onAcceptCookies"
                    class="w-full bg-orange-500 border-none hover:bg-orange-600 transition text-white px-5 py-2 rounded !text-sm md:!text-base"
                />
            </div>
        </div>
    </Dialog>
</template>
