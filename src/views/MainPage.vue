<template>
    <main>
        <IntroSlider />
        <AboutInNumbersVue />
        <HelpEverClientVue />
        <!-- <Offers /> Временно убрано до подключения Ю-кассы -->
        <PigFinance />
        <Suppliers />
        <AboutCompany />
        <AnonimCallVue />
    </main>
</template>

<script setup>
import IntroSlider from "../components/IntroSlider.vue";
import AboutInNumbersVue from "../components/AboutInNumbers.vue";
import Offers from "../components/Offers.vue";
import HelpEverClientVue from "../components/HelpEverClient.vue";
import PigFinance from "../components/PigFinance.vue";
import Suppliers from "../components/Suppliers.vue";
import AboutCompany from "../components/AboutCompany.vue";
import AnonimCallVue from "../components/AnonimCall.vue";
</script>

<style></style>
