import {onMounted, onUnmounted, ref} from "vue";

export function useScreenResize() {
    const width = ref(window.innerWidth);

    function updateWidth() {
        width.value = window.innerWidth;
    }

    onMounted(() => window.addEventListener('resize', updateWidth));
    onUnmounted(() => window.removeEventListener('resize', updateWidth));

    return {width};
}