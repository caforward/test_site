<template>
    <header class="header">
        <div class="header-top">
            <div class="container">
                <ul class="header-top-nav">
                    <li v-for="navLink in topNav" :key="navLink.name">
                        <router-link :onclick="navLink.scroll" v-if="navLink.href && navLink.href[0] !== '#'"
                            :to="navLink.href || ''" class="header-top-nav__link" exact>
                            {{ navLink.name }}
                        </router-link>
                        <a v-else-if="navLink.name === 'Реквизиты для оплаты'" @click.prevent="requisitesModal = true"
                            class="header-top-nav__link" :href="navLink.href">{{ navLink.name }}</a>
                        <a v-else class="header-top-nav__link" :href="navLink.href"
                            @click.prevent="handleNavLink($event, navLink)">
                            {{ navLink.name }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="header-bottom">
            <div class="container">
                <div class="header-bottom__inner">
                    <div class="header-bottom__logo">
                        <a href="/">
                            <img src="/assets/images/logo.svg" alt="" />
                        </a>
                    </div>

                    <div class="header-bottom__right">
                        <ul class="header-bottom-nav">
                            <li v-for="navLink in bottomNav" :key="navLink.name"
                                @click="handleNavLink($event, navLink)">
                                <router-link :onclick="navLink.scroll" v-if="navLink.href[0] !== '#'" :to="navLink.href"
                                    class="header-bottom-nav__link">
                                    {{ navLink.name }}
                                </router-link>

                                <a v-else-if="navLink.name === 'Получить консультацию'"
                                    @click.prevent="modalVisible = true" class="header-bottom-nav__link"
                                    :href="navLink.href">{{ navLink.name }}</a>

                                <a v-else-if="navLink.name === 'Заказать звонок'"
                                    @click.prevent="modalVisibleCall = true" class="header-bottom-nav__link"
                                    :href="navLink.href">{{ navLink.name }}</a>

                                <a v-else class="header-bottom-nav__link" :href="navLink.href">{{ navLink.name }}</a>
                            </li>
                        </ul>

                        <div class="header-bottom-tel">
                            <a href="tel:+78043334133" class="button button_blue button_icon header-bottom-tel__button">
                                <svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.5875 17.0625C12.74 17.0625 11.8475 16.86 10.925 16.47C10.025 16.0875 9.1175 15.5625 8.2325 14.925C7.355 14.28 6.5075 13.56 5.705 12.7725C4.91 11.97 4.19 11.1225 3.5525 10.2525C2.9075 9.3525 2.39 8.4525 2.0225 7.5825C1.6325 6.6525 1.4375 5.7525 1.4375 4.905C1.4375 4.32 1.5425 3.765 1.745 3.2475C1.955 2.715 2.2925 2.22 2.75 1.7925C3.3275 1.2225 3.9875 0.9375 4.6925 0.9375C4.985 0.9375 5.285 1.005 5.54 1.125C5.8325 1.26 6.08 1.4625 6.26 1.7325L8 4.185C8.1575 4.4025 8.2775 4.6125 8.36 4.8225C8.4575 5.0475 8.51 5.2725 8.51 5.49C8.51 5.775 8.4275 6.0525 8.27 6.315C8.1575 6.5175 7.985 6.735 7.7675 6.9525L7.2575 7.485C7.265 7.5075 7.2725 7.5225 7.28 7.5375C7.37 7.695 7.55 7.965 7.895 8.37C8.2625 8.79 8.6075 9.1725 8.9525 9.525C9.395 9.96 9.7625 10.305 10.1075 10.59C10.535 10.95 10.8125 11.13 10.9775 11.2125L10.9625 11.25L11.51 10.71C11.7425 10.4775 11.9675 10.305 12.185 10.1925C12.5975 9.9375 13.1225 9.8925 13.6475 10.11C13.8425 10.1925 14.0525 10.305 14.2775 10.4625L16.7675 12.2325C17.045 12.42 17.2475 12.66 17.3675 12.945C17.48 13.23 17.5325 13.4925 17.5325 13.755C17.5325 14.115 17.45 14.475 17.2925 14.8125C17.135 15.15 16.94 15.4425 16.6925 15.7125C16.265 16.185 15.8 16.5225 15.26 16.74C14.7425 16.95 14.18 17.0625 13.5875 17.0625ZM4.6925 2.0625C4.28 2.0625 3.8975 2.2425 3.53 2.6025C3.185 2.925 2.945 3.2775 2.795 3.66C2.6375 4.05 2.5625 4.4625 2.5625 4.905C2.5625 5.6025 2.7275 6.36 3.0575 7.14C3.395 7.935 3.8675 8.76 4.4675 9.585C5.0675 10.41 5.75 11.2125 6.5 11.97C7.25 12.7125 8.06 13.4025 8.8925 14.01C9.7025 14.6025 10.535 15.0825 11.36 15.4275C12.6425 15.975 13.8425 16.1025 14.8325 15.69C15.215 15.5325 15.5525 15.2925 15.86 14.9475C16.0325 14.76 16.1675 14.5575 16.28 14.3175C16.37 14.13 16.415 13.935 16.415 13.74C16.415 13.62 16.3925 13.5 16.3325 13.365C16.31 13.32 16.265 13.2375 16.1225 13.14L13.6325 11.37C13.4825 11.265 13.3475 11.19 13.22 11.1375C13.055 11.07 12.9875 11.0025 12.7325 11.16C12.5825 11.235 12.4475 11.3475 12.2975 11.4975L11.7275 12.06C11.435 12.345 10.985 12.4125 10.64 12.285L10.4375 12.195C10.13 12.03 9.77 11.775 9.3725 11.4375C9.0125 11.13 8.6225 10.77 8.15 10.305C7.7825 9.93 7.415 9.5325 7.0325 9.09C6.68 8.6775 6.425 8.325 6.2675 8.0325L6.1775 7.8075C6.1325 7.635 6.1175 7.5375 6.1175 7.4325C6.1175 7.1625 6.215 6.9225 6.4025 6.735L6.965 6.15C7.115 6 7.2275 5.8575 7.3025 5.73C7.3625 5.6325 7.385 5.55 7.385 5.475C7.385 5.415 7.3625 5.325 7.325 5.235C7.2725 5.115 7.19 4.98 7.085 4.8375L5.345 2.3775C5.27 2.2725 5.18 2.1975 5.0675 2.145C4.9475 2.0925 4.82 2.0625 4.6925 2.0625ZM10.9625 11.2575L10.8425 11.7675L11.045 11.2425C11.0075 11.235 10.9775 11.2425 10.9625 11.2575Z"
                                        fill="white" />
                                    <path
                                        d="M14.375 7.3125C14.0675 7.3125 13.8125 7.0575 13.8125 6.75C13.8125 6.48 13.5425 5.9175 13.0925 5.4375C12.65 4.965 12.1625 4.6875 11.75 4.6875C11.4425 4.6875 11.1875 4.4325 11.1875 4.125C11.1875 3.8175 11.4425 3.5625 11.75 3.5625C12.4775 3.5625 13.2425 3.9525 13.91 4.665C14.5325 5.3325 14.9375 6.15 14.9375 6.75C14.9375 7.0575 14.6825 7.3125 14.375 7.3125Z"
                                        fill="white" />
                                    <path
                                        d="M17 7.3125C16.6925 7.3125 16.4375 7.0575 16.4375 6.75C16.4375 4.1625 14.3375 2.0625 11.75 2.0625C11.4425 2.0625 11.1875 1.8075 11.1875 1.5C11.1875 1.1925 11.4425 0.9375 11.75 0.9375C14.9525 0.9375 17.5625 3.5475 17.5625 6.75C17.5625 7.0575 17.3075 7.3125 17 7.3125Z"
                                        fill="white" />
                                </svg>
                            </a>
                            <a href="tel:+78043334133" class="header-bottom-tel__link">+ 7 (804) 333-41-33</a>
                        </div>
                        <a href="/installment-plan#debt-form"
                            class="button button_blue button_small header-bottom__payment">
                            Внести платёж
                        </a>
                    </div>
                    <div class="header-button__menu">
                        <a href="#" @click.prevent="mobileMenu = !mobileMenu">
                            <svg width="22" height="16" viewBox="0 0 22 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M0.666748 1C0.666748 0.447715 1.11446 0 1.66675 0H20.3334C20.8857 0 21.3334 0.447715 21.3334 1C21.3334 1.55228 20.8857 2 20.3334 2H1.66675C1.11446 2 0.666748 1.55228 0.666748 1ZM0.666748 8C0.666748 7.44772 1.11446 7 1.66675 7H20.3334C20.8857 7 21.3334 7.44772 21.3334 8C21.3334 8.55228 20.8857 9 20.3334 9H1.66675C1.11446 9 0.666748 8.55228 0.666748 8ZM0.666748 15C0.666748 14.4477 1.11446 14 1.66675 14H20.3334C20.8857 14 21.3334 14.4477 21.3334 15C21.3334 15.5523 20.8857 16 20.3334 16H1.66675C1.11446 16 0.666748 15.5523 0.666748 15Z"
                                    fill="#4C5866" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <TheMenuMobile :visible="mobileMenu" @close="mobileMenu = false" />
    <ModalCall v-model="modalVisibleCall" />
    <ModalRequisites v-model="requisitesModal" />
    <ModalConsultation v-model="modalVisible" />
</template>

<script lang="ts">
import ModalCall from './ModalCall.vue'
import TheMenuMobile from './TheMenuMobile.vue';
import ModalRequisites from './ModalRequisites.vue';
import ModalConsultation from './ModalConsultation.vue'

export default {
    name: "Header",
    components: {
        ModalConsultation,
        ModalCall,
        TheMenuMobile,
        ModalRequisites,
    },
    data() {
        return {
            modalVisible: false,
            modalVisibleCall: false,
            mobileMenu: false,
            requisitesModal: false,
            thankModal: false,
            paymentDebtFormHref: '/installment-plan#debt-form',
            topNav: [
                {
                    name: "О компании",
                    scroll: '',
                    href: ''
                },
                {
                    name: "Контакты",
                    href: "#contacts",
                    scroll: '',

                },
                {
                    name: "Партнёрам",
                    scroll: '',
                    href: ''
                },
                {
                    name: "Вакансии",
                    scroll: '',
                    href: ''
                },
                {
                    name: "Реквизиты для оплаты",
                    href: "#",
                    scroll: ''
                },
            ],
            bottomNav: [
                // {
                //     name: "Я не должник",
                //     href: "/installment-plan",
                // },
                {
                    name: "Главная",
                    href: "/",
                    scroll: ''
                },
                {
                    name: "Получить рассрочку",
                    scroll: '',
                    href: ''
                },
                {
                    name: "Получить консультацию",
                    href: "#",
                    scroll: '',

                },
                {
                    name: "Заказать звонок",
                    href: "#",
                    scroll: ''
                },
                // {
                //     name: "Внести платёж",
                //     href: "https://pay.mandarinbank.com/?m=4971",
                // },
            ],
        };
    },
    methods: {
        handleNavLink(event: any, navLink: any) {
            const contacts = document.getElementById('contacts');

            if (contacts && navLink.name === 'Контакты') {
                event.preventDefault();
                contacts.scrollIntoView({ behavior: 'smooth' });
            }
        },
    },
    beforeMount() {
        const routes = this.$router.getRoutes()
        this.topNav.forEach(item => {
            const eqNameRoute = routes.find(route => route.name === item.name)
            if (eqNameRoute) {
                item.href = eqNameRoute.path
            }
        })
        this.bottomNav.forEach(item => {
            const eqNameRoute = routes.find(route => route.name === item.name)
            if (eqNameRoute) {
                item.href = eqNameRoute.path
            }
        })
    }
};
</script>

<style lang="scss">
.header {
    &-top {
        background-color: #292d32;

        &-nav {
            display: flex;
            justify-content: flex-end;

            &__link {
                color: #fff;
                padding: 10px 20px;
                font-weight: 400;
                font-size: 16px;
                transition: color .2s, background-color .2s;

                &.router-link-exact-active {
                    color: #000;
                    background-color: #fff;
                }
            }
        }
    }

    &-bottom {
        background-color: $white;
        padding: 22px 0;

        &__inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &__logo {
            height: 45px;
            margin-right: 15px;

            &>a {
                display: flex;
                flex: none;
                height: 100%;
                align-items: center;
            }
        }

        &__right {
            display: flex;
            align-items: center;
            margin-top: 5px;
        }

        &-tel {
            font-weight: 400;
            font-size: 16px;
            margin-right: 20px;

            &__link {
                color: #000;
            }

            &__button.button {
                display: none;
            }
        }

        &-nav {
            display: flex;
            margin-right: 40px;

            &>li:not(:last-child) {
                margin-right: 30px;
            }

            &__link {
                font-weight: 400;
                font-size: 16px;
                color: #000;
            }
        }
    }

    &-button__menu {
        display: none;

        a {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}

@include desktopXl {
    .header {
        &-bottom {
            &-tel {
                &__link {
                    display: none;
                }

                &__button {
                    display: flex;
                }
            }
        }
    }
}

@include desktop {
    .header {
        &-top {
            &-nav {
                &__link {
                    font-size: 14px;
                    padding: 12px 10px;

                    &_active {
                        padding: 12px 30px;
                    }
                }
            }
        }

        &-bottom {
            &__payment {
                font-size: 12px;
            }

            &__logo {
                width: 130px;
            }

            &-tel {
                margin-right: 10px;
            }

            &-nav {
                margin-right: 15px;

                &>li:not(:last-child) {
                    margin-right: 15px;
                }

                &__link {
                    font-size: 13px;
                }
            }
        }
    }
}

@include laptop {
    .header {
        &-top {
            display: none;
        }

        &-bottom {
            &__right {
                display: none;
            }
        }

        &-button {
            &__menu {
                display: block;
            }
        }
    }
}

@include mobile {
    .header {
        &-bottom {
            padding: 10px 0;

            &__logo {
                width: 115px;
                height: unset;
            }
        }
    }
}
</style>
