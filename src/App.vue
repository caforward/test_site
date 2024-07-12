<script setup>
import TheHeader from "@/layouts/TheHeader.vue";
import TheFooter from "@/layouts/TheFooter.vue";
import ModalCall from "@/layouts/ModalCall.vue";
import ModalRequisites from "@/layouts/ModalRequisites.vue";
import ModalConsultation from "@/layouts/ModalConsultation.vue";
import ModalInstallment from "@/layouts/ModalInstallment.vue";

import TheMenuBottom from "@/layouts/TheMenuBottom.vue";
import { onMounted, ref } from 'vue'

const modal = ref({
	call: false,
	consultation: false,
	requisites: false,
	installment: false,
});

function showModal(modalName) {
	modal.value[modalName] = true
}
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
	<TheMenuBottom @showModal="showModal" />

	<ModalConsultation v-model="modal.consultation" />
	<ModalRequisites v-model="modal.requisites" />
	<ModalCall v-model="modal.call" />
	<ModalInstallment v-model="modal.installment" />
</template>


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
