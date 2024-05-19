// vue-router
import { createRouter, createWebHistory } from "vue-router";

// pages
import MainPage from "../views/MainPage.vue";
import About from "../views/About.vue";
import Jobs from "../views/Jobs.vue"
import PartnerPage from "../views/PartnerPage.vue";
import Installment from "../views/Installment.vue";
import Policy from "../components/PrivacyPolicy/Policy.vue";

const routes = [
    { path: "/", name: 'Главная', component: MainPage },
    { path: "/jobs", name: 'Вакансии', component: Jobs },
    { path: "/about", name: 'О компании', component: About },
    { path: "/for-partners", name: 'Партнёрам', component: PartnerPage },
    { path: "/installment-plan", name: 'Получить рассрочку', component: Installment },
    { path: "/policy", name: 'Политика конфиденциальности', component: Policy },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;