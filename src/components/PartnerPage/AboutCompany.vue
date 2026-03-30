<template>
    <section>
        <div class="custom-container">
            <div class="heading-3 mb-5">
                Наш опыт
            </div>
            <div class="content content_flex">
                <div class="content__text">
                    <p class="text-body mb-4">
                        Компания основана в Новосибирске в 2014 году.
                    </p>
                    <p class="text-body mb-4">
                        Специалисты ООО ПКО «Форвард» имеют более 10 лет опыта работы в банковском секторе и сфере взыскания задолженности.
                    </p>
                    <p class="text-body">
                        Мы работаем с задолженностями физических лиц по кредитным портфелям банков и микрофинансовых организаций и помогаем клиентам урегулировать долговые обязательства законным и прозрачным способом.
                    </p>
                </div>
                <div class="content__img">
                    <div class="content-award">
                        <div class="content-award__img">
                            <img src="/images/blocks/partners/aboutCompany/top-18.svg" alt="">
                        </div>
                        <span>
                            коллекторских <br> агентств России
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'AboutCompany',
    data() {
        return {
            items: [
                {
                    img: 'blocks/partners/aboutCompany/icon.png',
                    title: 'Эффективность взыскания',
                    text: 'по первой модели – 20% в группе просроченной задолженности 60-90 дней и до 80% при задолженности до 30 дней.'
                },
                {
                    img: 'blocks/partners/aboutCompany/icon-2.png',
                    title: 'Возвратность долга',
                    text: 'с просрочкой более 1 года обеспечивается на уровне 3-15%.'
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

section {
    padding: 80px 0 40px;
}

.title {
    margin-bottom: 15px;
}

.content {
    &:not(:last-child) {
        margin-bottom: 35px;
    }

    &_flex {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
    }

    &__text {
        width: 66%;
        flex: none;
    }

    &__img {
        width: 100%;
        flex: 1;
    }

    &-award {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
        border-radius: 0 25px;
        padding: 55px 25px 45px;
        background-color: var.$gray-light;
        line-height: 150%;
        text-align: center;

        &__img {
            max-width: 280px;
        }
    }
}

.plates {
    display: flex;
    flex-wrap: wrap;
    gap: 150px;
    width: 66%;
    margin-bottom: 20px;

    &-item {
        width: 35%;
        flex: 1;
        font-size: 18px;
        line-height: 167%;

        &__img {
            width: 60px;
            height: 60px;
            margin-bottom: 25px;
        }

        &__text {
            font-size: 16px;
        }
    }
}

@include mixin.desktop {
    .plates {
        width: 100%;
    }
}

@include mixin.laptop {
    .content {
        &__text {
            width: 50%;
        }
    }
    .plates {
        gap: 30px;
        &-item {
            width: 50%;
            &__title {
                font-size: 16px;
            }
            &__text {
                font-size: 14px;
            }
        }
    }
}

@include mixin.tablet {
    .content {
        font-size: 14px;
        &__text {
            width: 100%;
        }
        &-award {
            padding: 20px 30px 25px;

            &__img {
                img {
                    width: 140px;
                }
            }
        }
    }
    .plates {
        &-item {
            width: 100%;
            flex: none;
        }
    }
}
</style>