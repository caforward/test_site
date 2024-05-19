<template>
    <main>
        <Jobs />
    </main>
</template>

<script setup>
import { onMounted } from "vue";

import Jobs from "../components/Jobs/Jobs.vue";

onMounted(() => {
    window.scrollTo(0,0)
})
</script>

<style></style>
