<script setup>
import Button from 'primevue/button';

</script>

<template>
    <section class="p-4 bg-sky-500">
        <div class="container">
            <div class="flex flex-col gap-4 items-start text-white lg:flex-row lg:items-center">
                <i class="pi pi-exclamation-circle !text-4xl"></i>
                <p class="text-base flex-1 xl:text-lg">
                    Поделитесь своим опытом о взаимодействии с нашим колл-центром, это поможет нам стать лучше.
                </p>
                <Button as="router-link" to="/complaint" label="Оставить обращение" size="medium" severity="secondary" />
            </div>
        </div>
    </section>
</template>