// main.ts
import { createApp } from 'vue'
import App from './App.vue'

import router from './router';
import vSelect from 'vue-select'
import noUiSlider from 'nouislider';
import VueTheMask from 'vue-the-mask'

import './assets/scss/index.scss'
import 'vue-select/dist/vue-select.css';
import 'nouislider/dist/nouislider.css';

const app = createApp(App);

app.component("v-select", vSelect);

// Provide noUiSlider
app.provide('noUiSlider', noUiSlider);

app.use(router);
app.use(VueTheMask);
app.mount('#app');