<template>
    <section class="section">
        <div class="container">
            <h2>Как получить рассрочку?</h2>
            <p>Первое, что от вас требуется – проявить заинтересованность в сотрудничестве и
                готовность к совместному решению проблемы. Для этого вам нужно как можно скорее связаться с
                компанией «Форвард» и донести до наших специалистов информацию о том, что
                вы согласны и готовы работать над вашим финансовым положением вместе.
                <br><br>
                Затем вам нужно выяснить, какие варианты уменьшения долга
                вам доступны. Помимо рассрочки это могут быть:
            </p>
            <div class="flex-container">
                <div class="content-wrap" v-for="content in contentArr" :key="content.id">
                    <img :src="content.src" alt="img">
                    <p class="p-bold">{{ content.pBold }}</p>
                    <p>{{ content.p }}</p>
                </div>
                <div class="content-wrap last-content">
                    <h2>Нужна консультация</h2>
                    <p>Наши специалисты получают все заявки на обратную связь
                        и отвечают на них максимально быстро.</p>
                    <div class="btn">
                        <bottom class="button">Получить консультацию</bottom>
                    </div>

                </div>
            </div>
            <div class="under-content-wrap">
                <p class="under-content">Узнав, какой способ уменьшения задолженности вам доступен,
                    вам нужно достигнуть согласия с компанией «Форвард». В его
                    рамках мы подпишем с вами письменное соглашение,
                    где будут прописаны все детали и условия. Этот документ
                    поможет нам регламентировать процесс выплат в рассрочку так,
                    чтобы деньги возвращались по удобному обеим сторонам графику.
                    Соглашение устанавливает, что должник не отказывается от
                    обязательств и готов работать с агентством, которое,
                    в свою очередь, идет на уступки и дает возможность
                    оплатить задолженность на новых условиях.</p>
                <h2 class="agree-content">
                    В соглашении обязательно указываются:
                </h2>
                <ul class="agree-lists">
                    <li>персональные сведения кредитора и должника;</li>
                    <li>номер и название документа, по которому финансовые средства были переданы;</li>
                    <li>новые условия выплат – график и размер платежей и т.д.</li>
                </ul>
                <p class="agree-paragraph">
                    Компания «Форвард» крайне не рекомендует пытаться скрываться от коллекторов
                    и отказываться платить – если банк не пошел вам навстречу и уступил долг
                    коллекторам, это не значит, что положение безвыходное. Добросовестные
                    коллекторские агентства, к которым переходит ваша задолженность, заинтересованы
                    в том, чтобы вы освободились от обязательств, а значит, готовы к сотрудничеству
                    и помощи. Более того, специалисты агентства зачастую готовы предложить более лояльные
                    условия погашения займа, чем банки. Мы уверены, что профессиональная помощь
                    коллекторского агентства может стать действительно выгодным вариантом для должника
                    – специалист по финансам поможет вам восстановить график платежей, избежать
                    судебных тяжб и, в конце-концов, погасить задолженность полностью и выправить
                    свою кредитную историю. Главное – пойти на открытый диалог с компанией.
                </p>
            </div>
        </div>
    </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
    components: {

    },
    data() {
        return {
            contentArr: [
                {
                    id: 1, pBold: "Снижение процентной ставки",
                    p: "погашение долга облегчается за счет уменьшения процентной ставки или комиссии. ",
                    src: '/assets/images/blocks/installment/HowToGet/1.png'
                },
                {
                    id: 2, pBold: "Гибкость в сроках",
                    p: "коллекторское агентство пересмотрит сроки платежей, адаптировав их к вашим финансовым возможностям. С учетом вашей платежеспособности наши специалисты составят новый график платежей, который позволит вам погашать задолженность небольшими частями.",
                    src: '/assets/images/blocks/installment/HowToGet/2.png'
                },
                {
                    id: 3, pBold: "Отсрочка платежа",
                    p: "если у вас временные финансовые проблемы, коллекторское агентство может предоставить вам отсрочку и просто перенести дату очередного платежа. ",
                    src: '/assets/images/blocks/installment/HowToGet/3.png'
                },
                {
                    id: 4, pBold: "Прекращение действий по взысканию ",
                    p: "если вы показываете активную готовность решить вопрос, коллекторы могут приостановить или полностью прекратить действия по взысканию, чтобы вы получили дополнительное время на решение ваших проблем.",
                    src: '/assets/images/blocks/installment/HowToGet/4.png'
                },
                {
                    id: 5, pBold: "Реструктуризация",
                    p: "если характер финансовых проблем продолжительный, то сумма платежа может быть уменьшена, но сроки увеличены.",
                    src: '/assets/images/blocks/installment/HowToGet/5.png'
                },
            ]
        };
    },
    computed: {
    },
    methods: {

    },
});
</script>

<style lang="scss" scoped>
.section {
    margin-bottom: 73px;
}

