<script>
import FormBlock from '@/blocks/FormBlock.vue';
import ModalThank from '@/layouts/ModalThank.vue';

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
                    ]
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
    <section>
        <div class="custom-container">
            <FormBlock :inputs=inputs @submitted="showThankModal">
                <template v-slot:info>
                    <div class="form-block-info">
                        <h2 class="form-block-info__title">
                            Остались вопросы?<br />
                            Напишите нам, и мы свяжемся с вами. 
                        </h2>
                        <p class="form-block-info__text text-body">
                            Наши специалисты получают все заявки на обратную связь и
                            отвечают на них максимально быстро. <br /><br />
                            Просто введите свои контактные данные и ФИО, кратко опишите
                            проблему и ждите, когда сотрудник ПКО «Форвард» свяжется с вами,
                            чтобы проконсультировать по вашей финансовой ситуации. С этого
                            начнется ваш путь к чистой кредитной истории
                        </p>
                        <span class="form-block-info__text form-block-info__text_meta">
                            * поле для обязательного заполнения
                        </span>
                    </div>
                </template>
            </FormBlock>
        </div>
    </section>
    <ModalThank v-model="thankModalVisible" />
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

section {
    padding: 70px 0 150px;
    background-color: #fafbfd;
}

.form-block-info {
    flex: 1;

    &__title {
        margin-bottom: 25px;
        line-height: 133%;
    }

    &__text {
        margin-bottom: 50px;

        &_meta {
            font-size: 14px;
            line-height: 171%;
            color: rgba(255, 255, 255, 0.5);
        }
    }
}

@include mixin.laptop {
    .form {
        &-block {
            &>* {
                flex: none;
            }

            &-info {
                &__title {
                    font-size: 22px;
                }
            }
        }
    }
}

@include mixin.tablet {
    section {
        padding: 25px 0 80px;
    }

    .form {
        &-block {
            padding: 30px 25px;
            gap: 25px;

            &-info {
                &__title {
                    font-size: 18px;
                    margin-bottom: 15px;
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
