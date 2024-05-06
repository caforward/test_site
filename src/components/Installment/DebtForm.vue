<template>
    <section class="section">
        <div class="container">
            <h2 class="title">
                Оплатите задолженность онлайн!
            </h2>
            <div class="switcher">
                <div class="switcher__tabs">
                    <button class="switcher-tab switcher-tab_active">
                        Оплата по № договора
                    </button>
                    <button class="switcher-tab">
                        Оплата по ФИО
                    </button>
                </div>
                <div class="switcher__steps">
                    <button @click="chooseStep" class="switcher-step" :data-tab="tabs.contract.userData.name"
                        :class="{ 'switcher-step_active': tabs.contract.userData.isActive }">
                        <div class="switcher-step__number">1</div>
                        <span class="switcher-step__text">
                            Укажите ваши данные
                        </span>
                    </button>
                    <button @click="chooseStep" class="switcher-step" :data-tab="tabs.contract.payment.name"
                        :class="{ 'switcher-step_active': tabs.contract.payment.isActive }">
                        <div class="switcher-step__number">2</div>
                        <span class="switcher-step__text">
                            Укажите ваши данные
                        </span>
                    </button>
                    <button @click="chooseStep" class="switcher-step" :data-tab="tabs.contract.debt.name"
                        :class="{ 'switcher-step_active': tabs.contract.debt.isActive }">
                        <div class="switcher-step__number">3</div>
                        <span class="switcher-step__text">
                            Укажите ваши данные
                        </span>
                    </button>
                </div>
                <div class="switcher-body__wrapper">
                    <div class="block__left">
                        <div class="switcher-progressbar">
                            <span class="switcher-progressbar__thumb"></span>
                        </div>
                        <form action="" class="switcher-body form">
                            <transition name="switcher-body-item">
                                <div v-if="tabs.contract.userData.isActive" :id="tabs.contract.userData.name"
                                    class="switcher-body__tab switcher-body__tab_active">
                                    <div class="form__title">
                                        Введите свои данные в поля Фамилия, Имя, Отчество, Дата рождения.
                                    </div>
                                    <div class="form__inputs">
                                        <input type="text" class="input" placeholder="Фамилия">
                                        <input type="text" class="input" placeholder="Имя">
                                        <input type="text" class="input" placeholder="Отчество">
                                        <input type="text" class="input" placeholder="Дата рождения">
                                    </div>
                                    <div class="form-bottom">
                                        <div class="form-bottom__metatext">
                                            Нажимая кнопку «Оплатить долг», вы соглашаетесь с
                                            <a href="#" class="link">Договором оферты</a> и
                                            <a href="#" class="link">политикой конфиденциальности.</a>
                                        </div>
                                        <button class="button button_blue form-bottom__button" @click="nextStep">
                                            Оплатить долг
                                        </button>
                                    </div>
                                </div>
                            </transition>
                            <transition name="switcher-body-item">
                                <div v-if="tabs.contract.payment.isActive" :id="tabs.contract.payment.name"
                                    class="switcher-body__tab">
                                    <div class="form__title">
                                        Желаете совершить оплату по договору № <span>55505515550551</span>
                                    </div>
                                    <div class="form__inputs">
                                        <input type="tel" class="input" placeholder="+7 - ___ - ___ - __ - __">
                                        <input type="email" class="input" placeholder="E-mail">
                                        <input type="text" class="input" placeholder="Сумма">
                                    </div>
                                    <div class="form-bottom">
                                        <div class="form-bottom__metatext">
                                            Если у вас возникнут вопросы, пожалуйста, свяжитесь с нами по номеру
                                            телефона
                                            <a href="tel:+74997020156" class="link link_phone">
                                                +7 (499) 702-01-56
                                            </a>
                                        </div>
                                        <button class="button button_blue form-bottom__button" @click="nextStep">
                                            Далее
                                        </button>
                                    </div>
                                </div>
                            </transition>
                            <transition name="switcher-body-item">
                                <div v-if="tabs.contract.debt.isActive" :id="tabs.contract.debt.name"
                                    class="switcher-body__tab">
                                    <div class="form-data">
                                        <div class="form-data__payment">
                                            <div class="form-data__title">
                                                Сумма платежа
                                            </div>
                                            <div class="form-data__amount">
                                                10 000 ₽
                                            </div>
                                        </div>
                                        <div class="form-data__payment">
                                            <div class="form-data__title">
                                                Итого вместе с комисией
                                            </div>
                                            <div class="form-data__amount">
                                                10 000 ₽
                                            </div>
                                        </div>
                                    </div>
                                    <button class="button button_blue form-submit" @click="nextStep">
                                        Оплатить картой
                                    </button>
                                    <div class="form-bottom">
                                        <div class="form-bottom__metatext">
                                            Нажимая кнопку «Оплатить картой», вы соглашаетесь с
                                            <a href="#" class="link">Договором оферты</a> и
                                            <a href="#" class="link">политикой конфиденциальности.</a>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </form>
                    </div>
                    <div class="block__right">
                        <div class="card">
                            <div class="card__wrapper">
                                <div class="card__title">
                                    Рассчитать график платежей
                                </div>
                                <div class="card__text">
                                    Сделать это легко: просто выберите сумму вашего долга, настройте срок погашения – и
                                    вы увидите, каким будет ежемесячный платеж.
                                </div>
                                <button class="button">
                                    Раcсчитать график платежей
                                </button>
                            </div>
                            <div class="card__img">
                                <img src="/assets/images/offers/calc.png" alt="the was a img">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            tabs: {
                choosenTabs: 'contract',
                contract: {
                    activeTab: 'userData',
                    userData: {
                        id: 0,
                        name: 'userData',
                        isActive: true,
                        next: 'payment'
                    },
                    payment: {
                        id: 1,
                        name: 'payment',
                        isActive: false,
                        next: 'debt'
                    },
                    debt: {
                        id: 2,
                        name: 'debt',
                        isActive: false,
                    }
                }
            }
        }
    },
    methods: {
        nextStep(e) {
            e.preventDefault();

            // Выбранный тип формы (по номеру договора или по ФИО)
            const tabs = this.tabs[this.tabs.choosenTabs]

            // получаем обьект по id в текущем шаге
            const stepName = e.target.closest('.switcher-body__tab').id
            const curTab = tabs[stepName]

            // если следуещего шага нет, то отправляем форму
            if (!curTab.next) {
                // Отравка формы
                return
            }

            // Меняем видимость шагов
            this.switchTab(tabs, curTab, tabs[curTab.next])
        },
        chooseStep(e) {
            e.preventDefault();

            // Выбранный тип формы (по номеру договора или по ФИО)
            const tabs = this.tabs[this.tabs.choosenTabs]

            // получаем имя по выбранному шагу на панели шагов
            const stepName = e.target.closest('.switcher-step').dataset.tab

            // Меняем видимость шагов
            this.switchTab(tabs, tabs[tabs.activeTab], tabs[stepName])
        },
        switchTab(tabs, curTab, nextTab) {
            // Текущему активному шагу убираем видимость
            curTab.isActive = false
            // Выбранному шагу добавляем видимость
            nextTab.isActive = true
            // Меняем глобальное имя активного шага
            tabs.activeTab = nextTab.name
            // 
            this.updateSwitcherProgress(tabs)
        },
        updateSwitcherProgress(tabs) {
            // получаем элементы прогресс бара
            const switcherProgress = document.querySelector('.switcher-progressbar')
            const switcherThumb = switcherProgress.querySelector('.switcher-progressbar__thumb')
            // получаем список ключей
            const tabsObjList = Object.keys(tabs)

            // фильтруем ключи чтобы получить список табов
            const tabsList = tabsObjList.filter(tab => tabs[tab].name)
            // получаем индекс текущего таба
            const activeTabIndex = tabsList.indexOf(tabs.activeTab) + 1

            // получаем прогресс в процентах от 0 до 100%
            const progress = Math.ceil(activeTabIndex / tabsList.length * 100)

            switcherThumb.style.width = `${progress}%`
        },
    },
    mounted() {
        const tabs = this.tabs[this.tabs.choosenTabs]
        this.updateSwitcherProgress(tabs)
    }
}
</script>