h2 {
    margin-bottom: 24px;
}

.content-wrap {
    border-radius: 30px;
    background: #f3f7fa;
    flex: 1 1 27%;
    padding: 40px 34px 50px 37px;
    min-width: 286px;
    min-height: 422px;
}

h2 {
    font-weight: 600;
    font-size: 28px;
    line-height: 121%;
    color: #2e2e2e;
}

p {
    font-weight: 400;
    font-size: 14px;
    line-height: 171%;
    color: #2e2e2e;
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

    h2 {
        margin-bottom: 20px;
    }

    .last-content {
        padding: 120px 52px 90px 30px;
    }

    .p-bold {
        font-weight: 600;
        font-size: 16px;
        line-height: 187%;
        color: #2e2e2e;
    }

    p {
        font-weight: 400;
        font-size: 14px;
        line-height: 171%;
    }

    .button {
        border-radius: 30px;
        padding: 10px 30px;
        width: 266px;
        height: 50px;
        background: #fff;
        font-weight: 500;
        font-size: 16px;
        line-height: 187%;
        margin-top: 22px;
    }

    .button:hover {
        cursor: pointer;
        background-color: #0096d8;
        color: #fff;
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
        font-weight: 400;
        font-size: 16px;
        line-height: 187%;
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

    h2 {
        margin-bottom: 24px;
        font-weight: 600;
        font-size: 28px;
        line-height: 121%;
        color: #2e2e2e;
    }

    p {
        font-weight: 400;
        font-size: 16px;
        line-height: 187%;
        color: #2e2e2e;
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

        h2 {
            margin-bottom: 20px;
            font-weight: 600;
            font-size: 24px;
            line-height: 125%;
            color: #2e2e2e;
        }

        .last-content {
            padding: 120px 52px 90px 26px;
        }

        .p-bold {
            font-weight: 600;
            font-size: 15px;
            line-height: 200%;
            color: #2e2e2e;
        }

        p {
            font-weight: 400;
            font-size: 14px;
            line-height: 171%;
        }

        .button {
            border-radius: 30px;
            padding: 10px 1px;
            width: 242px;
            height: 50px;
            background: #fff;
            font-weight: 500;
            font-size: 14px;
            line-height: 187%;
            margin-top: 24px;
        }

        .button:hover {
            cursor: pointer;
            background-color: #0096d8;
            color: #fff;
        }
    }

    .under-content-wrap {
        max-width: 920px;
        padding-left: 0px;
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
            font-weight: 400;
            font-size: 14px;
            line-height: 214%;
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

    h2 {
        font-weight: 600;
        font-size: 22px;
        line-height: 155%;
        margin-bottom: 14px;
    }

    p {
        font-weight: 400;
        font-size: 14px;
        line-height: 171%;
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

        h2 {
            margin-bottom: 25px;
            font-weight: 600;
            font-size: 22px;
            line-height: 136%;
            color: #2e2e2e;
        }

        .last-content {
            padding: 60px 39px 119px 26px;
        }

        .p-bold {
            font-weight: 600;
            font-size: 16px;
            line-height: 150%;
            color: #2e2e2e;
        }

        p {
            font-weight: 400;
            font-size: 14px;
            line-height: 171%;
        }

        .button {
            border-radius: 30px;
            padding: 10px 1px;
            width: 215px;
            height: 50px;
            background: #fff;
            font-weight: 500;
            font-size: 14px;
            line-height: 187%;
            margin-top: 41px;
        }

        .button:hover {
            cursor: pointer;
            background-color: #0096d8;
            color: #fff;
        }
    }

    .under-content-wrap {
        max-width: 920px;
        padding-left: 0px;
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
            font-weight: 400;
            font-size: 14px;
            line-height: 214%;
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

    h2 {
        font-weight: 600;
font-size: 18px;
line-height: 189%;
        margin-bottom: 10px;
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

        h2 {
            margin-bottom: 25px;
            font-weight: 600;
font-size: 18px;
line-height: 167%;
            color: #2e2e2e;
        }

        .last-content {
            padding: 30px 39px 31px 30px;
        }

        .p-bold {
            font-weight: 600;
font-size: 14px;
line-height: 171%;
            color: #2e2e2e;
        }

        p {
            font-weight: 400;
            font-size: 14px;
            line-height: 171%;
        }

        .button {
            border-radius: 30px;
            padding: 10px 1px;
            width: 215px;
            height: 50px;
            background: #fff;
            font-weight: 500;
            font-size: 15px;
            line-height: 187%;
            margin-top: 41px;
        }

        .button:hover {
            cursor: pointer;
            background-color: #0096d8;
            color: #fff;
        }
    }

    .under-content-wrap {
        max-width: 920px;
        padding-left: 0px;
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
            font-weight: 400;
font-size: 14px;
line-height: 171%;
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
</style>