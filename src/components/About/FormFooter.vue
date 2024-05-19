<template>
    <section>
        <div class="container">
            <FormBlock :inputs=inputs>
                <template v-slot:info>
                    <div class="form-block-info">
                        <h2 class="form-block-info__title">
                            Остались вопросы?<br />
                            Напишите нам, и мы свяжемся с вами. 
                        </h2>
                        <p class="form-block-info__text">
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
                    type: 'text',
                    placeholder: 'Имя*'
                },
                {
                    type: 'tel',
                    placeholder: 'Номер телефона*'
                },
                {
                    type: 'email',
                    placeholder: 'E-mail*'
                },
                {
                    type: 'text',
                    placeholder: 'Тема обращения*'
                },
                {
                    tagName: 'textarea',
                    placeholder: 'Кратко опишите Ваш вопрос*'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped>
section {
    padding: 70px 0 150px;
}

.form-block-info {
    flex: 1;

    &__title {
        margin-bottom: 25px;
    }

    &__text {
        line-height: 175%;
        margin-bottom: 50px;

        &_meta {
            font-size: 14px;
            line-height: 171%;
            color: rgba(255, 255, 255, 0.5);
        }
    }
}
</style>
