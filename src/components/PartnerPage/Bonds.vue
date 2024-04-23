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
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>


section {
    padding: 50px 0 35px;
    background-color: $gray-white;
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
            color: $white;
            font-weight: 700;
            background-color: $blue-light;
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
                        background-color: $black;
                    }
                }
            }
        }
    }
}
</style>