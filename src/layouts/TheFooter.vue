<template>
    <footer id="contacts" class="footer">
        <div class="footer-top">
            <div class="container">
                <div class="footer-top__inner">
                    <div class="footer-top__logo">
                        <div class="logo">
                            <router-link to="/">
                                <img class="imgForward" src="/assets/images/footer/forward.png"
                                    alt="there was a logo CaForward" />
                            </router-link>
                        </div>
                        <address class="address">
                            г. Новосибирск,<br> ул. Урицкого, д. 21, этаж 3
                        </address>
                    </div>
                    <div class="footer-top__nav">
                        <ul>
                            <li v-for="link in navbarLinks" :key="link.name">
                                <a v-if="link.target" :href="link.href" :target="link.target" class="link link_white">
                                    {{ link.name }}
                                </a>

                                <a v-else-if="link.modalName" :href="link.href" class="link link_white"
                                    @click.prevent="modalVisible[link.modalName] = true">
                                    {{ link.name }}
                                </a>

                                <router-link v-else :to="link.href" class="link link_white">
                                    {{ link.name }}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="footer-top__contacts">
                        <div class="contacts">
                            <div class="contacts__info">
                                <ul>
                                    <li>
                                        Обратная связь
                                    </li>
                                    <li>
                                        <a href="tel:+78043334133" class="link link_white">
                                            + 7 (804) 333-41-33
                                        </a>
                                    </li>
                                    <li>
                                        пн - чт 9:00-18:00
                                    </li>
                                    <li>
                                        пт 9:00-16:45
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        Написать на почту
                                    </li>
                                    <li>
                                        <a href="mailto:dolg.info@caforward.ru" class="link link_white">
                                            dolg.info@caforward.ru
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="contacts__buttons">
                                <div class="buttons">
                                    <a href="#" class="button" @click.prevent="ModalConsultationVisible = true">
                                        Обратная связь
                                    </a>
                                    <a href="#" class="button button_blue">
                                        Онлайн-чат
                                    </a>
                                </div>

                                <ul class="social">
                                    <li v-for="link in socialLinks" :key="link.name">
                                        <a :href="link.href">
                                            <img :src="link.src" :alt="link.name">
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <div class="footer-bottom__inner">
                    <ul class="docs">
                        <li v-for="(link, idx) in docsLinks" :key="idx">
                            <a href="#" class="link link_white" @click.prevent="openDocsModal(idx)">
                                {{ link }}
                            </a>
                        </li>
                    </ul>
                    <div class="meta">
                        <div class="meta__left">
                            <span>ООО ПКО "Форвард"</span>

                            <a target="_blank" href="/policy" class="link link_white">
                                Политика конфиденциальности
                            </a>
                        </div>
                        <a class="meta__right link link_white" target="_blank" href="https://ru.freepik.com/free-photo">
                            Design by freepik
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <ModalConsultation v-model="modalVisible.modalConsultation" />
    <ModalDocs v-model="modalVisible.modalDocs" :toShowIndex="modalDocsIndex" />
</template>

<script setup>
import { ref, onBeforeMount, reactive } from 'vue'
import { useRouter } from 'vue-router';
import ModalConsultation from "./ModalConsultation.vue";
import ModalDocs from "./ModalDocs.vue";

const router = useRouter()
const modalVisible = reactive({
    modalConsultation: false,
    modalDocs: false
})

const ModalConsultationVisible = ref(false)
const modalDocsVisible = ref(false)
const modalDocsIndex = ref(0)

const navbarLinks = ref([
    {
        name: "О Компании",
        href: "#",
    },
    {
        name: "Получить рассрочку",
        href: "#",
    },
    {
        name: "Вакансии",
        href: "#",
    },
    {
        name: "Получить консультацию",
        href: "#",
        modalName: 'modalConsultation'
    },
    {
        name: "Партнёрам",
        href: "#",
    },
    {
        name: "Внести платеж",
        href: "/installment-plan#debt-form"
    },
    {
        name: "Получить квитанцию для оплаты",
        href: "/assets/docs/Квитанция.pdf",
        target: "_blank"
    },
])

const socialLinks = [
    {
        href: '#',
        name: 'vk',
        src: "/assets/images/footer/1.png"
    },
    {
        href: '#',
        name: 'telegram',
        src: "/assets/images/footer/5.png"
    },
]

