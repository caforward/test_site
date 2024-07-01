<script setup>
import { ref, onUpdated, watch } from "vue";
import Modal from "../blocks/Modal.vue";
import FormBlock from "../blocks/FormBlock.vue";
import ModalThank from "./ModalThank.vue";

const visible = defineModel()
const thankModalVisible = ref(false)

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
		value: 'Прошу перезвонить',
		required: true,
		disabled: true
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
		<Modal v-if="visible">
			<div class="modal-content">
				<div class="close-button" @click="visible = false">
					<img src="/assets/images/close_x/Vector.png" alt="krestik" />
				</div>
				<h3>Заказать звонок</h3>
				<p>
					Просто введите свои контактные данные и ждите, когда Мы свяжемся с Вами,
					чтобы проконсультировать по вашей финансовой ситуации.
				</p>
				<FormBlock :inputs="inputs" @submitted="showTnankModal" />
			</div>
		</Modal>
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

.valid-input {
	background: white;
	border: 0.5px solid rgb(227, 230, 232);
}

.close-button {
	position: absolute;
	top: 40px;
	right: 40px;
	cursor: pointer;
}

.inputName {
	margin-bottom: 16px;
}

.inputTel {
	margin-bottom: 21px;
}

.form-input {
	padding-bottom: 16px;
	position: relative;

	.error {
		position: absolute;
		bottom: 13.5px;
		display: block;
		width: 100%;
		padding-left: 16px;
		font-weight: 400;
		font-size: 14px;
		line-height: 135%;
		color: white;
		background: #ff6464;
		border-radius: 0 0 5px 5px;
	}
}

.placeholder {
	position: absolute;
	padding: 12px 0 14px 16px;
	pointer-events: none;
	opacity: 1;
	transition: opacity 0.2s ease-in-out;
	color: rgba(0, 0, 0, 0.5);
	font-family: "Montserrat", sans-serif;
	font-size: 14px;
	font-weight: 400;
	line-height: 24px;
	letter-spacing: 0%;
	text-align: left;
}

.aboveButt {
	margin-bottom: 16px;
	line-height: 171%;
}

button {
	border-radius: 30px;
	background: rgb(0, 150, 216);
	width: 200px;
	height: 50px;
	fill: rgb(0, 150, 216);
	padding: 10px 50px 10px 50px;
	color: rgb(255, 255, 255);
}

h3 {
	color: rgb(0, 0, 0);
	font-size: 24px;
	margin-bottom: 25px;
}

p {
	color: rgb(0, 0, 0);
	font-size: 14px;
	line-height: 171%;
	margin-bottom: 23px;
}

input {
	background-color: rgba(234, 236, 238, 0.5);
	color: rgb(0, 0, 0);
	line-height: 24px;
}

select option {
	padding-bottom: 40px;
}

a {
	color: rgb(0, 150, 216);
	text-decoration: underline;
}

@media screen and (max-width: 1024px) and (min-width: 641px) {
	.modal-content {
		padding: 35px 53px 35px 53px;
	}

	h3 {
		padding-bottom: 20px;
		margin-bottom: 0;
	}

	p {
		padding-bottom: 20px;
		margin-bottom: 0;
	}

	.aboveButt {
		font-size: 14px;
	}

	::placeholder {
		font-size: 13px;
	}

	.close-button {
		top: 30px;
		right: 30px;
	}
}

@media screen and (max-width: 640.5px) {
	.close-button {
		top: 18px;
		right: 18px;
	}

	.modal-content {
		padding: 31px 24px 26px 31px;
	}

	h3 {
		font-size: 18px;
		font-weight: 600;
		line-height: 29px;
		margin-bottom: 0px;
		padding-bottom: 10px;
	}

	p {
		font-size: 13px;
		font-weight: 400;
		padding-bottom: 13px;
		margin-bottom: 0;
	}

	.input {
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
}
</style>
