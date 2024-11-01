<template>
    <section>
        <div class="custom-container">
            <h2 class="title">
                ООО ПКО «Форвард»
            </h2>
            <div class="content content_flex">
                <div class="content__text">
                    <p>
                        Председатель совета директоров ООО ПКО «Форвард» Юрий Вавилов поясняет, что компания является
                        надежным
                        эмитентом с историей более 5 лет. Облигационное размещение для коллекторской компании – один из
                        источников фондирования для покупки просроченных розничных портфелей.
                    </p>
                    <p>
                        ООО ПКО «Форвард» основано в декабре 2014 года, а с 2017 года – включено в госреестр
                        коллекторских
                        агентств России. В этом реестре представлено 380 юридических лиц, а ООО ПКО «Форвард» входит
                        среди
                        этих
                        компаний в топ-18.
                    </p>
                    <p>
                        Компания взыскивает долг по агентской схеме с физических лиц и по кредитным портфелям,
                        выкупленным у
                        коммерческих банков и микрофинансовых организаций.
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
            <div class="plates">
                <div class="plates-item" v-for="(item, index) in items" :key="index">
                    <div class="plates-item__img">
                        <img :src='"/images/" + item.img' alt="">
                    </div>
                    <h3 class="plates-item__title">{{ item.title }}</h3>
                    <span class="plates-item__text">
                        {{ item.text }}
                    </span>
                </div>
            </div>
            <div class="content">
                <p>
                    С начала 2015 года компания взыскала более 730 млн.руб. Текущий уровень взыскания позволяет компании
                    полностью обслуживать все долговые обязательства. 
                </p>
                <p>
                    По итогам 2020 года выручка компании составила 249,4 млн.руб., а чистая прибыль – 69,6 млн.руб.
                    Собственный капитал компании – 307,7 млн.руб.
                </p>
                <p>
                    На 31.12.2020 года финансовый долг компании составляет 235,5 млн.руб. На сегодняшний день компания планомерно
                    погашает свои обязательства перед инвесторами за счет средств, полученных от взыскания.
                </p>
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

    p {
        line-height: 187%;

        &:not(:last-child) {
            margin-bottom: 15px;
        }
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