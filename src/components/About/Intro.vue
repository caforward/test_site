<script setup>
import BaseBreadcrumb from "@/blocks/BaseBreadcrumb.vue";
import ModalForm from '@/layouts/ModalForm.vue';
import VueEasyLightbox from "vue-easy-lightbox";
import {ref} from "vue";

const modalVisible = ref(false)

const visibleRef = ref(false)
const indexRef = ref(0)
const ind = ref(0)
const imgsRef = [
    {
        src: '/images/AboutCompany/svidetelstvo_o_vkluchenii_v_reestr.jpg',
        downloadSrc: '/images/AboutCompany/svidetelstvo_o_vkluchenii_v_reestr.pdf',
        title:
            'Свидетельство о включении в Реестр юридических лиц, \
            осуществляющих деятельность по возврату просроченной \
            задолженности \ '
    },
    {
        src: '/images/AboutCompany/svidetelstvo_protocol_ARKA.jpg',
        downloadSrc: '/images/AboutCompany/svidetelstvo_protocol_ARKA.pdf',
        title:
            'Свидетельство о включении в Реестр юридических лиц, \
            осуществляющих деятельность по возврату просроченной \
            задолженности \ '
    },
]

const showImg = (index) => {
    indexRef.value = index
    visibleRef.value = true
}

const onHide = () => {
    visibleRef.value = false
}
</script>

<template>
    <section class="section">
        <div class="custom-container">
            <BaseBreadcrumb class="breadcrumb"/>

            <div class="intro-content">
                <h1 class="intro-content__title">ООО ПКО «Форвард»</h1>
                <div class="images-container mb-10">
                    <div class="image">
                        <picture>
                            <!--                        <source srcset="/images/AboutCompany/svidetelstvo_o_vkluchenii_v_reestr.webp" type="image/webp">-->
                            <source
                                srcset="/images/AboutCompany/svidetelstvo_o_vkluchenii_v_reestr.jpg"
                                type="image/jpeg"
                            >
                            <img src="/images/AboutCompany/svidetelstvo_o_vkluchenii_v_reestr.jpg"
                                 alt="Свидетельство о включении в Реестр юридических лиц, осуществляющих деятельность по возврату просроченной задолженности"
                                 @click="showImg(0)"
                            />
                        </picture>
                    </div>
                    <div class="image">
                        <picture>
                            <source
                                srcset="/images/AboutCompany/svidetelstvo_protocol_ARKA.jpg"
                                type="image/jpeg"
                            >
                            <img src="/images/AboutCompany/svidetelstvo_protocol_ARKA.jpg"
                                 alt="Свидетельство о включении в Реестр юридических лиц, осуществляющих деятельность по возврату просроченной задолженности"
                                 @click="showImg(1)"
                            />
                        </picture>
                    </div>
                </div>
                <div class="intro-content__subtitle text-balance">
                    ООО ПКО «Форвард» — профессиональная коллекторская организация, которая с 2014 года помогает
                    клиентам урегулировать задолженность и восстановить финансовую стабильность. Компания предлагает
                    простые и понятные способы погашения долга — в рассрочку или на специальных условиях.
                </div>

                <p class="intro-content__text text-balance">
                    Приобретая задолженность физических лиц и работая с ней на законных основаниях, ПКО «Форвард»
                    имеет возможность предлагать более гибкие и лояльные схемы погашения. В зависимости от ситуации
                    клиенту могут быть доступны индивидуальные графики платежей и снижение суммы задолженности при
                    выполнении условий урегулирования.
                </p>
                <p class="intro-content__text text-balance">
                    Специалисты компании рассматривают каждый случай индивидуально и совместно с клиентом подбирают
                    комфортное решение, позволяющее закрыть задолженность без избыточной финансовой нагрузки. Такой
                    подход помогает эффективно решить вопрос даже по «старым» долгам.
                </p>
                <p class="intro-content__text text-balance">
                    В ряде случаев условия погашения задолженности в ПКО «Форвард» могут быть более выгодными, чем
                    первоначальные условия кредита, за счёт гибкости и возможности согласования индивидуальных условий.
                </p>

                <a href="#" class="button button_blue intro-content__button"
                   @click="modalVisible = true">
                    Получить консультацию
                </a>
            </div>
        </div>
    </section>
    <ModalForm v-model="modalVisible"/>

    <vue-easy-lightbox
        :index="indexRef"
        :visible="visibleRef"
        :imgs="imgsRef"
        class="lightbox"
        @hide="onHide"
        @on-index-change="(oldInd, newInd) => indexRef = newInd"
    >
        <template v-slot:toolbar="{ toolbarMethods }">
            <a
                :href="imgsRef[indexRef].downloadSrc"
                target="_blank"
                class="lightbox-button button button_blue">
                Загрузить
            </a>
        </template>
    </vue-easy-lightbox>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

section {
    padding: 50px 0;
    background-color: var.$gray-light;
}

.vel {
    &-fade {
        &-leave-active {
            transition: opacity .2s, visibility .2s;
        }
    }
}

.lightbox-button {
    position: absolute;
    height: 40px;
    top: 20px;
    left: 50%;
    transform: translateX(-50%)
}

.images-container {
    @apply
    flex items-center justify-center gap-6;

    .image {
        @apply
        md:min-w-60 md:h-96
        flex-1;
    }

    animation: demo-overlay-in 750ms ease-out;
}

@keyframes demo-overlay-in {
    from {
        opacity: 0;
        transform: translateY(15%);
    }
}

.container {
    min-height: 560px;
}

.breadcrumb {
    font-weight: 400;
    font-size: 14px;
    line-height: 143%;
    color: var.$gray-dark;
    margin-bottom: 30px;
}

.intro {
    &__img {
        width: 50%;
        height: 560px;
    }

    &-content {
        &__title {
            margin-bottom: 25px;
        }

        &__subtitle {
            font-weight: 600;
            font-size: 18px;
            line-height: 162%;
            margin-bottom: 25px;
        }

        &__text {
            font-size: 16px;
            line-height: 167%;
            margin-bottom: 25px;
        }

        &__button {
            min-width: 200px;
            width: fit-content;
        }
    }
}

@include mixin.desktop {
    .intro {
        &__img {
            width: 65%;
        }

        &-content {
            &__subtitle {
                font-size: 16px;
                margin-bottom: 20px;
            }

            &__text {
                font-size: 14px;
                line-height: 214%;
            }
        }
    }
}

@include mixin.laptop {
    .intro {
        &__img {
            padding: 80px 0 60px;
            width: 50%;

            img {
                object-position: top;
            }
        }

        &-content {
            &__title {
                margin-bottom: 15px;
            }
        }
    }
}

@include mixin.tablet {
    .intro {
        &__img {
            width: 100%;
            padding-top: 0;
            height: 305px;

            img {
                object-position: center;
            }
        }

        &-content {
            padding-bottom: 0;
            width: 100%;

            &__title {
                margin-bottom: 15px;
            }

            &__subtitle,
            &__text {
                font-size: 14px;
                line-height: 171%;
            }

            &__text {
                margin-bottom: 15px;
            }

            &__button {
                width: 100%;
                max-width: 350px;
            }
        }
    }
}
</style>
