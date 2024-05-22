<template>
    <div class="form-block">
        <slot name="info"></slot>
        <form action="" class="form-block__form" @submit.prevent>
            <div class="form-block__inputs">
                <div class="input__wrapper" v-for="(inputIter, idx) in inputs" :key="idx">
                    <input v-if="inputIter.type === 'tel'" :name="inputIter.dataName" class="input"
                        v-mask="'+7 (###) ###-##-##'" :type="inputIter.type" :placeholder="inputIter.placeholder"
                        @input="validateInput($event, inputIter.dataName)"
                        @blur="blurErrorShortValueHandler($event, inputIter.dataName)">

                    <component v-else :is="inputIter.tagName || 'input'" :name="inputIter.dataName" class="input"
                        :type="inputIter.type" :placeholder="inputIter.placeholder"
                        @input="validateInput($event, inputIter.dataName)">
                    </component>
                    <span class="error"></span>
                </div>
            </div>
            <div class="form-block__bottom">
                <div class="form-block-meta">
                    <input id="personal-data-agree-checkbox" type="checkbox" class="checkbox form-block-meta__checkbox"
                        v-model="consent">
                    <label for="personal-data-agree-checkbox" class="form-block-meta__label">
                        Даю согласие на
                        <a href="#" class="link">обработку своих персональных данных</a>,
                        <a target="_blank" href="/policy" class="link">политика конфиденциальности</a>
                    </label>
                </div>
                <button class="button button_blue form-block__button" @click="handleSubmit">
                    Отправить
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'FormBlock',
    props: {
        inputs: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            consent: false,
            formData: {},
            formInputs: {},
            formIsValid: false
        }
    },
    beforeMount() {
        // Инициализация данных для валидации
        this.inputs.forEach(input => {
            this.formData[input.dataName] = ''
            this.formInputs[input.dataName] = { error: 'Заполните поле', isValid: false }
        })
    },
    mounted() {
        // Инициализация DOM элементов валидации
        const form = document.querySelector('form')

        this.inputs.forEach(input => {
            this.formInputs[input.dataName].elementDOM = form.querySelector(`[name=${input.dataName}]`)
        })
    },
    methods: {
        handleSubmit() {
            const form = document.querySelector('form')
            const consentCheckbox = document.querySelector('#personal-data-agree-checkbox')

            // Проверяеем наличие ошибок
            this.checkAllInputErrors(this.formInputs)

            if (!this.consent) {
                consentCheckbox.classList.add('checkbox_error')

                setTimeout(() => {
                    consentCheckbox.classList.remove('checkbox_error')
                }, 300)

                return
            }

            // Проверяем валидна ли форма
            if (this.formIsValid) {
                // Отправляем данные на сервер
                console.log('Form data submitted:', this.formData, this.consent);

                // Обнуляем все инпуты
                Object.keys(this.formInputs).forEach(key => {
                    this.formInputs[key].elementDOM.value = ''
                })
            }
        },
        checkAllInputErrors(inputs) {
            const inputsNames = Object.keys(inputs)

            inputsNames.forEach(name => {
                this.checkError(inputs[name])
            })
        },
        checkError(inputData) {
            const inputWrapper = inputData.elementDOM.parentNode
            const inputError = inputWrapper.querySelector('.error')

            // Проверить есть ли ошибка у инпута
            // если есть - показать
            if (inputData.error) {
                inputData.isValid = false
                inputData.elementDOM.classList.add('input_error')

                if (inputError) {
                    inputError.innerText = inputData.error
                    inputError.classList.add('error_visible')
                }

            } else {
                inputData.isValid = true
                inputData.elementDOM.classList.remove('input_error')

                if (inputError) {
                    inputError.innerText = ''
                    inputError.classList.remove('error_visible')
                }
            }
        },
        blurErrorShortValueHandler(e, fieldName) {
            const inputData = this.formInputs[fieldName]
            const input = e.target;

            // Если номер телефона короче необходимого
            if (input.type === 'tel' && input.value.length < 18) {
                inputData.error = 'Заполните поле'
                this.checkError(inputData)
            }
        },
        validateInput(e, fieldName) {
            const inputData = this.formInputs[fieldName]
            const input = e.target;

            // Удаляем текущую ошибку при пользовательскои вводе
            inputData.error = ''

            // Если инпут пустой записываем ошибку
            if (input.type === 'text' && input.value === '') {
                inputData.error = 'Заполните поле'
            }
            else if (input.type === 'email' && input.value === '') {
                inputData.error = 'Заполните поле'
            }
            else if (input.type === 'tel' && input.value.length === '') {
                inputData.error = 'Заполните поле'
            }

            // Проверяем были ли записаны ошибки и если да, то выводим
            this.checkError(inputData)
            // Сохраняем значение инпута в formData
            this.formData[fieldName] = input.value
        }
    },
    watch: {
        formInputs: {
            handler(inputs) {
                const inputsNames = Object.keys(inputs)
                this.formIsValid = true

                inputsNames.forEach(name => {
                    if (!inputs[name].isValid) {
                        this.formIsValid = false
                    }
                })
            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.form-block {
    background-color: $black;
    border-radius: 20px;
    padding: 70px 85px 60px;
    color: #fff;
    gap: 40px;
    position: relative;
    z-index: 1;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;

    &>* {
        width: 100%;
        flex: 1;
    }

    &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: -1;
        height: 1px;
        aspect-ratio: 1 / 1;
        // background: radial-gradient(circle, $blue 0%, rgba(0,0,0,0) 70%);
        box-shadow: 100px 160px 300px 280px rgba(0, 150, 216, 0.85);
    }

    .form-block__form {
        flex: 1;
    }

    &__inputs {
        margin-bottom: 30px;
    }

    &__bottom {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;

        &>* {
            width: 100%;
            flex: 1;
        }
    }

    &__button {
        max-width: 200px;
        flex: none;
    }

    &-meta {
        display: flex;
        align-items: flex-start;
        min-width: 260px;

        &__checkbox {
            margin-right: 20px;
        }

        &__label {
            display: inline;
            font-weight: 400;
            font-size: 14px;
            line-height: 143%;

            .link {
                display: inline;
                color: $white;
                text-decoration: underline;
            }
        }
    }
}

.checkbox {
    transition: background-color .3s;

    &_error {
        background-color: #FF6464;
    }
}

.input {
    border: 1px solid transparent;
    transition: border-color .2s;

    &_error {
        border-color: #FF6464;
    }

    &__wrapper {
        position: relative;
        border-radius: 5px;
        overflow: hidden;

        &:not(:last-child) {
            margin-bottom: 15px;
        }

        & .error {
            display: flex;
            align-items: center;
            padding: 0 20px;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: #FF6464;
            height: 18px;
            font-size: 12px;
            color: #fff;
            visibility: hidden;
            opacity: 0;
            transition: visibility .2s, opacity .2s;

            &_visible {
                visibility: visible;
                opacity: 1;
            }
        }
    }

}

textarea {
    height: 100px;
}

@include desktopXl {
    .form {
        &-block {
            &__bottom {
                &>* {
                    flex: none;
                }
            }

            &__button {
                max-width: 270px;
            }

            &-meta {
                min-width: unset;
            }
        }
    }
}

@include desktop {
    .form {
        &-block {
            padding: 50px;
        }
    }
}

@include laptop {
    .form {
        &-block {
            padding: 30px;
        }
    }
}

@include tablet {
    .form {
        &-block {
            &-meta {
                &__checkbox {
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>
