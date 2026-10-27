<script setup>
// Поле телефона (требования заказчика от 26.10.2026). Код страны +7 - подпись перед полем,
// а не часть текста: её нельзя стереть, и она не мешает выделять и править номер.
// В поле набираются только цифры. С 27.10.2026 по просьбе заказчика номер разбивается
// прямо при вводе (999 123-45-67), правка при этом не мешает: курсор остаётся на месте,
// Backspace и Delete перескакивают пробел и дефис. Логика правки - phoneEdit в fieldFormat.js.
// Обычный input с классами PrimeVue: у InputText своё внутреннее значение, и после
// разбивки текста оно расходилось бы с тем, что видно в поле
import {computed, ref, watch} from 'vue'
import {formatPhoneDisplay, phoneDigits, phoneEdit, phoneValue, PHONE_MAX_DIGITS} from '@/service/utils/fieldFormat.js'

const props = defineProps({
    name: {
        type: String,
        default: 'tel'
    },
    fieldId: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    },
    invalid: {
        type: Boolean,
        default: false
    },
})

// +7 999 123-45-67, пока номер не полный - +7 и набранные цифры, пустое поле - пустая строка
const value = defineModel()
const emit = defineEmits(['blur'])

const inputEl = ref(null)
const text = ref(formatPhoneDisplay(phoneDigits(value.value)))
const focused = ref(false)
const showPrefix = computed(() => focused.value || text.value !== '')

// значение поменяли снаружи: очистка формы после отправки
watch(value, newValue => {
    if (phoneValue(phoneDigits(text.value)) !== (newValue || '')) {
        text.value = formatPhoneDisplay(phoneDigits(newValue))
    }
})

// Набирать можно только цифры, «+» - только первым символом: так набирают +7.
// Двенадцатая цифра не набирается, если не заменяет выделенное
function onBeforeInput(event) {
    if (event.inputType !== 'insertText' || !event.data) return

    const el = event.target
    const start = el.selectionStart ?? el.value.length
    const atStart = el.value.slice(0, start).trim() === ''
    if (event.data === '+' && atStart) return

    const full = el.value.replace(/\D/g, '').length >= PHONE_MAX_DIGITS && start === el.selectionEnd
    if (/^\d+$/.test(event.data) && !full) return

    event.preventDefault()
}

function applyEdit(el, inputType) {
    const {text: next, caret} = phoneEdit(text.value, el.value, el.selectionStart, inputType)

    if (next !== el.value) el.value = next
    if (el.selectionStart !== caret || el.selectionEnd !== caret) el.setSelectionRange(caret, caret)

    text.value = next
    value.value = phoneValue(phoneDigits(next))
}

function onInput(event) {
    // пока клавиатура телефона собирает символ, текст не трогаем - разберём по compositionend
    if (event.isComposing) return

    applyEdit(event.target, event.inputType || '')
}

function onCompositionEnd(event) {
    applyEdit(event.target, 'insertText')
}

// Клик по подписи +7: курсор в конец номера, а не перед первой цифрой
function focusAtEnd() {
    const el = inputEl.value
    if (!el || props.disabled) return

    el.focus()
    el.setSelectionRange(el.value.length, el.value.length)
}

// Номер к виду после ввода. Зовёт и проверка по «Отправить»: Enter в поле отправляет
// форму, не уводя из него фокус. Возвращает значение для формы
function commit() {
    const digits = phoneDigits(text.value)
    text.value = formatPhoneDisplay(digits)
    value.value = phoneValue(digits)

    return value.value
}

function onBlur() {
    focused.value = false
    commit()
    emit('blur')
}

defineExpose({commit})
</script>

<template>
    <div class="phone-input" :class="{ 'phone-input_prefixed': showPrefix }">
        <span v-show="showPrefix" class="phone-input__prefix" aria-hidden="true" @mousedown.prevent="focusAtEnd">+7</span>
        <input
            ref="inputEl"
            :value="text"
            class="p-inputtext p-component t-input w-full"
            :class="{ 'p-filled': text !== '', 'p-invalid': props.invalid }"
            :data-field-id="props.fieldId || undefined"
            :name="props.name"
            :placeholder="showPrefix ? '' : props.placeholder"
            :disabled="props.disabled"
            :aria-invalid="props.invalid || undefined"
            type="tel"
            inputmode="tel"
            autocomplete="tel"
            @beforeinput="onBeforeInput"
            @input="onInput"
            @compositionend="onCompositionEnd"
            @focus="focused = true"
            @blur="onBlur"
        />
    </div>
</template>

<style lang="scss">
.phone-input {
    position: relative;
    width: 100%;

    // подпись закрывает левый край поля до номера: клик туда ставит курсор в конец номера
    &__prefix {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        padding-left: var(--p-inputtext-padding-x, 0.75rem);
        padding-right: 0.25em;
        cursor: text;
        user-select: none;
        color: var(--p-inputtext-color, inherit);
        font-size: var(--p-inputtext-font-size, 1rem);
        line-height: 1;
    }

    // ширина «+7 » с пробелом: номер стоит через пробел после подписи, как в +7 999 123-45-67
    &_prefixed .p-inputtext {
        padding-left: calc(var(--p-inputtext-padding-x, 0.75rem) + 1.45em);
    }
}
</style>
