<script setup>
import { ref, watch } from "vue";
import BaseModal from '../blocks/BaseModal.vue';
import FormBlock from "../blocks/FormBlock.vue";
// import ModalThank from "./ModalThank.vue";
import BaseFormNew from "../blocks/form/BaseFormNew.vue";
import BaseForm from "../blocks/BaseForm.vue";

const visible = defineModel()
const thankModalVisible = ref(false)
const promise = ref(null)

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
		required: true,
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
		type: 'select',
		placeholder: 'Тема обращения*',
		required: true,
		value: {
			name: "Прошу перезвонить",
			code: "callback"
		},
		options: [
			{
				name: "Прошу перезвонить",
				code: "callback"
			},
			{
				name: "Узнать номер договора",
				code: "getContractNumber"
			},
			{
				name: "Разблокировать счет",
				code: "unblockAccaunt"
			},
			{
				name: "Рассрочка",
				code: "installment"
			},
			{
				name: "Другое",
			},
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
	// thankModalVisible.value = true
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
				<div class="sm:text-2xl text-xl font-bold mb-5">
					Заполните поля в форме ниже, и мы свяжемся с Вами. 
				</div>
				<BaseFormNew :inputs="inputs" :grayForm="true" @submitted="showTnankModal" @closeModal="visible = false" />
			</template>
		</BaseModal>
	</transition>
	<!-- <ModalThank v-model="thankModalVisible" /> -->
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