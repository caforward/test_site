<script setup>
import PayForm from '@/blocks/PayForm.vue';
</script>

<template>
    <section class="payment">
        <div class="custom-container">
            <div class="heading-2 mb-6">
                Попрощайтесь с долгами онлайн <br> на своих условиях
            </div>

            <div class="payment-blocks">
                <div class="payment-block bg-[#F3F7FA]">
                    <div class="payment-block__info">
                        <div class="payment-block__title">
                            Получите скидку до 75%
                        </div>
                        <p class="payment-block__text payment-block__text_banner">
                            После того как вы заполните форму для получения <br class="hidden lg:block">
                            рассрочки, мы сразу же уменьшим ваш общий долг <br class="hidden lg:block">
                            до 75%. После оформления рассрочки через сайт, <br class="hidden lg:block">
                            вы получите возможность оплачивать долг <br class="hidden lg:block">
                            постепенно, а часть суммы будет прощена <br class="hidden lg:block">
                            автоматически.
                        </p>
                    </div>

                    <div class="payment-block__image">
                        <picture>
                            <source srcset="/images/PigImg/2imgLogo.webp" type="image/webp"/>
                            <img src="/images/PigImg/2imgLogo.png" alt="2imgLogo">
                        </picture>
                    </div>
                </div>

                <div id="payment" class="payment-block border border-[#EAECEE] bg-white">
                    <div class="payment-block__title">
                        Оплатите <br class="hidden"> задолженность онлайн!
                    </div>
                    <p class="payment-block__text mb-6">
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
        lg:grid-cols-2
        grid grid-cols-1 gap-[30px];
    }

    &-block {
        @apply
        lg:p-[30px]
        sm:scroll-mt-32
        scroll-mt-20 px-[15px] py-5 rounded-[30px] flex flex-col;

        &__info {
            @apply mb-auto;
        }

        &__title {
            @apply
            xl:text-[28px]/[32px]
            lg:text-[24px]
            sm:text-[18px]/[26px]
            text-[14px]/[24px] font-semibold mb-3;
        }

        &__text {
            @apply
            xl:text-base/[24px]
            sm:text-[14px]/[24px]
            text-sm/[20px];

            &_banner {
                @apply
                xl:text-[16px]/[28px]
                sm:text-[14px]/[24px]
                text-[14px]/[20px];
            }
        }

        &__image {
            @apply
            xl:h-[377px]
            lg:h-[300px]
            sm:h-[244px]
            xs:h-[180px]
            h-[140px];
        }
    }
}
</style>