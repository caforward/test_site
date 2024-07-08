<script setup>
import BaseModal from "@/blocks/BaseModal.vue";
import BaseFormRepayment from "../blocks/BaseFormRepayment.vue";
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
	// {
	// 	name: 'repaymentAmount',
	// 	type: 'dot-slider',
	// 	value: '200000',
	// 	min: 10000,
	// 	max: 500000,
	// 	step: 100,
	// 	title: 'Сумма вашего долга:',
	// 	tooltip: {
	// 		left: 'от 10 000 ₽',
	// 		right: 'до 500 000 ₽',
	// 	}
	// },
	// {
	// 	name: 'repaymentPeriod',
	// 	type: 'dot-slider',
	// 	value: '6',
	// 	min: 1,
	// 	max: 24,
	// 	step: 1,
	// 	title: 'Срок погашения:',
	// 	tooltip: {
	// 		left: 'от 1 месяца',
	// 		right: 'до 24 месяцев',
	// 	}
	// },
	// {
	// 	name: 'monthlyPaymentDate',
	// 	type: 'date',
	// 	placeholder: 'Дата ежемесячного платежа',
	// 	required: true
	// },
	// {
	// 	name: 'message',
	// 	type: 'textarea',
	// 	placeholder: 'Кратко опишите Ваш вопрос*',
	// }
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
				<BaseFormRepayment :inputs="inputs" :grayForm="true" />
				<!-- <BaseForm :inputs="inputs" :grayForm="true" /> -->
			</template>
		</BaseModal>
	</transition>
</template>

<style lang="scss" scoped>
.modal__title {
	margin-bottom: 20px;
}
</style>
