<template>
    <footer id="contacts">
        <div class="container"> 

            <div v-if="isMobile === false" class="flexContainer">
                <ul class="leftPart">
                    <a href="/">
                        <img class="imgForward" src="/assets/images/footer/forward.png"
                            alt="there was a logo CaForward" />
                    </a>
                    <li>г. Новосибирск,<br />ул.  Урицкого, д. 21, этаж 3</li>
                </ul>
                <ul class="footer-nav" v-for="(listElem, index) in footerArr" :key="index">
                    <a :href= footerItem.href v-for="(footerItem, ind) in listElem" :key="ind">
                        {{ footerItem.text }}
                    </a>
                </ul>
                <div class="rightContainer">
                <ul class="feedback"> 
                    <li>Обратная связь</li>
                    <a href="tel:+74997020156" :style="{fontWeight: 700}">+7 (499) 702‑01‑56</a>
                    <li :style="{paddingBottom: '28px'}">пн - вс 8:00-22:00</li>
                    <li>Написать на почту</li>
                    <a href="mailto:dolg.info@caforward.ru" :style="{fontWeight: 700}">dolg.info@caforward.ru</a>
                </ul>
                <ul>
                    <li><button class="whiteButt">Обратная связь</button></li>
                    <!-- <li><button class="blueButt">Онлайн чат</button></li> -->
                    <div class="iconContainer">
                        <img v-for="(iconSrc, index) in iconSrcList" :key="index" :src="iconSrc.src"
                            alt="there was a icon from SM " />
                    </div>
                </ul>
            </div>
            </div>



            <div v-if="isMobile" class="flexContainer">
                <div class="left-side">
                <ul class="leftPart">
                    <a href="/">
                        <img class="imgForward" src="/assets/images/footer/forward.png"
                            alt="there was a logo CaForward" />
                    </a>
                </ul>
                <ul class="footer-nav">
                    <a href="/about" >
                       О компании
                    </a>
                </ul>
                <ul class="footer-nav">
                    <a href="/jobs" >
                       Вакансии
                    </a>
                </ul>
                <ul class="footer-nav partners">
                    <a target="_blank" href="/for-partners" >
                       Партнёрам
                    </a>
                </ul>
                <ul class="feedback"> 
                    <li>Обратная связь</li>
                    <a href="tel:+74997020156" :style="{fontWeight: 700}">+7 (499) 702‑01‑56</a>
                    <li :style="{paddingBottom: '28px'}">пн - вс 8:00-22:00</li>
                    <li>Написать на почту</li>
                    <a href="mailto:dolg.info@caforward.ru" :style="{fontWeight: 700}">dolg.info@caforward.ru</a>
                </ul>
                </div>
                <div class="rightContainer">
                    <ul class="footer-nav">
                    <a target="_blank" href="" >
                       Получить рассрочку
                    </a>
                </ul>
                <ul class="footer-nav">
                    <a target="_blank" href="" >
                       Получить консультацию
                    </a>
                </ul>
                <ul class="footer-nav">
                    <a target="_blank" href="https://pay.mandarinbank.com/?m=4971" >
                       Внести платёж
                    </a>
                </ul>
                <ul>
                    <li><button class="whiteButt">Обратная связь</button></li>
                    <!-- <li><button class="blueButt">Онлайн чат</button></li> -->
                    <div class="iconContainer">
                        <img v-for="(iconSrc, index) in iconSrcList" :key="index" :src="iconSrc.src"
                            alt="there was a icon from SM " />
                    </div>
                </ul>
                <ul class="after-icon">
                        <li>г. Новосибирск,<br /> <br>ул.  Урицкого, д. 21, этаж 3</li>
                    </ul>
            </div>
            </div>
        </div>
        <hr />
        <div class="footer-bottom">
            <div class="container">
                <span>ООО ПКО "Форвард"</span>
                <span><a href="#" class="footer-bottom__link">Политика конфиденциальности</a></span>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface FooterItem {
    text: string;
    href: string;
    fontW?: number;
    margin?: string;
}

interface IconSrc {
    src: string;
}
export default defineComponent({

    data() {
        return {
            isMobile: false,
            footerArr: [
                [
                    { text: "О Компании", href: "/about" },
                    { text: "Вакансии", href: "/jobs"  },
                    { text: "Партнёрам", href: "/for-partners"  },
                ],
                [
                    // { text: "Я не должник", href: ""  },
                    { text: "Получить рассрочку", href: ""  },
                    { text: "Получить консультацию", href: ""  },
                    { text: "Внести платеж", href: "https://pay.mandarinbank.com/?m=4971"  },
                ]
            ] as FooterItem[][],
            iconSrcList: [
                { src: "/assets/images/footer/1.png" },
                { src: "/assets/images/footer/5.png" },
            ] as IconSrc[],
        };
    },
    mounted() {
        this.isMobile = window.innerWidth <= 1024 && window.innerWidth >= 641
        window.addEventListener('resize', this.updateIsMobile)
    },
    methods: {
        updateIsMobile() {
            this.isMobile = window.innerWidth <= 1024 && window.innerWidth >= 641
        }
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateIsMobile)
    },
});
</script>

<style lang="scss" scoped>


a{
    display: block;
    cursor: pointer;
    color: white;
    font-weight: 500;
}
footer {
    background: rgb(41, 41, 41);
}

.container {
    color: white;
}

.footer-bottom {
    padding: 19.5px 26px 31px 20px;
    color: white;
    font-size: 14px;

    &__link {
        color: white;
        margin-left: 25px;
    }
}

span {
    display: inline-block;
    font-family: "Montserrat", sans-serif;
    letter-spacing: 0%;
    a{
        display: inline-block;
    font-family: "Montserrat", sans-serif;
    letter-spacing: 0%;
    }
}

.flexContainer {
    display: flex;
    padding-top: 61px;
    justify-content: space-between;
    padding-bottom: 34px;
}
.rightContainer {
    display: flex;
    gap: 30px;
}

.iconContainer {
    display: flex;
    gap: 7px;
    justify-content: center;
    img {
        width: 35px;
        height: 35px;
    }
}

.leftPart{
    li {
        line-height: 24px;
    }
    a {
        line-height: 24px;
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
a{
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0%;
}
.feedback {
    a{
        margin-bottom: 30px;
        line-height: 0px;
        cursor: pointer;
        color: white;
    }
    li {
        margin-bottom: 30px;
        line-height: 0px;
    }
    .liMonday{
        padding-bottom: 28px;
    }
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

@media screen and (max-width: 1024px) and (min-width: 641px) {
    .flexContainer {
        flex-direction: row;
        padding-top: 30px;
        padding-bottom: 17px; 
        align-items: center;
    }
    .rightContainer {
        display: flex;
        flex-direction: column;
        padding-top: 58px;
        .after-icon {
            margin-top: 15px;
        }
    }
    .left-side {
            ul {
                margin-bottom: 30px;
                
            }
        }
        .feedback {
            margin-top: 45px;
        }
            .imgForward {
                margin-bottom: 0px;
                width: 159px;
                height: 42px;
            }
            .iconContainer{
                gap:17px;
                align-content: flex-start;
            }
        
}

</style>