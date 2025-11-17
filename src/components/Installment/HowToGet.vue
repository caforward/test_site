<script setup>
import { ref } from "vue";
import ModalForm from "@/layouts/ModalForm.vue";
import BaseButton from "@/blocks/ui/BaseButton.vue";

const modalVisible = ref(false)

const contentArr = ref([
    {
        id: 1, pBold: "Снижение процентной ставки",
        p: "погашение задолженности облегчается за счет уменьшения процентной ставки или комиссии. ",
        src: '/images/blocks/installment/HowToGet/1.png'
    },
    {
        id: 2, pBold: "Гибкость в сроках",
        p: "коллекторское агентство пересмотрит сроки платежей, адаптировав их к Вашим финансовым возможностям. С учетом Вашей платежеспособности наши специалисты составят новый график платежей, который позволит Вам погашать задолженность небольшими частями.",
        src: '/images/blocks/installment/HowToGet/2.png'
    },
    {
        id: 3, pBold: "Отсрочка платежа",
        p: "если у Вас временные финансовые проблемы, коллекторское агентство может предоставить Вам отсрочку и просто перенести дату очередного платежа. ",
        src: '/images/blocks/installment/HowToGet/3.png'
    },
    {
        id: 4, pBold: "Прекращение действий по взысканию ",
        p: "если Вы показываете активную готовность решить вопрос, коллекторы могут приостановить или полностью прекратить действия по взысканию, чтобы Вы получили дополнительное время на решение Ваших проблем.",
        src: '/images/blocks/installment/HowToGet/4.png'
    },
    {
        id: 5, pBold: "Реструктуризация",
        p: "если характер финансовых проблем продолжительный, то сумма платежа может быть уменьшена, но сроки увеличены.",
        src: '/images/blocks/installment/HowToGet/5.png'
    },
])
</script>

<template>
    <section class="section">
        <div class="custom-container">
            <div class="heading-2 mb-2">
                Как получить рассрочку?
            </div>
            <p class="text-body mb-6">
                Первое, что от Вас требуется – проявить заинтересованность
                в сотрудничестве и готовность к совместному решению проблемы.
                Для этого нужно как можно скорее связаться с компанией «Форвард»
                и сообщить о том, что Вы готовы работать над сложившейся ситуацией вместе с нами.
                <br><br>
                Затем нужно выяснить, какие варианты уменьшения долга
                Вам доступны. Помимо рассрочки это могут быть:
            </p>
            <div class="flex-container">
                <div class="content-wrap" v-for="content in contentArr" :key="content.id">
                    <img :src="content.src" alt="img">
                    <div class="heading-5 mb-2">{{ content.pBold }}</div>
                    <p class="text-body">{{ content.p }}</p>
                </div>
                <div class="content-wrap last-content">
                    <h4 class="font-bold text-lg mb-2">Нужна консультация</h4>
                    <p class="mb-4">
                        Наши специалисты получают все заявки на обратную связь
                        и отвечают на них максимально быстро.
                    </p>

                    <BaseButton large="large" class="px-4 text-base" @click.prevent="modalVisible = true">
                        Получить консультацию
                    </BaseButton>
                </div>
            </div>
            <div class="under-content-wrap">
                <p class="text-body mb-6">
                    Первое, что от Вас требуется – проявить заинтересованность в сотрудничестве и
                    готовность к совместному решению проблемы. Для этого нужно как можно
                    скорее связаться с компанией «Форвард» и сообщить о том, что Вы готовы
                    работать над сложившейся ситуацией вместе с нами.
                    <br><br>
                    В рамках соглашения мы подпишем с Вами оферту, где будут прописаны все детали и условия.
                    Этот документ поможет нам регламентировать процесс выплат в рассрочку так,
                    чтобы платежи вносились по удобному обеим сторонам графику. Соглашение устанавливает,
                    что заемщик не отказывается от обязательств и готов работать с агентством,
                    которое, в свою очередь, идет на уступки и дает возможность оплатить задолженность
                    на новых условиях.
                </p>
                <h2 class="heading-3 mb-4">
                    В соглашении обязательно указываются:
                </h2>
                <ul class="agree-lists text-body">
                    <li>персональные сведения кредитора и заемщика;</li>
                    <li>номер и название документа, по которому финансовые средства были переданы;</li>
                    <li>новые условия выплат – график и размер платежей и т.д.</li>
                </ul>
                <p class="text-body">
                    Компания «Форвард» крайне не рекомендует пытаться скрываться
                    от коллекторов и отказываться платить – если кредитная
                    организация не пошла Вам навстречу и уступила просроченную
                    задолженность коллекторам, это не значит, что положение безвыходное.
                    Мы заинтересованы в том, чтобы Вы освободились от обязательств,
                    а значит, готовы к сотрудничеству и помощи. Более того, специалисты
                    агентства зачастую готовы предложить более лояльные условия
                    погашения займа, чем банки. Мы уверены, что наша помощь может стать
                    действительно выгодным вариантом для Вас – специалист по финансам
                    поможет восстановить график платежей, избежать судебных тяжб
                    и, в конце-концов, погасить задолженность полностью. Главное – пойти
                    на открытый диалог с компанией.
                    <br> <br>
                    Чтобы узнать о возможности получения рассрочки, обратитесь к
                    нам по телефону <a href="tel:+78043334133"> +7 (804) 333‑41‑33.</a> Сотрудник компании «Форвард»
                    изучит Ваше дело и проконсультирует о возможностях по удобному
                    погашению задолженности. Останется только согласовать условия и
                    подписать оферту!

                </p>
            </div>
        </div>
    </section>
    <ModalForm v-model="modalVisible" />
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

.section {
    padding-bottom: 73px;
}

