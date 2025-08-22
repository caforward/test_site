<script setup>
import {ref, onMounted, onUnmounted} from "vue";
import ModalRequisites from "./ModalRequisites.vue";
import ModalForm from "./ModalForm.vue";

const emit = defineEmits(['showModal'])

const visibility = ref(false);
const bottomMenu = ref(null);
const modalType = ref(null);
const modal = ref({
    form: false,
    requisites: false
})

const menuItems = ref([
    {
        id: 0,
        href: "#",
        modal: {
            name: "form",
            type: "installment",
        },
        title: "Рассрочка",
        icon: 'pi pi-calendar-clock'
    },
    {
        id: 2,
        href: "#",
        modal: {
            name: "form",
            type: "",
        },
        title: "Обращение",
        icon: 'pi pi-comment'
    },
    {
        id: 3,
        href: "/installment-plan#debt-form",
        title: "Оплатить",
        icon: 'pi pi-calculator'
    },
    {
        id: 4,
        href: "#",
        modal: {
            name: "form",
            type: "account-unblock",
        },
        title: "Разблокировать",
        icon: 'pi pi-credit-card'
    },
    {
        id: 5,
        href: "#",
        modal: {
            name: "form",
            type: "cancel-ip",
        },
        title: "Отозвать ИП",
        icon: 'pi pi-file'
    },
]);

function windowResizeHandler() {
    visibility.value = window.matchMedia("(max-width: 1023px)").matches
}

function showModalHandler(linkModal) {
    if (linkModal.name === 'form') {
        modalType.value = linkModal.type
    }

    modal.value[linkModal.name] = true
}

onMounted(() => {
    windowResizeHandler()
    window.addEventListener("resize", windowResizeHandler)
})

onUnmounted(() => {
    window.removeEventListener("resize", windowResizeHandler)
})
</script>

<template>
    <div v-if="visibility" ref="bottomMenu" class="bottom-menu">

        <ul class="bottom-menu-list">
            <li v-for="link in menuItems" :key="link.id" class="bottom-menu-list__item">
                <a v-if="link.modal && link.modal.name" :href="link.href" class="group/link bottom-menu-list-link"
                   @click.prevent="showModalHandler(link.modal)">
                    <i
                        :class="`${link.icon} text-sky-500 !text-xl group-hover/link:text-white max-[600px]:!text-base`"></i>
                    <span class="text-nowrap">
						{{ link.title }}
					</span>
                </a>

                <a v-else-if="link.href.startsWith('tel:')" :href="link.href" class="group/link bottom-menu-list-link">
                    <i
                        :class="`${link.icon} text-sky-500 !text-xl group-hover/link:text-white max-[600px]:!text-base`"></i>
                    <span class="text-nowrap">
						{{ link.title }}
					</span>
                </a>

                <a v-else :href="link.href" class="group/link bottom-menu-list-link">
                    <i
                        :class="`${link.icon} text-sky-500 !text-xl group-hover/link:text-white max-[600px]:!text-base`"></i>
                    <span class="text-nowrap">
						{{ link.title }}
					</span>
                </a>
            </li>
        </ul>
    </div>
    <ModalRequisites v-model="modal.requisites"/>
    <ModalForm v-model="modal.form" :type="modalType"/>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

.bottom-menu {
    position: sticky;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 9;
    padding: 10px;

    &-list {
        border-radius: 10px;
        overflow: hidden;
        border: 1px solid #EAECEE;
        // background-color: rgba(255, 255, 255, .01);
        // box-shadow: 0 1px 0 0 #e0edf6 inset;
        // backdrop-filter: blur(8px);
        background-color: #fff;
        display: flex;
        height: 100%;

        &__item {
            display: flex;
            align-items: center;
            width: 20%;
        }

        &-link {
            display: flex;
            flex-direction: column;
            align-items: center;
            // color: #fff;
            color: #000;
            width: 100%;
            height: 100%;
            padding: 10px;
            text-align: center;
            font-size: 13px;
            // background-color: var.$black-gray;
            gap: 10px;
            transition: color 0.2s, background-color 0.2s;

            &:hover {
                background-color: var.$blue;
                color: white;
            }

            &:active {
                background-color: var.$blue-light;
            }

            &__icon {
                width: 24px;
                height: 24px;
                fill: var.$blue;
                transition: fill 0.2s;
            }
        }
    }
}

@include mixin.tablet {
    .bottom-menu {
        padding: 5px;

        &-list {
            &-link {
                padding: 8px;
                gap: 6px;
                font-size: 10px;
            }
        }
    }
}

@include mixin.mobileS {
    .bottom-menu {
        &-list {
            &-link {
                font-size: 3vw;
            }
        }
    }
}
</style>
