<template>
    <Header />
    <main>
        <Intro />
        <AboutCompany />
        <Suppliers />
        <Profitability />
        <Bonds />
        <FormFooter />
    </main>
    <Footer />
</template>

<script setup>
import Header from "../layouts/Header.vue";
import Footer from '../layouts/Footer.vue';
import Intro from "../components/PartnerPage/Intro.vue";
import AboutCompany from "../components/PartnerPage/AboutCompany.vue";
import Suppliers from "../components/PartnerPage/Suppliers.vue";
import Profitability from "../components/PartnerPage/Profitability.vue";
import Bonds from "../components/PartnerPage/Bonds.vue";
import FormFooter from "../components/PartnerPage/FormFooter.vue"
</script>

<style></style>
