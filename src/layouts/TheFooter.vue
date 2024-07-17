<template>
    <footer id="contacts" class="footer">
        <div class="footer-top">
            <div class="container">
                <div class="footer-top__inner">
                    <div class="footer-top__left">
                        <a href="/" class="footer-top__logo">
                            <img class="imgForward" src="/assets/images/footer/forward.png"
                                alt="there was a logo CaForward" />
                        </a>
                        <div class="footer-top__address">
                            г. Новосибирск,<br />ул.  Урицкого, д. 21, этаж 3
                        </div>
                    </div>

                    <div class="footer-nav">
                        <div class="footer-nav__inner">
                            <ul class="footer-nav__list" v-for="(listElem, index) in footerArr" :key="index">
                                <li v-for="footerItem in listElem" :key="footerItem.name">

                                    <a v-if="footerItem.name === 'Внести платеж'" class="header-bottom-nav__link"
                                        href="/installment-plan#debt-form">
                                        {{ footerItem.name }}
                                    </a>

                                    <router-link v-else-if="footerItem.href !== '#'" :to="footerItem.href"
                                        class="header-bottom-nav__link">
                                        {{ footerItem.name }}
                                    </router-link>

                                    <a v-else-if="footerItem.name === 'Получить консультацию'" @click.stop="showModal"
                                        class="header-bottom-nav__link" :href="footerItem.href">
                                        {{ footerItem.name }}
                                    </a>

                                    <a v-else class="header-bottom-nav__link" :href="footerItem.href">
                                        {{ footerItem.name }}
                                    </a>

                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="footer-top__right">
                        <ul class="footer-top-feedback">
                            <li>
                                <a href="#" @click="showModal($event)">
                                    Обратная связь
                                </a>
                            </li>
                            <li>
                                <a href="tel:+78043334133" class="footer-top-feedback__contact">
                                    + 7 (804) 333-41-33
                                </a>
                            </li>
                            <li>
                                пн - чт 9:00-18:00
                            </li>
                            <li style="padding-bottom: 15px">
                                пт 9:00-16:45
                            </li>
                            <li>Написать на почту</li>
                            <li>
                                <a href="mailto:dolg.info@caforward.ru" class="footer-top-feedback__contact">
                                    dolg.info@caforward.ru
                                </a>
                            </li>
                        </ul>
                        <div class="footer-top-buttons">
                            <button @click="showModal($event)" class="button">
                                Обратная связь
                            </button>
                            <!-- <li><button class="blueButt">Онлайн чат</button></li> -->
                            <ul class="footer-top-buttons__social">
                                <li class="iconContainer" v-for="(iconSrc, index) in iconSrcList" :key="index">
                                    <img :src="iconSrc.src" alt="there was a icon from SM " />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <ul class="footer-bottom__docs">
                    <li v-for="(link, idx) in docsLinks" :key="idx">
                        <a href="#" @click.prevent="openDocsModal(idx)">
                            {{ link }}
                        </a>
                    </li>
                </ul>
                <div class="footer-bottom__inner">
                    <div class="footer-bottom__left">
                        <span>ООО ПКО "Форвард"</span>

                        <a target="_blank" href="/policy" class="footer-bottom__link">
                            Политика конфиденциальности
                        </a>
                    </div>
                    <a class="freepik" target="_blank" href="https://ru.freepik.com/free-photo">
                        Design by freepik
                    </a>
                </div>
            </div>
        </div>
    </footer>
    <ModalConsultation v-model="modalVisible" />
    <ModalDocs v-model="modalDocsVisible" :toShowIndex="modalDocsIndex" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ModalConsultation from "./ModalConsultation.vue";
