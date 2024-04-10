<template>
    <section>
        <div class="container">
            <FormBlock />
        </div>
    </section>
</template>

<script>
import FormBlock from "../FormBlock.vue";

export default {
    name: "FormFooter",
    components: {
        FormBlock,
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
section {
    padding: 70px 0 150px;
}
</style>
