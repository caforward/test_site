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
	{
		name: 'repaymentPeriod',
		type: 'v-select',
		placeholder: 'Срок погашения*',
		value: "1",
		options: [
			'1',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
			'10',
			'11',
			'12',
			'13',
			'14',
			'15',
			'16',
			'17',
			'18',
			'19',
			'20',
			'21',
			'22',
			'23',
			'24',
		]
	},
	{
		name: 'repaymentAmount',
		type: 'number',
		placeholder: 'Сумма вашего долга*',
		value: "200 000",
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
