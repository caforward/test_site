<script setup>
import { onMounted, ref, watch } from "vue";
import BaseModal from '../blocks/BaseModal.vue';
import FormBlock from "../blocks/FormBlock.vue";
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
    }
})

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
            {
                name: "Прошу перезвонить",
                code: "callback"
            },
            {
                name: "Узнать номер договора",
                code: "getContractNumber"
            },
            {
                name: "Разблокировать счет",
                code: "unblockAccaunt"
            },
            {
                name: "Рассрочка",
                code: "installment"
            },
            {
                name: "Другое",
                code: "other"
            },
        ],
    },
    // {
    // 	name: 'message',
    // 	type: 'textarea',
    // 	placeholder: 'Кратко опишите Ваш вопрос*',
    // }
])

async function sendData(formData) {
    overlayThankVisible.value = true
    userName.value = formData.get('name')

    try {
        response.value = await fetch('email.php', {
            method: 'POST',
            body: formData
        })

    } catch {
        response.value = { ok: false }
    }
}

async function sendRating(rateData) {
    const postData = new FormData()
    postData.append('rating', rateData.rateValue.value)
    postData.append('message', rateData.rateMessage.value)
    postData.append('username', userName.value)

    // postData.entries().forEach(key => {
    //     console.log(key)
    // })

    try {
        await fetch('rate.php', {
            method: 'POST',
            body: postData
        })
    } catch (err) {
        console.log('error rate', err.message)
    }
}

onMounted(() => {
    const option = props.type
    const messageTypeInput = inputs.value.find(input => input.name === 'messageType')

    if (messageTypeInput) {
        if (option) {
            messageTypeInput.value = props.type
            messageTypeInput.disabled = true
        } else {
            messageTypeInput.value = messageTypeInput.options[0]
            messageTypeInput.disabled = false
        }
    }
})

watch(
    () => props.type,
    (option) => {
        const messageTypeInput = inputs.value.find(input => input.name === 'messageType')

        if (option) {
            messageTypeInput.value = props.type
            messageTypeInput.disabled = true
        } else {
            messageTypeInput.value = messageTypeInput.options[0]
            messageTypeInput.disabled = false
        }
    }
)

watch(
    () => visible.value,
    () => {
        if (visible.value) {
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
                <BaseForm :showTitle="true" :inputs="inputs" :grayForm="true" @submitted="sendData" />
                <OverlayThank v-model:visible="overlayThankVisible" v-model:status="response"
                    @closeParentModal="visible = false" @sendRating="sendRating" />
            </template>
        </BaseModal>
    </transition>
</template>

<style lang="scss" scoped></style>