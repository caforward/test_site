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
		<BaseModal id="requisites" v-if="visible">
			<div class="modal-content">
				<div class="close-button" @click="visible = false">
					<img src="/assets/images/close_x/Vector.png" alt="krestik" />
				</div>
				<h3>Заполните поля в форме ниже, и мы свяжемся с Вами. </h3>
				<FormBlock :inputs="inputs" @submitted="showTnankModal" />
			</div>
		</BaseModal>
	</transition>
	<ModalThank v-model="thankModalVisible" />
</template>

<style lang="scss" scoped>
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

.modal {
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding: 10px;
	display: flex;
	justify-content: center;
	overflow-y: auto;
}

.modal-content {
	position: relative;
	padding: 40px;
	background-color: #fff;
	border-radius: 30px;
	width: 768px;
	padding: 60px 80px;
	margin-top: 40px;
}

.close-button {
	position: absolute;
	top: 35px;
	right: 40px;
	cursor: pointer;
}

h3 {
	color: rgb(0, 0, 0);
	font-family: "Montserrat", sans-serif;
	font-size: 24px;
	font-weight: 600;
	line-height: 29px;
	letter-spacing: 0%;
	text-align: left;
	padding-bottom: 24px;
}

p {
	color: rgb(0, 0, 0);
	font-family: "Montserrat", sans-serif;
	font-size: 14px;
	font-weight: 400;
	line-height: 24px;
	letter-spacing: 0%;
	text-align: left;
	padding-bottom: 23px;
}

select option {
	padding-bottom: 40px;
}

@media screen and (max-width: 1024px) and (min-width: 641px) {
	.modal-content {
		padding: 35px 53px 35px 53px;
	}

	.close-button {
		top: 30px;
		right: 30px;
	}

	.aboveButt {
		font-size: 13px;
	}

	h3 {
		font-size: 22px;
		font-weight: 600;
		line-height: 29px;
		padding-bottom: 10px;
	}

	p {
		font-size: 13px;
		font-weight: 400;
		padding-bottom: 13px;
	}

	input {
		font-size: 13px;
	}

	.inputText {
		textarea {
			font-size: 13px;
		}
	}

	.aboveButt {
		font-size: 13px;
	}

	::placeholder {
		font-size: 13px;
	}

	:deep(.optionsWrap) {
		.vs__search {
			font-size: 13px;
		}

		.vSelect {
			::placeholder {
				font-size: 13px;
			}
		}

		.vs__selected {
			font-size: 13px;
		}

		li {
			font-size: 13px;
		}
	}
}

@media screen and (max-width: 640.5px) {
	.close-button {
		top: 20px;
		right: 20px;
	}

	.modal-content {
		padding: 30px 25px;
	}

	h3 {
		font-size: 18px;
		font-weight: 600;
		line-height: 29px;
		padding-bottom: 10px;
	}

	p {
		font-size: 13px;
		font-weight: 400;
		padding-bottom: 13px;
	}

	input {
		font-size: 13px;
	}

	.inputText {
		textarea {
			font-size: 13px;
		}
	}

	.aboveButt {
		font-size: 13px;
	}

	.aboveButt {
		font-size: 12px;
	}
}
</style>