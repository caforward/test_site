<template>
    <section>
        <div class="container">
            <h2 class="title">
                Попрощайтесь с долгами онлайн <br> на своих условиях
            </h2>
            <div class="cards__wrapper">
                <!-- form card -->
                <div class="card">
                    <div class="card__wrapper">
                        <div class="card__title">
                            Оплатите <br> задолженность онлайн!
                        </div>
                        <div class="card__text">
                            <p>
                                С ООО «Форвард» вы можете легко оплатить задолженность онлайн! Вам не нужно никуда идти,
                                поэтому
                                погашение вашего долга будет максимально безопасным.
                            </p>
                            <span>
                                Вы можете оплатить задолженность двумя способами:
                            </span>
                        </div>
                        <form action="" class="form">
                            <div class="form-inputs">
                                <input type="text" class="input" placeholder="Введите номер договора">

                                <div class="form-inputs__delimiter">или</div>

                                <input type="text" class="input" placeholder="ФИО">
                                <input type="text" class="input" placeholder="Дата рождения">
                            </div>
                            <div class="form__meta">
                                Нажимая кнопку «Оплатить», вы соглашаетесь с
                                <a href="#">Договором оферты</a>
                                и
                                <a href="#">политикой конфиденциальности.</a>
                            </div>
                            <button class="button button_blue">
                                Оплатить
                            </button>
                        </form>
                    </div>
                </div>
                <!-- calc card -->
                <div class="card card_calc">
                    <div class="card__wrapper">
                        <div class="card__title">
                            Рассчитать график платежей
                        </div>
                        <div class="card__text" v>
                            Воспользуйтесь этой формой, чтобы рассчитать удобный для вас график платежей. Сделать это
                            легко:
                            просто выберите сумму вашего долга, настройте срок погашения – и вы увидите, каким будет
                            ежемесячный платеж. Если сумма вас устраивает, то следующий ваш шаг – звонок нам, чтобы
                            обсудить
                            детали, заключить договор и получить скидку на ваш долг!
                        </div>
                        <button class="button">
                            Раcсчитать график платежей
                        </button>
                    </div>
                    <div class="card__img">
                        <img src="/src/assets/images/offers/calc.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup></script>

<style lang="scss" scoped>
@import '../assets/scss/index.scss';

section {
    background-color: #F9FAFB;
    padding-top: 50px;
    padding-bottom: 30px;
}

.title {
    font-size: 36px;
    font-weight: 700;
    line-height: 40px;
    margin-bottom: 33px;
}

.button {
    @include button;

    &_blue {
        @include blue-button;
        padding: 10px 50px;
        height: 50px;
    }
}

.form {
    &-inputs {
        margin-bottom: 20px;

        &__delimiter {
            font-weight: 400;
            font-size: 16px;
            line-height: 150%;
            text-align: center;
            margin-bottom: 10px;
        }
    }

    &__meta {
        font-size: 14px;
        line-height: 171%;
        margin-bottom: 25px;

        &>a {
            text-decoration: underline;
            color: #0096d8;
        }
    }
}

.input {
    font-size: 14px;
    line-height: 24px;
    width: 100%;
    border-radius: 5px;
    background-color: rgba(234, 236, 238, 0.5);
    padding: 12px 20px;

    &:not(:last-child) {
        margin-bottom: 15px;
    }

    &:first-child {
        margin-bottom: 10px;
    }
}

.cards__wrapper {
    display: flex;

    &>*:not(:last-child) {
        margin-right: 30px;
    }
}

.card {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 30px;
    box-shadow: 0 15px 30px 0 rgba(0, 150, 216, 0.05);
    background: #fff;

    &_calc {
        background-color: #e2e8f0;

        & .card__wrapper {
            padding-bottom: 15px;
        }
    }

    &__wrapper {
        padding: 50px 85px;
        padding-bottom: 60px;
    }

    &__title {
        font-size: 28px;
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
        margin-top: auto;
        height: 320px;
    }
}
</style>