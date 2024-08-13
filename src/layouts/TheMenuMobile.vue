<script>
import BaseModal from '../blocks/BaseModal.vue';
import ModalCall from '../layouts/ModalCall.vue';
import ModalConsultation from '../layouts/ModalConsultation.vue';
import ModalRequisites from '../layouts/ModalRequisites.vue';

export default {
    components: {
        BaseModal,
        ModalCall,
        ModalRequisites,
        ModalConsultation,
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    emits: ["close"],
    data() {
        return {
            modalVisible: false,
            modalVisibleCall: false,
            requisitesModal: false,
            links: [
                // {
                //     href: '#',
                //     title: 'Я не должник'
                // },
                {
                    href: '/',
                    name: 'Главная'
                },
                {
                    href: '/installment-plan#debt-form',
                    name: 'Внести платёж'
                },
                {
                    name: 'Получить рассрочку'
                },
                {
                    href: '#',
                    name: 'Получить консультацию'
                },
                {
                    name: 'Вакансии'
                },
                {
                    name: 'Партнёрам'
                },
                {
                    href: '#contacts',
                    name: 'Контакты'
                },
                {
                    name: 'О компании'
                },
                {
                    href: '#',
                    name: 'Реквизиты для оплаты'
                },
            ]
        }
    },
    methods: {
        showModal(event) {
            this.closeMobileMenu()
            this.modalVisible = true;
        },
        showModalCall(event) {
            this.closeMobileMenu()
            this.modalVisibleCall = true;
        },
        openRequisitesModal(e) {
            this.closeMobileMenu()
            e.preventDefault();
            this.requisitesModal = true
        },
        closeModal() {
            this.modalVisible = false;
        },
        closeModalCall() {
            this.modalVisibleCall = false;
        },
        closeRequisitesModal() {
            this.requisitesModal = false
        },
        closeMobileMenu() {
            this.$emit('close');
        },
    },
    updated() {
        if (this.visible) {
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = '10px'
        } else {
            document.body.style.paddingRight = ''
            document.body.style.overflow = ''
        }
    },
    beforeMount() {
        const routes = this.$router.getRoutes()
        this.links.forEach(item => {
            const eqNameRoute = routes.find(route => {
                return route.name === item.name
            })
            if (eqNameRoute) {
                item.href = eqNameRoute.path
            }
        })
    },
    mounted() {
        window.addEventListener('resize', () => {
            if (matchMedia('(min-width: 1023px)').matches && this.visible) {
                this.closeMobileMenu()
            }
        })
    }
}
</script>

<template>
    <transition name="slide">
        <BaseModal id="mobile-menu" v-if="visible">
            <div class="menu">
                <!-- <button @click="closeMobileMenu">close</button> -->
                <ul class="menu-links">
                    <li v-for="(link, id) in links" :key="id">
                        <router-link v-if="!link.href.includes('#')" :to="link.href" @click="closeMobileMenu">
                            {{ link.name }}
                        </router-link>

                        <a v-else-if="link.name === 'Получить консультацию'" @click.prevent="showModal($event)"
                            class="header-bottom-nav__link" :href="link.href">{{ link.name }} </a>

                        <a v-else-if="link.name === 'Заказать звонок'" @click.prevent="showModalCall($event)"
                            class="header-bottom-nav__link" :href="link.href">{{ link.name }}</a>

                        <a v-else-if="link.name === 'Реквизиты для оплаты'" @click.prevent="openRequisitesModal($event)"
                            class="header-bottom-nav__link" :href="link.href">{{ link.name }}</a>

                        <a v-else :href="link.href" class="link" @click="closeMobileMenu">
                            {{ link.name }}
                        </a>
                    </li>
                </ul>
                <div class="menu-footer">
                    <div class="menu-footer-contacts">
                        <a href="tel:+78043334133" class="menu-footer-contacts__tel">
                            + 7 (804) 333-41-33
                        </a>
                        <a href="https://t.me/Fwdclient_bot" target="_blank"
                            class="button button_icon menu-footer-contacts__social">
                            <svg viewBox="1 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.5552 10.7199C12.7776 10.0285 13.826 3.14677 13.9583 1.79063C13.9952 1.6374 13.9816 1.4763 13.9195 1.3315C13.8575 1.1867 13.7503 1.06603 13.6142 0.98759C13.1859 0.862751 12.7265 0.904525 12.3275 1.10459C11.6074 1.36518 2.38886 5.29532 1.85407 5.52401C1.31928 5.75269 0.874512 5.97605 0.874512 6.31642C0.874512 6.55573 1.01218 6.68869 1.40401 6.84824C1.79583 7.00778 2.82834 7.3056 3.43197 7.47046C3.96856 7.60507 4.53597 7.53098 5.02046 7.26305C5.41228 7.01842 9.94477 3.9711 10.2731 3.70519C10.6013 3.43928 10.8555 3.77964 10.5908 4.04555C10.326 4.31146 7.21257 7.34815 6.79956 7.76828C6.71014 7.85395 6.64263 7.96002 6.60276 8.0775C6.56289 8.19498 6.55185 8.32039 6.57056 8.44307C6.58927 8.56576 6.63719 8.68209 6.71024 8.78219C6.7833 8.8823 6.87933 8.96321 6.99018 9.01806C7.37142 9.25738 10.1195 11.1081 10.5325 11.4059C10.8839 11.6733 11.3097 11.8239 11.7503 11.8367C12.1581 11.8154 12.3646 11.3049 12.5552 10.7199Z" />
                            </svg>
                        </a>
                    </div>
                    <div class="menu-footer__buttons">
                        <a href="#" @click.stop="showModalCall" class="button button_blue button_small">
                            <span class="button__icon">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.0875 17.0625C12.24 17.0625 11.3475 16.86 10.425 16.47C9.525 16.0875 8.6175 15.5625 7.7325 14.925C6.855 14.28 6.0075 13.56 5.205 12.7725C4.41 11.97 3.69 11.1225 3.0525 10.2525C2.4075 9.3525 1.89 8.4525 1.5225 7.5825C1.1325 6.6525 0.9375 5.7525 0.9375 4.905C0.9375 4.32 1.0425 3.765 1.245 3.2475C1.455 2.715 1.7925 2.22 2.25 1.7925C2.8275 1.2225 3.4875 0.9375 4.1925 0.9375C4.485 0.9375 4.785 1.005 5.04 1.125C5.3325 1.26 5.58 1.4625 5.76 1.7325L7.5 4.185C7.6575 4.4025 7.7775 4.6125 7.86 4.8225C7.9575 5.0475 8.01 5.2725 8.01 5.49C8.01 5.775 7.9275 6.0525 7.77 6.315C7.6575 6.5175 7.485 6.735 7.2675 6.9525L6.7575 7.485C6.765 7.5075 6.7725 7.5225 6.78 7.5375C6.87 7.695 7.05 7.965 7.395 8.37C7.7625 8.79 8.1075 9.1725 8.4525 9.525C8.895 9.96 9.2625 10.305 9.6075 10.59C10.035 10.95 10.3125 11.13 10.4775 11.2125L10.4625 11.25L11.01 10.71C11.2425 10.4775 11.4675 10.305 11.685 10.1925C12.0975 9.9375 12.6225 9.8925 13.1475 10.11C13.3425 10.1925 13.5525 10.305 13.7775 10.4625L16.2675 12.2325C16.545 12.42 16.7475 12.66 16.8675 12.945C16.98 13.23 17.0325 13.4925 17.0325 13.755C17.0325 14.115 16.95 14.475 16.7925 14.8125C16.635 15.15 16.44 15.4425 16.1925 15.7125C15.765 16.185 15.3 16.5225 14.76 16.74C14.2425 16.95 13.68 17.0625 13.0875 17.0625ZM4.1925 2.0625C3.78 2.0625 3.3975 2.2425 3.03 2.6025C2.685 2.925 2.445 3.2775 2.295 3.66C2.1375 4.05 2.0625 4.4625 2.0625 4.905C2.0625 5.6025 2.2275 6.36 2.5575 7.14C2.895 7.935 3.3675 8.76 3.9675 9.585C4.5675 10.41 5.25 11.2125 6 11.97C6.75 12.7125 7.56 13.4025 8.3925 14.01C9.2025 14.6025 10.035 15.0825 10.86 15.4275C12.1425 15.975 13.3425 16.1025 14.3325 15.69C14.715 15.5325 15.0525 15.2925 15.36 14.9475C15.5325 14.76 15.6675 14.5575 15.78 14.3175C15.87 14.13 15.915 13.935 15.915 13.74C15.915 13.62 15.8925 13.5 15.8325 13.365C15.81 13.32 15.765 13.2375 15.6225 13.14L13.1325 11.37C12.9825 11.265 12.8475 11.19 12.72 11.1375C12.555 11.07 12.4875 11.0025 12.2325 11.16C12.0825 11.235 11.9475 11.3475 11.7975 11.4975L11.2275 12.06C10.935 12.345 10.485 12.4125 10.14 12.285L9.9375 12.195C9.63 12.03 9.27 11.775 8.8725 11.4375C8.5125 11.13 8.1225 10.77 7.65 10.305C7.2825 9.93 6.915 9.5325 6.5325 9.09C6.18 8.6775 5.925 8.325 5.7675 8.0325L5.6775 7.8075C5.6325 7.635 5.6175 7.5375 5.6175 7.4325C5.6175 7.1625 5.715 6.9225 5.9025 6.735L6.465 6.15C6.615 6 6.7275 5.8575 6.8025 5.73C6.8625 5.6325 6.885 5.55 6.885 5.475C6.885 5.415 6.8625 5.325 6.825 5.235C6.7725 5.115 6.69 4.98 6.585 4.8375L4.845 2.3775C4.77 2.2725 4.68 2.1975 4.5675 2.145C4.4475 2.0925 4.32 2.0625 4.1925 2.0625ZM10.4625 11.2575L10.3425 11.7675L10.545 11.2425C10.5075 11.235 10.4775 11.2425 10.4625 11.2575Z"
                                        fill="white" />
                                    <path
                                        d="M13.875 7.3125C13.5675 7.3125 13.3125 7.0575 13.3125 6.75C13.3125 6.48 13.0425 5.9175 12.5925 5.4375C12.15 4.965 11.6625 4.6875 11.25 4.6875C10.9425 4.6875 10.6875 4.4325 10.6875 4.125C10.6875 3.8175 10.9425 3.5625 11.25 3.5625C11.9775 3.5625 12.7425 3.9525 13.41 4.665C14.0325 5.3325 14.4375 6.15 14.4375 6.75C14.4375 7.0575 14.1825 7.3125 13.875 7.3125Z"
                                        fill="white" />
                                    <path
                                        d="M16.5 7.3125C16.1925 7.3125 15.9375 7.0575 15.9375 6.75C15.9375 4.1625 13.8375 2.0625 11.25 2.0625C10.9425 2.0625 10.6875 1.8075 10.6875 1.5C10.6875 1.1925 10.9425 0.9375 11.25 0.9375C14.4525 0.9375 17.0625 3.5475 17.0625 6.75C17.0625 7.0575 16.8075 7.3125 16.5 7.3125Z"
                                        fill="white" />
                                </svg>
                            </span>
                            Заказать звонок
                        </a>
                        <a href="#" class="button button_small">
                            Написать нам
                        </a>
                    </div>
                </div>
            </div>
        </BaseModal>
    </transition>

    <ModalCall v-model="modalVisibleCall" />
    <ModalRequisites v-model="requisitesModal" />
    <ModalConsultation v-model="modalVisible" />
</template>


<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
    transition: opacity .2s;

    & .menu {
        transition: transform 0.2s ease;
    }
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;

    & .menu {
        transform: translateX(-100%);
    }
}

