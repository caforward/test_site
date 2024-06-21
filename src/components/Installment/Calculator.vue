<template>
	<section id="calculate" class="section">
		<div class="container">
			<h2>Рассчитать расрочку</h2>
			<div class="flex-container">
				<div class="container-slides">
					<div class="slider">
						<p>Сумма вашего долга</p>
						<div class="current-value">{{ numSplit(currentValue) }}</div>
						<NoUiSlider :start="[338000]" :range="{ min: 10000, max: 500000 }" :step="100"
							@value-changed="handleValueChange" />
						<div class="cont-from-to">
							<div>от 10 000 ₽</div>
							<div>до 500 000 ₽</div>
						</div>
					</div>
					<div class="slider">
						<p>Срок погашения</p>
						<div class="current-value">{{ currentValue3 }}</div>
						<NoUiSlider :start="[6]" :range="{ min: 1, max: 24 }" :step="1"
							@value-changed="handleValueChange3" />
						<div class="cont-from-to">
							<div>от 1 месяца</div>
							<div>до 24 месяцев</div>
						</div>
					</div>
				</div>
				<div class="modal-container">
					<!-- <p>Нужно оплатить в итоге</p>
          <div class="sum-element">
            {{ numSplit(currentValue2 * currentValue3)}} ₽</div> -->
					<p>Ежемесячный платеж</p>
					<div class="sum-element bott-sum-element">
						{{
							numSplit(+(currentValue / currentValue3).toFixed(0))
						}}
						₽
					</div>
					<div class="pre-form">Заполните поле ниже и мы <br> свяжемся с Вами:</div>

					<FormBlock :inputs="formInputs" />
				</div>
			</div>
		</div>
	</section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import NoUiSlider from "../../blocks/elements/NoUiSlider.vue";
import FormBlock from "../../blocks/FormBlock.vue";

export default defineComponent({
	components: {
		NoUiSlider,
		FormBlock
	},
	data() {
		return {
			nameValid: false,
			telValid: false,
			errorMsg: {
				name: "",
				tel: "",
			},
			formData: {
				name: "",
				tel: "",
			},
			currentValue: 338000,
			currentValue2: 3100,
			currentValue3: 45,
			formInputs: [
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
			]
		};
	},
	computed: {
		isFormValid(): boolean {
			return this.nameValid && this.telValid;
		},
	},
	methods: {
		numSplit(num: number): string | number {
			if (num.toString().length < 7) {
				return (num.toString().slice(0, -3) + ' ' + num.toString().slice(-3))
			} else if (num.toString().length >= 7) {
				return (num.toString().slice(0, 1) + ' ' + num.toString().slice(1, 4) + ' ' + num.toString().slice(-3))
			} else return num
		},
		handleValueChange(newValue: number) {
			this.currentValue = newValue;
		},
		handleValueChange2(newValue: number) {
			this.currentValue2 = newValue;
		},
		handleValueChange3(newValue: number) {
			this.currentValue3 = newValue;
		},
	},
});
</script>

<style lang="scss" scoped>
// clean form
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

		&__checkbox {
			margin-right: 15px;
		}
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

	.form-block__bottom {
		gap: 15px
	}

	.form-block__button {
		max-width: unset;
		width: 100%;
	}
}

// 
.section {
	background: #f5f7f9;
	padding-top: 82px;
	padding-bottom: 79px;
	margin-bottom: 82px;
}

.flex-container {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 30px;
}

.container-slides {
	display: flex;
	flex-direction: column;
	width: 51%;
}

h2 {
	font-weight: 600;
	font-size: 28px;
	line-height: 121%;
	color: #2e2e2e;
}

p {
	padding-top: 24px;
	padding-bottom: 12px;
	font-weight: 400;
	font-size: 16px;
	line-height: 187%;
	color: #2e2e2e;
}

.current-value {
	padding-bottom: 24px;
	font-weight: 700;
	font-size: 24px;
	line-height: 125%;
	color: #2e2e2e;
}

.cont-from-to {
	display: flex;
	max-width: 654px;
	flex-direction: row;
	justify-content: space-between;
	padding-top: 20px;
	font-weight: 400;
	font-size: 16px;
	line-height: 187%;
	color: rgba(46, 46, 46, 0.5);
	margin-bottom: -18px;
}

.pre-form {
	font-weight: 500;
	font-size: 19px;
	line-height: 160%;
	color: #2e2e2e;
	margin-bottom: 20px;
	margin-top: 20px;
	font-family: Montserrat, sans-serif
}

.slider {
	padding-bottom: 31px;
}

