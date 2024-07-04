<script setup>
import BaseModal from "@/blocks/BaseModal.vue";

const visible = defineModel();
function close() {
	console.log('close')
}
</script>

<template>
	<BaseModal v-if="visible">
		<template v-slot:body @closeModal="close">
			text
		</template>
	</BaseModal>
</template>

<style lang="scss" scoped></style>
