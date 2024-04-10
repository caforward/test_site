<template>
    <div class="form-block">
        <div class="form-block__info">
            <h2 class="title">
                Остались вопросы?<br />
                Напишите нам, и мы свяжемся с вами. 
            </h2>
            <p class="text">
                Наши специалисты получают все заявки на обратную связь и
                отвечают на них максимально быстро. <br /><br />
                Просто введите свои контактные данные и ФИО, кратко опишите
                проблему и ждите, когда сотрудник ПКО «Форвард» свяжется с вами,
                чтобы проконсультировать по вашей финансовой ситуации. С этого
                начнется ваш путь к чистой кредитной истории
            </p>
            <span class="text text_meta">
                * поле для обязательного заполнения
            </span>
        </div>
        <form action="" class="form-block__form">
            <div>
                <input type="text" class="input" />
            </div>
        </form>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";

.form-block {
    background-color: $black;
    border-radius: 20px;
    padding: 70px 85px 60px;
    color: #fff;
    display: flex;
    grid-gap: 60px;

    &__info {
        flex: 1;
    }
    &__form {
        width: 50%;       
    }
}

.title {
    margin-bottom: 25px;
}

.text {
    line-height: 175%;
    margin-bottom: 50px;

    &_meta {
        font-size: 14px;
        line-height: 171%;
        color: rgba(255, 255, 255, 0.5);
    }
}
</style>
