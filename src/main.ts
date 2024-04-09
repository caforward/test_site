import { createApp } from 'vue'
import 'vue-select/dist/vue-select.css';
import './assets/scss/index.scss'
import App from './App.vue'
import  vSelect from 'vue-select'

createApp(App)
.component("v-select", vSelect)
.mount('#app')
