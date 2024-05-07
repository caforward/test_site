<template>
  <section  class="section">
    <div id="calculate" class="container">
      <h2 >Рассчитать расрочку</h2>
      <div class="flex-container">
        <div class="container-slides">
          <div class="slider">
            <p>Сумма вашего долга</p>
            <div class="current-value">{{ numSplit(currentValue) }}</div>
            <NoUiSlider
              :start="[338000]"
              :range="{ min: 10000, max: 500000 }"
              :step="100"
              @value-changed="handleValueChange"
            />
            <div class="cont-from-to">
              <div>от 10 000 ₽</div>
              <div>до 500 000 ₽</div>
            </div>
          </div>
          <div class="slider">
            <p>Выберите ежемесячный платеж</p>
            <div class="current-value">{{ numSplit(currentValue2) }}</div>
            <NoUiSlider
              :start="[15700]"
              :range="{ min: 2300, max: 160000 }"
              :step="100"
              @value-changed="handleValueChange2"
            />
            <div class="cont-from-to">
              <div>от 2 300 ₽</div>
              <div>до 160 000 ₽</div>
            </div>
          </div>
          <div class="slider">
            <p>Срок погашения</p>
            <div class="current-value">{{ currentValue3 }}</div>
            <NoUiSlider
              :start="[20]"
              :range="{ min: 1, max: 61 }"
              :step="1"
              @value-changed="handleValueChange3"
            />
            <div class="cont-from-to">
              <div>от 1 месяца</div>
              <div>до 61 месяцев</div>
            </div>
          </div>
        </div>
        <div class="modal-container">
          <p>Нужно оплатить в итоге</p>
          <div class="sum-element">
            {{ numSplit(currentValue2 * currentValue3)}} ₽</div>
          <p>Сумма к прощению</p>
          <div class="sum-element bott-sum-element">
            {{
              currentValue - currentValue2 * currentValue3 <= 0
                ? 0
                : numSplit(currentValue - currentValue2 * currentValue3)
            }}
            ₽
          </div>
          <form @submit.prevent="submitForm">
            <div class="form-input inputName">
              <label for="name"></label>
              <input
                :class="{ 'valid-input': nameValid == true }"
                @input="nameBlured"
                @blur="nameBlured"
                v-model.trim="formData.name"
                type="text"
                id="name"
                placeholder="Имя*"
                class="input"
              />
              <span v-if="!nameValid" class="error">{{ errorMsg.name }}</span>
            </div>
            <div class="form-input inputTel">
              <label for="tel"></label>
              <input
                :class="{ 'valid-input': telValid == true }"
                @input="telBlured"
                @blur="telBlured"
                v-model.trim="formData.tel"
                type="tel"
                id="tel"
                placeholder="Номер телефона*"
                class="input"
              />
              <span v-if="!telValid" class="error">{{ errorMsg.tel }}</span>
            </div>

            <div class="above-btn-flex">
              <div class="custom-checkbox">
                <label class="custom-checkbox">
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="aboveButt">
                Даю согласие на обработку своих персональных данных
                <a href="#">политика конфиденциальности.</a>
              </div>
            </div>

            <button type="submit" class="button_blue">Отправить</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import NoUiSlider from "../../blocks/elements/NoUiSlider.vue";

export default defineComponent({
  components: {
    NoUiSlider,
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
      currentValue: 338000,
      currentValue2: 3100,
      currentValue3: 45,
    };
  },
  computed: {
    isFormValid(): boolean {
      return this.nameValid && this.telValid;
    },
  },
  methods: {
    numSplit(num: number): string | number {
        if (num.toString().length < 7 ) {
            return (num.toString().slice(0, -3) + ' ' + num.toString().slice(-3))
        } else if (num.toString().length >= 7) {
            return (num.toString().slice(0,1) + ' ' + num.toString().slice(1, 4) + ' ' + num.toString().slice(-3))
        } else return num
    },
    handleValueChange(newValue) {
      this.currentValue = newValue;
    },
    handleValueChange2(newValue) {
      this.currentValue2 = newValue;
    },
    handleValueChange3(newValue) {
      this.currentValue3 = newValue;
    },
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
});
</script>

<style lang="scss" scoped>
.section {
  background: #f5f7f9;
  padding-top: 82px;
  padding-bottom: 79px;
  margin-bottom: 82px;
}
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 30px;
}
.container-slides {
  width: 51%;
}
h2 {
  font-weight: 600;
  font-size: 28px;
  line-height: 121%;
  color: #2e2e2e;
}
p {
  padding-top: 24px;
  padding-bottom: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 187%;
  color: #2e2e2e;
}
.current-value {
  padding-bottom: 24px;
  font-weight: 700;
  font-size: 24px;
  line-height: 125%;
  color: #2e2e2e;
}
.cont-from-to {
  display: flex;
  max-width: 654px;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
  font-weight: 400;
  font-size: 16px;
  line-height: 187%;
  color: rgba(46, 46, 46, 0.5);
  margin-bottom: -18px;
}
.slider {
  padding-bottom: 31px;
}

