<template>
    <div class="modal" v-if="visible">
        <div class="modal-content">
            <div class="close-button" @click="closeModalCall">
                <img src="/assets/images/close_x/Vector.png" alt="krestik" />
            </div>
            <h3>Заказать звонок </h3>
            <p>
                Просто введите свои контактные данные и ждите, когда сотрудник
                ПКО «Форвард» свяжется с вами, чтобы проконсультировать по вашей
                финансовой ситуации.
            </p>
            <div class="inputName">
                <label for="name"></label>
                <input type="text" id="name" placeholder="Имя*" class="input" />
            </div>
            <div class="inputTel">
                <label for="tel"></label>
                <input type="tel" id="tel" placeholder="Номер телефона*" class="input" />
            </div>
            <div class="aboveButt">
                Нажимая кнопку «Оплатить», вы соглашаетесь с
                <a href="#">Договором оферты</a> и
                <a href="#">политикой конфиденциальности.</a>
            </div>
            <button class="button_blue" @click="closeModalCall">Оплатить</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    components: {},
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
    },

    data() {
        return {};
    },
    methods: {
        closeModalCall() {
            this.$emit("close");
        },
    },
});
</script>

<style lang="scss" scoped>

// @import "vue-select/dist/vue-select.css";

::placeholder {
    color: rgba(0, 0, 0, 0.5);
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0%;
    text-align: left;
}

.modal {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    padding: 0 10px;
}

.modal-content {
    position: relative;
    border-radius: 30px;
    background: rgb(255, 255, 255);
    width: 768px;
    padding: 61px 83px 60px 83px;
}

.close-button {
    position: absolute;
    top: 40px;
    right: 40px;
    cursor: pointer;
}

.inputName {
    margin-bottom: 16px;
}

.inputTel {
    margin-bottom: 21px;
}

.placeholder {
    position: absolute;
    padding: 12px 0 14px 16px;
    pointer-events: none;
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
    color: rgba(0, 0, 0, 0.5);
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0%;
    text-align: left;
}

.aboveButt {
    margin-bottom: 16px;
    line-height: 171%;
}

button {
    border-radius: 30px;
    background: rgb(0, 150, 216);
    width: 200px;
    height: 50px;
    fill: rgb(0, 150, 216);
    padding: 10px 50px 10px 50px;
    color: rgb(255, 255, 255);
}

h3 {
    color: rgb(0, 0, 0);
    font-size: 24px;
    margin-bottom: 25px;
}

p {
    color: rgb(0, 0, 0);
    font-size: 14px;
    line-height: 171%;
    margin-bottom: 23px;
}

input {
    background-color: rgba(234, 236, 238, 0.5);
    color: rgb(0, 0, 0);
    line-height: 24px;
}

select option {
    padding-bottom: 40px;
}

a {
    color: rgb(0, 150, 216);
    text-decoration: underline;
}
</style>
