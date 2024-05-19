<template>
    <transition name="fade">
      <div class="modal" v-if="visible">
        <div class="modal-content">
          <div class="close-button" @click="closeModalCall">
            <img src="/assets/images/close_x/Vector.png" alt="krestik" />
          </div>
          <h3>Получить справку </h3>
          <p>
            Просто введите свои контактные данные и ждите, когда Мы свяжемся с Вами,
            чтобы предоставить информацию по выбранным вами справкам. 
          </p>
          <form @submit.prevent="submitForm">
            <div class="form-input inputName">
              <label for="name"></label>
              <input :class="{ 'valid-input': nameValid == true }" @input="nameBlured" @blur="nameBlured"
                v-model.trim="formData.name" type="text" id="name" placeholder="Имя*" class="input" />
              <span v-if="!nameValid" class="error">{{ errorMsg.name }}</span>
            </div>
            <div class="form-input inputTel">
              <label for="tel"></label>
              <input :class="{ 'valid-input': telValid == true }" @input="telBlured" @blur="telBlured"
                v-model.trim="formData.tel" type="tel" id="tel" placeholder="Номер телефона*" class="input" />
              <span v-if="!telValid" class="error">{{ errorMsg.tel }}</span>
            </div>
            <div class="aboveButt">
              Нажимая кнопку «Отправить», вы соглашаетесь с
              <a href="#">политикой конфиденциальности.</a>
            </div>
            <button type="submit" class="button_blue">
              Отправить
            </button>
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
    },
  
    data() {
      return {
        nameValid: false,
        telValid: false,
        errorMsg: {
          name: "",
          tel: "",
        },
        formData: {
          name: "",
          tel: "",
        },
      };
    },
    computed: {
      isFormValid(): boolean {
        return this.nameValid && this.telValid;
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
      closeModalCall() {
        this.$emit("close");
      },
      async submitForm() {
        if (this.isFormValid === true) {
          const formData = new FormData();
          formData.append("name", this.formData.name);
          formData.append("tel", this.formData.tel);
  
          try {
            const response = await fetch("emailCall.php", {
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
  
  .valid-input {
    background: white;
    border: 0.5px solid rgb(227, 230, 232);
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
  
  @media screen and (max-width: 1024px) and (min-width: 641px) {
    .modal-content {
      padding: 25px 53px 24px 53px;
    }
  
    h3 {
      padding-bottom: 20px;
      margin-bottom: 0;
    }
  
    p {
      padding-bottom: 20px;
      margin-bottom: 0;
    }
  
    .aboveButt {
      font-size: 14px;
    }
  
    ::placeholder {
      font-size: 13px;
    }
  
    .close-button {
      top: 18px;
      right: 18px;
    }
  }
  
  @media screen and (max-width: 640.5px) {
    .close-button {
      top: 18px;
      right: 18px;
    }
  
    .modal-content {
      padding: 31px 24px 26px 31px;
    }
  
    h3 {
      font-size: 18px;
      font-weight: 600;
      line-height: 29px;
      margin-bottom: 0px;
      padding-bottom: 10px;
    }
  
    p {
      font-size: 13px;
      font-weight: 400;
      padding-bottom: 13px;
      margin-bottom: 0;
    }
  
    .input {
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
  }
  </style>
  