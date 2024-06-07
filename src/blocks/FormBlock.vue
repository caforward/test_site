<template>
    <div class="form-block">
        <slot name="info"></slot>
        <form novalidate action="" class="form-block__form" @submit.prevent="handleSubmit">
            <div class="form-block__inputs">
                <template v-for="(input, idx) in inputs" :key="idx">
                    <Input :name="input.name" :type="input.type" :placeholder="input.placeholder"
                        :required="input.required" :value="input.value" :options="input.options"
                        :disabled="input.disabled" @update:value="formData[input.name] = $event"
                        @update:isValid="formInputs[input.name].isValid = $event" :showErrorHandler="checkErrorTrigger"
                        :resetInputHandler="resetInputTrigger" @update:resetInputHandler="resetInputTrigger = $event" />
                </template>
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
                <button class="button button_blue form-block__button">
                    Отправить
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import Input from './elements/input.vue'

export default {
    name: 'FormBlock',
    components: {
        Input
    },
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
            formIsValid: false,
            checkErrorTrigger: true,
            resetInputTrigger: false
        }
    },
    beforeMount() {
        // Инициализация данных для валидации
        this.inputs.forEach(input => {
            this.formData[input.name] = ''
            this.formInputs[input.name] = { isValid: false, required: input.required }
        })
    },
    methods: {
        async handleSubmit() {
            const form = document.querySelector('form')
            const consentCheckbox = document.querySelector('#personal-data-agree-checkbox')

            // Проверяеем наличие ошибок
            this.checkErrorTrigger = !this.checkErrorTrigger

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
                const formData = new FormData();

                Object.keys(this.formData).forEach(key => {
                    formData.append(key, this.formData[key])
                })


                try {
                    const response = await fetch("email.php", {
                        method: "POST",
                        body: formData,
                    });
                    if (response.ok) {
                        console.log("Сообщение успешно отправлено");

                        this.resetInputTrigger = true

                        Object.keys(this.formData).forEach(key => {
                            this.formData[key] = ''
                        })

                    } else {
                        console.error("Ошибка при отправке сообщения");
                    }
                } catch (error) {
                    console.error("Ошибка при отправке сообщения:", error);
                }
                // this.$emit("submitted")
            }
        },
    },
    watch: {
        formInputs: {
            handler(inputs) {
                const inputsNames = Object.keys(inputs)
                this.formIsValid = true

                inputsNames.forEach(name => {
                    if (inputs[name].required && !inputs[name].isValid) {
                        this.formIsValid = false
                    }
                })
            },
            deep: true
        },
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

    textarea {
        resize: vertical;
        min-height: 50px;
        max-height: 200px;
    }

    .form-block__form {
        flex: 1;
    }

    &__inputs {
        margin-bottom: 30px;

        &>* {
            &:not(:last-child) {
                margin-bottom: 15px;
            }
        }
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

    &:focus {
        border-color: $blue;
    }

    &_valid {
        border-color: $blue;
    }

    &_error {
        border-color: #FF6464;
    }

    &__wrapper {
        position: relative;
        border-radius: 5px;

        & .error {
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            display: flex;
            align-items: center;
            padding: 0 20px;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 1;
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

:deep(.vSelect) {
    display: flex;
    align-items: center;
    background-color: #fff;
    height: 50px;
    border: 1px solid transparent;
    transition: border-color .2s;
    border-radius: 5px;

    &.input_valid {
        border-color: $blue;
    }

    &.vs {
        &--disabled .vs__actions {
            display: none;
        }

        &--open {
            border-color: $blue;
        }
    }

    .vs {
        &__selected {
            color: $black;
            font-size: 14px;
        }

        &__dropdown {
            &-toggle {
                background-color: transparent !important;
                width: 100%;
                border: none;
                padding: 0 10px;
            }

            &-menu {
                color: $black;
                font-size: 14px;
            }
        }

        &__search {
            color: $black;

            &::placeholder {
                color: $black;
                font-size: 14px;
            }
        }
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
        color: #fff !important;
    }

    li {
        font-size: 14px;
    }

    ul .vs4__listbox {
        height: 160px;
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
