<template>
    <section>
        <div class="container">
            <h2>Нам доверяют не только клиенты, но и многие компании</h2>
            <p>
                Нам доверяют не только клиенты, но и многие компании. Мы с
                радостью расширяем ряды наших партнёров новыми компаниями,
                которые приняли правильное решение – сотрудничать с ПКО
                «Форвард»!
            </p>
            <p>
                Эти компании выбрали нас своим партнером, потому что мы имеем
                общие ценности: для нас важен не только постоянный рост и
                высокая эффективность бизнеса, но и человеческий подход, когда
                каждый клиент ценен и важен.
            </p>
            <p>
                Если вас заинтересовало сотрудничество с ПКО «Форвард» –
                свяжитесь с нами любым удобным способом, и мы предложим вам
                уникальный и взаимовыгодный вариант партнерства.
            </p>

            <CompaniesSlider />
        </div>
    </section>
</template>

<script lang="ts">
import CompaniesSlider from '../../blocks/CompaniesSlider.vue';

export default {
    name: "Trust",
    components: { 
        CompaniesSlider
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
section {
    padding: 40px 0 80px;
}

h2 {
    margin-bottom: 20px;
}

p {
    margin-bottom: 20px;
    line-height: 187%;
    &:last-child {
        margin-bottom: 30px;
    }
}

@include desktop {
    p {
        font-size: 14px;
    }
}
@include tablet {
    h2 {
        margin-bottom: 15px;
    }
    p {
        margin-bottom: 15px;
    }
}
</style>
