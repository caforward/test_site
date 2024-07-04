<script setup>
const emit = defineEmits('closeModal')
</script>

<template>
	<div class="modal">
		<slot></slot>
		<div v-if="$slots.body" class="modal__body">
			<div class="modal__close" @click="emit(closeModal)">
				<img src="/assets/images/close_x/Vector.png" alt="krestik" />
			</div>
			<slot name="body"></slot>
		</div>
	</div>
</template>

<style lang="scss">
.fade-leave-active.modal {
	padding-right: 0 !important;
}

.modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10;
	padding: 10px;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: flex-start;
	overflow-y: auto;

	&__body {
		position: relative;
	}
}

.modal__body {
	position: relative;
	padding: 40px;
	background-color: #fff;
	border-radius: 30px;
	width: 768px;
	padding: 60px 80px;
	margin-top: 40px;
}
</style>
