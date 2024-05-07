// main.ts
import { createApp } from 'vue'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import noUiSlider from 'nouislider';
import './assets/scss/index.scss'
import 'nouislider/dist/nouislider.css';
import App from './App.vue'
import router from './router';

const app = createApp(App);

app.component("v-select", vSelect);

// Provide noUiSlider
app.provide('noUiSlider', noUiSlider);

app.use(router);
app.mount('#app');