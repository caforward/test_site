<script setup>
import TheMenuMobile from './TheMenuMobile.vue';
import ModalRequisites from './ModalRequisites.vue';
import ModalForm from './ModalForm.vue'
import {ref, computed} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {Icon} from "@iconify/vue";
import useScrollHeader from "@/composable/useScrollHeader.js";
import BaseButton from "@/blocks/ui/BaseButton.vue";
import {useScreenResize} from "@/composable/useScreenResize.js";

const LG_BREAKPOINT = 1024;

const {headerMinimized} = useScrollHeader()
const {width: screenWidth} = useScreenResize()
const router = useRouter()
const route = useRoute()

const routesEntries = router
    .getRoutes()
    .map(route => [route.name, route.path])
const routes = Object.fromEntries(routesEntries)

// modals
const modalType = ref(null)
const isModalVisible = ref(false)
const isMobileMenuVisible = ref(false)
const isMobileRequisitesVisible = ref(false)

// links lists
const topNav = computed(() => [
    {
        id: 0,
        name: "О компании",
        href: routes['О компании'],
        type: "router-link"
    },
    {
        id: 1,
        name: "Документы",
        href: "#contacts",
        type: "anchor"
    },
    {
        id: 2,
        name: "Контакты",
        href: "#contacts",
        type: "anchor"
    },
    {
        id: 3,
        name: "Партнёрам",
        href: routes['Партнёрам'],
        type: "router-link"
    },
    {
        id: 4,
        name: "Вакансии",
        href: routes['Вакансии'],
        type: "router-link"
    },
    {
        id: 5,
        name: "Реквизиты для оплаты",
        option: "requisites",
        type: "modal"
    },
    {
        id: 6,
        name: "Заказать звонок",
        option: "callback",
        type: "modal",
        class: "bg-white text-sky-500",
        icon: 'mage:phone-call'
    },
])
const bottomNav = computed(() => [
    {
        id: 0,
        name: "Главная",
        href: routes['Главная'],
        type: "router-link",
    },
    {
        id: 1,
        name: "Получить рассрочку",
        option: "installment",
        type: "modal",
    },
    {
        id: 2,
        name: "Разблокировать счет",
        option: "account-unblock",
        type: "modal",
    },
])

// functions
const currentRoute = computed(() => route)

function showModal(option) {
    if (option === 'requisites') {
        isMobileRequisitesVisible.value = true
        return
    }

    modalType.value = option ? option : null;
    isModalVisible.value = true;
}
</script>


