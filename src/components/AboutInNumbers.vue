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
section{
    padding:80px 0 70px;
    background-color: #F9FAFB;
}

.flexContainer {
    display: flex;
    justify-content: space-between;

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

@media screen and (max-width: 1370px) and (min-width: 1025px) {
    .flexContainer {
        .upInfo {
        font-size: 40px;
    }
    }
}
@media screen and (max-width: 1024px) and (min-width: 641px) {
    .flexContainer {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: space-between;
    justify-items: flex-start;
    column-gap: 110px;
    ul {
        margin-bottom: 24px;
    }
        .upInfo {
        font-size: 36px;
        .bottInfo {
            font-size: 14px;
        }
    }

    }
}
@media screen and (min-width: 768px) {
    .flexContainer {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: space-between;
    justify-items: flex-start;
    column-gap: 110px;
    ul {
        margin-bottom: 54px;
    }
        .upInfo {
        font-size: 36px;
        .bottInfo {
            font-size: 14px;
        }
    }

    }
}

</style>