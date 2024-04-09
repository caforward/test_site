<template>
    <div class="slider">
        <div class="slider__container">
            <div class="slider__slide" v-for="item in dataSlider" :key="item">
                <div>
                    <img
                        :src="'assets/images/' + item.img"
                        :alt="item.name"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CompaniesSlider",
    data() {
        return {
            dataSlider: [
                {
                    name: "alpha-bank",
                    img: "suppliers/alpha.png",
                },
                {
                    name: "mdm-bank",
                    img: "suppliers/mdm.png",
                },
                {
                    name: "vtb-bank",
                    img: "suppliers/vtb.png",
                },
                {
                    name: "expo-bank",
                    img: "suppliers/expo.png",
                },
                {
                    name: "home-credit",
                    img: "suppliers/home.png",
                },
                {
                    name: "sberbank",
                    img: "suppliers/sber.png",
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
.slider {
    &__container {
        display: flex;
        flex-wrap: nowrap;
        transition: transform 0.2s;
        width: 100%;
    }

    &__slide {
        flex: 1;
        position: relative;
        z-index: 1;
        width: calc(100% / 5);

        &:not(:last-child) {
            margin-right: 50px;
        }

        img {
            width: 100%;
            height: 100%;
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
