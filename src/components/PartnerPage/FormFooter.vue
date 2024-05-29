<template>
    <section>
        <div class="container">
            <FormBlock :inputs=inputs>
                <template v-slot:info>
                    <div class="form-block-info">
                        <h2 class="form-block-info__title">
                            Стать партнером
                        </h2>
                        <p class="form-block-info__text">
                            Если вас заинтересовало сотрудничество с ПКО «Форвард» – свяжитесь с нами любым удобным
                            способом, и мы предложим вам уникальный и взаимовыгодный вариант партнерства.
                        </p>
                        <span class="form-block-info__text form-block-info__text_meta">
                            * поле для обязательного заполнения
                        </span>
                    </div>
                </template>
            </FormBlock>
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
                    name: 'companyName',
                    type: 'text',
                    placeholder: 'Наименование компании*',
                    required: true
                },
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
                }
            ]
        };
    },
};
</script>

<style lang="scss" scoped>
section {
    padding: 35px 0 110px;
    background-color: $gray-white;
}

.form-block-info {
    flex: 1;

    &__title {
        margin-bottom: 5px;
    }

    &__text {
        line-height: 187%;
        margin-bottom: 25px;

        &_meta {
            font-size: 14px;
            line-height: 171%;
            color: rgba(255, 255, 255, 0.5);
        }
    }
}

@include laptop {
    .form {
        &-block {
            &>* {
                flex: none;
            }

            &-info {
                &__title {
                    font-size: 22px;
                }

                &__text {
                    font-size: 14px;
                }
            }
        }
    }
}

@include tablet {
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
