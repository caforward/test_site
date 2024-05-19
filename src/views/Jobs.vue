<template>
    <main>
        <Intro />
        <Jobs />
        <FormFooter />
    </main>
</template>

<script setup>
import { onMounted } from "vue";

import Intro from "../components/Jobs/Intro.vue";
import Jobs from "../components/Jobs/Jobs.vue";
import FormFooter from "../components/Jobs/FormFooter.vue";

onMounted(() => {
    window.scrollTo(0, 0)
})
</script>

<style></style>
