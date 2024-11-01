<template>
    <section>
        <div class="custom-container">
            <h2 class="title">
                Рентабельность компании
            </h2>
            <p class="text">
                На 31.12.2020 показатели рентабельности ООО ПКО «Форвард» следующие:
            </p>
            <div class="plates">
                <div class="plates-item" v-for="(item, index) in plates" :key="index">
                    <div class="plates-item__title">
                        {{ item.percentage }}
                    </div>
                    <span class="plates-item__text" v-html="item.text" </span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Profitability',
    data() {
        return {
            plates: [
                {
                    percentage: '87,4%',
                    text: "Валовая <br> рентабельность"
                },
                {
                    percentage: '36,4%',
                    text: "Рентабельность по прибыли до налогов "
                },
                {
                    percentage: '27,9%',
                    text: "Рентабельность <br> по чистой прибыли"
                },
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

section {
    padding: 80px 0 50px;
    background-color: var.$gray-white;
}

.title {
    margin-bottom: 15px;
}

.text {
    line-height: 187%;
    margin-bottom: 20px;
}

.plates {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;

    &-item {
        width: calc(100% /3);
        flex: 1;
        background-color: var.$white;
        border-radius: 30px;
        padding: 50px 55px;
        box-shadow: 0 15px 30px 0 rgba(0, 150, 216, 0.05);

        &__title {
            font-weight: 600;
            font-size: 40px;
            line-height: 75%;
            color: var.$blue-light;
            margin-bottom: 25px;
        }

        &__text {
            line-height: 175%;
        }
    }
}

@include mixin.desktop {
    .text {
        font-size: 14px;
    }

    .plates {
        &-item {
            font-size: 14px;
            padding: 50px 30px;

            &__title {
                font-size: 30px;
            }
        }
    }
}

@include mixin.laptop {
    .plates {
        &-item {
            padding: 30px 20px;
            line-height: 143%;

            &__title {
                font-size: 30px;
                margin-bottom: 15px;
            }
        }
    }
}

@include mixin.tablet {
    .plates {
        &-item {
            flex: none;
            width: 100%;
        }
    }
}
</style>