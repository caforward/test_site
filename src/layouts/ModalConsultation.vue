<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <div class="close-button" @click="closeModal">
        <img src="/src/assets/images/close_x/Vector.png" alt="krestik" />
      </div>
      <h3>Заполните поля в форме ниже, и мы свяжемся с вами. </h3>
      <p>
        Просто введите свои контактные данные и ФИО, кратко опишите проблему и
        ждите, когда сотрудник ПКО «Форвард» свяжется с вами, чтобы
        проконсультировать по вашей финансовой ситуации. С этого начнется ваш
        путь к чистой кредитной истории
      </p>
      <div class="inputName">
        <label for="name"></label>
        <input type="text" id="name" placeholder="Имя*" />
      </div>
      <div class="inputTel">
        <label for="tel"></label>
        <input type="tel" id="tel" placeholder="Номер телефона*" />
      </div>
      <div class="inputMail">
        <label for="mail"></label>
        <input type="text" id="mail" placeholder="E-mail*" />
      </div>
      <div class="optionsWrap">
        <v-select class="vSelect" :options="options" placeholder="Тема обращения*" searchable="false"></v-select>
      </div>
      <div class="aboveButt">
        Нажимая кнопку «Оплатить», вы соглашаетесь с <a>Договором оферты</a> и
        <a>политикой конфиденциальности.</a>
      </div>
      <button @click="closeModal">Оплатить</button>
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
    return {
      options: [
        "Списать долг1",
        "Списать долг2",
        "Списать долг3",
        "Списать долг4",
      ],
      selectedOption: null,
    };
  },
  methods: {

    closeModal() {
      this.$emit("close");
    },
  },
});
</script>

<style lang="scss" scoped>
@import "/src/assets/scss/index.scss";
@import "vue-select/dist/vue-select.css";

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
}

.modal-content {
  position: relative;
  border-radius: 30px;
  background: rgb(255, 255, 255);
  width: 768px;
  height: 836px;
  padding: 61px 83px 60px 83px;
}

.close-button {
  position: absolute;
  top: 40px;
  right: 40px;
  cursor: pointer;
}

.inputName {
  padding-bottom: 16px;
}

.inputTel {
  padding-bottom: 16px;
}

.inputMail {
  padding-bottom: 16px;
}

.optionsWrap {
  padding-bottom: 155px;
}

.vSelect {
  background-color: rgba(234, 236, 238, 0.5);
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
  padding-bottom: 16px;
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
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 29px;
  letter-spacing: 0%;
  text-align: left;
  padding-bottom: 24px;
}

p {
  color: rgb(0, 0, 0);
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0%;
  text-align: left;
  padding-bottom: 23px;
}

input {
  padding: 12px 0 14px 16px;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  background-color: rgba(234, 236, 238, 0.5);
  color: rgb(0, 0, 0);
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0%;
  text-align: left;
}

select option {
  padding-bottom: 40px;
}

a {
  color: rgb(0, 150, 216);
  text-decoration: underline;
}
</style>