<script setup>
// Дата рождения (требования заказчика от 26.10.2026): без календаря, вводится руками.
// Во время ввода запятая сразу меняется на точку, к виду ДД.ММ.ГГГГ дата приводится
// после ввода и при вставке. Разбор и проверки - parseBirthDate в fieldFormat.js
import {dateTypingText, parseBirthDate} from '@/service/utils/fieldFormat.js'

const props = defineProps({
    name: {
        type: String,
        default: 'birthdayDate'
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

// Текст поля: во время ввода как набран, после ввода ДД.ММ.ГГГГ, если дату удалось разобрать
const value = defineModel()
const emit = defineEmits(['blur'])

function onInput(event) {
    const el = event.target
    const raw = el.value
    const caret = el.selectionStart ?? raw.length

    // Вставка, перетаскивание и автозаполнение: сразу тот же вид, что после ввода
    const bulk = !event.inputType || /^insertFrom|^insertReplacementText/.test(event.inputType)
    let next = dateTypingText(raw)
    if (bulk) next = parseBirthDate(next).text

    if (next !== raw) {
        el.value = next
        // запятая на точку длину не меняет, курсор остаётся на месте
        const position = bulk ? next.length : caret
        el.setSelectionRange(position, position)
    }

    value.value = next
}

// Дата к виду ДД.ММ.ГГГГ после ввода. Зовёт и проверка по «Отправить»: Enter в поле отправляет
// форму, не уводя из него фокус, и в письмо иначе ушла бы дата как набрана. Возвращает значение
function commit() {
    const {text} = parseBirthDate(value.value)
    if (text !== (value.value ?? '')) value.value = text

    return text
}

function onBlur() {
    commit()
    emit('blur')
}

defineExpose({commit})
</script>

<template>
    <input
        :value="value ?? ''"
        class="p-inputtext p-component t-input w-full"
        :class="{ 'p-filled': !!value, 'p-invalid': props.invalid }"
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
