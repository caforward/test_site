<template>
    <section>
    <div class="container">
        <div class="flexContainer">
            <ul v-for="item in items" :key="item.id">
                <li class="upInfo">{{ item.upInfo }}</li>
                <li class="bottInfo">{{ item.bottInfo }}</li>
            </ul>
        </div>
    </div>
</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface ListElem {
    id: number;
    upInfo: string;
    bottInfo: string;
}

export default defineComponent({
    data() {
        return {
            items: [
                { id: 1, upInfo: 'C 2014', bottInfo: 'года на рынке\nвзыскания' },
                { id: 2, upInfo: 'C 2017', bottInfo: 'года ООО «Форвард»\nсертифицирован в ФССП' },
                { id: 3, upInfo: '100 тыс.', bottInfo: 'клиентов исправили\nкредитную историю с нами' },
                { id: 3, upInfo: 'до 80', bottInfo: 'получают рассрочку\nежедневно' }
            ] as ListElem[]
        }
    }
})
</script>

<style lang="scss" scoped>
@import '/src/assets/scss/index.scss';

section{
    padding-bottom: 140px;
    padding-top:77px;
    background-color: #F9FAFB;
}

.flexContainer {
    display: flex;
    justify-content: space-between;

    ul {
        max-width: 243px;
        width: 100%;
        font-family: 'Montserrat', sans-serif;
        
    }

    .upInfo {
        font-weight: 700;
        font-size: 50px;
        line-height: 48%;
        color: #0096d8;
        white-space: nowrap;
        margin-bottom: 17px;
    }

    .bottInfo {
        font-weight: 400;
        font-size: 16px;
        color: #2e2e2e;
        white-space: pre-line;
    }
}
</style>