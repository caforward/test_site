<template>
    <section>
        <div class="container">
            <div class="flexContainer">
                <div class="textContainer">
                    <h3>Начать исправлять свое финансовое положение и кредитную историю очень просто!</h3>
                    <p>
                        Первое, что вам нужно сделать - связаться с нами по бесплатному телефону +7 (804) 333‑41‑33
                        или с
                        помощью электронной почты dolg.info@caforward.ru. Далее наши специалисты дадут вам
                        бесплатную консультацию и расскажут, что делать, чтобы начать исправлять свое трудной
                        финансовое положение</p>
                    <div><button>Связаться с нами</button></div>
                </div>
                <div class="imageContainer"><img src="/src/assets/images/PigImg/1img.png" alt="there was a pig :(">
                </div>
            </div>
        </div>
    </section>
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

section {
    // padding-top:;
    padding: 30px 0 100px;
    background-color: #F9FAFB;
}

.flexContainer {
    display: flex;
    justify-content: space-between;
    background: rgb(232, 239, 244);
    border-radius: 30px;
    max-height: 470px;

}

.textContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 80px;
    padding-top: 53px;
    padding-right: 0;
    width: 50%;
}

h3 {
    white-space: pre-line;
    font-family: "Montserrat", sans-serif;
    font-size: 28px;
    font-weight: 600;
    line-height: 34px;
    letter-spacing: 0%;
    margin-bottom: 13px;
}

p {
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 0%;
    margin-bottom: 21px;
    width: 90%;
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

.imageContainer{
    margin-top: -25px
}

img {
    transform: rotate(2.01deg);
    width: 521px;   
    height: 521px;
}
</style>