<script setup>
import TheMenuMobile from './TheMenuMobile.vue';
import ModalRequisites from './ModalRequisites.vue';
import ModalForm from './ModalForm.vue'
import { onBeforeMount, onMounted, onUnmounted, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()
const header = ref(null)

// modals
const modalType = ref(null)
const visibleModal = ref(false)
const visibleMobileMenu = ref(false)
const visibleMobileRequisites = ref(false)

// links lists
const topNav = ref([
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
])
const bottomNav = ref([
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
])

// variables
const debounce = 20
let lastScrollPosition = ref(null)
let headerMinimized = ref(null)
let scrollListenerIsActive = ref(null)
let isMobile = computed(() => matchMedia('(max-width: 1023px)').matches)

// functions
const currentRoute = computed(() => route)

function handleNavLink(event, navLink) {
    const contacts = document.getElementById('contacts');

    if (contacts && navLink.name === 'Контакты') {
        event.preventDefault();
        contacts.scrollIntoView({ behavior: 'smooth' });
    }
}

function showFormModal(type) {
    if (type) {
        modalType.value = type;
    } else {
        modalType.value = null;
    }

    visibleModal.value = true;
}

function fillRoutes() {
    const routes = router.getRoutes()

    topNav.value.forEach(item => {
        const eqNameRoute = routes.find(route => route.name === item.name)
        if (eqNameRoute) {
            item.href = eqNameRoute.path
        }
    })
    bottomNav.value.forEach(item => {
        const eqNameRoute = routes.find(route => route.name === item.name)
        if (eqNameRoute) {
            item.href = eqNameRoute.path
        }
    })
}

function minimizeHeader() {
    const scrollDiff = lastScrollPosition.value - window.scrollY

    if (Math.abs(scrollDiff) > debounce && window.scrollY > 0) {

        if (scrollDiff > 0 && headerMinimized.value) {
            header.value.classList.remove('header__minimized')
            headerMinimized.value = false

        } else if (scrollDiff < 0 && !headerMinimized.value) {
            header.value.classList.add('header__minimized')
            headerMinimized.value = true
        }

        lastScrollPosition.value = window.scrollY
    }
}

function toMobileHandler() {

    if (isMobile.value && scrollListenerIsActive.value) {
        window.removeEventListener('scroll', minimizeHeader)
        header.value.classList.remove('header__minimized')
        scrollListenerIsActive.value = false

    } else if (!isMobile.value && !scrollListenerIsActive.value) {
        minimizeHeader()
        window.addEventListener('scroll', minimizeHeader)
        scrollListenerIsActive.value = true
    }
}

// hooks
onBeforeMount(() => {
    fillRoutes()
})

onMounted(() => {
    toMobileHandler()
    window.addEventListener('resize', toMobileHandler)
})

onUnmounted(() => {
    if (scrollListenerIsActive.value) {
        window.removeEventListener('scroll', minimizeHeader)
    }
    window.removeEventListener('resize', toMobileHandler)
})
</script>


<template>
    <header ref="header" class="header">
        <div class="header-top">
            <div class="container">
                <ul class="header-top-nav">
                    <li v-for="navLink in topNav" :key="navLink.name">
                        <router-link v-if="navLink.href && navLink.href[0] !== '#'" :to="navLink.href || ''"
                            class="header-top-nav__link" exact>
                            {{ navLink.name }}
                        </router-link>
                        <a v-else-if="navLink.name === 'Реквизиты для оплаты'"
                            @click.prevent="visibleMobileRequisites = true" class="header-top-nav__link"
                            :href="navLink.href">{{ navLink.name }}</a>
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
                            <img src="/images/logo.svg" alt="" />
                        </a>
                    </div>

                    <div class="header-bottom__right">
                        <ul class="header-bottom-nav">
                            <li v-for="navLink in bottomNav" :key="navLink.name"
                                @click="handleNavLink($event, navLink)">
                                <router-link v-if="navLink.href[0] !== '#'" :to="navLink.href"
                                    class="header-bottom-nav__link">
                                    {{ navLink.name }}
                                </router-link>

                                <a v-else-if="navLink.name === 'Получить консультацию'" @click.prevent="showFormModal()"
                                    class="header-bottom-nav__link" :href="navLink.href">{{ navLink.name }}</a>

                                <a v-else-if="navLink.name === 'Заказать звонок'"
                                    @click.prevent="showFormModal('callback')" class="header-bottom-nav__link"
                                    :href="navLink.href">{{ navLink.name }}</a>

                                <a v-else class="header-bottom-nav__link" :href="navLink.href">{{ navLink.name }}</a>
                            </li>
                        </ul>

                        <div class="header-bottom-tel">
                            <a href="tel:+78043334133" class="header-bottom-tel__link">+ 7 (804) 333-41-33</a>
                            <a href="https://t.me/Fwdclient_bot" target="_blank"
                                class="button button_blue button_icon header-bottom-tel__button">
                                <svg viewBox="1 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12.5552 10.7199C12.7776 10.0285 13.826 3.14677 13.9583 1.79063C13.9952 1.6374 13.9816 1.4763 13.9195 1.3315C13.8575 1.1867 13.7503 1.06603 13.6142 0.98759C13.1859 0.862751 12.7265 0.904525 12.3275 1.10459C11.6074 1.36518 2.38886 5.29532 1.85407 5.52401C1.31928 5.75269 0.874512 5.97605 0.874512 6.31642C0.874512 6.55573 1.01218 6.68869 1.40401 6.84824C1.79583 7.00778 2.82834 7.3056 3.43197 7.47046C3.96856 7.60507 4.53597 7.53098 5.02046 7.26305C5.41228 7.01842 9.94477 3.9711 10.2731 3.70519C10.6013 3.43928 10.8555 3.77964 10.5908 4.04555C10.326 4.31146 7.21257 7.34815 6.79956 7.76828C6.71014 7.85395 6.64263 7.96002 6.60276 8.0775C6.56289 8.19498 6.55185 8.32039 6.57056 8.44307C6.58927 8.56576 6.63719 8.68209 6.71024 8.78219C6.7833 8.8823 6.87933 8.96321 6.99018 9.01806C7.37142 9.25738 10.1195 11.1081 10.5325 11.4059C10.8839 11.6733 11.3097 11.8239 11.7503 11.8367C12.1581 11.8154 12.3646 11.3049 12.5552 10.7199Z" />
                                </svg>
                            </a>
                        </div>
                        <a :href="currentRoute.path === '/' ? '/#payment' : '/installment-plan#debt-form'"
                            class="button button_blue button_small header-bottom__payment">
                            Внести платёж
                        </a>
                    </div>
                    <div class="header-button__menu">
                        <a href="#" @click.prevent="visibleMobileMenu = !visibleMobileMenu">
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

    <TheMenuMobile :visible="visibleMobileMenu" @close="visibleMobileMenu = false" />
    <ModalRequisites v-model="visibleMobileRequisites" />
    <ModalForm v-model="visibleModal" :type="modalType" />
</template>


<style lang="scss" scoped>
.header {
    border-bottom: 1px solid $gray;
    transition: top .2s;

    &__minimized {
        top: -40px;

        & .header-bottom {
            padding: 15px 0;

            &__logo {
                height: 35px;
            }
        }
    }

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
            transition: height .2s;

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
        }

        &-tel {
            display: flex;
            gap: 10px;
            align-items: center;
            font-weight: 400;
            font-size: 16px;
            margin-right: 10px;

            &__link {
                color: #000;
            }

            & .button_icon {
                & svg {
                    width: 22px;
                    height: 22px;
                    fill: #fff;
                }
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
                height: 35px;
            }

            &__logo {
                width: 130px;
            }

            &-tel {
                margin-right: 10px;

                &__button {
                    height: 35px;
                    width: 35px;
                }
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
