<script setup>
import TheHeader from "@/layouts/TheHeader.vue";
import TheFooter from "@/layouts/TheFooter.vue";
import TheMenuBottom from "@/layouts/TheMenuBottom.vue";
import BaseCookie from "@/blocks/modals/BaseCookie.vue";
import {onMounted, onUnmounted} from "vue";
import {sendMetrikaEvent} from "@/service/utils/metrika.js";

function clickHandler(e) {
    const target = e.target.closest('[data-id]');
    if (!target) return;

    // Аккордеоны обрабатываются отдельно — исключаем их
    if (target.closest('[data-accordion]')) return;

    const id = target.dataset.id;
    const url = window.location.href.split('#')[0];

    sendMetrikaEvent('click', {id, url});
}

onMounted(() => {
    document.addEventListener('click', clickHandler);
});

onUnmounted(() => {
    document.removeEventListener('click', clickHandler);
});
</script>

<template>
    <TheHeader/>

    <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
            <template #default>
                <component :is="Component" :key="route.meta.usePathKey ? route.path : undefined"/>
            </template>
        </transition>
    </router-view>

    <TheFooter/>

    <TheMenuBottom/>

    <BaseCookie/>
</template>


<style lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
