<script setup>
import Button from 'primevue/button';
</script>

<template>
    <section class="py-32 border-t-2 border-slate-100">
        <div class="container">
            <div class="w-full flex flex-col items-center justify-center">
                <span class="font-bold text-sky-500 text-[100px]">
                    404
                </span>
                <p class="mb-6 font-bold">
                    Кажется такой страницы не существует. <br>
                </p>
                <Button as="router-link" to="/" label="Перейти на главную" size="large" />
            </div>
        </div>
    </section>
</template>
