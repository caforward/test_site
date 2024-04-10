<template>
    <section class="faq">
        <div class="container">
            <div class="faq__wrapper">
                <div class="faq__head">
                    <h2 class="faq__title">Вопросы и ответы</h2>
                    <p class="faq__text">
                        Для клиентов и их близких наши специалисты подготовили
                        список ответов на самые популярные вопросы, которые
                        задают сотрудникам нашего контакт-центра.
                    </p>
                </div>
                <div class="faq__body">
                    <Accordion :accordionData="this.accordionData" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Accordion from "../../blocks/Accordion.vue";

export default {
    name: "Faq",
    components: {
        Accordion,
    },
    data() {
        return {
            accordionData: [
                {
                    title: "Кто такие коллекторы?",
                    content:
                        "Это сотрудники аккредитованных организаций, \
                        которые занимаются решением вопросов о просроченной \
                        задолженности. С 2016 года существует Федеральный закон N 230-ФЗ, \
                        который регулирует деятельность коллекторских агентств.",
                },
                {
                    title: "Какие права есть у коллекторов?",
                    content:
                        "В упомянутом выше Федеральном законе прописаны правила общения с \
                        должником. Коллекторы действительно могут звонить им по телефону, \
                        более того, это не единственный канал коммуникации с клиентами агентств. \
                        Помимо звонков это могут быть сообщения в мессенджерах, письма на электронную \
                        почту и личные визиты. Каким бы способом коммуникации с должником ни \
                        воспользовался коллектор, он обязан представиться полным ФИО и сказать, \
                        в каком агентстве он работает. \ <br><br>\
                        Помните, что коллектор НЕ МОЖЕТ применять никакого психологического или \
                        физического насилия, передавать персональные данные должника третьим лицам, \
                        сообщать некорректные сведения о задолженности.",
                },
                {
                    title: "Почему звонят коллекторы?",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat \
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui \
                        officia deserunt mollit anim id est laborum.",
                },
                {
                    title: "Я брал кредит в другом банке (компании), почему мне звонят из Компании «Форвард»?",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat \
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui \
                        officia deserunt mollit anim id est laborum.",
                },
                {
                    title: "Почему меня своевременно не известили о возникновении долга?",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat \
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui \
                        officia deserunt mollit anim id est laborum.",
                },
                {
                    title: "В кредитном договоре с банком нет пункта о передаче/уступке/продажи долга \
                            третьей стороне. Правомерна ли продажа моего долга в коллекторское агентство и последующее \
                            его истребование без моего согласия?Допустима ли вообще его продажа банком в коллекторское \
                            агентство (небанковскую организацию)?",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat \
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui \
                        officia deserunt mollit anim id est laborum.",
                },
                {
                    title: "Что делать, если коллекторы звонят по чужому долгу?",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat \
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui \
                        officia deserunt mollit anim id est laborum.",
                },
                {
                    title: "Звонят поручителю или супругу?",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat \
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui \
                        officia deserunt mollit anim id est laborum.",
                },
                {
                    title: "Что делать, если звонят слишком часто?",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat \
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui \
                        officia deserunt mollit anim id est laborum.",
                },
                {
                    title: "Когда и сколько могут звонить коллекторы?",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat \
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui \
                        officia deserunt mollit anim id est laborum.",
                },
                {
                    title: "Как себя вести с коллекторами, как с ними разговаривать?",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat \
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui \
                        officia deserunt mollit anim id est laborum.",
                },
                {
                    title: "Куда обращаться, если коллекторы не перестают звонить каждый день?",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat \
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui \
                        officia deserunt mollit anim id est laborum.",
                },
                {
                    title: "Что не надо делать, если звонит коллектор?",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat \
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui \
                        officia deserunt mollit anim id est laborum.",
                },
                {
                    title: "Как узнать сумму обязательства?",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat \
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui \
                        officia deserunt mollit anim id est laborum.",
                },
                {
                    title: "Как погасить обязательство?",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat \
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui \
                        officia deserunt mollit anim id est laborum.",
                },
                {
                    title: "Вы хотите помочь близкому человеку погасить обязательство?",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat \
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui \
                        officia deserunt mollit anim id est laborum.",
                },
                {
                    title: "Я хочу погасить сумму основного долга, а мои платежи зачитываются в счет погашения процентов. На каком основании?",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat \
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui \
                        officia deserunt mollit anim id est laborum.",
                },
                {
                    title: "Законно ли увеличение задолженности коллекторскими компаниями?",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat \
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui \
                        officia deserunt mollit anim id est laborum.",
                },
                {
                    title: "Умер должник, что делать, кто должен погасить его долг?",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat \
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui \
                        officia deserunt mollit anim id est laborum.",
                },
                {
                    title: "После развода кто должен выплачивать кредит, взятый в браке?",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat \
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui \
                        officia deserunt mollit anim id est laborum.",
                },
            ],
        };
    },
    mounted() {
        const accordions = document.querySelector(".accordions").children;
        accordions[0].classList.add("accordion_opened");
        accordions[1].classList.add("accordion_opened");
    },
};
</script>

<style lang="scss" scoped>
section {
    padding: 80px 0 70px;
}

.faq {
    &__wrapper {
        display: flex;
        grid-gap: 30px;
    }
    &__head {
        width: 420px;
        flex-shrink: 0;
    }
    &__body {
        width: 100%;
    }
    &__title {
        margin-bottom: 25px;
    }
    &__text {
        line-height: 187%;
    }
}
</style>
