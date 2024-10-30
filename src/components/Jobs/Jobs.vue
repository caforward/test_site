<template>
    <section class="vacancy">
        <div class="container">
            <h2 class="vacancy__title">Вакансии</h2>
            <div class="vacancy__items">

                <div class="vacancy-item" v-for="(item, index) in displayedItems" :key="index">

                    <h3 class="vacancy-item__title font-bold">{{ item.title }}</h3>

                    <div class="vacancy-item__inner">
                        <div class="vacancy-item-content">
                            <p class="vacancy-item-content__text">{{ item.description }} </p>
                            <div class="vacancy-item-content-meta">
                                <div class="vacancy-item-content-meta__item">
                                    <div class="vacancy-item-content-meta__img">
                                        <img src="/images/jobs/img3.png" alt="there was a img">
                                    </div>
                                    <p class="vacancy-item-content-meta__text">
                                        {{ item.schedule }}
                                    </p>
                                </div>
                                <div class="vacancy-item-content-meta__item">
                                    <div class="vacancy-item-content-meta__img">
                                        <img src="/images/jobs/img4.png" alt="there was a img">
                                    </div>
                                    <p class="vacancy-item-content-meta__text">
                                        {{ item.salary }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <a href="#join-crew-form" class="vacancy-item__button button button_blue">
                            <span>
                                Подробнее
                            </span>
                            <span class="vacancy-item__button_icon">
                                <img src="/images/jobs/img2.png" alt="there was a img">
                            </span>
                        </a>
                    </div>

                </div>

            </div>
            <button @click="showMore" class="vacancy-button button"><img src="/images/jobs/img5.png"
                    alt="there was a img">
                {{ btnText }}
            </button>
        </div>
    </section>
    <div class="container">
        <div class="vacancy-section__border"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import FormFooterVue from "../About/FormFooter.vue";

export default defineComponent({
    components: {
        FormFooterVue
    },
    data() {
        return {
            btnText: "Смотреть ещё вакансии",
            currentIndex: 0,
            items: [
                {
                    title: "Специалист в юридический отдел",
                    description: "Мы ищем человека, который будет формировать пакет документов для: вынесения судебного приказа, отправки в суд искового заявления, отправки в суд заявления о процессуальном правопреемстве, отправки в суд заявления об исправлении описки в исполнительном документе; Взаимодействовать с районными судами и судебными участками Мировых судей. Оказывать помощь в формировании Актов приема-передачи документов.",
                    schedule: "Полная занятость, полный день",
                    salary: "от 45 000 - 50 000 ₽",
                },
                {
                    title: "Операционист в отдел исполнительного производства.",
                    description: "Мы ищем человека, который будет взаимодействовать с ФССП: собирать и формировать пакет документов, отправлять заявления о возбуждении, а также ходатайства, запросы и ответы на них. Кроме того, вам нужно будет собирать необходимую информацию на сайтах ФССП, федеральных и мировых судов.",
                    schedule: "Полная занятость, полный день",
                    salary: "от 40 000 - 50 000 ₽",
                },
                {
                    title: "Специалист по документообороту",
                    description: "Мы ищем человека, который будет работать со входящей и исходящей корреспонденцией: сортировать, сканировать, регистрировать, а также сверять документы с реестром, работать с Почтой России, формировать акты передачи по проданным портфелям и вести отчет по документообороту.",
                    schedule: "Полная занятость, полный день",
                    salary: "от 40 000 - 50 000 ₽",
                },
                {
                    title: "Операционист в юридический отдел",
                    description: "Мы ищем человека, который будет взаимодействовать с ФССП: собирать и формировать пакет документов, отправлять заявления о возбуждении, а также ходатайства, запросы и ответы на них. Кроме того, вам нужно будет собирать необходимую информацию на сайтах ФССП, федеральных и мировых судов.",
                    schedule: "Полная занятость, полный день",
                    salary: "от 40 000 - 50 000 ₽",
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
section {
    padding: 75px 0 90px;
}

.vacancy {
    &__items {
        margin-bottom: 50px;
    }

    &__title {
        margin-bottom: 25px;
    }

    &-item {
        background-color: $gray-white;
        border-radius: 30px;
        padding: 30px 70px;

        &__inner {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 70px;
        }

        &:not(:last-child) {
            margin-bottom: 30px;
        }

        &__title {
            line-height: 167%;
            margin-bottom: 15px;
        }

        &-content {
            width: 100%;
            flex: 1;

            &__text {
                margin-bottom: 25px;
                line-height: 187%;
            }

            &-meta {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                gap: 70px;

                &__item {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    flex: 1;
                }

                &__img {
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                    flex: none;
                }

                &__text {
                    line-height: 187%;
                }
            }
        }

        &__button {
            width: 100%;
            max-width: 180px;

            &:hover {
                cursor: pointer;
            }

            &_icon {
                display: flex;
                align-items: center;
                margin-left: 10px;

                img {
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }

    &-button {
        margin: 0 auto;
        border: 1px solid #d9d9d9;
        color: $gray-dark;
        transition: color .2s, background-color .2s, border-color .2s;

        img {
            width: 20px;
            height: 20px;
            margin-right: 5px;
        }

        &:hover {
            border-color: $blue;
        }
    }

    &-section__border {
        border-bottom: 1px solid #d9d9d9;
    }
}

@include desktop {
    section {
        padding: 80px 0 80px;
    }

    .vacancy {
        &-item {
            padding: 20px 30px;

            &__inner {
                gap: 20px;
            }

            &__title {
                font-size: 18px;
                margin-bottom: 10px;
            }

            &-content {
                flex: none;

                &__text {
                    font-size: 14px;
                }

                &-meta {
                    &__text {
                        font-size: 14px;
                    }
                }
            }

        }
    }
}

@include tablet {
    section {
        padding: 60px 0 60px;
    }

    .vacancy {
        &__items {
            margin-bottom: 30px;
        }

        &-item {
            padding: 30px 25px;

            &__title {
                font-size: 14px;
                margin-bottom: 15px;
            }

            &-content {
                &__text {
                    line-height: 171%;
                    margin-bottom: 15px;
                }

                &-meta {
                    gap: 15px;

                    &__item {
                        flex: none;
                        line-height: 171%;
                    }

                    &__img {
                        width: 25px;
                        height: 25px;
                    }
                }
            }
        }
    }
}

@include mobile {
    section {
        padding: 50px 0 50px;
    }

    .vacancy {
        &__items {
            margin-bottom: 10px;
        }

        &-item {
            &__button {
                max-width: 320px;
            }
        }

        &-button {
            width: 100%;
        }
    }
}
</style>