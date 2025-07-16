<script>
import FormBlock from '../../blocks/FormBlock.vue';
import ModalThank from '../../layouts/ModalThank.vue';

export default {
    name: "FormFooter",
    components: {
        FormBlock,
        ModalThank,
    },
    data() {
        return {
            thankModalVisible: false,
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
                    type: 'select',
                    placeholder: 'Тема обращения*',
                    required: true,
                    value: "Прошу перезвонить",
                    options: [
                        "Прошу перезвонить",
                        "Другое",
                    ],
                },
                {
                    name: 'message',
                    type: 'textarea',
                    placeholder: 'Кратко опишите Ваш вопрос*',
                }
            ],
        };
    },
    methods: {
        showThankModal() {
            this.thankModalVisible = true
        }
    }
};
</script>

<template>
    <section id="join-crew-form" class="form">
        <div class="custom-container">
            <div class="form__inner">
                <div class="plates">
                    <div class="plates-item plates-item_top">
                        <div class="heading-3 mb-2">Кого мы ищем</div>
                        <p class="text-body">
                            От кандидатов нам также нужно умение и опыт работы с большими массивами информации, а также
                            владение основными офисными компьютерными программами – MS Word, MS Excel и 1С.
                        </p>
                    </div>
                    <div class="plates-item plates-item_bottom">
                        <h2 class="plates-item__title">Мы предлагаем кандидатам комфортные условия труда:</h2>
                        <ul class="text-body">
                            <li>Официальное трудоустройство с 1-го дня;</li>
                            <li>100% белая зарплата дважды в месяц, без задержек;</li>
                            <li>Все соц.гарантии по ТК РФ;</li>
                            <li>ДМС со стоматологией после 6 месяцев работы;</li>
                            <li>Корпоративные обеды;</li>
                            <li>Офис в Тихом центре Новосибирска – в 7 минутах от метро Площадь Ленина</li>
                        </ul>
                    </div>
                </div>

                <FormBlock :inputs=inputs @submitted="showThankModal">
                    <template v-slot:info>
                        <div class="form-block-info">
                            <div class="heading-3 mb-2">
                                Станьте частью команды
                            </div>
                            <p class="text-body">
                                Заполните данные, а наш HR-менеджер свяжется с вами в ближайшее время
                            </p>
                        </div>
                    </template>
                </FormBlock>
            </div>
        </div>
    </section>
    <ModalThank v-model="thankModalVisible" />
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

section {
    margin-top: -80px;
    padding: 150px 0 150px;
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
                color: var.$blue;
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

@include mixin.desktop {
    .plates {
        &-item {
            padding: 40px 30px;
        }
    }

    .form {
        &-block {
            gap: 25px;
            padding: 40px 30px;
        }
    }
}

@include mixin.laptop {
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

@include mixin.tablet {
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
            }
        }
    }
}
</style>
