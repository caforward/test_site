<template>
	<transition name="fade">
		<Modal id="requisites" v-if="visible">
			<div class="modal-content">
				<div class="close-button" @click="closeModal">
					<img src="/assets/images/close_x/Vector.png" alt="krestik" />
				</div>
				<h3>Заполните поля в форме ниже, и мы свяжемся с Вами. </h3>
				<FormBlock :inputs="inputs" @submitted="closeModal" />
			</div>
		</Modal>
	</transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Modal from '../blocks/Modal.vue';
import FormBlock from "../blocks/FormBlock.vue";

export default defineComponent({
	components: {
		Modal,
		FormBlock
	},
	props: {
		visible: {
			type: Boolean,
			required: true,
		},
		defaultOption: {
			type: String,
			required: false,
			default: null as string | null
		},
	},

	data() {
		return {
			inputs: [
				{
					type: 'text',
					placeholder: 'ФИО*',
					dataName: 'name'
				},
				{
					type: 'tel',
					placeholder: 'Номер телефона*',
					dataName: 'tel'
				},
				{
					type: 'email',
					placeholder: 'E-mail*',
					dataName: 'email'
				},
				{
					tagName: 'v-select',
					placeholder: 'Тема обращения*',
					dataName: 'messageType',
					options: [
						"Узнать номер договора",
						"Разблокировать счет",
						"Рассрочка",
						"Другое",
					]
				},
				{
					tagName: 'textarea',
					placeholder: 'Кратко опишите Ваш вопрос*',
					dataName: 'message'
				}
			],
		};
	},
	methods: {
		closeModal() {
			this.$emit("close");
		},
		// formSubmittedHandler() {
		// 	this.closeModal()
		// 	this.$emit("submitted")
		// },
	},
	watch: {
		visible: {
			handler(value) {
				if (value) {
					document.body.style.overflow = 'hidden'
					document.body.style.paddingRight = '10px'
				} else {
					document.body.style.paddingRight = ''
					document.body.style.overflow = ''
				}
			}
		}
	},
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

::placeholder {
	color: rgba(0, 0, 0, 0.5);
	font-family: "Montserrat", sans-serif;
	font-size: 14px;
	font-weight: 400;
	line-height: 24px;
	letter-spacing: 0%;
	text-align: left;
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

.valid-input {
	background: white;
	border: 0.5px solid rgb(227, 230, 232);
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

input {
	border: 1px solid transparent;

	&:focus {
		border-color: #20afce;
		border-radius: 5px;
		background: white;
	}
}

.inputText {
	padding-bottom: 20px;

	textarea {
		background: #f4f5f6;
		resize: none;
		padding-left: 14px;
		border: 1px solid transparent;

		&:focus {
			border-color: #20afce;
			border-radius: 5px;
			background: white;
		}
	}

	.error {
		bottom: 21px;
		background: #ff6464;
		border-radius: 0 0 5px 5px;
		line-height: 180%;
	}

	.valid-input {
		background: white;
		border: 0.5px solid rgb(227, 230, 232);
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
	padding-bottom: 16px;
	font-size: 14px;
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

input {
	padding: 12px 0 14px 16px;
	width: 100%;
	height: 50px;
	border-radius: 5px;
	background-color: rgba(234, 236, 238, 0.5);
	color: rgb(0, 0, 0);
	font-family: "Montserrat", sans-serif;
	font-size: 14px;
	font-weight: 400;
	line-height: 24px;
	letter-spacing: 0%;
	text-align: left;
}

select option {
	padding-bottom: 40px;
}

a {
	color: rgb(0, 150, 216);
	text-decoration: underline;
	display: inline;
}

@media screen and (max-width: 1024px) and (min-width: 641px) {
	.modal-content {
		padding: 25px 50px;
	}

	.close-button {
		top: 18px;
		right: 20px;
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
		top: 14px;
		right: 15px;
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