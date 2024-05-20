<template>
  <transition name="fade">
    <div class="modal" v-if="visible">
      <div class="modal-content">
        <div class="close-button" @click="closeModal">
          <img src="/assets/images/close_x/Vector.png" alt="krestik" />
        </div>
        <h3>Заполните поля в форме ниже, и мы свяжемся с Вами. </h3>
        <p>
          Мы гарантируем, что никто не останется без внимания! Наши специалисты получают все заявки на обратную связь и
          отвечают на них так быстро, насколько это возможно.
          Просто введите свои контактные данные и ФИО, кратко опишите проблему и ожидайте, когда сотрудник ООО ПКО
          «Форвард» свяжется с Вами, чтобы проконсультировать по Вашей финансовой ситуации.

        </p>
        <form @submit.prevent="submitForm">
          <div class="form-input inputName">
            <label for="name"></label>
            <input :class="{ 'valid-input': nameValid == true }" @input="nameBlured" @blur="nameBlured"
              v-model.trim="formData.name" type="text" id="name" placeholder="Имя*" />
            <span v-if="!nameValid" class="error">{{ errorMsg.name }}</span>
          </div>
          <div class="form-input inputTel">
            <label for="tel"></label>
            <input :class="{ 'valid-input': telValid == true }" @input="telBlured" @blur="telBlured"
              v-model.trim="formData.tel" type="tel" id="tel" placeholder="Номер телефона*" />
            <span v-if="!telValid" class="error">{{ errorMsg.tel }}</span>
          </div>
          <div class="form-input inputMail">
            <label for="mail"></label>
            <input :class="{ 'valid-input': mailValid == true }" @input="mailBlured" @blur="mailBlured"
              v-model.trim="formData.email" type="text" id="mail" placeholder="E-mail*" />
          </div>
          <div class="optionsWrap">
            <v-select v-model.trim="formData.selectedOption" class="vSelect" :options="options"
              placeholder="Тема обращения*"></v-select>
          </div>
          <div class="form-input inputText">
            <label for="text"></label>
            <textarea :class="{ 'valid-input': textValid == true }" @input="textBlured" @blur="textBlured" class="input"
              placeholder="Коротко опишите вопрос*" v-model.trim="formData.text" name="text" id="text" cols="3"
              rows="2"></textarea>
            <span v-if="!textValid" class="error">{{ errorMsg.text }}</span>
          </div>
          <div class="aboveButt">
            Нажимая кнопку «Отправить», вы соглашаетесь с
            <a target="_blank" href="/policy">политикой конфиденциальности.</a>
          </div>
          <button class="button_blue" type="submit">Отправить</button>
        </form>
      </div>
    </div>
  </transition>
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
    defaultOption: {
      type: String,
      required: false,
      default: null as string | null
    },
  },

  data() {
    return {
      nameValid: false,
      telValid: false,
      mailValid: false,
      textValid: false,
      errorMsg: {
        name: "",
        tel: "",
        mail: "",
        text: "",
      },

      options: [
        "Узнать номер договора",
        "Разблокировать счет",
        "Рассрочка",
        "Другое",
      ],
      selectedOption: null,
      formData: {
        name: "",
        tel: "",
        email: "",
        text: "",
        selectedOption: null as string | null,
      },
    };
  },
  watch: {
    visible(newVal: boolean) {
      if (newVal && this.defaultOption !== null) {
        this.formData.selectedOption = this.defaultOption;
      }
    },
  },
  computed: {
    isFormValid(): boolean {
      return (
        this.nameValid && this.telValid && this.textValid
      );
    },
  },
  methods: {
    nameBlured() {
      if (this.formData.name === "") {
        this.errorMsg.name = "заполните поле";
        this.nameValid = false;
      } else if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(this.formData.name)) {
        this.errorMsg.name = "неверное имя";
        this.nameValid = false;
      } else {
        this.nameValid = true;
      }
    },
    telBlured() {
      if (this.formData.tel === "") {
        this.errorMsg.tel = "заполните поле";
        this.telValid = false;
      } else if (
        !/^(?:\+7|7|8)(\s|-|\()?\d{3}(\s|-|\))?(\s|-)?\d{3}(\s|-)?\d{2}(\s|-)?\d{2}$/.test(
          this.formData.tel
        )
      ) {
        this.errorMsg.tel = "неверный формат номер телефона";
        this.telValid = false;
      } else {
        this.telValid = true;
      }
    },
    mailBlured() {
      this.mailValid = true
    },
    textBlured() {
      if (this.formData.text === "") {
        this.errorMsg.text = "заполните поле";
        this.textValid = false;
      } else {
        this.textValid = true;
      }
    },
    closeModal() {
      this.$emit("close");
    },
    async submitForm() {
      if (this.isFormValid === true) {
        const formData = new FormData();
        formData.append("name", this.formData.name);
        formData.append("tel", this.formData.tel);
        formData.append("email", this.formData.email);
        formData.append("text", this.formData.text);
        if (this.formData.selectedOption !== null) {
          formData.append("selectedOption", this.formData.selectedOption);
        }
        try {
          const response = await fetch("email.php", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            console.log("Сообщение успешно отправлено");
            this.resetFormData();
          } else {
            console.error("Ошибка при отправке сообщения");
          }
        } catch (error) {
          console.error("Ошибка при отправке сообщения:", error);
        }
      }
    },
    resetFormData() {
      this.formData.name = "";
      this.formData.tel = "";
      this.formData.email = "";
      this.formData.text = "";
      this.selectedOption = null;
    },
  },
  updated() {
    if (this.visible) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '10px'
    } else {
      document.body.style.paddingRight = ''
      document.body.style.overflow = ''
    }
  },
});
</script>

