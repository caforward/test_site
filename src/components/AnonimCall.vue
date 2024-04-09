<template>
    <section>
    <div class="container">
        <div class="flexContainer">
            <div class="textContent">
                <h3>Анонимный звонок</h3>
                <p class="upParagraph">Мы понимаем всю тяжесть финансового положения наших потенциальных <br> клиентов,
                    поэтому гарантируем полную анонимность каждому, кто<br> обратится к нам. В частности, вы можете
                    абсолютно анонимно и бесплатно<br> получить консультацию по любому вопросу, связанному с
                    погашением<br> вашей задолженности. Просто позвоните нам, опишите свою ситуацию, и мы<br> подскажем,
                    что нужно делать, чтобы получить рассрочку с прощением части <br>долга. 
                    <br><br>Сотрудничество с ПКО «Форвард» – это абсолютно безопасно. На этапе<br> звонка мы не собираем
                    данных, а значит, вы можете не бояться утечки на<br> третью сторону или того, что кто-то из близких
                    узнает о вашем тяжелом <br>положении. С нами вы можете быть уверены, что эффективная и
                    <br>современная помощь будет еще и максимально этичной <br>и корректной.
                </p>
                <div class="phoneEmailContainer">
                    <div class="phoneInfo">
                        <a href="tel:78043334133" class="phone">+7 (804) 333-41-33</a>
                        <p class="bottParagraph">Ежедневно с 7:00 до 20:00 Мск</p>
                    </div>
                    <div class="mailInfo">
                        <a href="mailto:dolg.info@caforward.ru" class="mail">dolg.info@caforward.ru</a>
                        <p class="bottParagraph">или напишите нам на почту</p>
                    </div>
                </div>
            </div>
            <div class="imgContent"><img src="/src/assets/images/AnonimCall/1Img.png" alt="there was a pic"></div>
        </div>
        <button @click="showModalCall" class="callOrderButt">Заказать звонок</button>
    </div>
    <ModalCall :visible="modalVisibleCall" @close="closeModalCall"></ModalCall>
</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ModalCall from '../layouts/ModalCall.vue';


export default defineComponent({
    components: {
        ModalCall
    },
    data() {
        return {
            modalVisibleCall: false,
        }
    },
    methods: {
        showModalCall() {
            this.modalVisibleCall = true;
        },
        closeModalCall() {
            this.modalVisibleCall = false;
        },
    }
})
</script>

<style lang="scss" scoped>
@import '/src/assets/scss/index.scss';
@import '/src/assets/scss/libs/fonts.scss';

section {
    padding: 50px 0 150px;
}

.container {
}

.flexContainer {
    display: flex;
    justify-content: flex-start;
}

.textContent {
    margin-right: 39px;
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
        letter-spacing: 0%;
        color: rgb(46, 46, 46);
    }

    .phone {
        font-family: "Montserrat", sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 30px;
        letter-spacing: 0%;

    }

    .mail {
        font-family: "Montserrat", sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 30px;
        letter-spacing: 0%;

    }
}

.phoneInfo {
    width: 313px;
    margin-right: 32px;
    a{  
        display: inline-block;
        color: #0096D8; 
    }
    
}

.mailInfo {
    width: 310px;
    a{
        display: inline-block;
        color: #0096D8; 
    }
    
}

img {
    max-width: 647px;
    max-height: 595px;
    min-width: 590px;
    min-height: 540px;
    width: 100%;
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
    letter-spacing: 0%;
}

h3 {
    font-family: "Montserrat", sans-serif;
    font-size: 36px;
    font-weight: 700;
    line-height: 44px;
    letter-spacing: 0%;
    margin-bottom: 21px;
}


.upParagraph {
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 0%;
    color: rgb(46, 46, 46);
    margin-bottom: 32px;
}
</style>