<template>
    <div class="container">
        <div v-for="item in items" :key="item.id" :style="{ backgroundColor: item.background }" class="flex-container">
            <div class="img-container"><img :src="item.imageUrl" alt="There was a img :( "></div>
            <div class="flexElements">
                <h3>{{ item.textH3 }}</h3>
                <p>{{ item.textParagr }}</p>
                <div v-bind:class="{ 'buttonItems3' : item.id === 3 }"><button>Подробнее</button></div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface ListItems {
    id: number;
    imageUrl: string;
    textH3: string;
    textParagr: string;
    textButton: string;
    background: string
}

export default defineComponent({
    data() {
        return {
            items: [
                {
                    id: 1,
                    imageUrl: '/src/assets/images/HelpEverClient/1img.png',
                    textH3: "Прощение долга",
                    textParagr: "Не можете выплатить всю сумму\nдолга? ПКО «Форвард» поможет вам\nполностью избавиться от долгов.\nЗаключите договор с нами и получите\nскидку на свой долг. Что это значит?\nЕсли вы начнете сотрудничество с\nнашей компанией, вы сможете\nрассчитывать на прощение части\nвашего долга. Позвоните нам, и мы\nрассчитаем оптимальный для вас\nграфик платежей, который не будет\nобременять вас, но поможет быстро\nрасплатиться с долгами.",
                    background: '#ecf6e7'
                }, {
                    id: 2,
                    imageUrl: '/src/assets/images/HelpEverClient/2img.png',
                    textH3: "Разблокируем ваши счета",
                    textParagr: "В нашей компании имеются практики\nи опыт, которые позволяют нам быстро\nи эффективно разблокировать счета\nдолжника. Доверьте свою финансовую\nситуацию нам, и забудьте о проблемах\nс приставами!\n\n Если у вас возникла другая проблема,\nто просто свяжитесь с нами по\nтелефону +7 (804) 333‑41‑33 –\nконсультация наших специалистов\nбесплатна!",
                    background: '#f0f1f9'
                }, {
                    id: 3,
                    imageUrl: '/src/assets/images/HelpEverClient/3img.png',
                    textH3: "Узнать номер вашего договора",
                    textParagr: "Не знаете номер своего договора?\nОставьте свои контактные данные, и\nнаши специалисты со всем разберутся.\nЕсли вы не можете разобраться в\nюридических сложностях, то не\nбойтесь нам звонить – в ПКО\n«Форвард» работают юристы высокого\nкласса, которые без труда разберутся\nдаже в самой сложной ситуации.",
                    background: "#eef1f3"
                }

            ] as ListItems[]
        }
    }
})
</script>

<style lang="scss" scoped>
@import '/src/assets/scss/base/mixins.scss';


.container {
    margin-top: 100px;
    max-width: 1338px;
    display: flex;
    justify-content: space-between;
    gap: 30px
}

.flex-container {
    max-width: 426px;
    max-height: 795px;
    width: 100%;
    border-radius: 30px;
    display: flex;
  flex-direction: column;

}

h3 {
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    font-size: 28px;
    line-height: 107%;
    color: #2e2e2e;
    margin-top: 40px;
    margin-bottom: 20px;
}

p {

    white-space: pre-line;
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
    font-size: 17px;
    line-height: 175%;
    color: #2e2e2e;
}

button {
    @include buttonDetails;
    margin: 20px 0px 40px -7px;
    padding: 15px 0;
    
}
.buttonItems3 {
        margin-top: 99px;
    }


.flexElements {
    display: flex;
    align-items: baseline;
    flex-direction: column;
    padding-left: 40px;
    padding-right: 50px;
    justify-content: space-between;
}

.img-container {
    display: flex;
    justify-content: center;
    max-width: 100%;
    margin-top: 20px;
    height: auto;
}


</style>