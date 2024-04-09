<template>
    <section>
        <div class="container">
            <div class="upText">Поможем каждому клиенту</div>
            <div class="flexContainer">
                <div v-for="item in items" :key="item.id" :style="{ backgroundColor: item.background }"
                    class="ContentItems">
                    <div class="content">
                        <div class="imgContainer"><img :src="item.imageUrl" alt="There was a img :( "></div>
                        <div class="textElements">
                            <h3>{{ item.textH3 }}</h3>
                            <p>{{ item.textParagr }}</p>
                        </div>
                    </div>
                    <div class="wrapButt">
                        <button>Подробнее</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
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
                    textParagr: "Не можете выплатить всю сумму  долга? ПКО «Форвард» поможет вам  полностью избавиться от долгов.  Заключите договор с нами и получите  скидку на свой долг. Что это значит?  Если вы начнете сотрудничество с  нашей компанией, вы сможете  рассчитывать на прощение части  вашего долга. Позвоните нам, и мы  рассчитаем оптимальный для вас  график платежей, который не будет  обременять вас, но поможет быстро  расплатиться с долгами.",
                    background: '#ecf6e7'
                }, {
                    id: 2,
                    imageUrl: '/src/assets/images/HelpEverClient/2img.png',
                    textH3: "Разблокируем ваши счета",
                    textParagr: "В нашей компании имеются практики  и опыт, которые позволяют нам быстро  и эффективно разблокировать счета  должника. Доверьте свою финансовую  ситуацию нам, и забудьте о проблемах  с приставами!\n\nЕсли у вас возникла другая проблема,  то просто свяжитесь с нами по  телефону +7 (804) 333‑41‑33 –  консультация наших специалистов  бесплатна!",
                    background: '#f0f1f9'
                }, {
                    id: 3,
                    imageUrl: '/src/assets/images/HelpEverClient/3img.png',
                    textH3: "Узнать номер вашего договора",
                    textParagr: "Не знаете номер своего договора?  Оставьте свои контактные данные, и  наши специалисты со всем разберутся.  Если вы не можете разобраться в  юридических сложностях, то не  бойтесь нам звонить – в ПКО  «Форвард» работают юристы высокого  класса, которые без труда разберутся  даже в самой сложной ситуации.",
                    background: "#eef1f3"
                }

            ] as ListItems[]
        }
    }
})
</script>

<style lang="scss" scoped>
@import '/src/assets/scss/base/mixins.scss';
@import '/src/assets/scss/index.scss';

section {
    padding: 70px 0 50px;
    background-color: #F9FAFB;
}


.upText {
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    font-size: 36px;
    margin-bottom: 32px;
}

.flexContainer {
    display: flex;
    justify-content: space-between;
    gap: 30px;
    position: relative;
}

.ContentItems {
    padding: 25px 40px 60px;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.content {

}

h3 {
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    font-size: 28px;
    line-height: 30px;
    letter-spacing: 0%;
    margin-top: 40px;
    margin-bottom: 20px;
    height: auto;
}

p {
    white-space: pre-line;
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0%;
    margin-bottom: 20px;
}


.wrapButt {
    button {
        @include buttonDetails;
        padding: 15px 0;
    }

}

.textElements {
    display: flex;
    align-items: baseline;
    flex-direction: column;
    justify-content: space-between;
}

.imgContainer {
    display: flex;
    justify-content: center;
    
}
</style>