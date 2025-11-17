<script>
import BaseModal from '@/blocks/BaseModal.vue';
import ModalForm from '@/layouts/ModalForm.vue';
import ModalRequisites from '@/layouts/ModalRequisites.vue';
import {Icon} from "@iconify/vue";
import BaseButton from "@/blocks/ui/BaseButton.vue";

export default {
    components: {
        BaseButton,
        BaseModal,
        ModalRequisites,
        ModalForm,
        Icon,
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
            requisitesModal: false,
            modalType: null,
            links: [
                {
                    href: '/',
                    name: 'Главная'
                },
                {
                    href: '/installment-plan#debt-form',
                    name: 'Внести платёж'
                },
                {
                    href: '',
                    name: 'Получить рассрочку'
                },
                {
                    href: '#',
                    name: 'Получить консультацию'
                },
                {
                    href: '',
                    name: 'Вакансии'
                },
                {
                    href: '',
                    name: 'Партнёрам'
                },
                {
                    href: '#contacts',
                    name: 'Контакты'
                },
                {
                    href: '',
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
        showModalForm(type) {
            this.closeMobileMenu()

            if (type) {
                this.modalType = type;
            } else {
                this.modalType = null;
            }

            this.modalVisible = true;
        },
        openRequisitesModal() {
            this.closeMobileMenu()
            this.requisitesModal = true
        },
        closeRequisitesModal() {
            this.requisitesModal = false
        },
        closeMobileMenu() {
            this.$emit('close');
        },
        scrollToAnchor(anchor) {
            this.closeMobileMenu()
            document.querySelector(anchor)?.scrollIntoView({behavior: 'smooth'});
        }
    },
    updated() {
        if (this.visible) {
            const browserScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = browserScrollbarWidth + 'px'
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
                        <router-link
                            v-if="!link.href.includes('#')"
                            :to="link.href"
                            @click="closeMobileMenu"
                        >
                            {{ link.name }}
                        </router-link>

                        <a
                            v-else-if="link.name === 'Получить консультацию'"
                            @click.prevent="showModalForm()"
                            class="header-bottom-nav__link"
                            :href="link.href"
                        >
                            {{ link.name }}
                        </a>

                        <a
                            v-else-if="link.name === 'Заказать звонок'"
                            @click.prevent="showModalForm('callback')"
                            class="header-bottom-nav__link"
                            :href="link.href"
                        >
                            {{ link.name }}
                        </a>

                        <a
                            v-else-if="link.name === 'Реквизиты для оплаты'"
                            @click.prevent="openRequisitesModal()"
                            class="header-bottom-nav__link"
                            :href="link.href">
                            {{ link.name }}
                        </a>

                        <a
                            v-else-if="link.href.startsWith('#')"
                            href=""
                            @click.prevent="scrollToAnchor(link.href)"
                        >
                            {{ link.name }}
                        </a>

                        <a
                            v-else
                            :href="link.href"
                            class="link"
                            @click="closeMobileMenu"
                        >
                            {{ link.name }}
                        </a>
                    </li>
                </ul>
                <div class="menu-footer">
                    <div class="menu-footer-contacts">
                        <a href="tel:+78043334133" class="menu-footer-contacts__tel">
                            + 7 (804) 333-41-33
                        </a>
                        <a
                            href="https://t.me/Fwdclient_bot"
                            target="_blank"
                            class="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-800 transition-colors hover:bg-sky-400 hover:text-white"
                        >
                            <Icon class="-ml-0.5" icon="mingcute:telegram-fill" width="25"/>
                        </a>
                    </div>
                    <div class="menu-footer__buttons">
                        <BaseButton
                            class="flex gap-2 items-center justify-center h-10"
                            @click="showModalForm('callback')"
                        >
                            <Icon class="text-xl" icon="mage:phone-call" />
                            <span>Заказать звонок</span>
                        </BaseButton>

                        <BaseButton severity="secondary">
                            Внес
                        </BaseButton>
                    </div>
                </div>
            </div>
        </BaseModal>
    </transition>

    <ModalRequisites v-model="requisitesModal"/>
    <ModalForm v-model="modalVisible" :type="modalType"/>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

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
    background-color: var.$white;
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
            color: var.$black;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);

            &.router-link-exact-active {
                background-color: rgba(234, 236, 237, 0.5);
            }
        }
    }

    &-footer {
        padding: 30px 15px;
        background-color: var.$black-accent;

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
                    fill: var.$black-accent;
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

            & > * {
                padding: 0 15px;
                width: 200px;
                font-size: 16px;
                line-height: 187%;
            }
        }
    }
}

@include mixin.desktop {
    #mobile-menu.modal {
        width: 100%;
    }
}

@include mixin.tablet {
    #mobile-menu.modal {
        top: 50px;
    }

    .menu {
        width: 100%;
        height: calc(100% - 50px);
    }
}
</style>