.modal {
    background-color: rgba(0, 0, 0, 0.5);
}

#mobile-menu.modal {
    padding: 0;
    top: 89px;
    left: 0;
    justify-content: flex-start;
}

.menu {
    width: 320px;
    background-color: $white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 89px);
    overflow: auto;

    &-links {
        & a {
            width: 100%;
            padding: 20px 15px;
            font-weight: 600;
            font-size: 16px;
            color: $black;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);

            &.router-link-exact-active {
                background-color: rgba(234, 236, 237, 0.5);
            }
        }
    }

    &-footer {
        padding: 30px 15px;
        background-color: $black-accent;

        &-contacts {
            display: flex;
            gap: 10px;
            align-items: center;
            margin-bottom: 10px;

            &__tel {
                font-weight: 700;
                font-size: 16px;
                color: #fff;
            }

            &__social {
                & svg {
                    width: 22px;
                    height: 22px;
                    fill: $black-accent;
                    transition: fill .4s;
                }

                &:hover {
                    & svg {
                        fill: #fff;
                    }
                }
            }
        }

        &__buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;

            &>* {
                padding: 0 15px;
                width: 200px;
                font-size: 16px;
                line-height: 187%;
            }
        }
    }
}

@include tablet {
    #mobile-menu.modal {
        width: 100%;
    }
}

@include mobile {
    #mobile-menu.modal {
        top: 50px;
    }

    .menu {
        width: 100%;
        height: calc(100% - 50px);
    }
}
</style>