<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';

const value = defineModel()

const state = reactive({
    optionMenuOpened: false,
    selectedOption: null,
    error: false
})
const inputRef = ref(null)
const inputWrapperRef = ref(null)

const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: "Выберите опцию",
    },
    options: {
        type: Array,
        default: [],
    },
    invalid: {
        type: Boolean,
        default: false,
    }
})

// for open and closing options menu
function handleInput() {
    // toggle menu
    state.optionMenuOpened = !state.optionMenuOpened

    // if menu opened add event listener, else remove it
    if (state.optionMenuOpened) {
        document.addEventListener('click', closeOptionsMenuHandler)
    } else {
        document.removeEventListener('click', closeOptionsMenuHandler)
    }
}

// for set active option and set input value through modelValue
function setActiveOption(option) {
    let selectedOption = option
    
    // if options is object like { name: '',... }
    if (typeof option === 'object' && option.name !== 'null') {
        selectedOption = option.name
    }

    state.selectedOption = option
    value.value = selectedOption

    // if menu opened
    if (state.optionMenuOpened) {
        state.optionMenuOpened = false
    }
}

// for clear select, removing selected option and input value through modelValue
function clearInput() {
    value.value = ''
    state.selectedOption = null

    // if menu opened
    if (state.optionMenuOpened) {
        state.optionMenuOpened = false
    }
}

// for event listener
function closeOptionsMenuHandler(e) {
    // if clicked something other than select wrapper
    if (e.target.closest('.custom-select') !== inputWrapperRef.value) {
        state.optionMenuOpened = false
        document.removeEventListener('click', closeOptionsMenuHandler)
    }
}

// pass through props and modelValue to select
// seted selected option to modelValue
// seted input attributes if has in props
onMounted(() => {
    state.selectedOption = value.value

    // if has attribute name in props
    if (props.name) {
        inputRef.value.setAttribute('name', props.name)
    }

    // if has attribute disabled in props
    if (props.disabled) {
        inputRef.value.setAttribute('disabled', props.disabled)
    }

    // if options is object like { name: '',... }
    if (typeof value.value === 'object' && value.value.name !== 'null') {
        value.value = value.value.name
    }
})

// for removing event listener from select
onBeforeUnmount(() => {
    document.removeEventListener('click', closeOptionsMenuHandler)
})

</script>

<template>
    <div ref="inputWrapperRef" class="custom-select relative">
        {{ props.invalid }}
        <!-- input wrapper -->
        <div class="py-3 px-5 border rounded-md relative bg-white transition-colors hover:border-gray-400 hover:cursor-pointer select-none"
            :class="{ 'border-sky-500 hover:border-sky-300': state.selectedOption !== null, 'border-red-500': state.error === true }"
            @click="handleInput">

            <!-- input -->
            <input v-model="value" ref="inputRef" type="text" class=" placeholder:text-gray-500"
                :placeholder="props.placeholder" >

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
                    <li v-for="option in props.options" @click="setActiveOption(option)"
                        class="py-2 px-3 rounded-md hover:cursor-pointer" :class="{
                            'bg-sky-500 text-white': option === state.selectedOption,
                            'transition-colors hover:bg-gray-200': option !== state.selectedOption
                        }">

                        {{ option.name ? option.name : option }}

                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>