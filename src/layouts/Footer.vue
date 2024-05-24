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
                    <template v-for="(footerItem, ind) in listElem" :key="ind">
                        <a v-if="footerItem.target" class="header-bottom-nav__link" :href="footerItem.href"
                            :target="footerItem.target">
                            {{ footerItem.name }}
                        </a>

                        <router-link v-else-if="footerItem.href !== '#'" :to="footerItem.href">
                            {{ footerItem.name }}
                        </router-link>

                        <a v-else-if="footerItem.name === 'Получить консультацию'" @click.stop="showModal"
                            class="header-bottom-nav__link" :href="footerItem.href">{{ footerItem.name }}</a>

                        <a v-else class="header-bottom-nav__link" :href="footerItem.href">{{ footerItem.name }}</a>
                    </template>
                </ul>
                <div class="rightContainer">
                    <ul class="feedback">
                        <li @click="showModal($event)">Обратная связь</li>
                        <li>
                            <a href="tel:+78043334133" :style="{ fontWeight: 700 }">+ 7 (804) 333-41-33</a>
                        </li>
                        <li>
                            пн - чт 9:00-18:00
                        </li>
                        <li style="padding-bottom: 28px">
                            пт 9:00-16:45
                        </li>
                        <li>Написать на почту</li>
                        <li>
                            <a href="mailto:dolg.info@caforward.ru"
                                :style="{ fontWeight: 700 }">dolg.info@caforward.ru</a>
                        </li>
                    </ul>
                    <ul>
                        <li><button @click="showModal($event)" class="whiteButt">Обратная связь</button></li>
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
                        <a href="/about" target="_self">
                            О компании
                        </a>
                    </ul>
                    <ul class="footer-nav">
                        <a target="_self" href="/jobs">
                            Вакансии
                        </a>
                    </ul>
                    <ul class="footer-nav partners">
                        <a target="_self" href="/for-partners">
                            Партнёрам
                        </a>
                    </ul>
                    <ul class="feedback">
                        <li @click="showModal($event)">Обратная связь</li>
                        <li>
                            <a href="tel:+78043334133" :style="{ fontWeight: 700 }">+ 7 (804) 333-41-33</a>
                        </li>
                        <li>
                            пн - чт 9:00-18:00
                        </li>
                        <li style="padding-bottom: 28px">
                            пт 9:00-16:45
                        </li>
                        <li>Написать на почту</li>
                        <li>
                            <a href="mailto:dolg.info@caforward.ru"
                                :style="{ fontWeight: 700 }">dolg.info@caforward.ru</a>
                        </li>
                    </ul>
                </div>
                <div class="rightContainer">
                    <ul class="footer-nav">
                        <a target="_blank" href="">
                            Получить рассрочку
                        </a>
                    </ul>
                    <ul class="footer-nav">
                        <a @click.stop="showModal($event)" target="_blank" href="">
                            Получить консультацию
                        </a>
                    </ul>
                    <ul class="footer-nav">
                        <a target="_blank" href="https://pay.mandarinbank.com/?m=4971">
                            Внести платёж
                        </a>
                    </ul>
                    <ul>
                        <li><button @click="showModal($event)" class="whiteButt">Обратная связь</button></li>
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
                <div class="footerFlex">
                    <div>
                        <span>ООО ПКО "Форвард"</span>
                        <span><a target="_blank" href="/policy" class="footer-bottom__link">Политика
                                конфиденциальности</a></span>
                    </div>
                    <div>
                        <span>
                            <a class="freepik" target="_blank" href="https://ru.freepik.com/free-photo">
                                Design by freepik
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <ModalConsultation :visible="modalVisible" @close="closeModal" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ModalConsultation from "./ModalConsultation.vue";


interface FooterItem {
    name: string;
    href: string;
    fontW?: number;
    margin?: string;
    target?: string;
    scroll?: string;
}

interface IconSrc {
    src: string;
}
export default defineComponent({
    components: {
        ModalConsultation
    },
    data() {
        return {
            modalVisible: false,
            isMobile: false,
            footerArr: [
                [
                    { name: "О Компании", href: "#" },
                    { name: "Вакансии", href: "#" },
                    { name: "Партнёрам", href: "#" },
                ],
                [
                    // { text: "Я не должник", href: ""  },
                    { name: "Получить рассрочку", href: "#" },
                    { name: "Получить консультацию", href: "#" },
                    { name: "Внести платеж", href: "https://pay.mandarinbank.com/?m=4971", target: "_blank" },
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
        showModal(event: any) {
            event.preventDefault();
            this.modalVisible = true;
        },
        closeModal() {
            this.modalVisible = false;
        },
        updateIsMobile() {
            this.isMobile = window.innerWidth <= 1024 && window.innerWidth >= 641
        }
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateIsMobile)
    },
    beforeMount() {
        const routes = this.$router.getRoutes()
        this.footerArr[0].forEach(item => {
            const eqNameRoute = routes.find(route => route.name === item.name)
            if (eqNameRoute) {
                item.href = eqNameRoute.path
            }
        })
        this.footerArr[1].forEach(item => {
            const eqNameRoute = routes.find(route => route.name === item.name)
            if (eqNameRoute) {
                item.href = eqNameRoute.path
            }
        })
    }
});
</script>

<style lang="scss" scoped>
a {
    display: block;
    cursor: pointer;
    color: white;
    font-weight: 500;
}

footer {
    background: rgb(41, 41, 41);
}

.footerFlex {
    display: flex;
    justify-content: space-between;
}

.freepik {
    color: #f8f5f80a;
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

    a {
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

.leftPart {
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

a {
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0%;
}

.feedback {
    a {
        color: white;
    }

    li {
        margin-bottom: 15px;
    }

    .liMonday {
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

    .iconContainer {
        gap: 17px;
        align-content: flex-start;
    }

}

@media screen and (max-width: 640.5px) {
    .flexContainer {
        flex-direction: column;
        padding-top: 30px;
        padding-bottom: 17px;
        align-items: center;
        align-items: flex-start;
    }

    .rightContainer {
        display: flex;
        flex-direction: column;

        .after-icon {
            margin-top: 15px;
        }
    }

    .leftPart li {
        margin-bottom: 31px;
    }

    .whiteButt {
        width: 180px;
        height: 41px;
    }

    .feedback {
        margin-top: 29px;

        li {
            margin-bottom: 28px;
        }
    }

    .imgForward {
        margin-bottom: 19px;
        width: 159px;
        height: 42px;
    }

    .iconContainer {
        gap: 17px;
        align-content: flex-start;
    }

    .footer-nav[data-v-e4a862c3]>*:not(:last-child) {
        margin-bottom: 0px;
    }

    a {
        margin-bottom: 17px;
    }

    .footer-nav[data-v-e4a862c3][data-v-e4a862c3]>*:not(:last-child) {
        margin-bottom: 16px;
    }

    .footer-bottom__link {

        margin-left: 0px;
    }

    span {
        display: block;
        margin-left: 0px;
        margin-bottom: 6px;
    }

    .footer-bottom[data-v-e4a862c3] {
        padding: 19.5px 26px 31px 0px;

    }

}
</style>