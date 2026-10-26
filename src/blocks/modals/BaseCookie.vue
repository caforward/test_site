<script setup>
import {onMounted} from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import {acceptCookies, cookieBannerVisible, showCookieBannerIfNeeded} from "@/service/utils/cookieConsent.js";

function onClose() {
    window.cookiePlateVisible = false // Дикий колхоз
    window.checkCookiesAccepted?.() // Колхоз
}

onMounted(() => {
    showCookieBannerIfNeeded()
})
</script>

<template>
    <!-- Уровень 9: выше страницы, но ниже окна с формой (BaseModal, 10), окно открывается поверх баннера.
         Свой уровень PrimeVue (около 1100) отключён -->
    <Dialog
        v-model:visible="cookieBannerVisible"
        :autoZIndex="false"
        :pt="{ mask: { style: 'z-index: 9' } }"
        class="w-full border border-gray-300 !shadow-none !rounded-none !mb-[4.5rem] md:!mb-24 mx-0 lg:!m-0"
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
                <router-link to="/policy" class="text-sky-500 hover:text-sky-600 transition-colors"
                             data-id="cookie_policy_link">
                    Условиями обработки персональных данных
                </router-link>
                и Cookies.
            </p>
            <div>
                <Button
                    label="Согласен"
                    class="w-full bg-orange-500 border-none hover:bg-orange-600 transition text-white px-5 py-2 rounded !text-sm md:!text-base"
                    @click="acceptCookies"
                    data-id="btn_accept_cookies"
                />
            </div>
        </div>
    </Dialog>
</template>
