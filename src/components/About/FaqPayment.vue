<template>
    <section class="faq">
        <div class="custom-container">
            <div class="faq__wrapper">
                <div class="faq__head">
                    <div class="heading-3 mb-4">
                        Мы помогаем сделать оплату долгов простой и доступной
                    </div>
                    <p class="text-body">
                        Процесс урегулирования обычно включает несколько этапов:
                    </p>
                </div>
                <div class="faq__body">
                    <div class="item">
                        <span class="item__number">
                            1.
                        </span>
                        <div class="item__title">
                            Анализ ситуации клиента
                        </div>
                        <div class="item__text">
                            Мы изучаем задолженность и возможные варианты ее урегулирования.
                        </div>
                    </div>

                    <div class="item">
                        <span class="item__number">
                            2.
                        </span>
                        <div class="item__title">
                            Предложение решения
                        </div>
                        <div class="item__text">
                            Клиенту предлагаются варианты погашения задолженности.
                        </div>
                    </div>

                    <div class="item">
                        <span class="item__number">
                            3.
                        </span>
                        <div class="item__title">
                            Заключение соглашения
                        </div>
                        <div class="item__text">
                            Фиксируются условия урегулирования и график платежей.
                        </div>
                    </div>

                    <div class="item">
                        <span class="item__number">
                            4.
                        </span>
                        <div class="item__title">
                            Закрытие задолженности
                        </div>
                        <div class="item__text">
                            После выполнения условий клиент получает документы о погашении долга.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
</script>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

section {
    padding: 80px 0 70px;
    background-color: #fafbfd;
}

.faq {
    &__wrapper {
        display: flex;
        flex-wrap: wrap;
        grid-gap: 30px;
    }

    &__body {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 25px;

        .item {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            @apply gap-y-1 gap-x-4;

            &__number {
                @apply flex items-center justify-center rounded-full text-base font-bold h-8 w-8 flex-none bg-sky-500 text-white
                md:text-large md:w-10 md:h-10;
            }

            &__title {
                @apply flex-1 font-semibold text-large
                md:text-xl;
            }

            &__text {
                @apply w-full flex-none pl-[3rem] text-sm
                md:text-base md:pl-[3.5rem];
            }
        }
    }

    &__title {
        margin-bottom: 20px;
    }

    &__text {
        line-height: 187%;
    }
}

@include mixin.tablet {
    .faq {
        &__text {
            font-size: 14px;
        }
    }
}

@include mixin.laptop {
    section {
        padding: 50px 0 25px;
    }

    .faq {
        &__wrapper {
            gap: 10px;
        }

        &__body {
            grid-template-columns: repeat(1, 1fr);
        }
    }
}
</style>
