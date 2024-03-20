<template>
    <div class="container">
        <div class="flexRow">
            <div class="flexColumn">
                <h3>Начать исправлять свое финансовое <br> положение и кредитную историю <br> очень просто!</h3>
                <p>Первое, что вам нужно сделать – связаться с нами по бесплатному<br>телефону +7 (804) 333‑41‑33 или с помощью электронной почты<br>dolg.info@caforward.ru. Далее наши специалисты дадут вам бесплатную<br>консультацию и расскажут, что делать, чтобы начать исправлять<br>свое трудной финансовое положение</p>
                <button>Связаться с нами</button>
            </div>
            <div class="image-container"><img src="/src/assets/images/PigImg/1img.png" 
                alt="there was a pig :(" ></div>
        </div>
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
    margin-top: 62px;
    max-width: 1320px;
    max-height: 470px;
    widows: auto;
    height: auto;
    border-radius: 30px;
    background: rgb(232, 239, 244);

}
.flexRow {
    display: flex;

}
.flexColumn {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 54px;
    margin-left: 81px;
}
h3 {
    white-space: pre-line;
width: 686px;
height: 102px;
font-family: "Montserrat", sans-serif;
font-size: 28px;
font-weight: 600;
line-height: 34px;
letter-spacing: 0%;
margin-bottom: 13px;

}

p {
    width: 572px;
height: 150px;
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
font-weight: 400;
line-height: 30px;
letter-spacing: 0%;
margin-bottom: 21px;
}

button {
color: rgb(255, 255, 255);
font-family: "Montserrat", sans-serif;
font-size: 16px;
font-weight: 500;
line-height: 30px;
letter-spacing: 0%;
width: 212px;
height: 50px;
border-radius: 30px;
background: rgb(32, 175, 206);
}
.image-container{
    max-width: 457px; 
    max-height: 431px;
  
}
img {
    transform: rotate(2.01deg);
    margin-right: 29px;
    margin-bottom: 35.5px;
    margin-top: -14px;
    width:100%;
    height: auto;
}
</style>