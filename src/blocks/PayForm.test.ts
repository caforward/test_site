// import {describe, expect, it, vi} from "vitest";
// import {mount} from "@vue/test-utils";
// import PayForm from "./PayForm.vue";
// import {createRouter, createWebHistory} from "vue-router";
// import MainPage from "../views/MainPage.vue";
// import PrimeVue from "primevue/config";
// import BaseInput from "./ui/BaseInput.vue";
// import BaseButton from "./ui/BaseButton.vue";
//
// const router = createRouter({
//     history: createWebHistory(),
//     routes: [{path: "/", component: MainPage}],
// });
//
// describe("PayForm", () => {
//
//     it('Способ оплаты: картой; Контакт для обратной связи: Телефон;', async () => {
//         // Монтирование
//         const wrapper = mount(PayForm, {
//             global: {
//                 plugins: [router, PrimeVue]
//             }
//         });
//
//         // Отслеживание вызова функций
//         const paymentPaySpyMock = vi.spyOn(wrapper.vm, "paymentPay").mockImplementation(() => {
//             // Эта функция просто существует и ничего не делает,
//             // не вызывая ошибку TypeError на amount.value
//         });
//         const validateFormSpy = vi.spyOn(wrapper.vm, 'validateForm');
//
//         // Поиск нужных элементов
//         const form = wrapper.find("form");
//         const inputName = form.find("input[name='name']");
//         const inputUserAmount = form.find("input[name='userAmount']");
//         const inputContractId = form.find("input[name='contractId']");
//         const inputPhone = form.find("input[name='phone']");
//         const submitButton = form.find("button");
//
//         // Симуляция ввода данных
//         await inputName.setValue('autotest autotest')
//         await inputUserAmount.setValue('111')
//         await inputContractId.setValue('123')
//         await inputPhone.setValue('1111111111')
//
//         expect(inputUserAmount.attributes('name')).toBe('userAmount');
//         console.log("DEBUG: value in DOM:", inputUserAmount.element.value)
//
//         // Симуляция отправки формы
//         await submitButton.trigger('click');
//
//         await form.trigger("submit");
//         await wrapper.vm.$nextTick()
//         expect(validateFormSpy).toHaveBeenCalled();
//         expect(validateFormSpy).toHaveBeenCalledTimes(1);
//
//         // expect(paymentPaySpyMock).toHaveBeenCalledTimes(1);
//     });
//
// })