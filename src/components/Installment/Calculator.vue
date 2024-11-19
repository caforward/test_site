<script setup>
import { ref } from 'vue';
import BaseForm from '../../blocks/form/BaseForm.vue';
import OverlayThank from '@/layouts/OverlayThank.vue';

const overlayThankVisible = ref(false)
const response = ref(null)
const userName = ref(null)

const inputs = [
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
        name: 'messageType',
        type: 'select',
        placeholder: 'Тема обращения*',
        required: true,
        value: "Рассрочка",
        options: [
            "Рассрочка",
        ],
        disabled: true,
        visible: false,
    },
]

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

</script>

<template>
    <section id="calculate" class="section">
        <div class="custom-container">
            <div class="flex flex-col lg:flex-row gap-5 -mx-4 sm:m-0">
                <div class="bg-white w-full p-6 lg:w-6/12 sm:p-9 rounded-3xl shadow-[0_20px_30px_#0037911a] relative">
                    <BaseForm :showTitle="true" :inputs="inputs" @submitted="sendData" />
                    <OverlayThank v-model:visible="overlayThankVisible" v-model:status="response"
                        @sendRating="sendRating" :inBlock="true" />
                </div>
                <div
                    class="bg-slate-300 w-full flex-1 p-6 sm:p-9 rounded-3xl shadow-[0_20px_30px_#0037911a] relative overflow-hidden">
                    <div class="flex gap-4 lg:flex-col">
                        <div class="flex gap-2 sm:gap-4 flex-col h-full">
                            <h3 class="sm:text-2xl text-xl font-bold">
                                Рассчитать график платежей
                            </h3>
                            <p class="text-base">
                                Воспользуйтесь формой слева, чтобы рассчитать удобный для вас график платежей. Сделать
                                это
                                легко: просто выберите сумму вашего долга, настройте срок погашения – и вы увидите,
                                каким
                                будет ежемесячный платеж. Если сумма вас устраивает, то следующий ваш шаг – звонок нам,
                                чтобы обсудить детали, заключить договор и получить скидку на ваш долг!
                            </p>
                        </div>
                        <div class="mt-auto hidden lg:block lg:h-2/5 lg:w-full xl:h-1/2 lg:absolute bottom-0 left-0">
                            <img src="/images/offers/calc.png" alt="Рассрочка"
                                class="object-cover object-bottom h-full">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

.section {
    background: #f5f7f9;
    padding-top: 82px;
    padding-bottom: 79px;
    margin-bottom: 82px;
}

@include mixin.tablet {
    .section {
        padding-top: 50px;
        padding-bottom: 50px;
    }
}
</style>