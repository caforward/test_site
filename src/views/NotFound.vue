<script setup>
import BaseButton from '@/blocks/ui/BaseButton.vue';
import {onMounted} from "vue";
import {sendMetrikaEvent} from "@/service/utils/metrika.js";
import {PAYMENT_FORM_URL} from "@/constants/links.js";

onMounted(() => {
    window.scrollTo(0, 0)

    // Метрика: человек попал на несуществующую страницу, url - адрес, по которому он пришёл
    sendMetrikaEvent('page_404', {url: window.location.href.split('#')[0]})
})
</script>

<template>
    <section class="py-32 border-t-2 border-slate-100">
        <div class="custom-container">
            <div class="w-full flex flex-col items-center justify-center">
                <span class="font-bold text-sky-500 text-[100px]">
                    404
                </span>
                <p class="mb-6 font-bold text-center">
                    Страница не существует.
                </p>

                <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <BaseButton as="link" :href="PAYMENT_FORM_URL" size="large" data-id="btn_404_payment_form">
                        Оплатить задолженность
                    </BaseButton>

                    <BaseButton as="router-link" to="/" severity="secondary" size="large" data-id="btn_404_home">
                        Перейти на главную
                    </BaseButton>
                </div>
            </div>
        </div>
    </section>
</template>
