<template>
    <section>
        <div class="custom-container">
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
                { id: 1, upInfo: 'С нами надежно', bottInfo: 'с 2014 года\nна рынке взыскания' },
                { id: 2, upInfo: 'Всё законно', bottInfo: 'с 2017 года \nООО ПКО «Форвард» сертифицирован в ФССП' },
                { id: 3, upInfo: 'Нам доверяют', bottInfo: '100 тысяч клиентов \nисправили кредитную историю с нами' },
                { id: 3, upInfo: 'Мы помогаем', bottInfo: 'до 80 клиентов \nполучают рассрочку ежедневно' }
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
            font-weight: 700;
            font-size: 38px;
            line-height: normal;
            color: #0096d8;
            margin-bottom: 10px;
            white-space: pre-wrap;
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

@include mixin.desktop {
    .numbers {
        &-info {
            &__top {
                font-size: 40px;
            }
        }
    }
}

@include mixin.laptop {
    .numbers {
        &-info {
            width: 40%;

            &__top {
                font-size: 33px;
            }
            &__bottom {
                font-size: 14px;
            }
        }
    }
}

@include mixin.tablet {
    .numbers {
        &-info {
            &__top {
                font-size: 22px;
            }
            &__bottom {
                font-size: 12px;
            }
        }
    }
}
</style>