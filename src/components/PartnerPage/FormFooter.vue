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
    methods: {
        showThankModal() {
            this.thankModalVisible = true
        }
    }
};
</script>

<template>
    <section id="join-team-form">
        <div class="custom-container">
            <FormBlock :inputs=inputs @submitted="showThankModal">
                <template v-slot:info>
                    <div class="form-block-info">
                        <div class="heading-3 mb-4">
                            Стать партнером
                        </div>
                        <p class="text-body mb-4">
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
    <ModalThank v-model="thankModalVisible" />
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

section {
    margin-top: -150px;
    padding: 185px 0 110px;
    background-color: var.$gray-white;
}

.form-block-info {
    flex: 1;

    &__title {
        margin-bottom: 5px;
    }

    &__text {
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
    .form {
        &-block {
            padding: 30px 25px;
            gap: 25px;

            &-info {
                &__title {
                    font-size: 18px;
                    margin-bottom: 15px;
                }
            }
        }
    }
}
</style>