import ModalDocs from "./ModalDocs.vue";

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
        ModalConsultation,
        ModalDocs,
    },
    data() {
        return {
            modalVisible: false,
            modalDocsVisible: false,
            modalDocsIndex: 0,
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
                    { name: "Внести платеж", href: "/installment-plan#debt-form" },
                    { name: "Получить квитанцию для оплаты", href: "/assets/docs/Квитанция.pdf", target: "_blank" },
                ]
            ] as FooterItem[][],
            iconSrcList: [
                { src: "/assets/images/footer/1.png" },
                { src: "/assets/images/footer/5.png" },
            ] as IconSrc[],
            docsLinks: [
                "Общие сведения",
                "Учредительные документы",
                "Эмиссионные документы",
                "Сообщения",
            ]
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
        openDocsModal(index: any) {
            this.modalDocsIndex = index
            this.modalDocsVisible = true
        },
        updateIsMobile() {
            this.isMobile = window.innerWidth <= 1024 && window.innerWidth >= 641
        },
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateIsMobile)
    },
    beforeMount() {
        const routes = this.$router.getRoutes()

        this.footerArr[0].forEach(item => {
            routes.forEach(route => {
                const routeName = String(route.name).toLowerCase()
                const itemName = item.name.toLowerCase()

                if (itemName === routeName) {
                    item.href = route.path
                }
            })
        })
        this.footerArr[1].forEach(item => {
            routes.forEach(route => {
                const routeName = String(route.name).toLowerCase()
                const itemName = item.name.toLowerCase()

                if (itemName === routeName) {
                    item.href = route.path
                }
            })
        })
    }
});
</script>

<style lang="scss" scoped>
.footer {
    background-color: $black;

    * {
        font-size: 14px;

        &:not(.button) {
            color: #fff;
        }
    }

    &-top {
        padding: 70px 0 50px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);

        &__inner {
            display: flex;
            justify-content: space-between;
            gap: 30px;
        }

        &__logo {
            max-width: 200px;
            margin-bottom: 25px;
        }

        &__address {
            font-size: 14px;
            line-height: 171%;
        }

        &-feedback {
            display: flex;
            flex-direction: column;
            gap: 15px;

            &__contact {
                font-weight: 700;
            }
        }

        &__right {
            flex: none;
            display: flex;
            gap: 30px;
        }

        &-buttons {
            flex: none;
            display: flex;
            flex-direction: column;
            gap: 30px;

            button {
                height: 40px;
                max-width: 180px;
            }

            &__social {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 5px;
            }
        }
    }

    &-nav {
        max-width: 35%;

        &__inner {
            display: flex;
            gap: 30px;
            margin-bottom: 30px;
        }

        &__list {
            display: flex;
            align-content: start;
            gap: 30px;
            flex-wrap: wrap;

            &>li {
                width: 100%;
            }
        }
    }

    &-bottom {
        padding: 20px 0 30px;

        &__inner {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 30px;
            row-gap: 15px;
        }

        &__left {
            flex-wrap: wrap;
            display: flex;
            gap: 30px;
            row-gap: 15px;
        }

        &__docs {
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
            row-gap: 15px;
            margin-bottom: 10px;
        }
    }
}

@include laptop {
    .footer {
        &-top {
            &__inner {
                flex-wrap: wrap;
            }

            &__right {
                width: 100%;
                justify-content: space-between;

                &>* {
                    width: calc(50% - 15px);
                }
            }
        }

        &-nav {
            max-width: 48%;
        }
    }
}

@include tablet {
    .footer {
        &-top {
            &__inner {
                flex-wrap: wrap;
            }

            &__right {
                flex-wrap: wrap;

                &>* {
                    min-width: max-content;
                }
            }

            &__logo {
                max-width: 160px;
                margin-bottom: 20px;
            }
        }

        &-nav {
            max-width: 100%;

            &__list {
                width: calc(50% - 15px);
            }
        }
    }
}

@include mobile {
    .footer {
        &-top {}

        &-nav {
            &__inner {
                flex-wrap: wrap;
            }

            max-width: 100%;

            &__list {
                width: 100%;
            }
        }
    }
}
</style>