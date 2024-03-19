<template>
	<section class="">
		<div class="container">
			<Slide title="Платите столько, сколько можете" text="
				Сумма платежа рассчитывается, исходя из ваших возможностей таким образом, 
				что остается комфортной для вас (но не менее 1500 рублей в месяц)! 
				<br>
				С нами 
				вам не нужно бояться, что весь ваш доход будет уходить на погашение долга!
				Наши специалисты помогут вам подобрать ту сумму, которую вам будет комфортно 
				вносить для погашения долга без ущерба для вашего бюджета" imgSrc="/src/assets/images/introSlider/01.png" />
		</div>
	</section>
</template>

<script setup lang="ts">
import Slide from '../blocks/IntroSlider/Slide.vue';

// import { ref } from 'vue'

// defineProps<{ msg: string }>()

// const count = ref(0)

</script>

<style scoped lang="scss">
section {
	position: relative;
	padding-top: 160px;
	padding-bottom: 70px;
	z-index: 1;
}
</style>
