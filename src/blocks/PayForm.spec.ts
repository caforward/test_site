/*
* Тестирование через playwright
* e2e тесты
*
* Заказ регистрирует бэкенд, поэтому оба способа оплаты просто уводят
* браузер на платёжную страницу банка. Промежуточной кнопки виджета больше нет.
* */

import { test, expect, type Page } from '@playwright/test';

async function fillForm(page: Page, { name = 'test test', amount = '1000', contract = '111' } = {}) {
    await page.getByRole('textbox', { name: 'ФИО*' }).fill(name);
    await page.getByRole('spinbutton', { name: 'Сумма' }).fill(amount);
    await page.getByRole('textbox', { name: 'Введите номер договора' }).fill(contract);
}

test('Способ оплаты: картой; Контакт: Телефон. Успешный переход в банк.', async ({ page }) => {
    await page.goto('https://caforward.ru/');

    await page.getByRole('radio', { name: 'Оплата картой' }).check();
    await fillForm(page);

    await page.getByRole('radio', { name: 'Телефон' }).check();
    await page.getByRole('textbox', { name: 'Номер телефона' }).fill('1111111111');

    await page.getByRole('button', { name: 'Оплатить картой' }).click();

    await expect(page).toHaveURL(/.*pay\.tbank\.ru.*/, { timeout: 20000 });
});

test('Способ оплаты: картой; Контакт: E-mail. Успешный переход в банк.', async ({ page }) => {
    await page.goto('https://caforward.ru/');

    await page.getByRole('radio', { name: 'Оплата картой' }).check();
    await fillForm(page);
    await page.getByRole('textbox', { name: 'E-mail' }).fill('test@test.test');

    await page.getByRole('button', { name: 'Оплатить картой' }).click();

    await expect(page).toHaveURL(/.*pay\.tbank\.ru.*/, { timeout: 20000 });
});

test('Способ оплаты: СБП; Контакт: телефон. Успешный переход в банк.', async ({ page }) => {
    await page.goto('https://caforward.ru/');

    await page.getByRole('radio', { name: 'Оплата через СБП' }).check();
    await fillForm(page);

    await page.getByRole('radio', { name: 'Телефон' }).check();
    await page.getByRole('textbox', { name: 'Номер телефона' }).fill('1111111111');

    await page.getByRole('button', { name: 'Оплатить через СБП' }).click();

    await expect(page).toHaveURL(/.*pay\.tbank\.ru.*/, { timeout: 20000 });
});

test('Способ оплаты: СБП; Контакт: E-mail. Успешный переход в банк.', async ({ page }) => {
    await page.goto('https://caforward.ru/');

    await page.getByRole('radio', { name: 'Оплата через СБП' }).check();
    await fillForm(page);
    await page.getByRole('textbox', { name: 'E-mail' }).fill('test@test.ru');

    await page.getByRole('button', { name: 'Оплатить через СБП' }).click();

    await expect(page).toHaveURL(/.*pay\.tbank\.ru.*/, { timeout: 20000 });
});

test('СБП не пускает сумму меньше 10 рублей', async ({ page }) => {
    await page.goto('https://caforward.ru/');

    await page.getByRole('radio', { name: 'Оплата через СБП' }).check();
    await fillForm(page, { amount: '4' });
    await page.getByRole('textbox', { name: 'E-mail' }).fill('test@test.ru');

    await page.getByRole('button', { name: 'Оплатить через СБП' }).click();

    await expect(page.getByText('Минимальная сумма')).toBeVisible();
    await expect(page).toHaveURL('https://caforward.ru/');
});

test('Не должен переходить в банк, т.к. в поле ФИО только одно слово (должно быть 2)', async ({ page }) => {
    await page.goto('https://caforward.ru/');

    await page.getByRole('radio', { name: 'Оплата картой' }).check();
    await fillForm(page, { name: 'test' });
    await page.getByRole('textbox', { name: 'E-mail' }).fill('test@test.ru');

    await page.getByRole('button', { name: 'Оплатить картой' }).click();

    // Проверяем, что в течение 10 секунд мы ВСЁ ЕЩЕ на исходной странице
    await expect(page).toHaveURL('https://caforward.ru/', { timeout: 10000 });
});

test('Этот тест выводит ошибку имени', async ({ page }) => {
    await page.goto('https://caforward.ru/');

    await page.getByRole('radio', { name: 'Оплата картой' }).check();
    await fillForm(page, { name: 'test' });
    await page.getByRole('textbox', { name: 'E-mail' }).fill('test@test.ru');

    await page.getByRole('button', { name: 'Оплатить картой' }).click();

    await expect(page.getByText('Заполните поле')).toBeVisible();
});