<style lang="scss">
/* Стили для классов транзиций */
.switcher-body-item-leave-active {
    position: absolute;
}

.switcher-body-item-enter-active,
.switcher-body-item-leave-active {
    transition: opacity 0.1s;
}

.switcher-body-item-enter,
.switcher-body-item-leave-to {
    opacity: 0;
}


.section {
    padding: 80px 0 150px;
    background-color: $gray-white;
}

.title {
    margin-bottom: 34px;
}

.input {
    background-color: rgba(234, 236, 238, 0.5);
    transition: background-color .2s;

    &:focus {
        background-color: #fff;
    }
}

.link {
    text-decoration: underline;
    color: $blue;

    &:hover {
        color: $blue-light;
    }

    &:active {
        color: #00b3ff;
    }

    &_phone {
        display: block;
        font-weight: 700;
        text-decoration: none;
    }
}

.switcher {
    &-body {
        position: relative;

        &__wrapper {
            display: flex;
            gap: 30px;

            &>* {
                width: 50%;
            }
        }

        &__tab {}
    }

    &__tabs {
        display: flex;
        border-bottom: 1px solid #e3e6e8;
        margin-bottom: 50px;
    }

    &-tab {
        font-size: 18px;
        line-height: 133%;
        padding: 0 30px;
        height: 55px;
        border-radius: 15px 15px 0 0;
        border: 1px solid #e3e6e8;
        border-bottom: none;
        background-color: #fff;


        &_active {
            background-color: $blue-light;
            border-color: $blue-light;
            color: #fff;
        }
    }

    &__steps {
        display: flex;
        gap: 10px;
        justify-content: space-between;
        margin-bottom: 50px;
    }

    &-step {
        display: flex;
        align-items: center;

        &_active {
            & .switcher-step__number {
                background-color: $blue-light;
                color: #fff;
            }
        }

        &__text {
            text-align: left;
            font-weight: 500;
            font-size: 16px;
            line-height: 187%;
            color: #000;
        }

        &__number {
            flex: none;
            margin-right: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 100%;
            width: 50px;
            height: 50px;
            font-weight: 500;
            font-size: 24px;
            line-height: 125%;
            color: #d9d9d9;
            background-color: #f2f3f5;

            transition: color .2s, background-color .2s;
        }
    }

    &-progressbar {
        width: 100%;
        height: 6px;
        background-color: #eceef0;
        margin-bottom: 40px;
        border-radius: 5px;
        overflow: hidden;

        &__thumb {
            display: block;
            width: 0%;
            height: 100%;
            border-radius: 5px;
            background-color: $blue-light;
            transition: width .3s;
        }
    }
}

