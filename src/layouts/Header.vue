<template>
    <header class="header">
        <div class="header-top">
            <div class="container">
                <ul class="header-top-nav">
                    <li v-for="navLink in topNav" :key="navLink.name">
                        <a class="header-top-nav__link" :href="navLink.href" @click="handleNavLink($event, navLink)">{{
                            navLink.name
                        }}</a>
                    </li>
                    <li>
                        <a class="header-top-nav__link header-top-nav__link_white" href="#">Получить справку</a>
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

                                <a v-if="navLink.name === 'Получить консультацию'" @click.stop="showModal($event)"
                                    class="header-bottom-nav__link" :href="navLink.href">{{ navLink.name }}</a>

                                <a v-else-if="navLink.name === 'Заказать звонок'" @click.stop="showModalCall()"
                                    class="header-bottom-nav__link" :href="navLink.href">{{ navLink.name }}</a>

                                <a v-else class="header-bottom-nav__link" :href="navLink.href">{{ navLink.name }}</a>
                            </li>
                        </ul>

                        <div class="header-bottom__tel">
                            <a href="tel:+74997020156"> +7 (499) 702‑01‑56 </a>
                        </div>
                        <a href="#" class="button button_blue button_small">
                            <span class="button__icon">
                            </span>
                            Внести платёж
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <ModalConsultationVue :visible="modalVisible" @close="closeModal" />
    <ModalCall :visible="modalVisibleCall" @close="closeModalCall" />
</template>

<script lang="ts">

import ModalConsultationVue from './ModalConsultation.vue'
import ModalCall from './ModalCall.vue'

export default {

    name: "Header",
    components: {
        ModalConsultationVue,
        ModalCall
    },
    methods: {
        showModal(event: any) {
            event.preventDefault();
            this.modalVisible = true;
        },
        closeModal() {
            this.modalVisible = false;
        },
        showModalCall() {
            this.modalVisibleCall = true;
        },
        closeModalCall() {
            this.modalVisibleCall = false;
        },
        handleNavLink(event: any, navLink: any) {
            const contacts = document.getElementById('contacts');

            if (contacts && navLink.name === 'Контакты') {
                event.preventDefault();
                contacts.scrollIntoView({ behavior: 'smooth' });
            } else if (navLink.name === "Внести платёж") {
                event.preventDefault();
                this.$router.push({ path: '/' });
                this.$router.afterEach((to) => {
                    if (to.path === '/') {
                        setTimeout(() => {
                            const payment = document.getElementById('payment');
                            if (payment) {
                                payment.scrollIntoView({ behavior: 'smooth' });
                            }
                        }, 50);
                    }
                });
            }
        },

    },
    data() {
        return {
            modalVisible: false,
            modalVisibleCall: false,
            topNav: [
                {
                    name: "О компании",
                    href: "/about",
                },
                {
                    name: "Контакты",
                    href: "#contacts",
                },
                {
                    name: "Партнёрам",
                    href: "/for-partners",
                },
                {
                    name: "Вакансии",
                    href: "/jobs",
                },
            ],
            bottomNav: [
                // {
                //     name: "Я не должник",
                //     href: "#",
                // },
                {
                    name: "Главная",
                    href: "/",
                },
                {
                    name: "Получить консультацию",
                    href: "#",
                },
                {
                    name: "Заказать звонок",
                    href: "#",
                },
                // {
                //     name: "Внести платёж",
                //     href: "#payment",
                // },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
* {
    font-family: "Montserrat", sans-serif;
}

.button {
    @include blue-button-small;

    &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
    }
}

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

                &_white {
                    color: #000;
                    padding: 10px 23px;
                    margin-left: 35px;
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
            margin-right: 20px;
        }

        &__right {
            display: flex;
            align-items: center;
            margin-top: 5px;
        }

        &__tel {
            font-weight: 400;
            font-size: 16px;
            margin-right: 20px;

            a {
                color: #000;
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
}
</style>
