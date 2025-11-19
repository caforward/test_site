<script setup>
import HeroSlider from "@/components/MainPage/HeroSlider.vue";
import ActionTiles from "@/components/MainPage/ActionTiles/ActionTiles.vue";
import Suppliers from "@/components/MainPage/Suppliers.vue";
import Offers from "@/components/MainPage/Offers.vue";
</script>

<template>
    <main>
        <HeroSlider/>
        <ActionTiles/>
        <Offers/>
        <Suppliers class="!py-20"/>
    </main>
</template>