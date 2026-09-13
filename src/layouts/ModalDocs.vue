<script setup>
import {ref, onUpdated, watch} from 'vue'
import BaseModal from '@/blocks/BaseModal.vue';
import {sendMetrikaEvent} from "@/service/utils/metrika.js";

const emits = defineEmits(['close'])

const visible = defineModel()
const props = defineProps({
    toShowIndex: {
        type: Number,
        default: 0
    }
})

const docs = ref([
    {
        title: "Общие сведения",
        content: [
            {
                id: 0,
                title: 'Реквизиты',
                text: "ОГРН 1145476156055 от 11 декабря 2014 г. <br/> ИНН / КПП 5406796664 / 540701001"
            },
            {
                id: 1,
                title: 'Юридический адрес',
                text: "Россия, 630007, г. Новосибирск, л. Урицкого, д. 21, этаж 3, помещение 7,9,10,11,12,13,14,15,16"
            },
            {
                id: 2,
                title: 'Генеральный директор:',
                text: "Степанов Иван Александрович"
            },
            // {
            // id: 3,
            //     title: 'Уставный капитал:',
            //     text: ""
            // },
        ]
    },
    {
        title: "Учредительные документы",
        files: [
            {
                id: 0,
                name: 'Устав ООО ПКО "Форвард"',
                filename: 'uchreditelnie/Устав ООО ПКО Форвард 08.07.2020.pdf'
            },
        ]
    },
    {
        title: "Эмиссионные документы",
        files: [
            {
                id: 0,
                name: 'Программа КО',
                filename: 'emissionie/programma KO_Forward.pdf'
            },
            {
                id: 1,
                name: 'Условия КО, размещаемых в рамках Программы',
                filename: 'emissionie/conditions KO _ Forward с рег.номером.pdf'
            },
            {
                id: 2,
                name: 'Решение о выпуске КО, размещаемых в рамках программы КО',
                filename: 'emissionie/Решение о выпуске КО, размещаемых в рамках программы КО.pdf'
            },
            {
                id: 3,
                name: 'Решение о 3-м выпуске КО',
                filename: 'emissionie/Решение о 3-м выпуске КО, размещаемых в рамках программы КО.pdf'
            },
            {
                id: 4,
                name: 'Условия размещения 3-го выпуска КО',
                filename: 'emissionie/Условия размещения 3-го выпуска КО в рамках Программы.pdf'
            },
        ]
    },
    {
        title: "Сообщения",
        files: [
            {
                id: 0,
                name: 'Cообщение о дате начала размещения ценных бумаг',
                filename: 'messages/сообщение о дате начала размещения.pdf'
            },
            {
                id: 1,
                name: 'Cообщение об изменении (переносе) даты начала размещения ценных бумаг',
                filename: 'messages/сообщение об изменении (переносе) даты начала размещения.pdf'
            },
            {
                id: 2,
                name: 'Cообщение о дате начала размещения ценных бумаг',
                filename: 'messages/сообщение о дате начала размещения ценных бумаг.pdf'
            },
            {
                id: 3,
                name: 'Сообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами',
                filename: 'messages/сообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами.pdf'
            },
            {
                id: 4,
                name: 'Сообщение об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами',
                filename: 'messages/Сообщение об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами.pdf'
            },
            {
                id: 5,
                name: 'Сообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами 06.10.2020',
                filename: 'messages/сообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами 06102020.pdf'
            },
            {
                id: 6,
                name: 'Cообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 23.10.2020',
                filename: 'messages/сообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 23.10.2020.pdf'
            },
            {
                id: 7,
                name: 'Cообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами 17.12.2020',
                filename: 'messages/сообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами_17122020.pdf'
            },
            {
                id: 8,
                name: 'Cообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 13.01.2021',
                filename: 'messages/сообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 13.01.2021.pdf'
            },
            {
                id: 9,
                name: 'Сообщение о дате начала размещения ценных бумаг 3 выпуска',
                filename: 'messages/сообщение о дате начала размещения ценных бумаг 3 выпуска.pdf'
            },
            {
                id: 10,
                name: 'Cообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами 05.03.2021',
                filename: 'messages/сообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами_05.03.2021.pdf'
            },
            {
                id: 11,
                name: 'Cообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 25.03.2021',
                filename: 'messages/сообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 25.03.2021.pdf'
            },
            {
                id: 12,
                name: 'Сообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами 13.05.2021',
                filename: 'messages/Сообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами_13.05.2021.pdf'
            },
            {
                id: 13,
                name: 'Cообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 01.06.2021',
                filename: 'messages/сообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 01.06.2021.pdf'
            },
            {
                id: 14,
                name: 'Сообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами 15.06.2021',
                filename: 'messages/сообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами_15.06.2021.pdf'
            },
            {
                id: 15,
                name: 'Cообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 02.07.2021',
                filename: 'messages/сообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 02.07.2021.pdf'
            },
            // {
            // id: 16,
            //     name: 'Cообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами 15.07.2021',
            //     filename: 'messages/'
            // },
            {
                id: 17,
                name: 'Сообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 04.08.2021',
                filename: 'messages/Сообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 04.08.2021.pdf'
            },
            {
                id: 18,
                name: 'Cообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами 31.08.2021',
                filename: 'messages/сообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами_31.08.2021.pdf'
            },
            {
                id: 19,
                name: 'Cообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 17.09.2021',
                filename: 'messages/cообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 17.09.2021.pdf'
            },
            {
                id: 20,
                name: 'Сообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами 11.01.2022',
                filename: 'messages/сообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами_11.01.2022.pdf'
            },
            {
                id: 21,
                name: 'Сообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 31.01.2022',
                filename: 'messages/Сообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 31.01.2022.pdf'
            },
        ]
    },
])

