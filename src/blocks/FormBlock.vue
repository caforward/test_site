<script setup>
import {onMounted, ref} from "vue";
import BaseForm from "@/blocks/form/BaseForm.vue";
import OverlayThank from '@/layouts/OverlayThank.vue';

const response = ref(null)
const overlayThankVisible = ref(false)
const userName = ref(null)

const props = defineProps({
    type: {
        type: String,
        default: ''
    },
    showTitle: {
        type: Boolean,
        default: true,
    },
    fetchUrl: {
        type: String,
        default: '/backend/public/email.php'
    },
    inputs: {
        type: Array,
        default: [
            {
                name: 'name',
                type: 'text',
                placeholder: 'ФИО*',
                required: true,
            },
            {
                name: 'tel',
                type: 'tel',
                placeholder: 'Номер телефона*',
                required: true
            },
            {
                name: 'email',
                type: 'email',
                placeholder: 'E-mail*',
            },
            {
                name: 'birthdayDate',
                type: 'date',
                value: '',
                placeholder: 'Дата рождения*',
                required: true
            },
            {
                name: 'messageType',
                type: 'select',
                placeholder: 'Тема обращения*',
                required: true,
                value: "Информация о долге",
                options: [
                    // {value: 'callback', label: 'Прошу перезвонить'},
                    // "Разблокировать счет",
                    // "Рассрочка",
                    // "Другое",
                    {value: 'debt-info', label: 'Информация о долге'},
                    {value: 'installment', label: 'Запрос на оферту'},
                    {value: '', label: 'Внесение изменений в БКИ'},
                    {value: '', label: 'Информация о мобилизации'},
                    {value: 'refund', label: 'О возврате денежных средств'},
                    {value: 'account-unblock', label: 'Разблокировка счетов'},
                    {value: '', label: 'Отказ от взаимодействия'},
                    {value: '', label: 'Претензия'},
                    {value: '', label: 'Справка о погашении задолженности'},
                    {value: '', label: 'Справка о состоянии задолженности'},
                    {value: 'cancel-ip', label: 'Отозвать ИП'},
                    {value: 'get-contract-id', label: 'Узнать номер договора'},
                ],
            },
            {
                name: 'file_attachment',
                type: 'file',
                required: true,
            }
        ]
    }
})

/*
const inputs = ref([
    {
        name: 'name',
        type: 'text',
        placeholder: 'ФИО*',
        required: true,
    },
    {
        name: 'tel',
        type: 'tel',
        placeholder: 'Номер телефона*',
        required: true
    },
    {
        name: 'email',
        type: 'email',
        placeholder: 'E-mail*',
    },
    {
        name: 'messageType',
        type: 'select',
        placeholder: 'Тема обращения*',
        required: true,
        value: "Прошу перезвонить",
        options: [
            "Прошу перезвонить",
            "Узнать номер договора",
            "Разблокировать счет",
            "Рассрочка",
            "Другое",
        ],
    },
    // {
    // 	name: 'message',
    // 	type: 'textarea',
    // 	placeholder: 'Кратко опишите Ваш вопрос*',
    // }
])
*/

async function sendData(formData, formInputRefs) {
    overlayThankVisible.value = true
    userName.value = formData.get('name')

    // Для тестирования пустых писем
    formData.append('fromComponent', 'ModalForm')
    // Для тестирования пустых писем

    try {
        response.value = await fetch(props.fetchUrl, {
            method: 'POST',
            body: formData
        })

        if (response.value) {
            formInputRefs.forEach(inputRef => {
                inputRef.clearValue()
            })
        }

    } catch {
        response.value = {ok: false}
    }
}

async function sendRating(rateData) {
    const postData = new FormData()
    postData.append('rate', rateData.rateValue.value)
    postData.append('message', rateData.rateMessage.value)
    postData.append('feedback', rateData.rateFeedback.value)
    postData.append('username', userName.value)

    // postData.entries().forEach(key => {
    //     console.log(key)
    // })

    try {
        await fetch('/backend/public/rate.php', {
            method: 'POST',
            body: postData
        })
    } catch (err) {
        console.log('error rate', err.message)
    }
}

function setSelectorByType(type) {
    const messageTypeInput = props.inputs.find(input => input.name === 'messageType')

    if (messageTypeInput) {
        if (type) {
            // Индексы из массива options, для селекта
            const types = {
                "callback": 0,
                "installment": 2,
                "account-unblock": 6,
                "cancel-ip": 11,
                "debt-info": 1,
                "refund": 5,
                "get-contract-id": 12
            }

            let option = messageTypeInput.options[0]

            if (types[type]) {
                option = messageTypeInput.options.find(opt => opt.value === type)
            }

            messageTypeInput.value = option
            messageTypeInput.disabled = true
        } else {
            messageTypeInput.value = messageTypeInput.options[0]
            messageTypeInput.disabled = false
        }
    }
}

onMounted(() => {
    const option = props.type
    setSelectorByType(option)
})
</script>

<template>
    <div class="form-block">
        <div class="bg-holder"></div>
        <slot name="info"></slot>

        <div class="relative">
            <BaseForm :inputs="inputs" @submitted="sendData"/>

            <OverlayThank
                v-model:visible="overlayThankVisible"
                v-model:status="response"
                class="!rounded-lg"
                @closeParentModal="overlayThankVisible = false"
                @sendRating="sendRating"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

.bg-holder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: inherit;

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
}

.form-block {
    background-color: var.$black;
    border-radius: 30px;
    border: 1px solid #ccc;
    padding: 70px 85px 60px;
    color: #fff;
    gap: 40px;
    position: relative;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;

    & > * {
        width: 100%;
        flex: 1;
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

        & > * {
            &:not(:last-child) {
                margin-bottom: 15px;
            }
        }
    }

    &__bottom {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;

        & > * {
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
                & > * {
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
