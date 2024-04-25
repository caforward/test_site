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
                        кредитными и иными организациями. «Форвард» законно и  правомерно
                        осуществляет действия, направленные на возврат  задолженности на
                        основании любого из нижеприведенных видов 
                        договоров в соответствии с Федеральным законом от 03.07.2016 N
                         230-ФЗ «О защите прав и законных интересов физических лиц при 
                        осуществлении деятельности по возврату просроченной
                         задолженности и о внесении изменений в ФЗ «О микрофинансовой
                         деятельности и микрофинансовых организациях».
                    </p>
                    <button class="button">Подробнее</button>
                </div>
                <div class="imgContainer">
                    <img src="/assets/images/AboutCompany/1img.png" alt="there was a trofei pic" />
                    <img src="/assets/images/AboutCompany/1img.png" alt="there was a trofei pic" />
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {};
    },
});
</script>

<style lang="scss" scoped>

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
    @include buttonDetails;
    
}

.imgContainer {
    display: flex;
}

img {
    max-width: 236px;
    max-height: 334px;
    min-width: 175px;
    min-height: 247px;
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
    .button {
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
    .button {
        width: 145px;
        height: 50px;

        font-size: 14px;

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
        width:175px;
        height: 247px;
    }
}
</style>