<template>
    <div class="container">
        <div class="flexContainer">
            <div class="Textcontent">
                <h3>Анонимный звонок</h3>
                <p class="upParagraph">Мы понимаем всю тяжесть финансового положения наших потенциальных <br> клиентов, поэтому гарантируем полную анонимность каждому, кто<br> обратится к нам. В частности, вы можете абсолютно анонимно и бесплатно<br> получить консультацию по любому вопросу, связанному с погашением<br> вашей задолженности. Просто позвоните нам, опишите свою ситуацию, и мы<br> подскажем, что нужно делать, чтобы получить рассрочку с прощением части <br>долга. 
                    <br><br>Сотрудничество с ПКО «Форвард» – это абсолютно безопасно. На этапе<br> звонка мы не собираем данных, а значит, вы можете не бояться утечки на<br> третью сторону или того, что кто-то из близких узнает о вашем тяжелом <br>положении. С нами вы можете быть уверены, что эффективная и <br>современная помощь будет еще и максимально этичной <br>и корректной.</p>
            <div class="PhoneEmailContainer">
                <div class="PhoneInfo">
                    <div class="Phone">+7 (804) 333-41-33</div>
                    <p class="underParagraph">Ежедневно с 7:00 до 20:00 Мск</p>
                </div>
                <div class="mailInfo">
                    <div class="Mail">dolg.info@caforward.ru</div>
                    <p>или напишите нам на почту</p>
                </div>
                </div>
            </div>
            <div class="imgContent"><img src="/src/assets/images/AnonimCall/1Img.png" alt="there was a pic"></div>
            </div>
            <button class="CallOrder">Заказать звонок</button>
        </div>
   

</template>

<script lang="ts">
import { defineComponent } from 'vue'



export default defineComponent({
    data() {
        return {

        }
    }
})
</script>

<style lang="scss" scoped>

@import '/src/assets/scss/index.scss';
@import '/src/assets/scss/libs/fonts.scss';

.container {
    margin-top: 100px;
    height: 637px;
   
    
}
.flexContainer {
    display: flex;
    justify-content: flex-start;
    
}
.Textcontent {
    width: 652px;
    margin-right: 39px;
}
.PhoneEmailContainer {
    display: flex;
    justify-content: flex-start;
    color:rgb(0, 150, 216);
    margin-bottom: 12px;
    p {
        font-family: "Montserrat", sans-serif;
font-size: 16px;
font-weight: 400;
line-height: 30px;
letter-spacing: 0%;
color: rgb(46, 46, 46);
}
    .Phone {
        font-family: "Montserrat", sans-serif;
        font-size: 24px;
font-weight: 700;
line-height: 30px;
letter-spacing: 0%;

    }
    .Mail {
        font-family: "Montserrat", sans-serif;
        font-size: 24px;
font-weight: 700;
line-height: 30px;
letter-spacing: 0%;

    }
}
.PhoneInfo {
    width: 313px;
    height: 63px;
    margin-right: 32px;
}
.MailInfo {
    width: 310px;
        height: 63px;
}
img{
    max-width: 647px;
    max-height: 595px;
    min-width: 590px;
    min-height: 540px;
    width: 100%;
}
.CallOrder {
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