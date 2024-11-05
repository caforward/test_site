<script setup>
import BaseButton from '../blocks/ui/BaseButton.vue';

onMounted(() => {
    window.scrollTo(0, 0)
})
</script>

<template>
    <section class="py-32 border-t-2 border-slate-100">
        <div class="custom-container">
            <div class="w-full flex flex-col items-center justify-center">
                <span class="font-bold text-sky-500 text-[100px]">
                    404
                </span>
                <p class="mb-6 font-bold">
                    Кажется такой страницы не существует. <br>
                </p>

                <BaseButton as="router-link" to="/" size="large">
                    Перейти на главную
                </BaseButton>
            </div>
        </div>
    </section>
</template>