.content-wrap {
    border-radius: 30px;
    background: #f3f7fa;
    flex: 1 1 27%;
    padding: 40px 34px 50px 37px;
    min-width: 286px;
    min-height: 422px;

    &.last-content .button {
        margin-top: 20px;
        width: fit-content;
    }
}

a {
    color: #0096d8;
}

img {
    width: 60px;
    height: 60px;
    margin-bottom: 15px;
}

.flex-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 30px;
    margin-top: 23px;
    margin-bottom: 37px;

    .last-content {
        padding: 120px 30px 90px 30px;
    }

    .p-bold {
        font-weight: 600;
        font-size: 16px;
        line-height: 187%;
        color: #2e2e2e;
    }
}

.under-content-wrap {
    max-width: 1108px;
    padding-left: 20px;
}

.under-content {

    margin-bottom: 71px;
    font-weight: 400;
    font-size: 16px;
    line-height: 187%;
}

.agree-content {
    font-weight: 600;
    font-size: 28px;
    line-height: 107%;
    color: #2e2e2e;
    margin-bottom: 25px;
}

.agree-lists {
    margin-bottom: 30px;

    li {
        position: relative;
        padding-left: 16px;
        margin-bottom: 10px;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 6px;
            height: 6px;
            background-color: #0096d8;
            border-radius: 100%;
        }
    }
}

@media screen and (max-width: 1370px) and (min-width: 1025px) {

    .content-wrap {
        border-radius: 30px;
        background: #f3f7fa;
        flex: 1 1 26%;
        padding: 40px 35px 50px 36px;
        min-width: 286px;
        min-height: 422px;
    }

    img {
        width: 60px;
        height: 60px;
        margin-bottom: 15px;
    }

    .flex-container {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        gap: 29px;
        margin-top: 43px;
        margin-bottom: 50px;

        .last-content {
            padding: 120px 26px 90px 26px;
        }

        .p-bold {
            font-weight: 600;
            font-size: 15px;
            line-height: 200%;
            color: #2e2e2e;
        }
    }

    .under-content-wrap {
        max-width: 920px;
        padding-left: 0;
    }

    .under-content {

        margin-bottom: 73px;
        font-weight: 400;
        font-size: 14px;
        line-height: 171%;
        color: #2e2e2e;
    }

    .agree-content {
        font-weight: 600;
        font-size: 24px;
        line-height: 125%;
        color: #2e2e2e;
        margin-bottom: 25px;
    }

    .agree-lists {
        margin-bottom: 30px;

        li {
            position: relative;
            padding-left: 16px;
            margin-bottom: 10px;

            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 6px;
                height: 6px;
                background-color: #0096d8;
                border-radius: 100%;
            }
        }
    }


}

@media screen and (max-width: 1024px) and (min-width: 641px) {

    .content-wrap {
        border-radius: 30px;
        background: #f3f7fa;
        flex: 1 1 45%;
        padding: 30px 41px 36px 30px;
        min-width: 220px;
        min-height: 362px;
    }

    img {
        width: 60px;
        height: 60px;
        margin-bottom: 15px;
    }

    .flex-container {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        gap: 22px;
        margin-top: 25px;
        margin-bottom: 32px;

        .last-content {
            padding: 60px 26px 119px 26px;
        }

        .p-bold {
            font-weight: 600;
            font-size: 16px;
            line-height: 150%;
            color: #2e2e2e;
        }
    }

    .under-content-wrap {
        max-width: 920px;
        padding-left: 0;
    }

    .under-content {
        margin-bottom: 54px;
        font-weight: 400;
        font-size: 14px;
        line-height: 171%;
        color: #2e2e2e;
    }

    .agree-content {
        font-weight: 600;
        font-size: 22px;
        line-height: 136%;
        color: #2e2e2e;
        margin-bottom: 15px;
    }

    .agree-lists {
        margin-bottom: 20px;

        li {
            position: relative;
            padding-left: 16px;
            margin-bottom: 10px;
            color: #2e2e2e;

            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 6px;
                height: 6px;
                background-color: #0096d8;
                border-radius: 100%;
            }
        }

        .agree-paragraph {
            font-weight: 400;
            font-size: 14px;
            line-height: 171%;
        }
    }

}

@media screen and (max-width: 640.5px) {
    .content-wrap {
        border-radius: 30px;
        background: #f3f7fa;
        flex: 1 1 66%;
        padding: 30px 41px 13px 30px;
        min-width: 286px;
        min-height: 323px;
    }

    img {
        width: 60px;
        height: 60px;
        margin-bottom: 11px;
    }

    .flex-container {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        gap: 22px;
        margin-top: 28px;
        margin-bottom: 32px;

        .last-content {
            padding: 30px 30px 31px 30px;
        }

        .p-bold {
            font-weight: 600;
            font-size: 14px;
            line-height: 171%;
            color: #2e2e2e;
        }
    }

    .under-content-wrap {
        max-width: 920px;
        padding-left: 0;
    }

    .under-content {
        margin-bottom: 44px;
        font-weight: 400;
        font-size: 14px;
        line-height: 171%;
        color: #2e2e2e;
    }

    .agree-content {
        font-weight: 600;
        font-size: 18px;
        line-height: 133%;
        color: #2e2e2e;
        margin-bottom: 16px;
    }

    .agree-lists {
        margin-bottom: 24px;

        li {
            position: relative;
            padding-left: 16px;
            margin-bottom: 10px;

            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 6px;
                height: 6px;
                background-color: #0096d8;
                border-radius: 100%;
            }
        }

        .agree-paragraph {
            font-weight: 400;
            font-size: 14px;
            line-height: 171%;
        }
    }
}
</style>