.modal-container {

	max-width: 540px;
	padding: 44px 41px 60px 43px;
	border-radius: 30px;
	fill: #fff;
	box-shadow: 0 20px 30px 0 rgba(0, 55, 145, 0.1);

	::placeholder {
		color: rgba(0, 0, 0, 0.5);
		font-family: "Montserrat", sans-serif;
		font-size: 14px;
		font-weight: 400;
		line-height: 24px;
		letter-spacing: 0%;
		text-align: left;
	}

	.sum-element {
		font-weight: 700;
		font-size: 30px;
		line-height: 100%;
		color: #2e2e2e;
		margin-bottom: 27px;
	}

	.bott-sum-element {
		margin-bottom: 30px;
	}

	.modal {
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		overflow-y: auto;
		padding: 0 10px;
	}

	.modal-content {
		position: relative;
		border-radius: 30px;
		background: rgb(255, 255, 255);
		width: 768px;
		padding: 61px 83px 60px 83px;
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
		//   margin-bottom: 16px;
	}

	.inputTel {
		margin-bottom: 10px;
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

	.above-btn-flex {
		display: flex;
		align-items: flex-start;

		.custom-checkbox {
			display: inline-block;
			cursor: pointer;
			user-select: none;

			input {
				display: none;
			}

			.checkmark {
				border: 1px solid #2e2e2e26;
				position: relative;
				height: 30px;
				width: 30px;
				background: #eff1f3;
				border-radius: 5px;
				display: block;

				&:after {
					content: "";
					position: absolute;
					display: none;
					left: 12px;
					top: 7px;
					width: 6px;
					height: 12px;
					border: solid #292d32;
					border-width: 0 2px 2px 0;
					transform: rotate(45deg);
				}
			}

			input:checked~.checkmark:after {
				display: block;
			}
		}
	}

	.aboveButt {
		font-weight: 400;
		font-size: 14px;
		line-height: 143%;
		color: #000;
		margin-left: 20px;
		margin-bottom: 18px;
		line-height: 171%;
	}

	button {
		border-radius: 30px;
		background: rgb(0, 150, 216);
		width: 100%;
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
		padding-top: 0px;
		color: rgb(0, 0, 0);
		font-size: 14px;
		line-height: 171%;
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
}

@media screen and (max-width: 1370px) and (min-width: 1025px) {
	.section {
		padding-top: 80px;
		padding-bottom: 91px;
		margin-bottom: 84px;
	}

	h2 {
		// padding-bottom: 24px;
		font-weight: 600;
		font-size: 24px;
		line-height: 142%;
	}

	p {
		padding-bottom: 12px;
		font-weight: 400;
		font-size: 14px;
		line-height: 214%;
	}

	.pre-form {
		font-size: 19px;
	}

	.current-value {
		font-weight: 700;
		font-size: 24px;
		line-height: 125%;
	}

	.cont-from-to {
		font-weight: 400;
		font-size: 16px;
		line-height: 187%;
		margin-bottom: -18px;
	}

	.modal-container {

		width: 50%;
		padding: 44px 29px 60px 30px;

		p {
			padding-bottom: 1px;
			font-weight: 400;
			font-size: 14px;
			line-height: 214%;
		}

		.sum-element {
			padding-bottom: 20px;
			font-weight: 700;
			font-size: 30px;
			line-height: 100%;
		}

		.bott-sum-element {
			// padding-bottom: 21px;
			margin-bottom: 18px;
		}

		.aboveButt {
			font-weight: 400;
			font-size: 14px;
			line-height: 143%;
			padding-bottom: 18px;
		}
	}
}

@media screen and (max-width: 1024px) and (min-width: 641px) {
	.section {
		padding-top: 60px;
		padding-bottom: 60px;
		margin-bottom: 62px;
	}

	h2 {
		font-weight: 600;
		font-size: 22px;
		line-height: 155%;
	}

	p {
		padding-top: 24px;
		padding-bottom: 12px;
		font-weight: 400;
		font-size: 14px;
		line-height: 214%;
	}

	.pre-form {
		font-size: 16px;
	}

	a {
		display: inline;
	}

	.current-value {
		font-weight: 700;
		font-size: 24px;
		line-height: 125%;
		padding-bottom: 24px;
	}

	.cont-from-to {
		font-weight: 400;
		font-size: 14px;
		line-height: 214%;
		margin-bottom: -18px;
	}

	.modal-container {
		width: 63%;
		padding: 30px 20px 30px 20px;

		p {
			font-weight: 400;
			font-size: 14px;
			line-height: 214%;
		}

		::placeholder {
			font-size: 13px;
		}

		.sum-element {
			padding-bottom: 17px;
			font-weight: 700;
			font-size: 30px;
			line-height: 100%;
		}

		.bott-sum-element {
			padding-bottom: 0px;
			margin-bottom: 18px;
		}

		.aboveButt {
			font-weight: 400;
			font-size: 14px;
			line-height: 143%;
			padding-bottom: 18px;
		}
	}
}

@media screen and (max-width: 640.5px) {
	.section {
		padding-top: 50px;
		padding-bottom: 52px;
		margin-bottom: 51px;
	}

	.flex-container {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.container-slides {
		width: 100%;
	}

	.pre-form {
		font-size: 16px;
	}

	h2 {
		font-weight: 600;
		font-size: 18px;
		line-height: 189%;
		margin-bottom: 18px;
	}

	p {
		padding-top: 10px;
		padding-bottom: 1px;
		font-weight: 400;
		font-size: 14px;
		line-height: 214%;
	}

	.current-value {
		font-weight: 700;
		font-size: 24px;
		line-height: 125%;
		padding-bottom: 15px;
	}

	.cont-from-to {
		font-weight: 400;
		font-size: 14px;
		line-height: 214%;
		margin-bottom: -18px;
	}

	.modal-container {
		width: 100%;
		padding: 30px 24px 30px 23px;

		p {
			font-weight: 400;
			font-size: 14px;
			line-height: 214%;
		}

		::placeholder {
			font-size: 13px;
		}

		.sum-element {
			padding-bottom: 14px;
			font-weight: 700;
			font-size: 30px;
			line-height: 100%;
		}

		.bott-sum-element {
			padding-bottom: 15px;
		}

		.aboveButt {
			font-weight: 400;
			font-size: 14px;
			line-height: 143%;
			padding-bottom: 18px;
		}
	}
}
</style>