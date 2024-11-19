<script setup>
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';

const value = defineModel()

const state = reactive({
    optionMenuOpened: false,
    selectedOption: null,
})

const inputRef = ref(null)
const inputWrapperRef = ref(null)

const props = defineProps({
    name: {
        type: String,
        default: ''
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
    },
    disabled: {
        type: Boolean,
        default: false
    },
    visible: {
        type: Boolean,
        default: true,
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
    state.selectedOption = option
    value.value = option

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
    // if has attribute name in props
    if (props.name) {
        inputRef.value.setAttribute('name', props.name)
    }

    // if has attribute disabled in props
    if (props.disabled) {
        inputRef.value.setAttribute('disabled', props.disabled)
    }

    state.selectedOption = value.value
})

// for removing event listener from select
onBeforeUnmount(() => {
    document.removeEventListener('click', closeOptionsMenuHandler)
})

</script>

<template>
    <div ref="inputWrapperRef" class="custom-select relative" :class="{ 'hidden': props.visible === false }">
        <!-- input wrapper -->
        <div class="py-3 px-5 border rounded-md relative bg-white transition-colors hover:border-gray-400 hover:cursor-pointer select-none"
            :class="{ 'border-sky-500 hover:border-sky-300': state.selectedOption !== null, 'border-red-500 hover:border-red-300': props.invalid === true, 'border-sky-500 bg-gray-50 pointer-events-none': props.disabled === true }"
            @click="handleInput">

            <!-- input -->
            <input ref="inputRef" type="text" class="pointer-events-none w-full placeholder:text-gray-500"
                :class="{ 'bg-gray-50': props.disabled === true }" :placeholder="props.placeholder" :value="value"
                readonly>

            <!-- icons -->
            <div class="absolute right-3 top-0 h-full flex gap-3 items-center"
                :class="{ 'hidden': props.disabled === true }">
                <i class="pi pi-times text-gray-400 transition-colors hover:text-gray-600" @click.stop="clearInput"></i>
                <i class="pi pi-chevron-down text-gray-400"></i>
            </div>
        </div>

        <!-- option list -->
        <transition name="fade">
            <div v-if="state.optionMenuOpened"
                class="absolute mt-0.5 p-1 left-0 z-10 border rounded-md bg-white w-full">

                <ul class="flex gap-1 flex-col overflow-auto max-h-56">

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

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;

input,
ul {
    color: var.$black;
}
</style>