<script setup>
import { ref, onBeforeMount, reactive } from 'vue'
import { useRouter } from 'vue-router';
import ModalForm from "./ModalForm.vue";
import ModalDocs from "./ModalDocs.vue";

const router = useRouter()
const modalVisible = reactive({
    modalForm: false,
    modalDocs: false
})

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
        modalName: 'modalForm'
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
    // {
    //     href: '#',
    //     target: '_blank',
    //     name: 'vk',
    //     // src: "/images/footer/telegram.svg",
    //     icon: `
    //     <svg viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    //         <path fill-rule="evenodd" clip-rule="evenodd" d="M2.42884 0.817703H0.754667C0.276331 0.817703 0.180664 1.0473 0.180664 1.29604C0.180664 1.73611 0.754667 3.93645 2.82108 6.84473C4.20825 8.82504 6.15986 9.90608 7.9297 9.90608C8.99161 9.90608 9.12554 9.66691 9.12554 9.25555V7.75357C9.12554 7.27524 9.22121 7.17957 9.56561 7.17957C9.81435 7.17957 10.2353 7.30394 11.2302 8.26061C12.3687 9.39905 12.5504 9.90608 13.1914 9.90608H14.8656C15.3439 9.90608 15.5831 9.66691 15.4396 9.19815C15.2961 8.71981 14.7508 8.05014 14.0333 7.23697C13.6506 6.7682 13.0575 6.2803 12.8853 6.03156C12.6365 5.70629 12.6939 5.56279 12.8853 5.28536C12.8853 5.28536 14.923 2.41534 15.1334 1.42997C15.2387 1.076 15.1334 0.817703 14.6264 0.817703H12.9522C12.7957 0.808341 12.6403 0.849862 12.5092 0.93607C12.3782 1.02228 12.2785 1.14855 12.2252 1.29604C12.2252 1.29604 11.3642 3.36245 10.1683 4.71136C9.77608 5.10359 9.59431 5.22796 9.38385 5.22796C9.28818 5.22796 9.12554 5.10359 9.12554 4.74962V1.42997C9.12554 1.00904 9.00118 0.817703 8.64721 0.817703H6.01636C5.74849 0.817703 5.58586 1.00904 5.58586 1.20037C5.58586 1.60217 6.19813 1.69784 6.25553 2.82671V5.29493C6.25553 5.84023 6.15986 5.9359 5.94939 5.9359C5.37539 5.9359 3.99778 3.85035 3.17505 1.46824C3.02198 1.00904 2.85934 0.817703 2.42884 0.817703Z" fill="#212121"/>
    //     </svg>
    //     `
    // },
    // {
    //     href: 'https://max.ru/u/f9LHodD0cOLDDzBwzzHKhO7T5F7NJr6Knwn-DpshmdjJ3RMKQw92lnwSlgk',
    //     target: '_blank',
    //     name: 'telegram',
    //     // src: "/images/footer/vk.svg",
    //     icon: `
    //     <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 1000 1000">
    //         <defs>
    //           <path id="a" d="M634.4 0H365.6C64.5 0 0 64.6 0 365.6v268.8C0 935.5 64.6 1000 365.6 1000h268.8c301.1 0 365.6-64.6 365.6-365.6V365.6C1000 64.5 935.4 0 634.4 0"/>
    //         </defs>
    //         <path fill="#1e1e1e" fill-rule="evenodd" d="M508.211 878.328c-75.007 0-109.864-10.95-170.453-54.75-38.325 49.275-159.686 87.783-164.979 21.9 0-49.456-10.95-91.248-23.36-136.873-14.782-56.21-31.572-118.807-31.572-209.508 0-216.626 177.754-379.597 388.357-379.597 210.786 0 375.947 171.001 375.947 381.604.707 207.347-166.595 376.118-373.94 377.224m3.103-571.585c-102.564-5.292-182.499 65.7-200.201 177.024-14.6 92.162 11.315 204.398 33.397 210.238 10.585 2.555 37.23-18.98 53.837-35.587a189.8 189.8 0 0 0 92.71 33.032c106.273 5.112 197.08-75.794 204.215-181.95 4.154-106.382-77.67-196.486-183.958-202.574z" clip-rule="evenodd"/>
    //     </svg>
    //     `
    // },
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

<template>
    <footer id="contacts" class="footer">
        <div class="footer-top">
            <div class="custom-container">
                <div class="footer-top__inner">
                    <div class="footer-top__logo">
                        <div class="logo">
                            <router-link to="/">
                                <img class="imgForward" src="/images/footer/forward.png"
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
                                        <a href="#" class="link link_white" @click.prevent>
                                            dolg.info@caforward.ru
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="contacts__buttons">
                                <div class="buttons">
                                    <a href="#" class="button" @click.prevent="modalVisible.modalForm = true">
                                        Обратная связь
                                    </a>
                                </div>

                                <ul class="social mb-auto">
                                    <li v-for="link in socialLinks" :key="link.name">
                                        <a :href="link.href" :target="link.target" :aria-label="link.name"
                                            v-html="link.icon"></a>
                                    </li>
                                </ul>

                                <router-link to="/complaint">
                                    <div class="flex items-bottom gap-2 text-sky-400 text-sm hover:text-sky-300 transition-colors">
                                        <i class="pi pi-exclamation-circle text-sm !flex items-center"></i>
                                        <span>
                                            Защитите ваши права
                                        </span>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="custom-container">
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
                            <a target="_blank" href="/docs/PPK.pdf" class="link link_white">
                                Политика по противодействию коррупции
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
    <ModalForm v-model="modalVisible.modalForm" />
    <ModalDocs v-model="modalVisible.modalDocs" :toShowIndex="modalDocsIndex" />
</template>


<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

.footer {
    padding: 70px 0 30px;
    background-color: var.$black;
    color: #fff;

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
                            align-items: center;
                            justify-content: center;
                            width: 35px;
                            height: 35px;
                            background-color: #fff;
                            border-radius: 50%;
                            transition: .2s ease;

                            &>* {
                                width: 18px;
                            }

                            &:hover {
                                background-color: var.$blue;

                                & * {
                                    fill: #fff;
                                }
                            }
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

@include mixin.desktop {
    .footer {
        &-top {
            &__logo {
                width: 100%;
                min-width: 160px;

                .logo {
                    width: 160px;
                }
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

@include mixin.laptop {
    .footer {
        padding: 30px 0;

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

@include mixin.tablet {
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