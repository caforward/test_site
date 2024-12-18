<script setup>
import BaseButton from './ui/BaseButton.vue';

</script>

<template>
    <section class="py-4 bg-sky-500">
        <div class="custom-container">
            <div class="flex flex-col gap-4 items-start text-white lg:flex-row lg:items-center">
                <i class="pi pi-exclamation-circle !text-4xl"></i>
                <p class="text-base flex-1 xl:text-lg">
                    Поделитесь своим опытом о взаимодействии с нашим колл-центром или сайтом, <br> это поможет нам стать лучше.
                </p>

                <BaseButton as="router-link" to="/complaint" severity="secondary">
                    Оставить обращение
                </BaseButton>
            </div>
        </div>
    </section>
</template>