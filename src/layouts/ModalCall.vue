<script setup>
import { ref, onUpdated, watch } from "vue";
import BaseModal from "../blocks/BaseModal.vue";
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
		<BaseModal v-if="visible">
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
	top: 40px;
	right: 40px;
	cursor: pointer;
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
