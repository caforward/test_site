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
</template>

<script setup lang="ts">
import Header from "./layouts/Header.vue";
import Footer from "./layouts/Footer.vue";
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
