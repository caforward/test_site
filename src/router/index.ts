// vue-router
import { createRouter, createWebHistory } from "vue-router";

// pages
import MainPage from "../views/MainPage.vue";
import About from "../views/About.vue";
import Jobs from "../views/Jobs.vue"
import PartnerPage from "../views/PartnerPage.vue";
import Installment from "../views/Installment.vue";
import Policy from "../components/PrivacyPolicy/Policy.vue";
import NotFound from "../views/NotFound.vue";
import PageComplaint from "../views/PageComplaint.vue";

const routes = [
    { path: "/", name: 'Главная', component: MainPage },
    { path: "/jobs", name: 'Вакансии', component: Jobs },
    { path: "/about", name: 'О компании', component: About },
    { path: "/for-partners", name: 'Партнёрам', component: PartnerPage },
    { path: "/policy", name: 'Политика конфиденциальности', component: Policy },
    {
        path: "/installment-plan",
        name: 'Получить рассрочку',
        component: Installment
    },
    { path: "/notFound", name: 'Ошибка 404', component: NotFound },
    { path: "/complaint", name: 'Отправить жалобу', component: PageComplaint },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }

        if (from) {}

        // return desired position
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            }
        }

        return {}
    },
});

export default router;