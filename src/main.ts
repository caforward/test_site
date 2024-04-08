import { createWebHistory, createRouter } from "vue-router";
import { createApp } from 'vue'
import './assets/scss/index.scss'
import App from './App.vue'

import MainPage from "./views/MainPage.vue";
import About from "./views/About.vue";

const routes = [
    { name: 'Главная', path: "/", component: MainPage },
    { name: 'О компании', path: "/about", component: About },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount('#app')