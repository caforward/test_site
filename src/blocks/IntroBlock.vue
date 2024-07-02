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
.intro {
    &-block {
        &__inner {
            display: flex;
            gap: 15px;
        }
    }
}

@include mobile {
    .intro {
        &-block {
            &__inner {
                flex-direction: column;
            }
        }
    }
}
</style>