<template>
    <header class="header" :class="{'header__minimized': headerMinimized}">
        <div class="header-top">
            <div class="custom-container">
                <ul class="header-top-nav">
                    <li v-for="link in topNav" :key="link.id">
                        <router-link
                            v-if="link.type === 'router-link'"
                            class="header-top-nav__link"
                            :to="link.href"
                            exact
                        >
                            <Icon
                                v-if="link.icon"
                                :icon="link.icon"
                            />
                            <span>{{ link.name }}</span>
                        </router-link>

                        <a
                            v-else-if="link.type === 'link'"
                            class="header-top-nav__link"
                            :href="link.href"
                        >
                            <Icon
                                v-if="link.icon"
                                :icon="link.icon"
                            />
                            <span>{{ link.name }}</span>
                        </a>

                        <a
                            v-else-if="link.type === 'anchor'"
                            class="header-top-nav__link"
                            :href="link.href"
                        >
                            <Icon
                                v-if="link.icon"
                                :icon="link.icon"
                            />
                            <span>{{ link.name }}</span>
                        </a>

                        <button
                            v-else-if="link.type === 'modal'"
                            class="header-top-nav__link"
                            :class="link.class"
                            @click="showModal(link.option)"
                        >
                            <Icon
                                v-if="link.icon"
                                :icon="link.icon"
                            />
                            <span>{{ link.name }}</span>
                        </button>
                    </li>


                </ul>
            </div>
        </div>

        <div class="header-bottom shadow-md">
            <div class="custom-container">
                <div class="header-bottom__inner">
                    <div class="header-bottom__logo">
                        <a href="/">
                            <img src="/images/logo.svg" alt=""/>
                        </a>
                    </div>

                    <ul class="header-bottom-nav">
                        <li
                            v-for="link in bottomNav"
                            :key="link.name"
                        >
                            <router-link
                                v-if="link.type === 'router-link'"
                                :to="link.href"
                            >
                                {{ link.name }}
                            </router-link>

                            <a
                                v-else-if="link.type === 'link'"
                                :href="link.href"
                            >
                                {{ link.name }}
                            </a>

                            <a
                                v-else-if="link.type === 'anchor'"
                                :href="link.href"
                            >
                                {{ link.name }}
                            </a>

                            <button
                                v-else-if="link.type === 'modal'"
                                class="flex gap-1 items-center"
                                :href="link.href"
                                @click="showModal(link.option)"
                            >
                                <Icon
                                    v-if="link.name === 'Разблокировать счет'"
                                    class="text-sky-500 text-[18px]"
                                    icon="material-symbols:lock-open-outline"
                                />
                                <span>{{ link.name }}</span>
                            </button>
                        </li>
                    </ul>


                    <div class="header-bottom__right">
                        <a href="tel:+78043334133" class="header-bottom__phone">
                            + 7 (804) 333-41-33
                        </a>

                        <BaseButton
                            as="link"
                            href="https://t.me/Fwdclient_bot"
                            target="_blank"
                            circle
                        >
                            <Icon icon="mingcute:telegram-fill" width="24"/>
                        </BaseButton>

                        <BaseButton
                            as="router-link"
                            size="small"
                            to="/about"
                            class="about-company-button"
                        >
                            О компании
                        </BaseButton>

                        <BaseButton
                            as="link"
                            class="payment-button"
                            :size="screenWidth < LG_BREAKPOINT ? 'small' : null"
                            :href="currentRoute.path === '/' ? '/#payment' : '/installment-plan#debt-form'"
                        >
                            Внести платёж
                        </BaseButton>
                    </div>

                    <div class="header-button__menu">
                        <a href="#" @click.prevent="isMobileMenuVisible = !isMobileMenuVisible">
                            <Icon v-if="!isMobileMenuVisible" icon="radix-icons:hamburger-menu" width="24"/>
                            <Icon v-if="isMobileMenuVisible" icon="material-symbols:close-rounded" width="24"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <TheMenuMobile :visible="isMobileMenuVisible" @close="isMobileMenuVisible = false"/>
    <ModalRequisites v-model="isMobileRequisitesVisible"/>
    <ModalForm v-model="isModalVisible" :type="modalType"/>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

.header-bottom {
    &-nav {
        @apply
        xl:text-[18px]
        xl:gap-[30px]
        lg:flex
        hidden gap-[8px] items-center text-sm font-medium text-[#292D32];
    }

    &__phone {
        @apply
        xl:text-[18px]
        flex items-center text-sm font-medium text-[#292D32];
    }

    &__right {
        @apply flex gap-[10px];
    }
}

.header {
    border-bottom: 1px solid var.$gray;
    transition: top .2s;

    &__minimized {
        top: -40px;

        & .header-bottom {
            padding: 10px 0;

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
            color: #fff;

            &__link {
                display: flex;
                align-items: center;
                gap: 10px;
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
        background-color: var.$white;
        padding: 15px 0;

        &__inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }

        &__logo {
            height: 45px;
            margin-right: 15px;
            transition: height .2s;

            & > a {
                display: flex;
                flex: none;
                height: 100%;
                align-items: center;
            }
        }

        &__right {
            display: flex;
            align-items: center;

            .about-company-button {
                display: none;
            }
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

@include mixin.desktopXl {
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

@include mixin.desktop {
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
                width: 115px;
                height: 30px;
            }

            &-tel {
                margin-right: 10px;

                &__button {
                    height: 35px;
                    width: 35px;
                }
            }
        }
    }
}

@include mixin.laptop {
    .header {
        &-top {
            display: none;
        }

        &-bottom {
            &__right {
                margin-left: auto;

                & > *:not(.payment-button) {
                    display: none;
                }

                .payment-button {
                    flex: none;
                }
                .about-company-button {
                    display: flex;
                }
            }
        }

        &-button {
            &__menu {
                display: block;
            }
        }
    }
}

@include mixin.tablet {
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


@media (max-width: 490px) {
    .header-bottom__inner .about-company-button {
        display: none;
    }
}
@include mixin.mobileS {
    .header-bottom__inner .payment-button {
        display: none;
    }
}
</style>
