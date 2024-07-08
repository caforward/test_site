<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['closeModal'])
</script>

<template>
	<div class="modal">
		<slot></slot>
		<div v-if="$slots.body" class="modal__body">
			<button class="modal__close" @click="emit('closeModal')">
				<img src="/assets/images/close_x/Vector.png" alt="krestik" />
			</button>

			<slot name="body"></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
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
		top: 20px;
		right: 25px;
		width: 18px;
		height: 18px;
	}
}

@include tablet {
	.modal {
		&__body {
			border-radius: 22px;
			padding: 25px 25px;
		}
	}
}
</style>
