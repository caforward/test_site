<template>
    <section class="form">
        <div class="container">
            <div class="form__inner">
                <div class="plates">
                    <div class="plates-item plates-item_top">
                        <h2 class="plates-item__title">Кого мы ищем</h2>
                        <p>
                            От кандидатов нам также нужно умение и опыт работы с большими массивами информации, а также
                            владение основными офисными компьютерными программами – MS Word, MS Excel и 1С.
                        </p>
                    </div>
                    <div class="plates-item plates-item_bottom">
                        <h2 class="plates-item__title">Мы предлагаем кандидатам комфортные условия труда:</h2>
                        <ul>
                            <li>Официальное трудоустройство с 1-го дня;</li>
                            <li>100% белая зарплата дважды в месяц, без задержек;</li>
                            <li>Все соц.гарантии по ТК РФ;</li>
                            <li>ДМС со стоматологией после 6 месяцев работы;</li>
                            <li>Корпоративные обеды;</li>
                            <li>Офис в Тихом центре Новосибирска – в 7 минутах от метро Площадь Ленина</li>
                        </ul>
                    </div>
                </div>

                <FormBlock :inputs=inputs>
                    <template v-slot:info>
                        <div class="form-block-info">
                            <h2 class="form-block-info__title">
                                Станьте частью команды
                            </h2>
                            <p class="form-block-info__text">
                                Заполните данные, а наш HR-менеджер свяжется с вами в ближайшее время
                            </p>
                        </div>
                    </template>
                </FormBlock>
            </div>
        </div>
    </section>
</template>

<script>
import FormBlock from '../../blocks/FormBlock.vue';

export default {
    name: "FormFooter",
    components: {
        FormBlock,
    },
    data() {
        return {
            inputs: [
                {
                    name: 'name',
                    type: 'text',
                    placeholder: 'ФИО*',
                    required: true
                },
                {
                    name: 'tel',
                    type: 'tel',
                    placeholder: 'Номер телефона*',
                    required: true
                },
                {
                    name: 'email',
                    type: 'email',
                    placeholder: 'E-mail*',
                },
                {
                    name: 'messageType',
                    type: 'v-select',
                    placeholder: 'Тема обращения*',
                    options: [
                        "Прошу перезвонить",
                        "Узнать номер договора",
                        "Разблокировать счет",
                        "Рассрочка",
                        "Другое",

                    ],
                    required: true
                },
                {
                    name: 'message',
                    type: 'textarea',
                    placeholder: 'Кратко опишите Ваш вопрос*',
                }
            ],
        };
    }
};
</script>

<style lang="scss" scoped>
section {
    padding: 70px 0 150px;
}

.plates {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    flex: 1;
    gap: 30px;

    &-item {
        padding: 50px 70px;
        border-radius: 30px;
        line-height: 187%;

        &_top {
            background-color: #f9efe6;

            & .plates-item__title {
                margin-bottom: 10px;
            }
        }

        &_bottom {
            background-color: #e7f9f8;

            & .plates-item__title {
                margin-bottom: 25px;
            }
        }

        &>ul {
            list-style-type: disc;
            padding-left: 20px;

            ::marker {
                color: $blue;
            }

            li {
                line-height: 30px;
                margin-bottom: 10px;
            }
        }
    }
}

.form {
    &__inner {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
    }

    &-block {
        width: 48%;
        gap: 30px;
        align-content: flex-start;
        padding: 60px 75px;

        &::before {
            right: 0;
            left: unset;
        }

        &-info {
            flex: none;

            &__title {
                margin-bottom: 5px;
                line-height: 133%;
            }

            &__text {
                line-height: 175%;

                &_meta {
                    font-size: 14px;
                    line-height: 171%;
                    color: rgba(255, 255, 255, 0.5);
                }
            }
        }

        &__bottom {
            &>* {
                flex: none;
            }
        }
    }
}

@include desktop {
    .plates {
        &-item {
            padding: 40px 30px;

            &>ul,
            &>p {
                font-size: 14px;

                &>li {
                    margin-bottom: 5px;
                }
            }
        }
    }

    .form {
        &-block {
            gap: 25px;
            padding: 40px 30px;

            &-info {
                &__text {
                    font-size: 14px;
                }
            }
        }
    }
}

@include laptop {
    .plates {
        flex: none;
        gap: 15px;

        &-item {
            line-height: 171%;
            padding: 30px;

            &_bottom {
                & .plates-item__title {
                    margin-bottom: 15px;
                }
            }
        }
    }

    .form {
        &__inner {
            gap: 20px;
        }

        &-block {
            width: 100%;

            &>* {
                flex: none;
            }

            &-info {

                &__text {
                    font-size: 14px;
                }
            }
        }
    }
}

@include tablet {
    section {
        padding: 25px 0 80px;
    }

    .plates {}

    .form {
        &-block {
            padding: 30px 25px;
            gap: 25px;

            &-info {
                &__title {
                    font-size: 18px;
                }

                &__text {
                    font-size: 14px;
                    margin-bottom: 15px;
                }
            }
        }
    }
}
</style>
