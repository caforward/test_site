<script setup>
// Поле телефона (требования заказчика от 26.10.2026). Код страны +7 - подпись перед полем,
// а не часть текста: её нельзя стереть, и она не мешает выделять и править номер.
// В поле набираются только цифры, вид 999 123-45-67 номер получает после ввода и при вставке.
// Обычный input с классами PrimeVue: у InputText своё внутреннее значение, и после
// чистки набранного текста оно расходилось бы с тем, что видно в поле
import {computed, ref, watch} from 'vue'
import {formatPhoneDisplay, phoneDigits, phoneTypingText, phoneValue} from '@/service/utils/fieldFormat.js'

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

const text = ref(formatPhoneDisplay(phoneDigits(value.value)))
const focused = ref(false)
const showPrefix = computed(() => focused.value || text.value !== '')

// значение поменяли снаружи: очистка формы после отправки
watch(value, newValue => {
    if (phoneValue(phoneDigits(text.value)) !== (newValue || '')) {
        text.value = formatPhoneDisplay(phoneDigits(newValue))
    }
})

// Позиция в тексте сразу после count-й цифры
function positionAfterDigits(str, count) {
    if (count <= 0) return 0

    let seen = 0
    for (let i = 0; i < str.length; i++) {
        if (/\d/.test(str[i]) && ++seen === count) return i + 1
    }
    return str.length
}

// Набирать можно только цифры, «+» - только первым символом: так набирают +7
function onBeforeInput(event) {
    if (event.inputType !== 'insertText' || !event.data) return

    const el = event.target
    const atStart = el.value.slice(0, el.selectionStart ?? 0).trim() === ''
    if (/^\d+$/.test(event.data) || (event.data === '+' && atStart)) return

    event.preventDefault()
}

function onInput(event) {
    const el = event.target
    const raw = el.value
    const caret = el.selectionStart ?? raw.length

    // Вставка, перетаскивание и автозаполнение: сразу тот же вид, что после ввода
    const bulk = !event.inputType || /^insertFrom|^insertReplacementText/.test(event.inputType)
    let next = phoneTypingText(raw)
    if (bulk) next = formatPhoneDisplay(phoneDigits(next))

    if (next !== raw) {
        el.value = next
        const digitsBefore = raw.slice(0, caret).replace(/\D/g, '').length
        const position = bulk || caret >= raw.length
            ? next.length
            : positionAfterDigits(next, Math.min(digitsBefore, next.replace(/\D/g, '').length))
        el.setSelectionRange(position, position)
    }

    text.value = next
    value.value = phoneValue(phoneDigits(next))
}

function onBlur() {
    focused.value = false

    const digits = phoneDigits(text.value)
    text.value = formatPhoneDisplay(digits)
    value.value = phoneValue(digits)

    emit('blur')
}
</script>

<template>
    <div class="phone-input" :class="{ 'phone-input_prefixed': showPrefix }">
        <span v-show="showPrefix" class="phone-input__prefix" aria-hidden="true">+7</span>
        <input
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
            @focus="focused = true"
            @blur="onBlur"
        />
    </div>
</template>

<style lang="scss">
.phone-input {
    position: relative;
    width: 100%;

    &__prefix {
        position: absolute;
        top: 50%;
        left: var(--p-inputtext-padding-x, 0.75rem);
        transform: translateY(-50%);
        pointer-events: none;
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
