<script setup>
const emit = defineEmits(['closeModal'])
</script>

<template>
	<div class="modal">
		<slot></slot>
		<div v-if="$slots.body" class="modal__body">
			<button class="modal__close" @click="emit('closeModal')">
				<i class="pi pi-times !text-xl"></i>
			</button>

			<slot name="body"></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

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
		padding: 35px 50px;
		background-color: #fff;
		border-radius: 30px;
		width: 768px;
		margin-top: 40px;
	}

	&__close {
		position: absolute;
		top: 0;
		right: 0;
		width: 60px;
		height: 60px;
		z-index: 2;
	}
}

@include mixin.tablet {
	.modal {
		&__body {
			border-radius: 22px;
			padding: 40px 25px;
		}

		&__close {
			width: 50px;
			height: 50px;
		}
	}
}
</style>
