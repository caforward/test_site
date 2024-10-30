<script setup>
import TheHeader from "@/layouts/TheHeader.vue";
import TheFooter from "@/layouts/TheFooter.vue";

import TheMenuBottom from "@/layouts/TheMenuBottom.vue";
import { onMounted, ref } from 'vue'
</script>

<template>
	<TheHeader />

	<router-view v-slot="{ Component, route }">
		<transition name="fade" mode="out-in">
			<template #default>
				<component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
			</template>
		</transition>
	</router-view>

	<TheFooter />

	<TheMenuBottom />
</template>


<style lang="scss">


.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