.modal-container {
  
  max-width: 540px;
  padding: 44px 41px 60px 43px;
  border-radius: 30px;
  fill: #fff;
  box-shadow: 0 20px 30px 0 rgba(0, 55, 145, 0.1);

  ::placeholder {
    color: rgba(0, 0, 0, 0.5);
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0%;
    text-align: left;
  }

  .sum-element {
    font-weight: 700;
    font-size: 30px;
    line-height: 100%;
    color: #2e2e2e;
    margin-bottom: 27px;
  }
  .bott-sum-element {
    margin-bottom: 51px;
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
    //   margin-bottom: 16px;
  }

  .inputTel {
    margin-bottom: 10px;
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

  .above-btn-flex {
    display: flex;
    align-items: flex-start;

    .custom-checkbox {
      display: inline-block;
      cursor: pointer;
      user-select: none;

      input {
        display: none;
      }

      .checkmark {
        border: 1px solid #2e2e2e26;
        position: relative;
        height: 30px;
        width: 30px;
        background: #eff1f3;
        border-radius: 5px;
        display: block;

        &:after {
          content: "";
          position: absolute;
          display: none; // Галочка не видима по умолчанию
          left: 12px; // Смещение вправо
          top: 7px;
          width: 6px;
          height: 12px;
          border: solid #292d32;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
      }

      input:checked ~ .checkmark:after {
        display: block; // Это правило остается неизменным, так как галочка всегда видима
      }
    }
  }
  .aboveButt {
    font-weight: 400;
    font-size: 14px;
    line-height: 143%;
    color: #000;
    margin-left: 20px;
    margin-bottom: 18px;
    line-height: 171%;
  }

  button {
    border-radius: 30px;
    background: rgb(0, 150, 216);
    width: 100%;
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
    padding-top: 0px;
    color: rgb(0, 0, 0);
    font-size: 14px;
    line-height: 171%;
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
}

@media screen and (max-width: 1370px) and (min-width: 1025px) {
  .section {
    padding-top: 80px;
    padding-bottom: 91px;
    margin-bottom: 84px;
  }
  h2 {
    // padding-bottom: 24px;
    font-weight: 600;
    font-size: 24px;
    line-height: 142%;
  }
  p {
    padding-bottom: 12px;
    font-weight: 400;
    font-size: 14px;
    line-height: 214%;
  }
  .current-value {
    font-weight: 700;
    font-size: 24px;
    line-height: 125%;
  }
  .cont-from-to {
    font-weight: 400;
    font-size: 16px;
    line-height: 187%;
    margin-bottom: -18px;
  }

  .modal-container {
    
    width: 50%;
    padding: 44px 29px 60px 30px;
    p {
      padding-bottom: 1px;
      font-weight: 400;
      font-size: 14px;
      line-height: 214%;
    }
    .sum-element {
      padding-bottom: 20px;
      font-weight: 700;
      font-size: 30px;
      line-height: 100%;
    }
    .bott-sum-element {
      padding-bottom: 21px;
    }
    .aboveButt {
      font-weight: 400;
      font-size: 14px;
      line-height: 143%;
      padding-bottom: 18px;
    }
  }
}

@media screen and (max-width: 1024px) and (min-width: 641px) {
  .section {
    padding-top: 60px;
    padding-bottom: 60px;
    margin-bottom: 62px;
  }
  h2 {
    font-weight: 600;
    font-size: 22px;
    line-height: 155%;
  }
  p {
    padding-top: 24px;
    padding-bottom: 12px;
    font-weight: 400;
    font-size: 14px;
    line-height: 214%;
  }
  .current-value {
    font-weight: 700;
    font-size: 24px;
    line-height: 125%;
    padding-bottom: 24px;
  }
  .cont-from-to {
    font-weight: 400;
    font-size: 14px;
    line-height: 214%;
    margin-bottom: -18px;
  }

  .modal-container {
    width: 50%;
    padding: 34px 30px 40px 30px;

    p {
      font-weight: 400;
      font-size: 14px;
      line-height: 214%;
    }

    ::placeholder {
      font-size: 13px;
    }
    .sum-element {
      padding-bottom: 17px;
      font-weight: 700;
      font-size: 30px;
      line-height: 100%;
    }
    .bott-sum-element {
      padding-bottom: 21px;
    }
    .aboveButt {
      font-weight: 400;
      font-size: 14px;
      line-height: 143%;
      padding-bottom: 18px;
    }
  }
}
@media screen and (max-width: 640.5px) {
  .section {
    padding-top: 50px;
    padding-bottom: 52px;
    margin-bottom: 51px;
  }
  .flex-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .container-slides {
    width: 100%;
  }

  h2 {
    font-weight: 600;
    font-size: 18px;
    line-height: 189%;
    margin-bottom: 18px;
  }
  p {
    padding-top: 10px;
    padding-bottom: 1px;
    font-weight: 400;
    font-size: 14px;
    line-height: 214%;
  }
  .current-value {
    font-weight: 700;
    font-size: 24px;
    line-height: 125%;
    padding-bottom: 15px;
  }
  .cont-from-to {
    font-weight: 400;
    font-size: 14px;
    line-height: 214%;
    margin-bottom: -18px;
  }

  .modal-container {
    width: 100%;
    padding: 30x 24px 30px 23px;

    p {
        font-weight: 400;
font-size: 14px;
line-height: 214%;
    }

    ::placeholder {
      font-size: 13px;
    }
    .sum-element {
      padding-bottom: 14px;
      font-weight: 700;
      font-size: 30px;
      line-height: 100%;
    }
    .bott-sum-element {
      padding-bottom: 15px;
    }
    .aboveButt {
        font-weight: 400;
font-size: 14px;
line-height: 143%;
padding-bottom: 18px;
    }
  }
}
</style>