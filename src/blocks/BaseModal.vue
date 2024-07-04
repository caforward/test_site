<script setup>
import { onMounted } from 'vue';

function closeModal() {
    console.log('closeModal')
}
</script>

<template>
    <div class="modal">
        <slot></slot>
    </div>
</template>

<style lang="scss">
.fade-leave-active.modal {
    padding-right: 0 !important;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.5);

    &__body {
        position: relative;
    }
}
</style>