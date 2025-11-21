<script setup>
import BaseModal from '@/blocks/BaseModal.vue';
import ModalForm from '@/layouts/ModalForm.vue';
import ModalRequisites from '@/layouts/ModalRequisites.vue';
import {Icon} from "@iconify/vue";
import BaseButton from "@/blocks/ui/BaseButton.vue";
import {computed, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useScreenResize} from "@/composable/useScreenResize.js";

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
})

const emit = defineEmits(["close"]);

const router = useRouter();
const route = useRoute();
const {width} = useScreenResize();

const isModalVisible = ref(false);
const isRequisitesModalVisible = ref(false);
const modalType = ref(null);

// возвращает массив [ [<route.name>, <route.path>], ... ]
const routesArray = router
    .getRoutes()
    .filter(route => route.name)
    .map(route => [route.name, route.path])

// Собирает объект { <route.name>: <route.path> }
const routes = Object.fromEntries(routesArray)

const links = computed(() => [
    {
        id: 0,
        href: routes['Главная'],
        name: 'Главная',
        type: 'router-link'
    },
    {
        id: 1,
        href: routes['Получить рассрочку'] + '#debt-form',
        name: 'Внести платёж',
        type: 'link'
    },
    {
        id: 2,
        href: routes['Получить рассрочку'],
        name: 'Получить рассрочку',
        type: 'router-link'
    },
    {
        id: 3,
        option: 'account-unblock',
        name: 'Разблокировать счёт',
        type: 'modal'
    },
    {
        id: 4,
        href: routes['О компании'],
        name: 'О компании',
        type: 'router-link'
    },
    {
        id: 5,
        href: '#contacts',
        name: 'Документы',
        type: 'anchor'
    },
    {
        id: 6,
        href: '#contacts',
        name: 'Контакты',
        type: 'anchor'
    },
    {
        id: 7,
        href: routes['Партнёрам'],
        name: 'Партнёрам',
        type: 'router-link'
    },
    {
        id: 8,
        href: routes['Вакансии'],
        name: 'Вакансии',
        type: 'router-link'
    },
    {
        id: 9,
        option: 'requisites',
        name: 'Реквизиты для оплаты',
        type: 'modal'
    },
])

function showModalForm(type) {
    closeMobileMenu()

    if (type) {
        modalType.value = type;
    } else {
        modalType.value = null;
    }

    isModalVisible.value = true;
}

function openModal(option) {
    closeMobileMenu()

    if (option === 'requisites') {
        isRequisitesModalVisible.value = true
    } else {
        modalType.value = option;
        isModalVisible.value = true;
    }
}

function closeMobileMenu() {
    emit('close');
}

function scrollToAnchor(anchor) {
    closeMobileMenu()
    document.querySelector(anchor)?.scrollIntoView({behavior: 'smooth'});
}

// Убираем скроллбар при открытии мобильного меню
watch(
    () => props.visible,
    (isVisible) => {
        if (isVisible) {
            // Блокировка скролла
            const browserScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = browserScrollbarWidth + 'px';
        } else {
            // Разблокировка скролла
            document.body.style.paddingRight = '';
            document.body.style.overflow = '';
        }
    },
    {
        immediate: true,
    }
)

// Закрываем мобильное меню (если открыто)
// при ширине экрана более чем LG_BREAKPOINT (1023px)
watch(
    [width, () => props.visible],
    ([newWidth, isVisible]) => {
        const LG_BREAKPOINT = 1023;

        if (newWidth > LG_BREAKPOINT && isVisible) {
            closeMobileMenu();
        }
    }
)
</script>

<template>
    <transition name="slide">
        <BaseModal id="mobile-menu" v-if="visible">
            <div class="menu">
                <ul class="menu-links">
                    <li v-for="link in links" :key="link.id">
                        <router-link
                            v-if="link.type === 'router-link'"
                            class="nav-link"
                            :to="link.href"
                            @click="closeMobileMenu"
                        >
                            {{ link.name }}
                        </router-link>

                        <a
                            v-else-if="link.type === 'link'"
                            class="nav-link"
                            :href="link.href"
                            @click="closeMobileMenu"
                        >
                            {{ link.name }}
                        </a>

                        <a
                            v-else-if="link.type === 'anchor'"
                            class="nav-link"
                            :href="link.href"
                            @click.prevent="scrollToAnchor(link.href)"
                        >
                            {{ link.name }}
                        </a>

                        <button
                            v-else-if="link.type === 'modal'"
                            class="nav-link"
                            @click="openModal(link.option)"
                        >
                            <Icon
                                v-if="link.option === 'account-unblock'"
                                class="text-sky-500 text-[18px]"
                                icon="material-symbols:lock-open-outline"
                            />
                            <span>{{ link.name }}</span>
                        </button>
                    </li>
                </ul>
                <div class="menu-footer">
                    <div class="flex items-center gap-4 justify-between mb-3">
                        <a href="tel:+78043334133" class="menu-footer-contacts__tel">
                            + 7 (804) 333-41-33
                        </a>
                        <a
                            href="https://t.me/Fwdclient_bot"
                            target="_blank"
                            class="w-9 h-9 flex items-center justify-center rounded-full bg-sky-600 text-white"
                        >
                            <Icon icon="mingcute:telegram-fill" width="16"/>
                        </a>
                    </div>
                    <div class="flex flex-col gap-3">
                        <BaseButton
                            class="flex gap-2 items-center justify-center h-10 !text-sky-600 hover:!text-white"
                            severity="secondary"
                            @click="showModalForm('callback')"
                        >
                            <Icon class="text-xl" icon="mage:phone-call"/>
                            <span>Заказать звонок</span>
                        </BaseButton>

                        <BaseButton
                            as="link"
                            class="h-10"
                            :href="routes['Получить рассрочку'] + '#debt-form'"
                            @click="closeMobileMenu"
                        >
                            Внести платёж
                        </BaseButton>
                    </div>
                </div>
            </div>
        </BaseModal>
    </transition>

    <ModalRequisites v-model="isRequisitesModalVisible"/>
    <ModalForm v-model="isModalVisible" :type="modalType"/>
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
    top: 60px;
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
        .nav-link {
            width: 100%;
            padding: 20px 15px;
            font-weight: 600;
            font-size: 16px;
            color: var.$black;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            text-align: left;
            display: flex;
            align-items: center;
            gap: 8px;

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