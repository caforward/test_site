<script setup>
import { ref, watch, onBeforeMount, reactive } from 'vue'
import BaseInput from './ui/BaseInput.vue';
import BaseCheckbox from './ui/BaseCheckbox.vue';
import Button from 'primevue/button';

// composable
import { useInputValidation, createFormData } from '@/composable/useForm.js'

// variables

const emit = defineEmits(['submitted'])

const props = defineProps({
    inputs: {
        type: Array,
        required: true
    },
    additionalData: {
        type: Object,
        default: {}
    }
})

const formInputs = reactive({})
const inputRefs = ref(null)
const consentRef = ref(null)
const consentValue = ref(null)

onBeforeMount(() => {
    props.inputs.forEach(input => {
        formInputs[input.name] = {
            value: input.value ? input.value : '',
        }
    })
})

async function sendData(data) {

    /* \/ temporary solution */
    // use inputRefs instead that
    Object.keys(props.additionalData).forEach(key => {
        data.append(key, props.additionalData[key])
    })

    // for (let key of data.entries()) {
    //     console.log(`${key[0]}: ${key[1]}`)
    // }
    /* /\ temporary solution */


    try {
        const response = await fetch("email.php", {
            method: "POST",
            body: data.value
        })

        if (response.ok) {
            console.log("Сообщение успешно отправлено");

            emit("submitted")
        } else {
            console.error("Ошибка при отправке сообщения");
        }
    } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
    }
}

function submitForm() {

    // collect input refs from form
    let formInputRefs = [...inputRefs.value]

    // check inputs validation and emit submit
    const isFormValid = useInputValidation([consentRef.value, ...formInputRefs])

    if (isFormValid) {
        const formData = createFormData(formInputRefs)

        sendData(formData)
        inputRefs.value.forEach(inputRef => inputRef.clearValue())

        // emit('submitted', formData)
    } else {
        // console.log('form is not valid')
    }
}
</script>

<template>
    <div class="form-block">
        <slot name="info"></slot>
        <form novalidate action="" class="form-block__form" @submit.prevent="handleSubmit">
            <div class="form-block__inputs">
                <template v-for="(input, idx) in inputs" :key="idx">
                    <BaseInput ref="inputRefs" v-model="formInputs[input.name].value" class="input__wrapper"
                        :name="input.name" :type="input.type" :placeholder="input.placeholder"
                        :required="input.required" :disabled="input.disabled" :options="input.options" />
                </template>
            </div>
            <div class="flex flex-col gap-4">

                <!-- personal data checkbox -->
                <BaseCheckbox ref="consentRef" checkboxId="personal-data-consent" checkboxName="consent-checkbox"
                    :required="true" v-model="consentValue" class="text-sm">
                    <template #label>
                        Даю согласие на
                        <a href="#" class="link">обработку своих персональных данных</a>,
                        <a target="_blank" href="/policy" class="link">политика конфиденциальности</a>
                    </template>
                </BaseCheckbox>

                <!-- submit button -->
                <Button class="w-full min-w-60" label="Отправить" size="large" @click.prevent="submitForm" />
            </div>
        </form>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

.form-block {
    background-color: var.$black;
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
        // background: radial-gradient(circle, var.$blue 0%, rgba(0,0,0,0) 70%);
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
                color: var.$white;
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
        border-color: var.$blue;
    }

    &_valid {
        border-color: var.$blue;
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

textarea {
    height: 100px;
}

@include mixin.desktopXl {
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

@include mixin.desktop {
    .form {
        &-block {
            padding: 50px;
        }
    }
}

@include mixin.laptop {
    .form {
        &-block {
            padding: 30px;
        }
    }
}

@include mixin.tablet {
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
