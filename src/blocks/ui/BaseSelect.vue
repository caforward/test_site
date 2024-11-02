<script setup>
import { onBeforeMount, onBeforeUnmount, onMounted, reactive, ref } from 'vue';

const state = reactive({
    optionMenuOpened: false,
    selectedOption: null,
    error: false
})
const inputRef = ref(null)
const inputWrapperRef = ref(null)

// to remove
const placeholder = "Выберите опцию"
const options = [
    "Прошу перезвонить",
    "Узнать номер договора",
    "Разблокировать счет",
    "Рассрочка",
    "Другое",
]
// 

const props = defineProps({
    placeholder: {
        type: String,
        default: "Выберите опцию",
    },
    options: {
        type: Array,
        default: [],
    }
})

function handleInput() {
    state.optionMenuOpened = !state.optionMenuOpened

    if (state.optionMenuOpened) {
        document.addEventListener('click', closeOptionsMenuHandler)
    } else {
        document.removeEventListener('click', closeOptionsMenuHandler)
    }
}

function setActiveOption(option) {
    state.selectedOption = option
    inputRef.value.value = option
    state.optionMenuOpened = !state.optionMenuOpened
}

function clearInput() {
    inputRef.value.value = ''
    state.selectedOption = null

    if (state.optionMenuOpened) {
        state.optionMenuOpened = false
    }
}

function closeOptionsMenuHandler(e) {
    if (e.target.closest('.custom-select') !== inputWrapperRef.value) {
        state.optionMenuOpened = false
        document.removeEventListener('click', closeOptionsMenuHandler)
    }
}

onBeforeMount(() => {
    // console.log(props)
})

onMounted(() => {
    // console.log(state.value)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', closeOptionsMenuHandler)
})

</script>

<template>
    <div ref="inputWrapperRef" class="custom-select relative">
        <!-- input wrapper -->
        <div class="py-3 px-5 border rounded-md relative bg-white transition-colors hover:border-gray-400 hover:cursor-pointer select-none"
            :class="{ 'border-sky-500 hover:border-sky-300': state.selectedOption !== null, 'border-red-500': state.error === true }"
            @click="handleInput">

            <!-- input -->
            <input ref="inputRef" type="text" class="pointer-events-none placeholder:text-gray-500"
                :placeholder="placeholder" readonly>

            <!-- icons -->
            <div class="absolute right-3 top-0 h-full flex gap-3 items-center">
                <i class="pi pi-times text-gray-400 transition-colors hover:text-gray-600" @click.stop="clearInput"></i>
                <i class="pi pi-chevron-down text-gray-400"></i>
            </div>
        </div>

        <!-- option list -->
        <transition name="fade">
            <div v-if="state.optionMenuOpened"
                class="absolute mt-0.5 p-1 left-0 z-10 border rounded-md bg-white w-full">
                <ul class="flex gap-1 flex-col">
                    <li v-for="option in options" @click="setActiveOption(option)"
                        class="py-2 px-3 rounded-md hover:cursor-pointer" :class="{
                            'bg-sky-500 text-white': option === state.selectedOption,
                            'transition-colors hover:bg-gray-200': option !== state.selectedOption
                        }">

                        {{ option }}

                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>