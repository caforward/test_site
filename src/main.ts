// main.ts
import { createApp } from 'vue'
import App from './App.vue'

import router from './router';
import PrimeVue from 'primevue/config';
import primeVueRu from '@/service/locale/primeVue/ru.json'
import forwardPreset from './presets/Aura.js'
import Tooltip from 'primevue/tooltip';

import vSelect from 'vue-select'
import VueMask from '@ssibrahimbas/v-mask';
import VueEasyLightbox from 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js'
import noUiSlider from 'nouislider';

import 'primeicons/primeicons.css'
import '@/assets/tailwind.css'

import "@vueform/slider/themes/default.scss"
import 'vue-select/dist/vue-select.css';
import 'nouislider/dist/nouislider.css';

const app = createApp(App);

app.component("v-select", vSelect);

// Provide noUiSlider
app.provide('noUiSlider', noUiSlider);
app.directive('tooltip', Tooltip);

app.use(router);
app.use(VueMask);
app.use(VueEasyLightbox);
app.use(PrimeVue, {
    theme: {
        preset: forwardPreset,
        options: {
            darkModeSelector: '.mode-dark',
        }
    },
    locale: primeVueRu,
})

app.mount('#app');