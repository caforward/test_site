<template>
    <footer>
        <div class="container">
            <div class="flexContainer">
                <ul>
                    <li>
                        <img class="imgForward" src="/src/assets/images/footer/forward.png"
                            alt="there was a logo CaForward" />
                    </li>
                    <li>г. Новосибирск,<br />ул.  Урицкого, д. 21, этаж 3</li>
                </ul>
                <ul class="footer-nav" v-for="(listElem, index) in footerArr" :key="index">
                    <li v-for="(footerItem, ind) in listElem" :key="ind" :style="{
                    fontWeight: footerItem.fontW ? footerItem.fontW : 500,
                    margin: footerItem.margin ? footerItem.margin : '0 0 30px 0',
                }">
                        {{ footerItem.text }}
                    </li>
                </ul>
                <ul>
                    <li><button class="whiteButt">Обратная связь</button></li>
                    <li><button class="blueButt">Онлайн чат</button></li>
                    <div class="iconContainer">
                        <img v-for="(iconSrc, index) in iconSrcList" :key="index" :src="iconSrc.src"
                            alt="there was a icon from SM " />
                    </div>
                </ul>
            </div>
        </div>
        <hr />
        <div class="footer-bottom">
            <div class="container">
                <span>ООО ПКО "Форвард"</span>
                <a href="#" class="footer-bottom__link">Политика конфиденциальности</a>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface FooterItem {
    text: string;
    fontW?: number;
    margin?: string;
}

interface IconSrc {
    src: string;
}
export default defineComponent({

    data() {
        return {
            footerArr: [
                [
                    { text: "О Компании" },
                    { text: "Контакты" },
                    { text: "Вакансии" },
                    { text: "Партнёрам" },
                ],
                [
                    { text: "Я не должник" },
                    { text: "Получить рассрочку" },
                    { text: "Получить консультацию" },
                    { text: "Внести платеж" },
                ],
                [
                    { text: "Обратная связь", margin: "0" },
                    { text: "+7 (499) 702‑01‑56", fontW: 700, margin: "15px 0" },
                    { text: "пн - вс 8:00-22:00", margin: "0 0 30px 0" },
                    { text: "Написать на почту", margin: "0 0 15px 0" },
                    { text: "dolg.info@caforward.ru", fontW: 700, margin: "0" },
                ],
            ] as FooterItem[][],
            iconSrcList: [
                { src: "/src/assets/images/footer/1.png" },
                { src: "/src/assets/images/footer/2.png" },
                { src: "/src/assets/images/footer/3.png" },
                { src: "/src/assets/images/footer/4.png" },
                { src: "/src/assets/images/footer/5.png" },
            ] as IconSrc[],
        };
    },
});
</script>

<style lang="scss" scoped>
@import "/src/assets/scss/index.scss";

footer {
    background: rgb(41, 41, 41);
    height: 360px;
}

.container {
    color: white;
}

.footer-bottom {
    padding: 20px 0 30px;
    color: white;
    font-size: 14px;
    line-height: 24px;

    &__link {
        color: white;
        margin-left: 25px;
    }
}

span {
    display: inline-block;
    font-family: "Montserrat", sans-serif;
    letter-spacing: 0%;
}

.flexContainer {
    display: flex;
    padding-top: 61px;
    justify-content: space-between;
    padding-bottom: 34px;
}

.iconContainer {
    display: flex;
    gap: 7px;

    img {
        width: 35px;
        height: 35px;
    }
}

hr {
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    height: 0px;
}

li {
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0%;
}

.footer-nav {
    &>*:not(:last-child) {
        margin-bottom: 30px;
    }
}

.imgForward {
    max-width: 200px;
    max-height: 52px;
    width: 100%;
    margin-bottom: 26px;
}

.whiteButt {
    width: 198px;
    height: 41px;
    border-radius: 30px;
    background: rgb(245, 245, 245);
    margin-bottom: 14px;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 214%;
    color: #212121;
}

.blueButt {
    width: 198px;
    height: 41px;
    border-radius: 30px;
    background: rgb(0, 150, 216);
    margin-bottom: 30px;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 214%;
    color: #fff;
}
</style>