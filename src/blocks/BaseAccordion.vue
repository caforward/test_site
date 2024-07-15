<script setup>
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionContent from "primevue/accordioncontent";
import AccordionHeader from "primevue/accordionheader";

const props = defineProps({
    accordionData: {
        type: Array,
        default: []
    }
})

</script>

<template>
    <Accordion multiple class="accordion">
        <AccordionPanel v-for="(item, idx) in props.accordionData" :key="item.title" :value="String(idx)"
            class="accordion__panel">
            <AccordionHeader class="accordion__header">{{ item.title }}</AccordionHeader>
            <AccordionContent class="accordion__content">
                <p class="m-0">
                    {{ item.content }}
                </p>
            </AccordionContent>
        </AccordionPanel>
    </Accordion>
</template>

<style lang="scss" scoped>
</style>