<script setup>
import BaseModal from "@/blocks/BaseModal.vue";
import BaseForm from "../blocks/BaseForm.vue";
import { ref } from "vue";

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
		value: '',
		options: [
			"Прошу перезвонить",
			"Узнать номер договора",
			"Разблокировать счет",
			"Рассрочка",
			"Другое",
		],
	},
	{
		name: 'message',
		type: 'textarea',
		placeholder: 'Кратко опишите Ваш вопрос*',
	}
])
</script>

<template>
	<BaseModal v-if="visible" @closeModal="visible = false">
		<template v-slot:body>
			<h3>
				Получить рассрочку
			</h3>
			<BaseForm :inputs="inputs" />
		</template>
	</BaseModal>
</template>

<style lang="scss" scoped></style>
