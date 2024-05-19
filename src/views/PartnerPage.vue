<template>
    <main>
        <Intro />
        <AboutCompany />
        <Suppliers />
        <Profitability />
        <Bonds />
        <FormFooter />
    </main>
</template>

<script setup>
import { onMounted } from "vue";

import Intro from "../components/PartnerPage/Intro.vue";
import AboutCompany from "../components/PartnerPage/AboutCompany.vue";
import Suppliers from "../components/PartnerPage/Suppliers.vue";
import Profitability from "../components/PartnerPage/Profitability.vue";
import Bonds from "../components/PartnerPage/Bonds.vue";
import FormFooter from "../components/PartnerPage/FormFooter.vue"

onMounted(() => {
    window.scrollTo(0,0)
})
</script>

<style></style>
