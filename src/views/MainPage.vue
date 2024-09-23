<template>
    <main>
        <!-- <IntroSlider /> -->
        <IntroSlider />
        <BaseComplainBlock />
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
import { onMounted } from "vue";

// import Offers from "../components/Offers.vue";
import IntroSlider from "../components/IntroSlider.vue";
import AboutInNumbersVue from "../components/AboutInNumbers.vue";
import HelpEverClientVue from "../components/HelpEverClient.vue";
import PigFinance from "../components/PigFinance.vue";
import Suppliers from "../components/Suppliers.vue";
import AboutCompany from "../components/AboutCompany.vue";
import AnonimCallVue from "../components/AnonimCall.vue";
import BaseComplainBlock from "../blocks/BaseComplainBlock.vue";
</script>

<style></style>
