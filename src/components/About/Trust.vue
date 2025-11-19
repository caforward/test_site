<script setup>
import CompaniesSlider from '@/blocks/CompaniesSlider.vue';
</script>

<template>
    <section>
        <div class="custom-container">
            <div class="heading-3 mb-6">
                Нам доверяют не только клиенты, но и многие компании
            </div>
            <p class="text-body mb-4">
                Нам доверяют не только клиенты, но и многие компании. Мы с
                радостью расширяем ряды наших партнёров новыми компаниями,
                которые приняли правильное решение – сотрудничать с ПКО
                «Форвард»!
            </p>
            <p class="text-body mb-4">
                Эти компании выбрали нас своим партнером, потому что мы имеем
                общие ценности: для нас важен не только постоянный рост и
                высокая эффективность бизнеса, но и человеческий подход, когда
                каждый клиент ценен и важен.
            </p>
            <p class="text-body mb-6">
                Если вас заинтересовало сотрудничество с ПКО «Форвард» –
                свяжитесь с нами любым удобным способом, и мы предложим вам
                уникальный и взаимовыгодный вариант партнерства.
            </p>

            <CompaniesSlider/>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

section {
    padding: 40px 0 80px;
}
</style>
