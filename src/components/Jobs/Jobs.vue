<template>
    <section class="previewSection">
        <div class="previewContent container">
            <div class="textContent">
                <h1>Будь в команде мечты <br> Развивайся и покоряй высоты</h1>
                <p>Если Вы хотите работать в современной и перспективной финансовой компании, то для Вас в ООО ПКО
                    “Форвард” открыты следующие вакансии:
                </p>
                <button class="checkJobsBtn"> <a href="">Смотреть вакансии</a></button>
            </div>
            <div><img src="/images/jobs/img1.png" alt="there was a img"></div>
        </div>
    </section>
    <section class="jobsSection">
        <div class="container">
            <h2>Вакансии</h2>
            <div class="wrapJobs" v-for="(item, index) in displayedItems" :key="index">
                <div class="jobsContent">
                    <h3>{{ item.title }}</h3>
                    <div class="descriptionContent">
                        <p>{{ item.description }} </p>
                        <button class="jobsBtn"><a href="">Подробнее</a> <img src="/images/jobs/img2.png"
                                alt="there was a img"></button>
                    </div>
                    <div class="iconContainer">
                        <p><img src="/images/jobs/img3.png" alt="there was a img">{{ item.schedule }} </p>
                        <p><img src="/images/jobs/img4.png" alt="there was a img"> {{ item.salary }} </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <button @click="showMore" class="moreBtn"><img src="/images/jobs/img5.png" alt="there was a img"> {{ btnText
        }}</button>
    <div class="container"><img class=" lineImg" src="/images/jobs/img6.png" alt="img"></div>

    <section class="cards-section">
        <div class="container">
            <div class="flexContainer">
                <div class="card-wrap">
                    <div class="card-top">
                        <h2>Кого мы ищем</h2>
                        <p>От кандидатов нам также нужно умение и опыт работы с большими массивами информации, а также
                            владение основными офисными компьютерными программами – MS Word, MS Excel и 1С.</p>
                    </div>
                    <div class="card-bottom">
                        <h2>Мы предлагаем кандидатам комфортные условия труда:</h2>
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
                <FormBlock :inputs="inputs">
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

<script lang="ts">
import { defineComponent } from "vue"
import FormBlock from "../../blocks/FormBlock.vue";
import FormFooterVue from "../About/FormFooter.vue";

export default defineComponent({
    components: {
        FormBlock,
        FormFooterVue
    },
    data() {
        return {
            btnText: "Смотреть ещё вакансии",
            currentIndex: 0,
            items: [
                {
                    title: "Операционист в отдел исполнительного производства.",
                    description: "Мы ищем человека, который будет взаимодействовать с ФССП: собирать и формировать пакет документов, отправлять заявления о возбуждении, а также ходатайства, запросы и ответы на них. Кроме того, вам нужно будет собирать необходимую информацию на сайтах ФССП, федеральных и мировых судов.",
                    schedule: "Полная занятость, полный день",
                    salary: "от 50 000 - 60 000 ₽",
                },
                {
                    title: "Специалист 2 линии поддержки",
                    description: "Мы ищем человека, который будет заниматься поддержкой наших клиентов: проводить диагностику их проблем, искать и предоставлять решения, оказывать индивидуальное сопровождение. Кроме того, от вас потребуется настраивать техническую стратегию, консультировать операторов по возврату средств и урегулированию задолженности, а также участвовать в подготовке отчетности о работе отдела.",
                    schedule: "Полная занятость, полный день",
                    salary: "от 50 000 - 60 000 ₽",
                },
                {
                    title: "Бухгалтер-экономист",
                    description: "Мы ищем человека, который будет вести расходы компании и анализировать их, работать с первичной документации, контролировать и сопровождать платежи, разносить затраты по статьям и категориям учета, готовить бюджет и финансовую отчетность",
                    schedule: "Полная занятость, полный день",
                    salary: "от 50 000 - 60 000 ₽",
                },
                {
                    title: "Специалист по документообороту",
                    description: "Мы ищем человека, который будет работать со входящей и исходящей корреспонденцией: сортировать, сканировать, регистрировать, а также сверять документы с реестром, работать с Почтой России, формировать акты передачи по проданным портфелям и вести отчет по документообороту.",
                    schedule: "Полная занятость, полный день",
                    salary: "от 50 000 - 60 000 ₽",
                },
                {
                    title: "Специалист 2 линии поддержки",
                    description: "Мы ищем человека, который будет заниматься поддержкой наших клиентов: проводить диагностику их проблем, искать и предоставлять решения, оказывать индивидуальное сопровождение. Кроме того, от вас потребуется настраивать техническую стратегию, консультировать операторов по возврату средств и урегулированию задолженности, а также участвовать в подготовке отчетности о работе отдела.",
                    schedule: "Полная занятость, полный день",
                    salary: "от 50 000 - 60 000 ₽",
                },
                {
                    title: "Специалист 2 линии поддержки",
                    description: "Мы ищем человека, который будет заниматься поддержкой наших клиентов: проводить диагностику их проблем, искать и предоставлять решения, оказывать индивидуальное сопровождение. Кроме того, от вас потребуется настраивать техническую стратегию, консультировать операторов по возврату средств и урегулированию задолженности, а также участвовать в подготовке отчетности о работе отдела.",
                    schedule: "Полная занятость, полный день",
                    salary: "от 50 000 - 60 000 ₽",
                },
                {
                    title: "Бухгалтер-экономист",
                    description: "Мы ищем человека, который будет вести расходы компании и анализировать их, работать с первичной документации, контролировать и сопровождать платежи, разносить затраты по статьям и категориям учета, готовить бюджет и финансовую отчетность",
                    schedule: "Полная занятость, полный день",
                    salary: "от 50 000 - 60 000 ₽",
                },
                {
                    title: "Операционист в юридический отдел",
                    description: "Мы ищем человека, который будет взаимодействовать с ФССП: собирать и формировать пакет документов, отправлять заявления о возбуждении, а также ходатайства, запросы и ответы на них. Кроме того, вам нужно будет собирать необходимую информацию на сайтах ФССП, федеральных и мировых судов.",
                    schedule: "Полная занятость, полный день",
                    salary: "от 50 000 - 60 000 ₽",
                },
            ],
            inputs: [
                {
                    type: 'text',
                    placeholder: 'Как вас зовут?'
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
                    tagName: 'textarea',
                    placeholder: 'Напишите сопроводительное письмо'
                },
            ],
        };
    },
    computed: {
        displayedItems() {
            return this.items.slice(0, this.currentIndex + 5);
        }
    },
    methods: {
        showMore() {
            const nextIndex = this.currentIndex + 5;
            if (nextIndex >= this.items.length) {
                this.btnText = "Вакансии закончились";
            }
            this.currentIndex = nextIndex;
        }
    }

});
</script>

