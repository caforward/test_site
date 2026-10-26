// Согласие с баннером cookies. Состояние общее для баннера (BaseCookie.vue) и форм заявок:
// после успешной отправки формы согласие считается полученным и баннер больше не показывается
// (требование заказчика от 26.10.2026)
import {ref} from 'vue'

export const cookieBannerVisible = ref(false)

export function showCookieBannerIfNeeded() {
    try {
        cookieBannerVisible.value = !localStorage.getItem('cookiesAccepted')
    } catch {
        cookieBannerVisible.value = true
    }
}

export function acceptCookies() {
    try {
        localStorage.setItem('cookiesAccepted', 'true')
    } catch {
        // без localStorage баннер скроется до перезагрузки страницы
    }

    cookieBannerVisible.value = false
    // виджет звонка поднят над баннером, возвращаем его на место (index.html)
    window.cookiePlateVisible = false
    window.checkCookiesAccepted?.()
}
