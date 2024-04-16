<template>
    <section>
        <div class="container">
            <FormBlock :inputs=inputs />
        </div>
    </section>
</template>

<script>
import FormBlock from "../../blocks/FormBlock.vue";

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
    },
};
</script>

<style lang="scss" scoped>
section {
    padding: 70px 0 150px;
}
</style>
