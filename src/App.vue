<template>
	<Header />
	<router-view v-slot="{ Component, route }">
		<transition name="fade" mode="out-in">
			<template #default>
				<component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
			</template>
		</transition>
	</router-view>
	<Footer />
	<TheBottomMenu v-if="bottomMenuVisible" />
</template>

<script setup>
import Header from "./layouts/Header.vue";
import Footer from "./layouts/Footer.vue";

import TheBottomMenu from "./layouts/TheBottomMenu.vue";
import { onMounted, ref } from 'vue'

const bottomMenuVisible = ref(true);

onMounted(() => {
	windowResizeHandler()
	window.addEventListener("resize", windowResizeHandler)
})

function windowResizeHandler() {
	bottomMenuVisible.value = window.matchMedia("(max-width: 1023px)").matches
}

</script>

<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