.form {
    &__title {
        line-height: 187%;
        color: #000;
        margin-bottom: 30px;
    }

    &__inputs {
        margin-bottom: 30px;

        &>* {
            &:not(:last-child) {
                margin-bottom: 20px;
            }
        }
    }

    &-submit {
        max-width: 315px;
        width: 100%;
        margin-bottom: 35px;
    }

    &-bottom {
        display: flex;
        align-items: center;
        gap: 30px;

        &__metatext {
            width: 70%;
            font-size: 14px;
            line-height: 171%;
            color: #2e2e2e;
        }

        &__button {
            flex: none;
            min-width: 200px;
        }
    }

    &-data {
        margin-bottom: 35px;

        &__payment {
            margin-bottom: 25px;
        }

        &__title {
            line-height: 187%;
        }

        &__amount {
            font-weight: 700;
            font-size: 24px;
            line-height: 125%;
        }
    }
}

.block__right {
    padding-left: 115px;

}

.card {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 30px;
    box-shadow: 0 15px 30px 0 rgba(0, 150, 216, 0.05);
    background-color: #e2e8f0;

    & .card__wrapper {
        padding-bottom: 15px;
    }

    &__wrapper {
        padding: 50px 40px;
        padding-bottom: 60px;
    }

    &__title {
        font-size: 18px;
        font-weight: 600;
        line-height: 32px;
        margin-bottom: 15px;
    }

    &__text {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 24px;

        &>p {
            margin-bottom: 15px;
        }
    }

    &__img {
        margin-top: -10px;
        width: 100%;
        height: 250px;

        img {
            object-position: bottom;
        }
    }
}

@include desktopXl {
    .switcher {
        &-step {
            &__text {
                font-size: 14px;
            }
        }
    }

    .form {
        &__title {
            font-size: 14px;
            line-height: 171%;
        }

        &-bottom {
            flex-direction: column;
            align-items: start;
            gap: 20px;

            &__metatext {
                width: 100%;
            }
        }
    }

    .block__right {
        padding: 0;
    }
}

@include laptop {
    .link {
        &_phone {
            display: inline;
        }
    }

    .switcher {
        &-body {
            &__wrapper {
                flex-direction: column;

                &>* {
                    width: 100%;
                }
            }
        }

        &-tab {
            font-size: 16px;
        }

        &-step {
            &__number {
                margin-right: 10px;
            }

            &__text {
                font-size: 13px;
                line-height: 154%;
            }
        }
    }

    .form {
        &__title {
            margin-bottom: 20px;
        }
    }
}

@include mobile {
    .switcher {
        &__tabs {
            margin-bottom: 10px;
        }

        &-tab {
            text-align: left;
            padding: 0 30px;
            font-size: 14px;
            height: 50px;
        }

        &__steps {
            flex-direction: column;
            align-items: start;
            margin-bottom: 10px;
        }

        &-step {
            &__number {
                width: 35px;
                height: 35px;
                font-size: 20px;
            }
        }

        &-progressbar {
            margin-bottom: 20px;
        }
    }

    .form {
        &__title {
            margin-bottom: 15px;
        }

        &__inputs {
            margin-bottom: 20px;
        }

        &-bottom {
            gap: 15px;
        }
    }
}
</style>