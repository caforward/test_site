<template>
    <section class="info">
        <div class="custom-container">
            <div class="info__inner">
                <div class="heading-3 mb-6">
                    Компания действует в соответствии с действующим
                    законодательством и договорами, заключенными с кредитными и
                    иными организациями.
                </div>
                <p class="text-body mb-5">
                    «Форвард» законно и правомерно осуществляет действия,
                    направленные на возврат задолженности на основании любого из
                    нижеприведенных видов договоров в соответствии с Федеральным
                    законом от 03.07.2016 N 230-ФЗ «О защите прав и законных
                    интересов физических лиц при осуществлении деятельности по
                    возврату просроченной задолженности и о внесении изменений в
                    ФЗ «О микрофинансовой деятельности и микрофинансовых
                    организациях»:
                </p>
                <ul class="info-list text-body">
                    <li>
                        Договор цессии –
                        <a href="#">ст. 382-390 ГК РФ</a>
                    </li>
                    <li>
                        Агентский договор –
                        <a href="#">ст. 1005 ГК РФ</a>
                    </li>
                </ul>
                <p class="text-body mb-5">
                    Компания создана в Новосибирске в 2014 году, а в 2017 году
                    она получила сертификацию Федеральной Службы Судебных
                    Приставов. Менеджеры компании имеют более чем 10-летний опыт
                    работы на рынке взыскания задолженности и в крупных
                    розничных банках. 
                </p>
                <p class="info__text info__text_border">
                    Компания «Форвард» всегда пытается войти в положение клиента и предлагает эффективные варианты
                    быстрого решения финансовых проблем, которые в итоге не станут еще
                    большим обременением.
        

                </p>
            </div>
        </div>
    </section>
</template>

<script setup>
</script>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

section {
    padding: 80px 0 40px;
}

a {
    color: var.$blue;
    border-bottom: 1px solid var.$blue;
    transition: color 0.2s, border-color 0.1s;

    &:hover {
        color: var.$blue-light;
        border-color: transparent;
    }
}

.info {
    &__inner {
        width: 75%;
    }

    &__title {
        margin-bottom: 25px;
    }

    &__text {
        line-height: 187%;
        margin-bottom: 20px;

        &_border {
            font-weight: 500;
            font-size: 18px;
            line-height: 167%;
            border-left: 8px solid var.$blue;
            padding-left: 30px;
            margin: 0;
            margin-top: 30px;
        }
    }

    &-list {
        margin-bottom: 20px;

        &>li {
            position: relative;
            padding-left: 20px;

            &:not(:last-child) {
                margin-bottom: 25px;
            }

            &::before {
                content: "";
                position: absolute;
                top: 50%;
                left: 0;
                border-radius: 100%;
                transform: translateY(-50%);
                background-color: var.$blue;
                display: block;
                width: 5px;
                height: 5px;
            }
        }
    }
}

@include mixin.desktop {
    .info {
        &__inner {
            width: 100%;
        }

        &__text {
            font-size: 14px;

            &_border {
                font-size: 16px;
            }
        }
    }
}

@include mixin.laptop {
    section {
        padding: 50px 0 25px;
    }

    .info {
        &__text {
            margin-bottom: 15px;

            &_border {
                font-size: 14px;
                margin-top: 25px;
            }
        }
    }
}

@include mixin.tablet {
    .info {
        &__text {
            margin-bottom: 15px;

            &_border {
                font-size: 14px;
                margin-top: 15px;
            }
        }

        &-list {
            margin-bottom: 15px;
        }
    }
}
</style>
