// main.ts
import { createApp } from 'vue'
import App from './App.vue'

import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import primeVueRu from '@/service/locale/primeVue/ru.json'
import { definePreset } from '@primevue/themes';

import vSelect from 'vue-select'
import VueMask from '@ssibrahimbas/v-mask';
import VueEasyLightbox from 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js'
import noUiSlider from 'nouislider';

import 'primeicons/primeicons.css'

import "@vueform/slider/themes/default.scss"
import 'vue-select/dist/vue-select.css';
import 'nouislider/dist/nouislider.css';

const app = createApp(App);

app.component("v-select", vSelect);

// Provide noUiSlider
app.provide('noUiSlider', noUiSlider);

const forwardPreset = definePreset(Aura, {
    components: {
        inputtext: {
            background: 'transparent',
            borderColor: 'transparent',
            shadow: 'none',
            hoverBorderColor: 'transparent',
            paddingX: '0',
            paddingY: '0',
            focus: {
                borderColor: 'transparent',
            },
        },
        datepicker: {
            date: {
                selected: {
                    background: '#0096d8',
                },
                hover: {
                    background: '#0096d8',
                    color: '#fff',
                }
            },
            buttonbarBorderColor: 'red',
        },
        radiobutton: {
            // borderColor: '#0096d8',
            hoverBorderColor: '#0096d8',
            icon: {
                checked: {
                    color: '#0096d8',
                    hoverColor: '#0096d8',
                }
            },
            checked: {
                background: '#fff',
                borderColor: '#0096d8',
                hoverBackground: '#fff',
                hoverBorderColor: '#0096d8'
            }
        }
    }
})

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