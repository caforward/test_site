<template>
    <div class="modal">
        <slot></slot>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
</script>

<style lang="scss">
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    padding: 10px;

    &__body {
        position: relative;
    }
}
</style>