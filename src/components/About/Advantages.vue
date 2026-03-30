<template>
    <section class="advantages">
        <div class="custom-container">
            <h2 class="advantages__title">
                Как мы помогаем
            </h2>

            <p class="text-base mb-5">
                Компания «Форвард» помогает заемщикам урегулировать задолженность перед банками и микрофинансовыми
                организациями.
            </p>

            <p class="text-body mb-5">
                Мы стараемся войти в положение клиента и предложить наиболее эффективный вариант решения финансовой
                ситуации.
            </p>

            <p class="text-body mb-2 font-semibold">
                Возможные варианты урегулирования:
            </p>

            <ul class="list mb-10">
                <li class="!mb-4">Рассрочка платежей;</li>
                <li class="!mb-4">Индивидуальный график погашения;</li>
                <li class="!mb-4">Переговоры с кредитором о снижении суммы задолженности.</li>
            </ul>

            <div class="advantages__inner">
                <div class="advantages-plates">
                    <div class="advantages-plates-item" v-for="(plate, idx) in advantagesPlates" :key="idx">
                        <div class="advantages-plates-item__img">
                            <img :src="'/images/' + plate.imgSrc" alt=""/>
                        </div>
                        <div class="text-body">
                            {{ plate.text }}
                        </div>
                    </div>
                </div>

                <div class="advantages__img">
                    <img src="/images/blocks/about/advantages/person.png" alt="">
                </div>
            </div>
        </div>
    </section>
</template>

<!--<p class="text-body mb-5">-->
<!--В отдельных случаях возможно снижение задолженности <span-->
<!--    class="font-semibold text-sky-500">до 70%</span> — при возможности согласования-->
<!--индивидуальных условий и выполнении договоренностей по урегулированию задолженности.-->
<!--</p>-->

<!--<p class="text-body mb-5">-->
<!--После полного погашения задолженности клиент получает подтверждающие документы о закрытии долга.-->
<!--</p>-->

<script>
export default {
    name: "Advantages",
    data() {
        return {
            advantagesPlates: [
                {
                    imgSrc: "blocks/about/advantages/01.svg",
                    text: "В отдельных случаях возможно снижение задолженности до 70% — при возможности согласования индивидуальных условий и выполнении договоренностей по урегулированию задолженности.",
                },
                {
                    imgSrc: "blocks/about/advantages/03.svg",
                    text: "По окончании выплат получаете полный набор документов",
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

section {
    padding: 40px 0;
}

.advantages {
    &__title {
        margin-bottom: 25px;
    }

    &__inner {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 200px;
    }

    &__img {
        margin: 0 0 30px 30px;
        box-shadow: -30px 30px 0 0 rgba(88, 174, 211, 0.1);
        border-radius: 20px;
        border-top-left-radius: 0;
        overflow: hidden;

        img {
            object-fit: cover;
        }
    }

    &-plates {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 115px;
        grid-row-gap: 40px;

        &-item {
            &__img {
                width: 60px;
                height: 60px;
                margin-bottom: 30px;
            }
        }
    }
}

@include mixin.desktop {
    .advantages {
        &__inner {
            gap: 30px;
        }

        &-plates {
            grid-gap: 30px;
            grid-row-gap: 55px;
        }
    }
}

@include mixin.laptop {
    .advantages {
        &__img {
            height: 220px;
            margin: 0 0 15px 15px;
            box-shadow: -15px 15px 0 0 rgba(88, 174, 211, 0.1);
        }

        &-plates {
            gap: 25px;
            column-gap: 15px;
        }
    }
}

@include mixin.tablet {
    .advantages {
        &__inner {
            grid-template-columns: repeat(1, 1fr);
        }

        &__img {
            display: none;
        }
    }
}
</style>
