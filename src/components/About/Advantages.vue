<template>
    <section class="advantages">
        <div class="container">
            <h2 class="advantages__title">Наши преимущества</h2>
            <div class="advantages__inner">
                <div class="advantages-plates">
                    <div class="advantages-plates-item" v-for="(plate, idx) in advantagesPlates" :key="idx">
                        <div class="advantages-plates-item__img">
                            <img :src="'assets/images/' + plate.imgSrc" alt="" />
                        </div>
                        <div class="advantages-plates-item__text">
                            {{ plate.text }}
                        </div>
                    </div>
                </div>
                <div class="advantages__img">
                    <img src="/assets/images/blocks/about/advantages/person.png" alt="">
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Advantages",
    data() {
        return {
            advantagesPlates: [
                {
                    imgSrc: "blocks/about/advantages/01.png",
                    text: "С нами вы сможете списать до 70% от суммы основного долга",
                },
                {
                    imgSrc: "blocks/about/advantages/02.png",
                    text: "С нами вам не нужно бояться, что весь ваш доход будет уходить на погашение долга",
                },
                {
                    imgSrc: "blocks/about/advantages/03.png",
                    text: "По окончании выплат получаете полный набор документов",
                },
                {
                    imgSrc: "blocks/about/advantages/04.png",
                    text: "Нам доверяют не только клиенты, но и многие компании",
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
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
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 115px;
        grid-row-gap: 40px;

        &-item {
            &__img {
                width: 60px;
                height: 60px;
                margin-bottom: 30px;
            }

            &__text {
                line-height: 175%;
            }
        }
    }
}

@include desktop {
    .advantages {
        &__inner {
            gap: 30px;
        }
        &-plates {
            grid-gap: 30px;
            grid-row-gap: 55px;
            &-item {
                &__text {
                    font-size: 14px;
                }
            }
        }
    }
}

@include laptop {
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

@include tablet {
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
