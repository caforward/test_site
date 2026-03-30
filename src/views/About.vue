<script setup>
import {onMounted} from "vue";

import Intro from "@/components/About/Intro.vue"
import AboutInNumbersVue from "@/components/MainPageOld/AboutInNumbers.vue";
import Info from "@/components/About/Info.vue"
import Trust from "@/components/About/Trust.vue"
import FormFooter from "@/components/About/FormFooter.vue"
import FaqPayment from "@/components/About/FaqPayment.vue";
import Info2 from "@/components/About/Info2.vue";
import Faq from "@/components/About/Faq.vue";

onMounted(() => {
    window.scrollTo(0, 0)
})
</script>

<template>
    <main>
        <Intro/>
        <AboutInNumbersVue/>
        <!--        <Advantages/>-->
        <Info/>
        <!--        <AboutCompany/>-->
        <Trust/>
        <FaqPayment/>
        <Info2/>
        <FormFooter/>
        <Faq/>
    </main>
</template>

<style></style>
