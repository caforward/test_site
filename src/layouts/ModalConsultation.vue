<script setup>
import { ref, watch } from "vue";
import BaseModal from '../blocks/BaseModal.vue';
import FormBlock from "../blocks/FormBlock.vue";
import ModalThank from "./ModalThank.vue";

const visible = defineModel()
const thankModalVisible = ref(false)

const props = defineProps({
	selectDefaultOption: {
		type: String,
		default: ''
	}
})

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

function showTnankModal() {
	visible.value = false
	thankModalVisible.value = true
}

watch(
	() => props.selectDefaultOption,
	() => {
		const messageTypeInput = inputs.value.find(input => input.name === 'messageType')
		messageTypeInput.value = props.selectDefaultOption
	}
)

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
		<BaseModal id="requisites" v-if="visible" @closeModal="visible = false">
			<template #body>
				<h3 class="modal__title">
					Заполните поля в форме ниже, и мы свяжемся с Вами. 
				</h3>
				<FormBlock :inputs="inputs" @submitted="showTnankModal" />
			</template>
		</BaseModal>
	</transition>
	<ModalThank v-model="thankModalVisible" />
</template>

<style lang="scss" scoped>
.modal__title {
	font-size: 24px;
	line-height: normal;
	margin-bottom: 20px;
}

:deep(.form-block) {
	padding: 0;
	background-color: transparent;
	border-radius: 0;
	color: $black;

	&::before {
		display: none;
	}

	.form-block-meta {
		flex: none;
	}

	.link {
		color: #20afce;
	}

	.input:not([type='checkbox']) {
		background-color: #EAECEE;
		transition: background-color .2s, border-color .2s;

		&.input_valid {
			background-color: transparent;
		}

		&:focus {
			background-color: transparent;
		}
	}

	input[type='checkbox'] {
		border: 1px solid#EAECEE;
	}

	.vSelect {
		background-color: #EAECEE;

		&.vs--open {
			background-color: transparent;
		}

		&.input_valid {
			background-color: transparent;
		}

		input {
			background-color: transparent;
		}
	}
}
</style>