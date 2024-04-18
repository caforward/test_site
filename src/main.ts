import MainPage from "./views/MainPage.vue";
import About from "./views/About.vue";
import Jobs from "./views/Jobs.vue"
import PartnerPage from "./views/PartnerPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import { createApp } from 'vue'
import 'vue-select/dist/vue-select.css';
import './assets/scss/index.scss'
import App from './App.vue'
import  vSelect from 'vue-select'


const routes = [
    { name: 'Главная', path: "/", component: MainPage },
    { name: 'О компании', path: "/about", component: About },
    { name: 'Вакансии', path: "/jobs", component: Jobs },
    { name: 'Партнерам', path: "/for-partners", component: PartnerPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App)
  .component("v-select", vSelect)
  .use(router)
  .mount('#app')

