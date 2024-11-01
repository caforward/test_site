// main.ts
import { createApp } from 'vue'
import App from './App.vue'

import router from './router';
import PrimeVue from 'primevue/config';
import primeVueRu from '@/service/locale/primeVue/ru.json'
import forwardPreset from './presets/Aura.js'
import Tooltip from 'primevue/tooltip';

import VueEasyLightbox from 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js'

import 'primeicons/primeicons.css'
import '@/assets/tailwind.css'
import '@/assets/scss/index.scss'

const app = createApp(App);

app.directive('tooltip', Tooltip);

app.use(router);
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