<script setup>
import BaseButton from "@/blocks/ui/BaseButton.vue";
import {computed, ref} from "vue";
import {Icon} from "@iconify/vue";

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
})

const fileInputRef = ref(null);
const selectedFile = ref(null);

function triggerFileInput() {
    fileInputRef.value.click();
}

function handleFileChange(event) {
    const files = event.target.files;
    if (files.length > 0) {
        selectedFile.value = files[0]; // Берем только первый файл
    } else {
        selectedFile.value = null;
    }
}

const fileSizeDisplay = computed(() => {
    if (selectedFile.value) {
        const size = selectedFile.value.size;
        if (size > 1024 * 1024) {
            return (size / (1024 * 1024)).toFixed(2) + ' МБ';
        }
        return (size / 1024).toFixed(2) + ' КБ';
    }
    return '';
});

defineExpose({
    input: fileInputRef,
    clear() {
        if (fileInputRef.value) {
            fileInputRef.value.value = '';
        }
        selectedFile.value = null;
    }
})
</script>

<template>
    <div class="flex flex-col border border-gray-300 rounded-t-3xl rounded-b-xl w-full">
        <input
            ref="fileInputRef"
            class="hidden"
            type="file"
            v-bind="$attrs"
            :id="props.name"
            @change="handleFileChange"
            :multiple="false"
        />

        <BaseButton @click="triggerFileInput" class="gap-1">
            <Icon class="text-xl" icon="mage:file"/>
            <span>{{ label }}</span>
        </BaseButton>

        <!-- Выводим информацию о файле здесь -->
        <span v-if="selectedFile" class="p-2 text-center">
            {{ selectedFile.name }} <strong>({{ fileSizeDisplay }})</strong>
        </span>
        <span v-else class="p-2 text-center">
            Файл не выбран
        </span>
    </div>
</template>