<script setup>
// Сумма долга в рассрочке (требования заказчика от 26.10.2026): во время ввода без пробелов
// по тысячам, запятая сразу меняется на точку; вид 150 000 или 150 000.50 - после ввода
// и при вставке. В модели число, и меняется оно только после ввода: от суммы зависит
// список сроков, промежуточные числа во время набора его бы урезали
import {ref, watch} from 'vue'
import {amountTypingText, formatAmount, parseAmount} from '@/service/utils/fieldFormat.js'

const props = defineProps({
    name: {
        type: String,
        default: ''
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

// Число или null
const value = defineModel()
// typed - набранный текст, по нему считается начало заполнения
const emit = defineEmits(['blur', 'typed'])

const text = ref(formatAmount(value.value))

// значение поменяли снаружи: очистка формы после отправки
watch(value, newValue => {
    const current = newValue === '' || newValue === undefined ? null : newValue
    if (parseAmount(text.value) !== current) text.value = formatAmount(current)
})

function onInput(event) {
    const el = event.target
    const raw = el.value
    const caret = el.selectionStart ?? raw.length

    // Вставка, перетаскивание и автозаполнение: сразу тот же вид, что после ввода
    const bulk = !event.inputType || /^insertFrom|^insertReplacementText/.test(event.inputType)
    let next = amountTypingText(raw)
    if (bulk) next = formatAmount(parseAmount(next))

    if (next !== raw) {
        el.value = next
        const position = bulk || caret >= raw.length
            ? next.length
            : Math.max(0, Math.min(caret - (raw.length - next.length), next.length))
        el.setSelectionRange(position, position)
    }

    text.value = next
    if (bulk) value.value = parseAmount(next)
    emit('typed', next)
}

function onBlur() {
    const amount = parseAmount(text.value)
    text.value = formatAmount(amount)
    value.value = amount

    emit('blur')
}
</script>

<template>
    <input
        :value="text"
        class="p-inputtext p-component t-input w-full"
        :class="{ 'p-filled': text !== '', 'p-invalid': props.invalid }"
        :data-field-id="props.fieldId || undefined"
        :name="props.name"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :aria-invalid="props.invalid || undefined"
        type="text"
        inputmode="decimal"
        @input="onInput"
        @blur="onBlur"
    />
</template>