<style lang="scss" scoped>
@import "vue-select/dist/vue-select.css";
@import "/src/assets/scss/index.scss";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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
  padding-top: 2px;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  padding: 7px 45px;
}

.modal-content {
  position: relative;
  border-radius: 30px;
  background: rgb(255, 255, 255);
  width: 768px;
  padding: 45px 83px 30px 83px;
  margin: auto 0;
}

.close-button {
  position: absolute;
  top: 35px;
  right: 40px;
  cursor: pointer;
}

.valid-input {
  background: white;
  border: 0.5px solid rgb(227, 230, 232);
}

.form-input {
  padding-bottom: 16px;
  position: relative;

  .error {
    position: absolute;
    bottom: 13.5px;
    display: block;
    width: 100%;
    padding-left: 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 135%;
    color: white;
    background: #ff6464;
    border-radius: 0 0 5px 5px;
  }
}

input {
  border: 1px solid transparent;

  &:focus {
    border-color: #20afce;
    border-radius: 5px;
    background: white;
  }
}

.inputText {
  padding-bottom: 20px;

  textarea {
    background: #f4f5f6;
    resize: none;
    padding-left: 14px;
    border: 1px solid transparent;

    &:focus {
      border-color: #20afce;
      border-radius: 5px;
      background: white;
    }
  }

  .error {
    bottom: 21px;
    background: #ff6464;
    border-radius: 0 0 5px 5px;
    line-height: 180%;
  }

  .valid-input {
    background: white;
    border: 0.5px solid rgb(227, 230, 232);
  }
}

:deep(.optionsWrap) {
  v-select vs--single vs--searchable vSelect {
    cursor: pointer;
  }

  --vs-dropdown-option-padding: 0 0 8.5px 16px;
  --vs-dropdown-option--active-bg: none;
  --vs-dropdown-option--active-color: rgb(0, 150, 216);
  --vs-actions-padding: 4px 12px 0 3px;
  padding-bottom: 16px;

  .vSelect {
    background-color: rgba(234, 236, 238, 0.5);

    .vs__clear {
      display: none;
    }

    box-sizing: border-box;
    border: 0.5px solid rgb(227, 230, 232);
    border-radius: 5px;
    background: rgb(255, 255, 255);

    ::placeholder {
      color: rgba(0, 0, 0, 0.5);
      font-size: 14px;
    }

    .vs__dropdown-toggle {
      padding: 9.5px 0;
      background: #ffffff;
      border: 0.5px;
    }

    .vs__search {
      padding-left: 13px;
    }
  }

  .vs__selected {
    padding-left: 9px;
    font-size: 14px;
  }

  li {
    font-size: 14px;
  }

  ul .vs4__listbox {
    height: 160px;
  }
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
  font-size: 14px;
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
  display: inline;
}

@media screen and (max-width: 1024px) and (min-width: 641px) {
  .modal-content {
    padding: 25px 53px 24px 53px;
  }

  .close-button {
    top: 18px;
    right: 20px;
  }

  .aboveButt {
    font-size: 13px;
  }

  h3 {
    font-size: 22px;
    font-weight: 600;
    line-height: 29px;
    padding-bottom: 10px;
  }

  p {
    font-size: 13px;
    font-weight: 400;
    padding-bottom: 13px;
  }

  input {
    font-size: 13px;
  }

  .inputText {
    textarea {
      font-size: 13px;
    }
  }

  .aboveButt {
    font-size: 13px;
  }

  ::placeholder {
    font-size: 13px;
  }

  :deep(.optionsWrap) {
    .vs__search {
      font-size: 13px;
    }

    .vSelect {
      ::placeholder {
        font-size: 13px;
      }
    }

    .vs__selected {
      font-size: 13px;
    }

    li {
      font-size: 13px;
    }
  }
}

@media screen and (max-width: 640.5px) {
  .close-button {
    top: 14px;
    right: 15px;
  }

  .modal-content {
    padding: 31px 24px 26px 40px;
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    line-height: 29px;
    padding-bottom: 10px;
  }

  p {
    font-size: 13px;
    font-weight: 400;
    padding-bottom: 13px;
  }

  input {
    font-size: 13px;
  }

  .inputText {
    textarea {
      font-size: 13px;
    }
  }

  .aboveButt {
    font-size: 13px;
  }

  .aboveButt {
    font-size: 12px;
  }
}
</style>