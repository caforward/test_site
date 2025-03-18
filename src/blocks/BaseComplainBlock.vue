<script setup>
import BaseButton from './ui/BaseButton.vue';

</script>

<template>
    <section class="py-4 bg-sky-500">
        <div class="custom-container">
            <div class="flex flex-col items-center md:text-left text-center gap-4 items-start text-white lg:flex-row lg:items-center">
                <!-- <i class="pi pi-exclamation-circle !text-4xl"></i> -->
                <p class="text-base flex-1 xl:text-lg">
                    Свяжитесь с нами: <a class="text-blue-950 font-medium" href="tel:+78043334133">8 804 333 41 33</a> или отправьте заявку через форму выше.
                </p>

                <div class="flex gap-4 flex-wrap justify-center">
                    <BaseButton as="link" to="tel:+78043334133" severity="secondary">
                        Позвонить
                    </BaseButton>
                    <BaseButton as="router-link" to="/complaint" severity="secondary">
                        Поделиться обратной связью
                    </BaseButton>
                </div>
            </div>
        </div>
    </section>
</template>