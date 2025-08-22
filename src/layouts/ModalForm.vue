<script setup>
import { onMounted, ref, watch } from "vue";
import BaseModal from '../blocks/BaseModal.vue';
import BaseForm from "../blocks/form/BaseForm.vue";
import OverlayThank from '@/layouts/OverlayThank.vue';
// import { useFetchPost } from '@/composable/useFetch.js'

const visible = defineModel()
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
                    "Прошу перезвонить",
                    // "Узнать номер договора",
                    // "Разблокировать счет",
                    // "Рассрочка",
                    // "Другое",
                    "Информация о долге",
                    "Запрос на оферту",
                    "Внесение изменений в БКИ",
                    "Информация о мобилизации",
                    "О возврате денежных средств",
                    "Разблокировка счетов",
                    "Отказ от взаимодействия",
                    "Претензия",
                    "Справка о погашении задолженности",
                    "Справка о состоянии задолженности",
                    "Отозвать ИП",
                ],
            },
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

async function sendData(formData) {
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

    } catch {
        response.value = { ok: false }
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
            const types = {
                "callback": 0,
                "installment": 2,
                "account-unblock": 6,
                "cancel-ip": 11,
            }

            let option = messageTypeInput.options[0]
            
            if (types[type]) {
                option = messageTypeInput.options[types[type]]
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

watch(
    () => visible.value,
    () => {
        if (visible.value) {
            setSelectorByType(props.type);

            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = '10px'
        } else {
            document.body.style.paddingRight = ''
            document.body.style.overflow = ''
        }
    }
)
</script>

<template>
    <transition name="fade">
        <BaseModal id="requisites" v-if="visible" @closeModal="visible = false">
            <template #body>
                <slot name="topBodyContent"></slot>

                <BaseForm :showTitle="showTitle" :inputs="inputs" :grayForm="true" @submitted="sendData" />
                <OverlayThank v-model:visible="overlayThankVisible" v-model:status="response"
                    @closeParentModal="visible = false" @sendRating="sendRating" />
            </template>
        </BaseModal>
    </transition>
</template>

<style lang="scss" scoped></style>