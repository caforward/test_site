<template>
    <section class="section">
        <div class="custom-container">
            <div class="heading-3 mb-6">
                Рассрочка может стать доступной в следующих случаях:
            </div>
            <div class="cards">
                <div class="cards-card">
                    <div class="cards-card__number">
                        1
                    </div>
                    <div class="cards-card__content">
                        <b>У Вас нет достаточной суммы финансов</b><br>
                        или собственности, чтобы погасить задолженность;
                    </div>
                </div>
                <div class="cards-card">
                    <div class="cards-card__number">
                        2
                    </div>
                    <div class="cards-card__content">
                        <b>Вы принимаете меры, чтобы оплатить долги:</b><br>
                        это может быть продажа имущества, ведение бизнеса и т.д.
                    </div>
                </div>
                <div class="cards-card">
                    <div class="cards-card__number">
                        3
                    </div>
                    <div class="cards-card__content">
                        <b>Вы предоставляете в коллекторское агентство соглашение поручительства,</b>
                        по которому другое лицо будет оплачивать Ваш долг, если Вы нарушите установленные соглашением
                        обязательства.
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup></script>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

.section {
    padding: 80px 0;
}

.title {
    margin-bottom: 35px;
}

.cards {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    padding-top: 30px;

    &-card {
        flex: 1;
        width: 33%;
        background-color: var.$gray-white;
        border-radius: 30px;
        position: relative;

        &__number {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            border-radius: 100%;
            width: 60px;
            height: 60px;
            background-color: var.$black-gray;
            font-weight: 500;
            font-size: 24px;
        }

        &__content {
            padding: 50px 30px;
            line-height: 156%;

            b {
                font-size: 18px;
            }
        }
    }
}

@include mixin.desktop {
    .title {
        margin-bottom: 25px;
    }

    .cards {
        &-card {
            &__content {
                line-height: 150%;
                font-size: 14px;

                b {
                    font-size: 16px;
                }
            }
        }
    }
}

@include mixin.laptop {
    .section {
        padding: 60px 0;
    }

    .title {
        margin-bottom: 10px;
    }

    .cards {
        justify-content: center;

        &-card {
            width: 50%;
            flex: 1;

            &:nth-child(3) {
                flex: none;
            }

            b {
                font-size: unset;
            }

            &__content {
                line-height: 171%;
            }
        }
    }
}

@include mixin.tablet {
    .section {
        padding: 50px 0;
    }

    .cards {
        gap: 50px;
        flex-direction: column;

        &-card {
            width: 100%;
            &:nth-child(3) {
                width: 100%;
            }
        }
    }
}
</style>