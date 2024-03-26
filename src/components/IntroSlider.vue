<template>
	<section class="">
		<div class="slider">
			<div class="slider__container">
				<div class="slider__slide" v-for="slide in sliderData" :key="slide.img">
					<div class="container">
						<div class="slide__img">
							<img :src="'/src/assets/images/' + slide.img" alt="">
						</div>
						<div class="slide-content">
							<div class="slide-content__title">
								{{ slide.title }}
							</div>
							<div class="slide-content__text">
								<p>
									Сумма платежа рассчитывается, исходя из ваших возможностей таким образом,
									что остается комфортной для вас(но не менее 1500 рублей в месяц)!
									С нами
									вам не нужно бояться, что весь ваш доход будет уходить на погашение долга!
								</p>
								<p>
									Наши специалисты помогут вам подобрать ту сумму, которую вам будет комфортно
									вносить для погашения долга без ущерба для вашего бюджета
								</p>
							</div>
							<div class="slide-content__buttons">
								<button class="slide__button button button_blue">
									Получить консультацию
								</button>
								<button class="slide__button button">
									Подробнее
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- <div class="slider-nav">
				<button class="slider-nav__button slider-nav__button_next"></button>
				<button class="slider-nav__button slider-nav__button_prev"></button>
			</div> -->
		</div>
	</section>
</template>

<script lang="ts">
import Slide from '../blocks/IntroSlider/Slide.vue';

export default {
	name: 'IntroSlider',
	components: {
		Slide
	},
	props: {
	},
	data() {
		return {
			sliderData: [
				{
					img: 'introSlider/01.png',
					title: 'Платите столько, сколько можете',
					content: {
					}
				},
				{
					img: 'introSlider/02.png',
					title: 'Отзовем исполнительное производство',
					content: {
					}
				},
				{
					img: 'introSlider/03.png',
					title: 'Улучшите свою кредитную историю',
					content: {
					}
				}
			]
		}
	},

}

</script>

<style scoped lang="scss">
@import '/src/assets/scss/index.scss';


.button {
	@include button;

	&_blue {
		@include blue-button;
	}
}
img{
	width: 100%;
    height: 100%;
    object-fit: cover;
}

.slider {
	overflow: hidden;
	&__container {
		display: flex;
		flex-wrap: nowrap;
		transition: transform .2s;
	}
	
	&__slide {
		padding-top: 160px;
		padding-bottom: 70px;
		min-height: 725px;
		
		position: relative;
		z-index: 1;
		min-width: 100%;
	}

	&-nav {
		&__button {
			border: 2px solid #fff;
			border-radius: 30px;
			width: 40px;
			height: 40px;
		}
	}
}

.slide {
	&__img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}


	&__button {}

	&-content {
		width: 540px;

		&__title {
			font-weight: 700;
			font-size: 48px;
			line-height: 104%;
			margin-bottom: 22px;
		}

		&__text {
			font-weight: 400;
			font-size: 16px;
			line-height: 175%;
			margin-bottom: 33px;

			p {
				margin-bottom: 15px;
			}
		}

		&__buttons {
			display: flex;

			&>*:not(:last-child) {
				margin-right: 30px;
			}
		}
	}
}
</style>