<style lang="scss" scoped>
.previewSection {
    background: rgb(243, 247, 250);
    margin-bottom: 74px;

    .previewContent {
        display: flex;
    }

    .textContent {
        padding-top: 117px;
        padding-right: 17px;

        h1 {
            margin-bottom: 21px;
            font-size: 36px;
            font-weight: 600;
            line-height: 40px;
            letter-spacing: 0%;
        }

        p {
            max-width: 652px;
            width: 100%;
            margin-bottom: 31px;
            font-size: 18px;
            font-weight: 400;
            line-height: 30px;
            letter-spacing: 0%;
        }
    }

    .checkJobsBtn {
        margin-bottom: 171px;
        border-radius: 30px;
        background: rgb(0, 150, 216);
        padding: 10px 30px 10px 30px;
        width: 225px;
        height: 50px;
    }

}


.jobsSection {
    h2 {
        color: rgb(46, 46, 46);
        padding-bottom: 25px;
        font-size: 24px;
        font-weight: 600;
        line-height: 34px;
        letter-spacing: 0%;

    }

    .jobsContent {
        padding: 32px 86px 35px 80px;

        img {
            width: 24px;
            height: 24px;

            h3 {
                font-size: 18px;
                font-weight: 600;
                line-height: 30px;
                letter-spacing: 0%;
                margin-bottom: 13px;
            }

        }

        .jobsBtn {
            border-radius: 30px;
            background: rgb(0, 150, 216);
            width: 181px;
            height: 50px;
            padding: 10px 30px 10px 30px;

        }

        .descriptionContent {
            display: flex;
            align-items: flex-start;
            gap: 77px;

            p {
                font-size: 16px;
                font-weight: 400;
                line-height: 30px;
                margin-bottom: 23px;
                width: 914px;
            }

            a {
                margin-right: 7px;
            }
        }
    }

    .iconContainer {
        display: flex;
        justify-content: flex-start;

        p {
            display: flex;
            align-items: center;
            margin-right: 70px;
        }

        img {
            margin-right: 5px;
        }
    }

    .wrapJobs {
        display: flex;
        border-radius: 30px;
        background: rgb(249, 250, 252);
        margin-bottom: 30px;

    }

}

.moreBtn {


    img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
    }

    margin: 0 auto;
    box-sizing: border-box;
    border: 1px solid rgb(217, 217, 217);
    border-radius: 30px;
    padding: 10px 30px 10px 30px;
    font-size: 16px;
    font-weight: 500;
    line-height: 30px;
    letter-spacing: 0%;
    color: rgb(152, 152, 152);
    margin-bottom: 90px;

}


a {
    color: rgb(255, 255, 255);
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 500;
    line-height: 30px;
    letter-spacing: 0%;
}

.lineImg {
    max-width: 1338px;
    width: 100%;
    padding: 0 15px;
    margin: 0 auto;
    margin-bottom: 80px;
}

.flexContainer {

    h2 {
        font-size: 28px;
        font-weight: 600;
        line-height: 34px;
    }

    gap: 32px;
    display: flex;

    .card-wrap {
        flex: none;
        width: 652px;
    }

    .card-top {
        h2 {
            margin-bottom: 9px;
        }

        p {
            font-size: 16px;
            font-weight: 400;
            line-height: 30px;
            color: rgb(46, 46, 46);
        }

        border-radius: 30px;
        background: rgb(249, 239, 230);
        padding: 52px 84px 52px 82px;
        margin-bottom: 30px;
    }

    .card-bottom {
        h2 {
            margin-bottom: 24px;
        }

        &>ul {
            list-style-type: disc;
            padding-left: 20px;

            ::marker {
                color: rgb(0, 150, 216);
            }

            li {
                font-size: 16px;
                font-weight: 400;
                line-height: 30px;
                color: rgb(46, 46, 46);
                margin-bottom: 12.5px;
            }
        }

        border-radius: 30px;
        background: rgb(231, 249, 248);
        padding: 42px 84px 42px 82px;
    }
}

.cards-section {
    margin-bottom: 40px;
}

.form-block {
    flex-direction: column;
    padding: 85px 82px 85px 82px;


}

.form-block__bottom {
    flex-direction: column;
}

.__form {
    width: 100%;
}
</style>