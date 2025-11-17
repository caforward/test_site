<template>
    <section>
        <div class="custom-container">
            <div class="numbers">
                <ul v-for="item in items" :key="item.id" class="numbers-info">
                    <li class="numbers-info__top heading-2 mb-4" v-html="item.upInfo"></li>
                    <li class="text-body" v-html="item.bottInfo"></li>
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
                { id: 1, upInfo: `С нами <br/>надежно`, bottInfo: 'с 2014 года <br/>на рынке взыскания' },
                { id: 2, upInfo: 'Всё <br/>законно', bottInfo: 'с 2017 года <br/>ООО ПКО «Форвард» сертифицирован в ФССП' },
                { id: 3, upInfo: 'Нам <br/>доверяют', bottInfo: '100 тысяч клиентов <br/>исправили кредитную историю с нами' },
                { id: 3, upInfo: 'Мы <br/>помогаем', bottInfo: 'до 80 клиентов <br/>получают рассрочку ежедневно' }
            ] as ListElem[]
        }
    }
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

section {
    padding: 80px 0 70px;
    background-color: #F9FAFB;
}

.numbers {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 30px;

    &-info {
        width: 20%;

        &__top {
            color: #0096d8;
        }

        &__bottom {
            font-weight: 400;
            font-size: 16px;
            color: #2e2e2e;
            line-height: 150%;
            white-space: pre-wrap;
        }
    }


}

@include mixin.laptop {
    .numbers {
        &-info {
            width: 40%;
            &__bottom {
                font-size: 14px;
            }
        }
    }
}

@include mixin.tablet {
    .numbers {
        &-info {
            &__bottom {
                font-size: 12px;
            }
        }
    }
}
</style>