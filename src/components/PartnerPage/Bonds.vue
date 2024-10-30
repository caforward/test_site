<template>
    <section>
        <div class="container">
            <h2 class="title">
                Наши облигации
            </h2>
            <p class="text">
                Общий объем программы составляет 500 миллионов рублей, которые распределены следующим образом:
            </p>
            <div class="points">
                <div class="points-item" v-for="(point, index) in points" :key="index">
                    <div class="points-item__indicator">
                        {{ index + 1 }}
                    </div>
                    <div class="points-item-content">
                        <div class="points-item-content__title">
                            {{ point.title }}
                        </div>
                        <ul class="points-item-content__list">
                            <li v-for="(listItem, index) in point.list" :key="index">
                                {{ listItem }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            points: [
                {
                    title: 'Коммерческие облигации процентные бездокументарные, серии КО-П01',
                    list: [
                        'Сумма выпуска – 100 млн.рублей',
                        'Размер купона – 14 % годовых',
                        'Количество облигаций в выпуске – 1000 шт',
                        'Номинал облигации – 100 000 рублей',
                        'Длительность купонного периода – 30 дней',
                        'Срок обращения – 1 год',
                        'Организатор размещения – ООО «Юнисервис Капитал»'
                    ]
                },
                {
                    title: 'Коммерческие облигации процентные бездокументарные с централизованным учетом прав, серии КО-П02',
                    list: [
                        'Сумма выпуска – 200 млн.рублей',
                        'Размер купона – 14 % годовых',
                        'Количество облигаций в выпуске – 2000 шт',
                        'Номинал облигации – 100 000 рублей',
                        'Длительность купонного периода – 30 дней',
                        'Срок обращения – 1 год',
                    ]
                },
                {
                    title: 'Коммерческие облигации процентные бездокументарные, серии КО-П03',
                    list: [
                        'Сумма выпуска – 200 млн. рублей',
                        'Размер купона – 10% годовых',
                        'Количество облигаций в выпуске – 2000 шт',
                        'Номинал облигации – 100 000 рублей',
                        'Длительность купонного периода – 30 дней',
                        'Срок обращения – 2 года',
                    ]
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
    padding: 50px 0 35px;
    background-color: var.$gray-white;
}

.title {
    margin-bottom: 15px;
}

.text {
    line-height: 187%;
    margin-bottom: 30px;
}

.points {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 35px;
    row-gap: 40px;

    &-item {
        display: flex;

        &__indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 45px;
            height: 45px;
            border-radius: 15px;
            color: var.$white;
            font-weight: 700;
            background-color: var.$blue-light;
            flex: none;
            line-height: 187%;
            margin-right: 35px;
        }

        &-content {
            &__title {
                font-weight: 600;
                font-size: 20px;
                line-height: 150%;
                margin-bottom: 15px;
            }

            &__list {
                line-height: 187%;

                &>li {
                    padding-left: 25px;
                    position: relative;

                    &::before {
                        content: '';
                        position: absolute;
                        left: 12px;
                        top: 50%;
                        display: block;
                        width: 3px;
                        height: 3px;
                        transform: translate(-50%, -50%);
                        border-radius: 100%;
                        background-color: var.$black;
                    }
                }
            }
        }
    }
}

@include mixin.tablet {
    .text {
        font-size: 14px;
    }

    .points {
        &-item {
            &-content {
                font-size: 14px;

                &__title {
                    font-size: 16px;
                }
            }
        }
    }
}

@include mixin.laptop {
    .points {
        grid-template-columns: repeat(1, 1fr);
        gap: 30px;

        &-item {
            flex-direction: column;
            &__indicator {
                margin: 0;
                margin-bottom: 15px;
            }
        }
    }
}
</style>