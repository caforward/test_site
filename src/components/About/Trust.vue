<script setup>
import CompaniesSlider from '@/blocks/CompaniesSlider.vue';
</script>

<template>
    <section>
        <div class="custom-container">
            <div class="heading-3 mb-6">
                Нам доверяют
            </div>
            <p class="text-body mb-4">
                ООО ПКО «Форвард» сотрудничает с банками, микрофинансовыми организациями и финансовыми компаниями.
            </p>
            <p class="text-body font-semibold mb-4">
                Наши партнеры доверяют нам работу с задолженностью благодаря:
            </p>
            <ul class="list">
                <li class="!mb-4">Законному подходу к взысканию;</li>
                <li class="!mb-4">Эффективной работе с проблемной задолженностью;</li>
                <li>Корректному взаимодействию с заемщиками.</li>
            </ul>

            <p class="text-body mb-6">
                Мы постоянно расширяем круг партнеров и открыты для новых форм сотрудничества.
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
