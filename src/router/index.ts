// vue-router
import { createRouter, createWebHistory } from "vue-router";

// pages
import MainPage from "../views/MainPage.vue";
import About from "../views/About.vue";
import Jobs from "../views/Jobs.vue"
import PartnerPage from "../views/PartnerPage.vue";

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

export default router;