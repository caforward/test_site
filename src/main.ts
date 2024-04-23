import { createApp } from 'vue'

// v-select
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

// styles
import './assets/scss/index.scss'
import App from './App.vue'

// router
import router from './router';


createApp(App)
    .component("v-select", vSelect)
    .use(router)
    .mount('#app')

