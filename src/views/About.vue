<template>
    <main>
        <Intro />
        <AboutInNumbersVue />
        <Info />
        <Advantages />
        <Trust />
        <Faq />
        <FormFooter />
    </main>
</template>

<script setup>
import { onMounted } from "vue";

import Intro from "../components/About/Intro.vue"
import AboutInNumbersVue from "../components/AboutInNumbers.vue";
import Info from "../components/About/Info.vue"
import Advantages from "../components/About/Advantages.vue"
import Trust from "../components/About/Trust.vue"
import Faq from "../components/About/Faq.vue"
import FormFooter from "../components/About/FormFooter.vue"

onMounted(() => {
    window.scrollTo(0,0)
})
</script>

<style></style>
