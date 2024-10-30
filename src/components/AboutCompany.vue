<script setup>
import VueEasyLightbox from 'vue-easy-lightbox'
import { defineComponent, ref } from "vue";

const visibleRef = ref(false)
const indexRef = ref(0)
const imgsRef = [
    {
        src: '/images/AboutCompany/svo.jpg',
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
    <section>
        <div class="container">
            <div class="flexContainer">
                <div class="textContent">
                    <h3>О компании</h3>
                    <p>
                        ООО ПКО «Форвард» – коллекторское агентство, осуществляющее
                        деятельность по возврату просроченной задолженности в качестве
                        основного вида деятельности. Компания действует в соответствии с
                        действующим законодательством и договорами, заключенными с
                        кредитными и иными организациями. «Форвард» законно и правомерно
                        осуществляет действия, направленные на возврат задолженности на
                        основании любого из нижеприведенных видов
                        договоров в соответствии с Федеральным законом от 03.07.2016 N
                        230-ФЗ «О защите прав и законных интересов физических лиц при
                        осуществлении деятельности по возврату просроченной
                        задолженности и о внесении изменений в ФЗ «О микрофинансовой
                        деятельности и микрофинансовых организациях».
                    </p>
                    <button @click="$router.push('/about')" class="button">Подробнее</button>
                </div>
                <div class="imgContainer">
                    <div class="img-thumbnail">
                        <source srcset="/images/AboutCompany/svo.webp" type="image/webp">
                        <source srcset="/images/AboutCompany/svo.jpg" type="image/jpeg">
                        <img src="/images/AboutCompany/svo.jpg"
                            alt="Свидетельство о включении в Реестр юридических лиц, осуществляющих деятельность по возврату просроченной задолженности"
                            @click="showImg()" />
                    </div>
                </div>
            </div>
        </div>
    </section>
    <vue-easy-lightbox :visible="visibleRef" :imgs="imgsRef" :index="indexRef" @hide="onHide" class="lightbox">
        <template v-slot:toolbar="{ toolbarMethods }">
            <a href="/images/AboutCompany/svo.pdf" target="_blank"
                class="lightbox-button button button_blue">Загрузить</a>
        </template>
    </vue-easy-lightbox>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

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

section {
    padding: 50px 0;
}


.flexContainer {
    display: flex;
    gap: 82px;
    border-radius: 30px;
    background: rgb(243, 247, 250);
    align-items: flex-start;
    padding: 60px 85px 62px 81px;
}

.textContent {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 69%;
}

h3 {
    height: 44px;
    font-size: 36px;
    font-weight: 700;
    line-height: 44px;
    letter-spacing: 0%;
    margin-bottom: 11px;
}

p {
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0%;
    margin-bottom: 24px;
}

button {
    @include mixin.buttonDetails;

}

.imgContainer {
    display: flex;
}

.img {
    &-thumbnail {
        max-width: 236px;
        max-height: 334px;
        min-width: 175px;
        min-height: 247px;
    }

    &-preview {
        max-height: 100vh;
        max-width: 100vw;
        padding: 20px;
    }
}

@media screen and (max-width: 1370px) and (min-width: 1025px) {
    h3 {
        font-size: 30px;
        font-weight: 700px;

    }

    p {
        font-size: 14px;
        font-weight: 400px;

    }

    .button:not(.lightbox-button) {
        width: 145px;
        height: 50px;
        font-size: 14px;
    }

    .flexContainer {
        gap: 51px;
        padding: 41px 33px 51px 31px;
    }

    .textContent {
        width: 60%;
    }
}

@media screen and (max-width: 1024px) and (min-width: 641px) {
    h3 {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 14px;
    }

    p {
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 25px;

    }

    .flexContainer {
        gap: 58px;
        padding: 32px 40px 41px 41px;
    }

    .imgContainer {
        flex-direction: column;
        gap: 10px;
    }

    .textContent {
        width: 55%;
    }

    img {
        width: 175px;
        height: 247px;
    }
}

@media screen and (max-width: 640.5px) {
    h3 {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 8px;
    }

    p {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 13px;

    }

    .flexContainer {
        gap: 0;
        padding: 19px 20px 32px 26px;
    }

    .imgContainer {
        display: none;

    }

    .textContent {
        width: 100%;
    }

    img {
        display: none;
    }
}
</style>