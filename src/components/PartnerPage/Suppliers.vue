<template>
    <section>
        <div class="container">
            <h2 class="title">
                Нам доверяют не только клиенты, но и многие компании
            </h2>
            <p class="text">
                Эти компании выбрали нас своим партнером, потому что мы имеем общие ценности: для нас важен<br> не
                только
                постоянный рост и высокая эффективность бизнеса, но и человеческий подход, когда каждый клиент ценен и
                важен.
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
</style>