watch(
    () => visible.value,
    (isVisible) => {
        if (isVisible) {
            const browserScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = browserScrollbarWidth + 'px';

            const url = window.location.href.split('#')[0];
            sendMetrikaEvent('form_open', {id: 'documents', url});
        } else {
            document.body.style.paddingRight = '';
            document.body.style.overflow = '';
        }
    }
)
</script>

<template>
    <transition name="fade">
        <BaseModal v-if="visible" modal-id="documents">
            <div class="modal-body">
                <div class="close-button" @click="visible = false" data-id="btn_close_documents_modal">
                    <i class="pi pi-times !text-xl"></i>
                </div>
                <h2 class="modal-body__title">
                    {{ docs[toShowIndex].title }}
                </h2>
                <div class="modal-body-content">
                    <ul class="modal-body-content__list modal-body-content__list">
                        <li v-for="(article, idx) in docs[toShowIndex].content" :key="idx">
                            <div>{{ article.title }}</div>
                            <div>
                                <b v-html="article.text"></b>
                            </div>
                        </li>
                    </ul>
                    <ul class="modal-body-content__list modal-body-content__list_files">
                        <li v-for="(file, idx) in docs[toShowIndex].files" :key="idx">
                            <a :href="'/docs/' + file.filename" :title="file.name" target="_blank"
                               :data-id="`documents_download_${toShowIndex}_${idx}`">
                                <div>
                                    <img src="/images/pdf.png" alt="">
                                </div>
                                <div class="text-slate-800 hover:text-sky-600">
                                    <div>
                                        <b>
                                            {{ file.name }}
                                        </b>
                                    </div>
                                    <div>
                                        Скачать pdf
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </BaseModal>
    </transition>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

.modal {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 10px;
    overflow-y: auto;

    &-body {
        position: relative;
        padding: 40px;
        background-color: #fff;
        border-radius: 30px;
        width: 100%;
        max-width: 960px;

        &__title {
            margin-bottom: 20px;
        }

        &-content {
            &__list {
                display: flex;
                flex-direction: column;
                gap: 30px;
                margin-bottom: 20px;

                &_files {
                    gap: 20px;
                }

                & > li {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

                & a {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    color: var.$gray;
                    transition: color .2s;

                    img {
                        width: 40px;
                        height: 40px;
                        flex: none;
                    }

                    &:hover {
                        color: var.$blue;
                    }
                }
            }
        }
    }
}

.close-button {
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

@include mixin.tablet {
    .modal {
        &-body {
            padding: 30px 20px;

            &-content {
                &__list {
                    font-size: 14px;
                    font-weight: bold;

                    & > * {
                        width: 100%;
                        margin-bottom: 10px;
                    }

                    & > :nth-child(2n) {
                        font-weight: 400;
                    }
                }
            }
        }
    }
}
</style>