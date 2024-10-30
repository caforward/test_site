<template>
    <div class="intro-block">
        <div class="intro-block__inner">
            <slot name="content"></slot>
            <slot name="img"></slot>
        </div>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

.intro {
    &-block {
        &__inner {
            display: flex;
            gap: 15px;
        }
    }
}

@include mixin.tablet {
    .intro {
        &-block {
            &__inner {
                flex-direction: column;
            }
        }
    }
}
</style>
