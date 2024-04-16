<template>
    <div class="intro-block">
        <div class="intro-block__inner">
            <slot name="content"></slot>
            <slot name="img"></slot>
        </div>
    </div>
</template>

<script>

export default {
    name: "IntroBlock",
    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
@import "/public/assets/scss/index.scss";



.intro-block {
    &__inner {
        display: flex;
        gap: 15px;
    }
}
</style>
