<script setup>
import PayForm from '@/blocks/PayForm.vue';
</script>

<template>
    <!--  TODO: переделать верстку  -->
    <section class="payment">
        <div id="payment" class="custom-container">
            <div class="heading-2 mb-6">
                Попрощайтесь с долгами онлайн <br> на своих условиях
            </div>

            <div class="payment-blocks">
                <div class="payment-block bg-[#F3F7FA]">
                    <div>
                        <div class="payment-block__title">
                            Получите скидку в 5%
                        </div>
                        <p class="text-base/[28px]">
                            После того как вы заполните форму для получения <br class="hidden lg:block">
                            рассрочки, мы сразу же уменьшим ваш общий долг <br class="hidden lg:block">
                            на 5%. После оформления рассрочки через сайт, <br class="hidden lg:block">
                            вы получите возможность оплачивать долг <br class="hidden lg:block">
                            постепенно, а часть суммы будет прощена <br class="hidden lg:block">
                            автоматически.
                        </p>
                    </div>

                    <div>
                        <picture>
                            <source srcset="/images/PigImg/2imgLogo.webp" type="image/webp"/>
                            <img src="/images/PigImg/2imgLogo.png" alt="2imgLogo">
                        </picture>
                    </div>
                </div>

                <div class="payment-blocks__block border border-[#EAECEE] bg-white">
                    <h3 class="text-[28px]/[32px] font-semibold mb-3">
                        Оплатите <br> задолженность онлайн!
                    </h3>
                    <p class="text-[16px]/[24px] mb-6">
                        С ООО ПКО «Форвард» вы можете легко оплатить <br class="hidden lg:block">
                        задолженность онлайн и без дополнительных <br class="hidden lg:block">
                        комиссий!
                    </p>

                    <PayForm/>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.payment {
    @apply pb-[85px] pt-[80px] bg-gray-50;

    &-blocks {
        @apply
        sm:grid-cols-2
        grid grid-cols-1 gap-[30px];
    }

    &-block {
        @apply p-[30px] rounded-[30px];

        &__title {
            @apply
            sm:text-[28px]/[32px]
            text-[28px] font-semibold mb-3;
        }
    }
}
</style>