const docsLinks = ref([
    "Общие сведения",
    "Учредительные документы",
    "Эмиссионные документы",
    "Сообщения",
])

function openDocsModal(index) {
    modalVisible.modalDocs = true
    modalDocsIndex.value = index
}

onBeforeMount(() => {
    const routes = router.getRoutes()

    navbarLinks.value.forEach(item => {
        routes.forEach(route => {
            const routeName = String(route.name).toLowerCase()
            const itemName = item.name.toLowerCase()

            if (itemName === routeName) {
                item.href = route.path
            }
        })
    })
})
</script>

<style lang="scss" scoped>
.container {
    color: #fff;
}

.footer {
    padding: 70px 0 30px;
    background-color: $black-accent;

    &-top {
        &__inner {
            display: flex;
            gap: 20px;
            justify-content: space-between;
            padding-bottom: 50px;
        }

        &__logo {
            width: 20%;
            max-width: 200px;
            display: flex;
            flex-direction: column;
            gap: 25px;

            & .logo {
                height: 50px;

                a {
                    display: flex;
                    width: 100%;
                    height: 100%;
                }
            }

            & .address {
                font-size: 14px;
                line-height: 171%;
            }
        }

        &__nav {
            flex: 1;
            max-width: 40%;

            & ul {
                display: flex;
                flex-wrap: wrap;
                gap: 30px;
                font-size: 14px;
                font-weight: 500;

                &>li:not(:last-child) {
                    width: calc(50% - 15px);
                }
            }
        }

        &__contacts {
            display: flex;
            gap: 30px;

            & .contacts {
                display: flex;
                gap: 30px;

                &__info {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    font-size: 14px;

                    & ul {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;

                        a {
                            font-weight: 600;
                        }
                    }
                }

                &__buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 30px;

                    .buttons {
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                        width: 100%;

                        &>* {
                            font-size: 14px;
                            height: 40px;
                            width: 200px;
                        }
                    }

                    .social {
                        display: flex;
                        gap: 5px;

                        a {
                            display: flex;
                            width: 35px;
                            height: 35px;
                        }
                    }
                }
            }
        }
    }

    &-bottom {
        border-top: 1px solid rgba(255, 255, 255, 0.2);

        &__inner {
            padding-top: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            font-size: 14px;
            line-height: 171%;

            & .docs {
                display: flex;
                flex-wrap: wrap;
                gap: 30px;
                row-gap: 5px;
            }

            & .meta {
                display: flex;
                flex-wrap: wrap;
                gap: 30px;
                justify-content: space-between;

                &__left {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    row-gap: 5px;
                }

                &__right {}
            }
        }
    }
}

@include desktop {
    .footer {
        &-top {
            &__logo {
                width: 160px;
            }

            &__nav {
                max-width: 30%;

                ul>li {
                    width: 100%;

                    &:not(:last-child) {
                        width: 100%;
                    }
                }
            }

            &__contacts {
                & .contacts__buttons {
                    .buttons>* {
                        width: 180px;
                    }
                }
            }
        }
    }
}

@include laptop {
    .footer {
        &-top {
            &__inner {
                flex-wrap: wrap;
                gap: 30px;
            }

            &__nav {
                flex: none;
                width: 100%;
                max-width: unset;

                & ul>li:not(:last-child) {
                    width: calc(50% - 15px);
                }
            }

            &__contacts {
                width: 100%;

                .contacts {
                    flex-wrap: wrap;
                    width: 100%;
                    justify-content: space-between;

                    &>* {
                        width: calc(50% - 15px);
                    }

                    &__info {
                        ul {
                            gap: 15px;
                        }
                    }

                    &__buttons {
                        .buttons>* {
                            width: 180px;
                        }
                    }
                }
            }
        }
    }
}

@include mobile {
    .footer {
        &-top {
            &__nav {
                ul {
                    gap: 25px;

                    &>li:not(:last-child) {
                        width: 100%;
                    }
                }
            }

            &__contacts {
                .contacts {
                    &>* {
                        width: 100%;
                    }

                    &__buttons {
                        .buttons>* {
                            width: 100%;
                            max-width: 260px;
                        }
                    }
                }
            }
        }
    }
}
</style>