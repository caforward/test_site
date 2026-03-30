<template>
    <section class="info">
        <div class="custom-container">
            <div class="info__inner">
                <div class="heading-3 mb-6">
                    Почему с нами безопасно
                </div>
                <p class="text-body mb-5">
                    ООО ПКО «Форвард» строго соблюдает требования законодательства и правила взаимодействия с должниками.
                </p>

                <p class="text-body mb-5 font-semibold">
                    Мы гарантируем:
                </p>
                <ul class="info-list">
                    <li class="!mb-4">корректное и уважительное взаимодействие;</li>
                    <li class="!mb-4">соблюдение требований Федерального закона №230-ФЗ;</li>
                    <li class="!mb-4">защиту персональных данных клиентов;</li>
                    <li>прозрачные условия урегулирования задолженности.</li>
                </ul>
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
    padding: 80px 0 40px;
}

a {
    color: var.$blue;
    border-bottom: 1px solid var.$blue;
    transition: color 0.2s, border-color 0.1s;

    &:hover {
        color: var.$blue-light;
        border-color: transparent;
    }
}

.info {
    &__inner {
        width: 75%;
    }

    &__title {
        margin-bottom: 25px;
    }

    &__text {
        line-height: 187%;
        margin-bottom: 20px;

        &_border {
            font-weight: 500;
            font-size: 18px;
            line-height: 167%;
            border-left: 8px solid var.$blue;
            padding-left: 30px;
            margin: 0;
            margin-top: 30px;
        }
    }

    &-list {
        margin-bottom: 20px;

        & > li {
            position: relative;
            padding-left: 20px;

            &:not(:last-child) {
                margin-bottom: 25px;
            }

            &::before {
                content: "";
                position: absolute;
                top: 50%;
                left: 0;
                border-radius: 100%;
                transform: translateY(-50%);
                background-color: var.$blue;
                display: block;
                width: 5px;
                height: 5px;
            }
        }
    }
}

@include mixin.desktop {
    .info {
        &__inner {
            width: 100%;
        }

        &__text {
            font-size: 14px;

            &_border {
                font-size: 16px;
            }
        }
    }
}

@include mixin.laptop {
    section {
        padding: 50px 0 25px;
    }

    .info {
        &__text {
            margin-bottom: 15px;

            &_border {
                font-size: 14px;
                margin-top: 25px;
            }
        }
    }
}

@include mixin.tablet {
    .info {
        &__text {
            margin-bottom: 15px;

            &_border {
                font-size: 14px;
                margin-top: 15px;
            }
        }

        &-list {
            margin-bottom: 15px;
        }
    }
}
</style>
