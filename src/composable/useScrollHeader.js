import {computed, onMounted, onUnmounted, ref} from "vue";
import {throttle} from "lodash/function.js";

export default function useScrollHeader() {
    const DEBOUNCE_THRESHOLD = 20
    const LG_BREAKPOINT = 1023
    const THROTTLE_TIME = 50

    let lastScrollPosition = ref(0)
    let headerMinimized = ref(false)
    let isMobile = computed(() => matchMedia(`(max-width: ${LG_BREAKPOINT}px)`).matches)

    function minimizeHeader() {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const scrollDiff = lastScrollPosition.value - scrollY;

        if (Math.abs(scrollDiff) > DEBOUNCE_THRESHOLD && scrollY > 0) {
            headerMinimized.value = scrollDiff < 0
            lastScrollPosition.value = scrollY
        }
    }

    const throttledMinimizeHeader = throttle(
        minimizeHeader,
        THROTTLE_TIME,
        {throttle: true, leading: false}
    )

    function handleResizeOrMount() {
        window.removeEventListener('scroll', throttledMinimizeHeader)

        if (isMobile.value) {
            headerMinimized.value = false
        } else {
            window.addEventListener('scroll', throttledMinimizeHeader)
            lastScrollPosition.value = window.scrollY || document.documentElement.scrollTop;
        }
    }

    onMounted(() => {
        handleResizeOrMount()
        window.addEventListener('resize', handleResizeOrMount)
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', throttledMinimizeHeader)
        window.removeEventListener('resize', handleResizeOrMount)
    })

    return {
        headerMinimized,
    }
}