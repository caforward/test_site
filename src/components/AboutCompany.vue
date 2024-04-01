<template>
    <section>
        <div class="container">
            <div class="flexContainer">
                <div class="textContent">
                    <h3>О компании</h3>
                    <p>
                        ООО ПКО «Форвард» – коллекторское агентство, осуществляющее <br />
                        деятельность по возврату просроченной задолженности в качестве<br />
                        основного вида деятельности. Компания действует в соответствии с
                        <br />действующим законодательством и договорами, заключенными с<br />
                        кредитными и иными организациями. «Форвард» законно и <br />правомерно
                        осуществляет действия, направленные на возврат <br />задолженности на
                        основании любого из нижеприведенных видов<br />
                        договоров в соответствии с Федеральным законом от 03.07.2016 N
                        <br />230-ФЗ «О защите прав и законных интересов физических лиц при<br />
                        осуществлении деятельности по возврату просроченной
                        <br />задолженности и о внесении изменений в ФЗ «О микрофинансовой
                        <br />деятельности и микрофинансовых организациях».
                    </p>
                    <button>Подробнее</button>
                </div>
                <div class="imgContainer">
                    <img src="/src/assets/images/AboutCompany/1img.png" alt="there was a trofei pic" />
                    <img src="/src/assets/images/AboutCompany/1img.png" alt="there was a trofei pic" />
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
@import "/src/assets/scss/index.scss";
@import "/src/assets/scss/base/mixins.scss";

section {
    padding: 50px 0;
}

.container {
    max-height: 588px;
    min-height: 540px;
}

.flexContainer {
    display: flex;
    border-radius: 30px;
    background: rgb(243, 247, 250);
    max-height: 588px;
}

.textContent {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 61px;
    margin-left: 81px;
    max-height: fit-content;
}

h3 {
    width: 239px;
    height: 44px;
    font-family: "Montserrat", sans-serif;
    font-size: 36px;
    font-weight: 700;
    line-height: 44px;
    letter-spacing: 0%;
    margin-bottom: 11px;
}

p {
    width: 602px;
    height: 336px;
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0%;
    margin-bottom: 24px;
}

button {
    @include buttonDetails;
    margin-bottom: 62px;
}

.imgContainer {
    display: flex;
    margin-left: 82px;
    margin-top: 60px;
}

img {
    margin-right: 15px;
    max-width: 236px;
    max-height: 334px;
    min-width: 180px;
    min-height: 240px;
    width: 100%;
}
</style>