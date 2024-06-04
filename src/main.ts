// main.ts
import { createApp } from 'vue'
import App from './App.vue'

import router from './router';
import vSelect from 'vue-select'
import noUiSlider from 'nouislider';
import VueMask from '@ssibrahimbas/v-mask';
import VueEasyLightbox from 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js'

import 'vue-select/dist/vue-select.css';
import 'nouislider/dist/nouislider.css';

const app = createApp(App);

app.component("v-select", vSelect);

// Provide noUiSlider
app.provide('noUiSlider', noUiSlider);

app.use(router);
app.use(VueMask);
app.use(VueEasyLightbox);

app.mount('#app');