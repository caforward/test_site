<template>
    <main>
        <Intro />
        <InstallmentCases />
        <Calculator />
        <HowToGet />    
        <DebtForm />
    </main>
</template>

<script setup>
import { onMounted } from 'vue';

import Intro from '../components/Installment/Intro.vue';
import Calculator from '../components/Installment/Calculator.vue';
import HowToGet from '../components/Installment/HowToGet.vue';
import InstallmentCases from '../components/Installment/InstallmentCases.vue';
import DebtForm from '../components/Installment/DebtForm.vue';

onMounted(() => {
    window.scrollTo(0,0)
})
</script>

<style></style>
