<script setup>
import { ref } from 'vue'
import ModalForm from '../layouts/ModalForm.vue';

const modalVisibleCall = ref(false)
</script>

<template>
    <section>
        <div class="custom-container">
            <div class="flexContainer">
                <div class="textContent">
                    <div class="heading-2 mb-4">Анонимный звонок</div>
                    <p class="text-body mb-4">ООО ПКО «Форвард» гарантирует полную анонимность каждому, кто обратится к
                        нам. В частности, вы можете получить консультацию по любому вопросу, связанному с погашением
                        задолженности. <br>Просто позвоните нам, опишите ситуацию, и мы подскажем, что нужно
                        делать, чтобы получить рассрочку с прощением части долга. На этапе звонка мы не собираем данных,
                        а значит, никто не узнает, что Вы с нами общались.
                    </p>
                    <div class="phoneEmailContainer">
                        <div class="phoneInfo">
                            <a href="tel:78043334133" class="phone">+7 (804) 333-41-33</a>
                            <p class="bottParagraph">Ежедневно с 9:00 до 18:00</p>
                        </div>
                        <div class="mailInfo">
                            <a href="mailto:dolg.info@caforward.ru" class="mail">dolg.info@caforward.ru</a>
                            <p class="bottParagraph">или напишите нам на почту</p>
                        </div>
                    </div>
                    <button @click="modalVisibleCall = true" class="button_blue callOrderButt">Заказать звонок</button>
                </div>
                <!-- <div class="imgContent"><img src="/images/AnonimCall/1Img.png" alt="there was a pic"></div> -->
                <div>
                    <source srcset="/images/AnonimCall/1Img.webp" type="image/webp">
                    <source srcset="/images/AnonimCall/1Img.png" type="image/png">
                    <img src="/images/AnonimCall/1Img.png" alt="Анонимный звонок" />
                </div>
            </div>

        </div>
        <ModalForm v-model="modalVisibleCall" />
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

section {
    padding: 50px 0 150px;
}

.flexContainer {
    display: flex;
    justify-content: flex-start;
    gap: 42px;
    align-items: flex-start;
}

.phoneEmailContainer {
    display: flex;
    justify-content: flex-start;
    color: rgb(0, 150, 216);
    margin-bottom: 12px;

    p {
        font-family: "Montserrat", sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 30px;
        color: rgb(46, 46, 46);
    }

    .phone {
        font-family: "Montserrat", sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 30px;
    }

    .mail {
        font-family: "Montserrat", sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 30px;
    }
}

.phoneInfo {
    margin-right: 42px;

    a {
        display: inline-block;
        color: #0096D8;
    }

}

.mailInfo {

    a {
        display: inline-block;
        color: #0096D8;
    }

}

img {}

.textContent {
    width: 57%
}

.callOrderButt {
    width: 198px;
    height: 50px;
    border-radius: 30px;
    background: rgb(0, 150, 216);
    color: rgb(255, 255, 255);
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 30px;
}

h3 {
    font-family: "Montserrat", sans-serif;
    font-size: 36px;
    font-weight: 700;
    line-height: 44px;
    margin-bottom: 21px;
}


.upParagraph {
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 30px;
    color: rgb(46, 46, 46);
    margin-bottom: 32px;
}

.imgContent {
    box-sizing: content-box;
}

@media screen and (max-width: 1370px) and (min-width: 1025px) {
    h3 {
        font-size: 30px;
        margin-bottom: 14px;
    }

    .upParagraph {
        font-size: 14px;
        margin-bottom: 23px;
    }

    .phoneInfo {
        margin-right: 37px;

        .phone {
            font-size: 16px;
        }
    }

    .mailInfo {
        .mail {
            font-size: 16px;
        }
    }

    .phoneEmailContainer {
        gap: 19px;
        width: 120%;

        .bottParagraph {
            font-size: 14px;
        }
    }

    .callOrderButt {
        font-size: 14px;
        width: 181px;
        height: 50px;
    }

    .flexContainer {
        gap: 29px;
    }
}

@media screen and (max-width: 1024px) and (min-width: 641px) {
    h3 {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 12px;
    }

    .upParagraph {
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 24px;
    }

    .textContent {
        width: 100%;
    }

    .phoneInfo {
        margin-right: 37px;

        .phone {
            font-size: 16px;
        }
    }

    .mailInfo {
        .mail {
            font-size: 16px;
        }
    }

    .phoneEmailContainer {
        gap: 90px;

        margin-bottom: 23px;

        .bottParagraph {
            font-size: 14px;
        }
    }

    .callOrderButt {
        font-size: 14px;
        width: 181px;
        height: 50px;
    }

    .flexContainer {
        gap: 29px;
    }

    img {
        display: none;
    }
}

@media screen and (max-width: 640.5px) {
    section {
        padding-top: 0;
    }

    h3 {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 3px;
    }

    .upParagraph {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 14px;
    }

    .textContent {
        width: 100%;

    }

    .phoneInfo {
        margin-right: 37px;

        .phone {
            font-size: 16px;
        }
    }

    .mailInfo {
        .mail {
            font-size: 16px;
        }
    }

    .phoneEmailContainer {
        gap: 0;
        display: flex;
        flex-direction: column;

        margin-bottom: 13px;

        .bottParagraph {
            font-size: 14px;
            font-weight: 500;
        }
    }

    .callOrderButt {
        font-size: 14px;
        width: 181px;
        height: 40px;
    }

    .flexContainer {
        gap: 0;
    }

    img {
        display: none;
    }
}
</style>