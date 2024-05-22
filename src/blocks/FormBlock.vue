<template>
    <div class="form-block">
        <slot name="info"></slot>
        <form action="" class="form-block__form" @submit.prevent>
            <div class="form-block__inputs">
                <div class="input__wrapper" v-for="(inputIter, idx) in inputs" :key="idx">
                    <input v-if="inputIter.type === 'tel'" class="input" v-mask="'+7 (###) ###-##-##'"
                        :type="inputIter.type" :placeholder="inputIter.placeholder"
                        @blur="formData[inputIter.dataName] = validateInput($event)">

                    <component v-else :is="inputIter.tagName || 'input'" class="input" :type="inputIter.type"
                        :placeholder="inputIter.placeholder"
                        @input="formData[inputIter.dataName] = validateInput($event)">
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
            <input type="tel" v-mask="'##/##/##'">
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
        }
    },
    beforeMount() {
        this.inputs.forEach(input => {
            this.formData[input.dataName] = ''
        });
    },
    methods: {
        handleSubmit() {
            // if (!this.consent) {
            //     // согласие на обработку персональных данных
            //     return
            // }
            console.log('Form data submitted:', this.formData, this.consent);
            // логика для отправки данных формы
        },
        showAllError() {
            
        },
        showError(element, err) {
            const elWrapper = element.parentNode
            const elError = elWrapper.querySelector('.error')

            if (err) {
                elError.innerText = err
                element.classList.add('input_error')
                elError.classList.add('error_visible')
            } else {
                elError.innerText = ''
                element.classList.remove('input_error')
                elError.classList.remove('error_visible')
            }
        },
        validateInput(e) {
            const input = e.target;
            let value = e.target.value
            let error = ''

            if (input.type === 'text' && input.value === '') {
                // validate
                error = 'Заполните поле'
            } else if (input.type === 'email' && input.value === '') {
                // validate
                error = 'Заполните поле'
            } else if (input.type === 'tel' && value.length < 18) {
                error = 'Заполните поле'
            }

            this.showError(input, error)

            e.target.value = value
            return value;
        }
    },
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
