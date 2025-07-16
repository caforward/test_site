<template>
    <section>
        <div class="custom-container">
            <div class="heading-3 mb-6">
                Нам доверяют не только клиенты, но и многие компании
            </div>
            <p class="text-body mb-6">
                Эти компании выбрали нас своим партнером, потому что мы имеем
                общие ценности: для нас важен не только постоянный рост и
                высокая эффективность бизнеса, но и человеческий подход, когда
                каждый клиент ценен и важен.
            </p>
            <CompaniesSlider />
        </div>
    </section>
</template>

<script>
import CompaniesSlider from '../../blocks/CompaniesSlider.vue';

export default {
    name: 'Suppliers',
    components: {
        CompaniesSlider
    }
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

section {
    padding: 40px 0 80px;
}

.title,
.text {
    margin-bottom: 25px;
}

.text {
    line-height: 187%;
    font-size: 16px;
    width: 74%;
}

@include mixin.tablet {
    .text {
        width: 100%;
    }
}
</style>