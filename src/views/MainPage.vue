<script setup>
// import HeroSlider from "@/components/MainPage/HeroSlider.vue";
import ActionTiles from "@/components/MainPage/ActionTiles/ActionTiles.vue";
import Suppliers from "@/components/MainPage/Suppliers.vue";
import Offers from "@/components/MainPage/Offers.vue";
import HeroBanner from "@/components/MainPage/HeroBanner.vue";
</script>

<template>
    <main>
        <!--        <HeroSlider/>-->
        <HeroBanner/>
        <ActionTiles/>
        <Offers/>
        <Suppliers class="!py-20"/>
    </main>
</template>