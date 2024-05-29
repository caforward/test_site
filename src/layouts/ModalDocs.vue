<template>
    <transition name="fade">
        <Modal v-if="visible">
            <div class="modal-body">
                <div class="close-button" @click="closeModal">
                    <img src="/assets/images/close_x/Vector.png" alt="krestik" />
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
                            <a :href="file.href" :title="file.name">
                                <div>
                                    <img src="/assets/images/pdf.png" alt="">
                                </div>
                                <div>
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
        </Modal>
    </transition>
</template>

<script>
import Modal from '../blocks/Modal.vue';

export default {
    components: {
        Modal,
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        toShowIndex: {
            type: Number,
            default: 0
        }
    },
    emits: ["close"],
    data() {
        return {
            docs: [
                {
                    title: "Общие сведения",
                    content: [
                        {
                            title: 'Реквизиты',
                            text: "ОГРН 1145476156055 от 11 декабря 2014 г. <br/> ИНН / КПП 5406796664 / 540701001"
                        },
                        {
                            title: 'Юридический адрес',
                            text: "Россия, 630007, г. Новосибирск, л. Урицкого, д. 21, этаж 3, помещение 7,9,10,11,12,13,14,15,16"
                        },
                        {
                            title: 'Генеральный директор:',
                            text: "Степанов Иван Александрович"
                        },
                        // {
                        //     title: 'Уставный капитал:',
                        //     text: ""
                        // },
                    ]
                },
                {
                    title: "Учредительные документы",
                    files: [
                        { name: 'Устав ООО ПКО "Форвард"', href: '#' },
                    ]
                },
                {
                    title: "Эмиссионные документы",
                    files: [
                        { name: 'Программа КО', href: '#' },
                        { name: 'Условия КО, размещаемых в рамках Программы', href: '#' },
                        { name: 'Решение о выпуске КО, размещаемых в рамках программы КО', href: '#' },
                        { name: 'Решение о 3-м выпуске КО', href: '#' },
                        { name: 'Условия размещения 3-го выпуска КО', href: '#' },
                    ]
                },
                {
                    title: "Сообщения",
                    files: [
                        { name: 'Cообщение о дате начала размещения ценных бумаг', href: '#' },
                        { name: 'Cообщение об изменении (переносе) даты начала размещения ценных бумаг', href: '#' },
                        { name: 'Cообщение о дате начала размещения ценных бумаг', href: '#' },
                        { name: 'Сообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами', href: '#' },
                        { name: 'Сообщение об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами', href: '#' },
                        { name: 'Сообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами 06.10.2020', href: '#' },
                        { name: 'Cообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 23.10.2020', href: '#' },
                        { name: 'Cообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами 17.12.2020', href: '#' },
                        { name: 'Cообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 13.01.2021', href: '#' },
                        { name: 'Сообщение о дате начала размещения ценных бумаг 3 выпуска', href: '#' },
                        { name: 'Cообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами 05.03.2021', href: '#' },
                        { name: 'Cообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 25.03.2021', href: '#' },
                        { name: 'Сообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами 13.05.2021', href: '#' },
                        { name: 'Cообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 01.06.2021', href: '#' },
                        { name: 'Сообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами 15.06.2021', href: '#' },
                        { name: 'Cообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 02.07.2021', href: '#' },
                        { name: 'Cообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами 15.07.2021', href: '#' },
                        { name: 'Сообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 04.08.2021', href: '#' },
                        { name: 'Cообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами 31.08.2021', href: '#' },
                        { name: 'Cообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 17.09.2021', href: '#' },
                        { name: 'Сообщение о принятии решения о приобретении Эмитентом Облигаций по соглашению с их владельцами 11.01.2022', href: '#' },
                        { name: 'Сообщение Об итогах приобретения Эмитентом Облигаций по соглашению с их владельцами 31.01.2022', href: '#' },
                    ]
                },
            ]
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
    },
    updated() {
        if (this.visible) {
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = '10px'
        } else {
            document.body.style.paddingRight = ''
            document.body.style.overflow = ''
        }
    },
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.modal {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 10px;
    display: flex;
    justify-content: center;
    overflow-y: auto;

    &-body {
        position: relative;
        padding: 40px;
        background-color: #fff;
        border-radius: 30px;
        width: 100%;
        max-width: 960px;
        padding: 40px;

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

                &>li {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

                & a {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    color: $black;
                    transition: color .2s;

                    img {
                        width: 40px;
                        height: 40px;
                        flex: none;
                    }

                    &:hover {
                        color: $blue;
                    }
                }
            }
        }
    }
}

.close-button {
    position: absolute;
    top: 35px;
    right: 40px;
    cursor: pointer;
}

@include mobile {
    .modal {
        &-body {
            padding: 30px 20px;

            &-content {
                &__list {
                    font-size: 14px;
                    font-weight: bold;

                    &>* {
                        width: 100%;
                        margin-bottom: 10px;
                    }

                    &>:nth-child(2n) {
                        font-weight: 400;
                    }
                }
            }
        }
    }
}
</style>