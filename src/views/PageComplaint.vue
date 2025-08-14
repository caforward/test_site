<script setup>
import BaseForm from '../blocks/form/BaseForm.vue';
import OverlayThank from '../layouts/OverlayThank.vue';
import { onMounted, ref } from 'vue';
import BaseModal from '../blocks/BaseModal.vue';

const overlayThankVisible = ref(false)
const response = ref(null)
const userName = ref(null)

const inputs = ref([
    {
        name: 'name',
        type: 'text',
        placeholder: 'Ваше ФИО*',
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
        name: 'complaintMessage',
        type: 'textarea',
        placeholder: 'Опишите вашу жалобу',
        required: true,
    },
])

async function sendData(formData) {
    overlayThankVisible.value = true
    userName.value = formData.get('name')

    try {
        response.value = await fetch('/backend/public/complaint.php', {
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

onMounted(() => {
    window.scrollTo(0, 0)
})

</script>

<template>
    <section class="border-t">
        <div class="py-14">
            <div class="custom-container">
                <div class="mb-5">
                    <h1 class="mb-2 text-sky-500 font-bold text-4xl max-xl:text-3xl max-sm:text-2xl">
                        Оставить обращение
                    </h1>
                    <span class="font-bold text-xl max-xl:text-lg max-sm:text-base">
                        Защита прав клиента онлайн
                    </span>
                </div>
                <div class="flex gap-10 max-lg:flex-col max-xl:gap-8">
                    <div
                        class="p-10 border rounded-xl max-sm:p-0 max-sm:border-0 w-1/2 max-xl:w-7/12 max-xl:p-8 max-lg:order-last max-lg:w-full max-lg:border-0 max-lg:p-0">
                        <BaseForm :inputs="inputs" @submitted="sendData" />
                    </div>
                    <div
                        class="flex flex-col items-center justify-center p-10 bg-sky-500 text-white rounded-xl w-1/2 max-xl:w-5/12 max-xl:p-8 max-lg:w-full max-lg:p-6">
                        <div>
                            <ul class="text-xl font-bold mb-5 max-lg:text-lg max-lg:mb-2 max-sm:text-base">
                                <li>
                                    Нашли неисправность на сайте?
                                </li>
                                <li class="">
                                    Столкнулись с некомпетентным поведением сотрудника?
                                </li>
                                <li class="">
                                    Возникла конфликтная ситуация?
                                </li>
                                <!-- <li>
                                    Ваши права были нарушены?
                                </li> -->
                            </ul>
                            <p class="text-lg max-xl:text-base">
                                Для нас обратная связь - возможность стать лучше и сохранить хорошие отношения с
                                клиентом.
                                <br>
                                Рассмотрение каждого обращения происходит в индивидуальном порядке.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BaseModal v-if="overlayThankVisible" @closeModal="overlayThankVisible = false">
            <template #body>
                <OverlayThank v-model:visible="overlayThankVisible" v-model:status="response" :isModal="true"
                    @sendRating="sendRating" />
            </template>
        </BaseModal>
    </section>
</template>
