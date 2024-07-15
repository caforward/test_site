<script setup>
import BaseModal from "@/blocks/BaseModal.vue";
import BaseForm from "@/blocks/BaseForm.vue";
import BaseSliderDot from "../blocks/noUiSlider.vue";
import { ref, watch } from "vue";

const visible = defineModel();

const inputs = ref([
	{
		name: 'name',
		type: 'text',
		placeholder: 'ФИО*',
		required: true
	},
	{
		name: 'tel',
		type: 'tel',
		placeholder: 'Номер телефона*',
		required: true
	},
	{
		name: 'email',
		type: 'email',
		placeholder: 'E-mail*',
	},
	{
		name: 'messageType',
		type: 'v-select',
		placeholder: 'Тема обращения*',
		value: "Рассрочка",
		disabled: true
	},
])

watch(
	() => visible.value,
	() => {
		if (visible.value) {
			document.body.style.overflow = 'hidden'
			document.body.style.paddingRight = '10px'
		} else {
			document.body.style.paddingRight = ''
			document.body.style.overflow = ''
		}
	}
)

</script>

<template>
	<transition name="fade">
		<BaseModal v-if="visible" @closeModal="visible = false">
			<template v-slot:body>
				<h2 class="modal__title">
					Получить рассрочку
				</h2>
				<BaseForm :inputs="inputs" :grayForm="true" />
			</template>
		</BaseModal>
	</transition>
</template>

<style lang="scss" scoped>
.modal__title {
	margin-bottom: 20px;
}
</style>
