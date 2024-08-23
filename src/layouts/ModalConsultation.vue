<script setup>
import { ref, watch } from "vue";
import BaseModal from '../blocks/BaseModal.vue';
import FormBlock from "../blocks/FormBlock.vue";
import BaseForm from "../blocks/form/BaseForm.vue";
import OverlayThank from '@/layouts/OverlayThank.vue';

const visible = defineModel()
const response = ref(null)
const overlayThankVisible = ref(false)
const userName = ref(null)

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
				code: "other"
			},
		],
	},
	// {
	// 	name: 'message',
	// 	type: 'textarea',
	// 	placeholder: 'Кратко опишите Ваш вопрос*',
	// }
])

async function sendData(formData) {
	overlayThankVisible.value = true
	userName.value = formData.get('name')
	
	formData.entries().forEach(key => {
		console.log(key)
	})

	try {
		response.value = await fetch('email.php', {
		    method: 'POST',
		    body: formData
		})
	} catch {
		response.value = { ok: false }
	}
}

async function sendRating(rateData) {
	const postData = new FormData()
	postData.append('rating', rateData.rateValue.value)
	postData.append('message', rateData.rateMessage.value)
	postData.append('username', userName.value)

	postData.entries().forEach(key => {
		console.log(key)
	})

	try {
		await fetch('rate.php', {
		    method: 'POST',
		    body: formData
		})
	} catch {
		console.log('')
	}
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
				<BaseForm :inputs="inputs" :grayForm="true" @submitted="sendData" />
				<OverlayThank v-model:visible="overlayThankVisible" v-model:status="response"
					@closeParentModal="visible = false" @sendRating="sendRating" />
			</template>
		</BaseModal>
	</transition>
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