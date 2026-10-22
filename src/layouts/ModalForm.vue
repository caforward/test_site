<script setup>
import {onMounted, ref, watch} from "vue";
import BaseModal from '@/blocks/BaseModal.vue';
import BaseForm from "@/blocks/form/BaseForm.vue";
import OverlayThank from '@/layouts/OverlayThank.vue';
import {getPageUrl, resolveFormId, sendMetrikaEvent, sendTrackId} from "@/service/utils/metrika.js";
import {FILE_BLOCKED_TEXT, formHasFile, formRequestBody, isFileBlocked} from "@/service/utils/formRequest.js";

const visible = defineModel()
const response = ref(null)
const overlayThankVisible = ref(false)
const userName = ref(null)
const errorText = ref('')

const props = defineProps({
    type: {
        type: String,
        default: ''
    },
    showTitle: {
        type: Boolean,
        default: true,
    },
    formMetrikaId: {
        type: String,
        default: '',
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
                required: true
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
                    {value: '', theme: 'bki', label: 'Внесение изменений в БКИ'},
                    {value: '', theme: 'mobilization', label: 'Информация о мобилизации'},
                    {value: 'refund', label: 'О возврате денежных средств'},
                    {value: 'account-unblock', label: 'Разблокировка счетов'},
                    {value: '', theme: 'refusal', label: 'Отказ от взаимодействия'},
                    {value: 'claim', label: 'Претензия'},
                    {value: '', theme: 'repayment-certificate', label: 'Справка о погашении задолженности'},
                    {value: '', theme: 'debt-status-certificate', label: 'Справка о состоянии задолженности'},
                    {value: 'cancel-ip', label: 'Отозвать ИП'},
                    {value: 'get-contract-id', label: 'Узнать номер договора'},
                ],
            },
            {
                name: 'file_attachment',
                type: 'file',
                required: true,
            },
            {
                name: 'claim',
                type: 'textarea',
                placeholder: 'Кратко опишите Ваш вопрос*',
                maxLength: 140,
                required: true,
            }
        ]
    }
})

// id окна для кликов закрытия (btn_close_modal_<form>, area_close_modal_<form>).
// Считается при каждом открытии, как form в form_open: тема меняется прямо в массиве inputs,
// а он не реактивный, поэтому computed запоминал форму первого открытого окна
const modalId = ref(resolveFormId(props.formMetrikaId, props.inputs))

async function sendData(formData, formInputRefs, meta = {}) {
    // Повторный Enter или клик, пока идёт отправка, второго письма не шлёт:
    // форма уже закрыта заставкой
    if (overlayThankVisible.value) return

    overlayThankVisible.value = true
    userName.value = formData.get('name')

    // Для тестирования пустых писем
    formData.append('fromComponent', 'ModalForm')
    // Для тестирования пустых писем

    // УИД заявки на рассрочку: tid уходит в Метрику событием track_id, в письмо строкой «УИД»
    // и в form_submitted - по нему письмо связывается с визитом. Пока только у рассрочки (заказчик 21.10)
    const formId = resolveFormId(props.formMetrikaId, props.inputs)
    const tid = formId === 'installment' ? sendTrackId() : undefined
    if (tid) formData.append('tid', tid)

    const withFile = formHasFile(formData)
    errorText.value = ''

    try {
        response.value = await fetch(props.fetchUrl, {
            method: 'POST',
            body: await formRequestBody(formData)
        })

        if (response.value.ok) {
            formInputRefs.forEach(inputRef => {
                inputRef.clearValue()
            })

            // Отправка метрики (отвправка формы). theme есть только у debt-info, tid только у installment
            const params = {form: formId}
            if (meta.theme) params.theme = meta.theme
            params.from = 'modal'
            params.url = getPageUrl()
            if (tid) params.tid = tid
            sendMetrikaEvent('form_submitted', params);
        } else {
            // экран ошибки остаётся на месте: раньше он сразу закрывался, и казалось, что кнопка ничего не делает
            console.warn('Ошибка отправки, статус:', response.value.status);
            if (isFileBlocked(response.value, withFile)) errorText.value = FILE_BLOCKED_TEXT
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
            body: await formRequestBody(postData)
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
                "get-contract-id": 12,
                "complaint": 8,
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

watch(
    () => visible.value,
    () => {
        if (visible.value) {
            setSelectorByType(props.type);
            modalId.value = resolveFormId(props.formMetrikaId, props.inputs);

            const browserScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = browserScrollbarWidth + 'px'

            const url = getPageUrl();
            sendMetrikaEvent('form_open', {
                form: resolveFormId(props.formMetrikaId, props.inputs),
                url
            });
        } else {
            document.body.style.paddingRight = ''
            document.body.style.overflow = ''
        }
    }
)
</script>

<template>
    <transition name="fade">
        <BaseModal
            id="requisites"
            v-if="visible"
            :modal-id="modalId"
            @closeModal="visible = false"
        >
            <template #body>
                <slot name="topBodyContent"></slot>

                <BaseForm
                    :showTitle="showTitle"
                    :inputs="inputs"
                    :grayForm="true"
                    :form-metrika-id="props.formMetrikaId"
                    metrika-from="modal"
                    @submitted="sendData"
                />
                <OverlayThank
                    v-model:visible="overlayThankVisible"
                    v-model:status="response"
                    :error-text="errorText"
                    @closeParentModal="visible = false"
                    @sendRating="sendRating"
                />
            </template>
        </BaseModal>
    </transition>
</template>

<style lang="scss" scoped></style>