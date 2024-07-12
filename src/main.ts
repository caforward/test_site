// main.ts
import { createApp } from 'vue'
import App from './App.vue'

import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import vSelect from 'vue-select'
import VueMask from '@ssibrahimbas/v-mask';
import VueEasyLightbox from 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js'
import noUiSlider from 'nouislider';
import primeVueRu from '@/service/locale/primeVue/ru.json'

import "@vueform/slider/themes/default.scss"
import 'vue-select/dist/vue-select.css';
import 'nouislider/dist/nouislider.css';

const app = createApp(App);

app.component("v-select", vSelect);

// Provide noUiSlider
app.provide('noUiSlider', noUiSlider);

app.use(router);
app.use(VueMask);
app.use(VueEasyLightbox);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.mode-dark',
        }
    },
    locale: primeVueRu
})

app.mount('#app');