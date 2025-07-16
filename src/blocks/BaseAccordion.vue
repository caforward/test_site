<script setup>
import { ref, onMounted } from 'vue'

const accordions = ref(null)

const props = defineProps({
    accordionData: {
        type: Array,
        required: true,
    },
    openedAccordion: {
        type: Number,
        default: 0
    }
})

function openAccordion(e) {
    const accordion = e.target.closest(".accordion");
    const accordionBody = accordion.querySelector(".accordion__content")

    accordion.classList.toggle("accordion_opened");
}

onMounted(() => {
    let accordionsCountToOpen = props.openedAccordion

    if (accordions.value.children.length < props.openedAccordion) {
        accordionsCountToOpen = accordions.value.children.length
    }

    for (let idx = 0; idx < accordionsCountToOpen; idx++) {
        accordions.value.children[idx].classList.add("accordion_opened")
    }
})
</script>

<template>
    <ul ref="accordions" class="accordions">
        <li class="accordion" v-for="(item, idx) in props.accordionData" :key="idx">
            <h3 class="font-bold accordion-title" @click="openAccordion">
                {{ item.title }}
                <span class="accordion-title__icon">
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L7.88388 7.53033C7.39573 8.01848 6.60427 8.01849 6.11612 7.53033L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
                            fill="#0096D8" />
                    </svg>
                </span>
            </h3>
            <div class="accordion__content">
                <div v-html="item.content">
                </div>
            </div>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

.accordion {
    border-bottom: 1px solid rgba(217, 217, 217, 0.5);

    &_opened {
        & .accordion-title__icon {
            rotate: 180deg;
        }

        & .accordion__content {
            grid-template-rows: 1fr;
            padding-bottom: 45px;
        }
    }

    &-title {
        user-select: none;
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        padding: 20px 0 25px;
        grid-gap: 60px;

        &:hover {
            cursor: pointer;
        }

        &__icon {
            display: flex;
            align-items: center;
            height: fit-content;
            transition: rotate .2s;
        }
    }

    &__content {
        line-height: 187%;
        padding-bottom: 0;
        display: grid;
        grid-template-rows: 0fr;

        transition: grid-template-rows 0.2s, padding-bottom 0.2s;

        &>div {
            overflow: hidden;
        }
    }
}

@include mixin.desktop {
    .accordion {
        &_opened {
            & .accordion__content {
                padding-bottom: 30px;
            }
        }

        &-title {
            font-size: 16px;
            padding: 15px 0;
        }

        &__content {
            font-size: 14px;
        }
    }
}

@include mixin.tablet {
    .accordion {
        &_opened {
            & .accordion__content {
                padding-bottom: 25px;
            }
        }

        &-title {
            font-size: 14px;
        }

        &__content {
            font-size: 14px;
        }
    }
}
</style>
