<script setup>
import {onMounted} from "vue";

import Offers from "@/components/MainPageOld/Offers.vue";
import IntroSlider from "@/components/MainPageOld/IntroSlider.vue";
import AboutInNumbersVue from "@/components/MainPageOld/AboutInNumbers.vue";
import HelpEverClientVue from "@/components/MainPageOld/HelpEverClient.vue";
import PigFinance from "@/components/MainPageOld/PigFinance.vue";
import Suppliers from "@/components/MainPageOld/Suppliers.vue";
import AboutCompany from "@/components/MainPageOld/AboutCompany.vue";
import AnonimCallVue from "@/components/MainPageOld/AnonimCall.vue";
import BaseComplainBlock from "@/blocks/BaseComplainBlock.vue";

onMounted(() => {
    window.scrollTo(0, 0)

    //
})
</script>

<template>
    <main>
        <!-- <IntroSlider /> -->
        <IntroSlider/>
        <BaseComplainBlock/>
        <AboutInNumbersVue/>
        <HelpEverClientVue/>
        <Offers/>
        <PigFinance/>
        <Suppliers/>
        <AboutCompany/>
        <AnonimCallVue/>
    </main>
</template>

<style></style>
