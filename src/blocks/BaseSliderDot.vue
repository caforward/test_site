<template>
	<Slider v-model="value" :lazy="false" :min="props.min" :max="props.max" :step="props.step" :tooltips="false" />
</template>

<script setup>
import Slider from '@vueform/slider';
import { ref } from 'vue';

const props = defineProps({
	start: {
		type: String,
		default: '',
	},
	step: {
		type: Number,
		default: 100
	},
	min: {
		type: Number,
		required: true
	},
	max: {
		type: Number,
		required: true
	},
})

const value = defineModel()

</script>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

:deep(.slider-base) {
	background-color: var.$gray;

	.slider {

		&-connect {
			background-color: var.$blue;
		}

		&-handle {
			transform: translateY(-40%);
			top: 50%;
			width: 26px;
			height: 26px;
			background-color: white;
			box-shadow: none;
			border: 4px solid var.$blue;
		}


	}

}
</style>