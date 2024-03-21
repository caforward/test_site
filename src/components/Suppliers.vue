<template>
    <section>
        <div class="container">
            <h2 class="title">
                Нам доверяют не только клиенты, <br> но и многие компании
            </h2>
            <p class="text">
                Мы с радостью расширяем ряды наших партнёров новыми компаниями, которые приняли правильное решение –
                сотрудничать с ПКО «Форвард»! Эти компании выбрали нас своим партнером, потому что мы имеем общие
                ценности: для нас важен не только постоянный рост и высокая эффективность бизнеса, но и человеческий
                подход, когда каждый клиент ценен и важен.
            </p>
            <div class="slider">
                <div class="slider__container">
                    <div class="slider__slide" v-for="item in dataSlider" :key="item">
                        <div>
                            <img :src="'/src/assets/images/' + item.img" :alt="item.name">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Suppliers',
    data() {
        return {
            dataSlider: [
                {
                    name: 'alpha-bank',
                    img: 'suppliers/alpha.png'
                },
                {
                    name: 'mdm-bank',
                    img: 'suppliers/mdm.png'
                },
                {
                    name: 'vtb-bank',
                    img: 'suppliers/vtb.png'
                },
                {
                    name: 'expo-bank',
                    img: 'suppliers/expo.png'
                },
                {
                    name: 'home-credit',
                    img: 'suppliers/home.png'
                },
                {
                    name: 'sberbank',
                    img: 'suppliers/sber.png'
                },
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
section {
    padding-top: 100px;
    padding-bottom: 50px;
}

.title {
    font-size: 36px;
    font-weight: 700;
    line-height: 40px;
    margin-bottom: 33px;
}

.text {
    font-weight: 400;
    font-size: 16px;
    line-height: 187%;
    width: 76%;
    margin-bottom: 30px;
}

.slider {

    &__container {
        display: flex;
        flex-wrap: nowrap;
        transition: transform .2s;
    }

    &__slide {
        position: relative;
        z-index: 1;

        &:not(:last-child) {
            margin-right: 50px;
        }
    }

    &-nav {
        &__button {
            border: 2px solid #fff;
            border-radius: 30px;
            width: 40px;
            height: 40px;
        }
    }
}
</style>