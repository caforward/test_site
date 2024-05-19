<template>
    <section>
        <div class="container">
            <div class="numbers">
                <ul v-for="item in items" :key="item.id" class="numbers-info">
                    <li class="numbers-info__top">{{ item.upInfo }}</li>
                    <li class="numbers-info__bottom">{{ item.bottInfo }}</li>
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
                { id: 2, upInfo: 'C 2017', bottInfo: 'года ООО ПКО «Форвард»\nсертифицирован в ФССП' },
                { id: 3, upInfo: '100 тыс.', bottInfo: 'клиентов исправили\nкредитную историю с нами' },
                { id: 3, upInfo: 'до 80', bottInfo: 'клиентов получают рассрочку\nежедневно' }
            ] as ListElem[]
        }
    }
})
</script>

<style lang="scss" scoped>
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
            font-weight: 700;
            font-size: 50px;
            line-height: normal;
            color: #0096d8;
            margin-bottom: 10px;
        }

        &__bottom {
            font-weight: 400;
            font-size: 16px;
            color: #2e2e2e;
            line-height: 150%;
        }
    }


}

@include desktop {
    .numbers {
        &-info {
            &__top {
                font-size: 40px;
            }
        }
    }
}

@include laptop {
    .numbers {
        &-info {
            width: 40%;

            &__top {
                font-size: 36px;
            }
            &__bottom {
                font-size: 14px;
            }
        }
    }
}

@include tablet {
    .numbers {
        &-info {
            &__top {
                font-size: 24px;
            }
            &__bottom {
                font-size: 12px;
            }
        }
    }
}
</style>