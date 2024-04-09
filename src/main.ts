import MainPage from "./views/MainPage.vue";
import About from "./views/About.vue";
import { createWebHistory, createRouter } from "vue-router";
import { createApp } from 'vue'
import 'vue-select/dist/vue-select.css';
import './assets/scss/index.scss'
import App from './App.vue'
import  vSelect from 'vue-select'


const routes = [
    { name: '', path: "/", component: MainPage },
    { name: 'О компании', path: "/about", component: About },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App)
  .component("v-select", vSelect)
  .use(router)
  .mount('#app')

