<script setup>
import VueEasyLightbox from "vue-easy-lightbox";
import {ref} from "vue";

const visibleRef = ref(false)
const indexRef = ref(0)
const imgsRef = [
    {
        src: '/images/AboutCompany/svidetelstvo_o_vkluchenii_v_reestr.jpg',
        title:
            'Свидетельство о включении в Реестр юридических лиц, \
            осуществляющих деятельность по возврату просроченной \
            задолженности \ '
    },
    {
        src: '/images/AboutCompany/svidetelstvo_protocol_ARKA.jpg',
        title:
            'Свидетельство о включении в Реестр юридических лиц, \
            осуществляющих деятельность по возврату просроченной \
            задолженности \ '
    },
    {
        src: '/images/AboutCompany/svidetelstvo_protocol_ARKA_2.jpg',
        title:
            'Свидетельство о включении в Реестр юридических лиц, \
            осуществляющих деятельность по возврату просроченной \
            задолженности \ '
    },
]

const showImg = () => {
    indexRef.value = 0
    visibleRef.value = true
    document.body.style.paddingRight = '10px'
}

const onHide = () => {
    document.body.style.paddingRight = ''
    visibleRef.value = false
}
</script>

<template>
    <section class="about-docs">
        <div class="custom-container">
            <div class="images-container">
                <div class="image">
                    <picture>
                        <!--                        <source srcset="/images/AboutCompany/svidetelstvo_o_vkluchenii_v_reestr.webp" type="image/webp">-->
                        <source srcset="/images/AboutCompany/svidetelstvo_o_vkluchenii_v_reestr.jpg" type="image/jpeg">
                        <img src="/images/AboutCompany/svidetelstvo_o_vkluchenii_v_reestr.jpg"
                             alt="Свидетельство о включении в Реестр юридических лиц, осуществляющих деятельность по возврату просроченной задолженности"
                             @click="showImg()"
                        />
                    </picture>
                </div>
                <div class="image">
                    <picture>
                        <source srcset="/images/AboutCompany/svidetelstvo_protocol_ARKA.jpg" type="image/jpeg">
                        <img src="/images/AboutCompany/svidetelstvo_protocol_ARKA.jpg"
                             alt="Свидетельство о включении в Реестр юридических лиц, осуществляющих деятельность по возврату просроченной задолженности"
                             @click="showImg()"
                        />
                    </picture>
                </div>
            </div>
        </div>
    </section>

    <vue-easy-lightbox :visible="visibleRef" :imgs="imgsRef" :index="indexRef" @hide="onHide" class="lightbox">
        <template v-slot:toolbar="{ toolbarMethods }">
            <a href="/images/AboutCompany/svidetelstvo_o_vkluchenii_v_reestr.pdf" target="_blank"
               class="lightbox-button button button_blue">Загрузить</a>
        </template>
    </vue-easy-lightbox>


</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

section {
    padding: 50px 0;
}

.vel {
    &-modal {
        margin-right: 10px;
    }

    &-fade {
        &-leave-active {
            transition: opacity .2s, visibility .2s;
            margin-right: 0 !important;
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
    flex items-center flex-wrap justify-center gap-6;

    .image {
        @apply
        h-96 min-w-48;
    }

    animation: demo-overlay-in 750ms ease-out;
}

@keyframes demo-overlay-in {
    from {
        opacity: 0;
        transform: translateY(15%);
    }
}

</style>