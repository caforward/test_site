// vue-router
import { createRouter, createWebHistory } from "vue-router";

// pages
import MainPage from "../views/MainPage.vue";
import About from "../views/About.vue";
import Jobs from "../views/Jobs.vue"
import PartnerPage from "../views/PartnerPage.vue";
import Policy from "../components/PrivacyPolicy/Policy.vue";
import NotFound from "../views/NotFound.vue";
import PageComplaint from "../views/PageComplaint.vue";
import PagePayment from "../views/PagePayment.vue";

const routes = [
    {path: "/", name: 'Главная', component: MainPage},
    {path: "/jobs", name: 'Вакансии', component: Jobs},
    {path: "/about", name: 'О компании', component: About},
    {path: "/for-partners", name: 'Партнёрам', component: PartnerPage},
    {path: "/policy", name: 'Политика конфиденциальности', component: Policy},
    // Страница рассрочки /installment-plan отключена, адрес показывает 404, рассрочка везде открывается окном с формой.
    // Код страницы оставлен в views/Installment.vue, чтобы вернуть: импорт Installment и маршрут
    // {path: "/installment-plan", name: 'Получить рассрочку', component: Installment}
    {path: "/notFound", name: 'Ошибка 404', component: NotFound},
    {path: "/complaint", name: 'Отправить жалобу', component: PageComplaint},
    {path: "/payment", name: 'Оплатить', component: PagePayment},
    // Любой другой адрес - страница 404, адрес в строке остаётся тем, по которому пришли
    {path: "/:pathMatch(.*)*", name: 'Страница не найдена', component: NotFound},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }

        // Якорь проверяем раньше, чем ту же страницу: клик по /#payment на главной -
        // переход на ту же страницу, и наверх роутер уводил её уже после того, как
        // браузер докрутил до формы. В Firefox так якорь срабатывал только со второго раза
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            }
        }

        if (from && from.path === to.path) {
            return {top: 0}
        }

        return {}
    },
});

export default router;