import { test, expect } from '@playwright/test';

test('Способ оплаты: картой; Контакт: Телефон. Успешный переход в банк.', async ({ page }) => {
    // 1. Открываем сайт
    await page.goto('https://caforward.ru/');

    // 2. Заполняем ФИО
    await page.getByRole('textbox', { name: 'ФИО*' }).fill('test test');

    // 3. Заполняем Сумму
    // Мы используем .fill(), так как это самый надежный способ для input type="number"
    await page.getByRole('spinbutton', { name: 'Сумма' }).fill('1000');

    // 4. Вводим номер договора
    await page.getByRole('textbox', { name: 'Введите номер договора' }).fill('111');

    // 5. Вводим номер телефона
    await page.getByRole('textbox', { name: 'Номер телефона' }).fill('1111111111');

    await page.getByRole('button', { name: 'Оплатить картой' }).click();

    // 7. Ждем открытия окна банка
    await expect(page).toHaveURL(/.*pay\.tbank\.ru.*/, { timeout: 20000 });
});

test('Способ оплаты: картой; Контакт: E-mail. Успешный переход в банк.', async ({ page }) => {
    // 1. Открываем сайт
    await page.goto('https://caforward.ru/');
    /*
    *   await page.getByRole('radio', { name: 'Оплата через СБП СБП' }).check();
    * */

    // 2. Заполняем ФИО
    await page.getByRole('textbox', { name: 'ФИО*' }).fill('test test');

    // 3. Заполняем Сумму
    // Мы используем .fill(), так как это самый надежный способ для input type="number"
    await page.getByRole('spinbutton', { name: 'Сумма' }).fill('1000');

    // 4. Вводим номер договора
    await page.getByRole('textbox', { name: 'Введите номер договора' }).fill('111');

    // 5. Вводим почту
    await page.getByRole('radio', { name: 'E-mail' }).check();
    await page.getByRole('textbox', { name: 'E-mail' }).fill('test@test.test');

    await page.getByRole('button', { name: 'Оплатить картой' }).click();

    // 7. Ждем открытия окна банка
    await expect(page).toHaveURL(/.*pay\.tbank\.ru.*/, { timeout: 20000 });
});

test('Способ оплаты: СБП; Контакт: телефон. Успешный переход в банк.', async ({ page }) => {
    // 1. Открываем сайт
    await page.goto('https://caforward.ru/');

    await page.getByRole('radio', { name: 'Оплата через СБП' }).check();

    // 2. Заполняем ФИО
    await page.getByRole('textbox', { name: 'ФИО*' }).fill('test test');

    // 3. Заполняем Сумму
    // Мы используем .fill(), так как это самый надежный способ для input type="number"
    await page.getByRole('spinbutton', { name: 'Сумма' }).fill('1000');

    // 4. Вводим номер договора
    await page.getByRole('textbox', { name: 'Введите номер договора' }).fill('111');

    // 5. Вводим телефон
    await page.getByRole('textbox', { name: 'Номер телефона' }).fill('1111111111');

    // 6. Клик по кнопке оплаты, и еще один по сгенерированной кнопке СБП
    await page.getByRole('button', { name: 'Оплатить через СБП' }).click();

    const fpsButton = page.locator('.tinkoff-fps-button');
    await expect(fpsButton).toBeVisible(); // Гарантируем появление
    await fpsButton.click();

    // 7. Ждем открытия окна банка
    // Сначала находим сам iframe
    const bankFrame = page.frameLocator('iframe[name="tinkoff"]');

    // ПРОВЕРКА: Ждем появления текста внутри iFrame
    // Это подтверждает, что форма банка успешно загрузилась внутри твоей страницы
    const qrText = bankFrame.getByText('Отсканируйте и оплатите');
    await expect(qrText).toBeVisible({ timeout: 20000 });
});

test('Способ оплаты: СБП; Контакт: E-mail. Успешный переход в банк.', async ({ page }) => {
    // 1. Открываем сайт
    await page.goto('https://caforward.ru/');

    // 2. Выбираем метод оплаты СБП
    await page.getByRole('radio', { name: 'Оплата через СБП' }).check();

    // 3. Заполняем ФИО, Сумму и Договор
    await page.getByRole('textbox', { name: 'ФИО*' }).fill('test test');
    await page.getByRole('spinbutton', { name: 'Сумма' }).fill('1000');
    await page.getByRole('textbox', { name: 'Введите номер договора' }).fill('111');

    // 4. Переключаемся на почту и вводим её
    await page.getByRole('radio', { name: 'E-mail' }).check();
    await page.getByRole('textbox', { name: 'E-mail' }).fill('test@test.ru');

    // 5. Клик по кнопке оплаты (генерация кнопки СБП)
    await page.getByRole('button', { name: 'Оплатить через СБП' }).click();

    // 6. Ждем появления и кликаем по сгенерированной кнопке Т-Банка
    const fpsButton = page.locator('.tinkoff-fps-button');
    await expect(fpsButton).toBeVisible({ timeout: 10000 });
    await fpsButton.click();

    // 7. Проверка iFrame
    const bankFrame = page.frameLocator('iframe[name="tinkoff"]');

    // Ждем появления текста внутри iFrame (финальное подтверждение)
    await expect(bankFrame.getByText('Отсканируйте и оплатите')).toBeVisible({ timeout: 20000 });
});


test('Не должен переходить в банк, т.к. в поле ФИО только одно слово (должно быть 2)', async ({ page }) => {
    // 1. Открываем сайт
    await page.goto('https://caforward.ru/');

    // 2. Заполняем ФИО
    await page.getByRole('textbox', { name: 'ФИО*' }).fill('test');

    // 3. Заполняем Сумму
    // Мы используем .fill(), так как это самый надежный способ для input type="number"
    await page.getByRole('spinbutton', { name: 'Сумма' }).fill('1000');

    // 4. Вводим номер договора
    await page.getByRole('textbox', { name: 'Введите номер договора' }).fill('111');

    // 5. Вводим номер телефона
    await page.getByRole('textbox', { name: 'Номер телефона' }).fill('1111111111');

    await page.getByRole('button', { name: 'Оплатить картой' }).click();

    // Проверяем, что в течение 10 секунд мы ВСЁ ЕЩЕ на исходной странице
    await expect(page).toHaveURL('https://caforward.ru/', { timeout: 10000 });
});

test('Этот тест выводит ошибку имени', async ({ page }) => {
    // 1. Открываем сайт
    await page.goto('https://caforward.ru/');

    // 2. Заполняем ФИО
    await page.getByRole('textbox', { name: 'ФИО*' }).fill('test');

    // 3. Заполняем Сумму
    // Мы используем .fill(), так как это самый надежный способ для input type="number"
    await page.getByRole('spinbutton', { name: 'Сумма' }).fill('1000');

    // 4. Вводим номер договора
    await page.getByRole('textbox', { name: 'Введите номер договора' }).fill('111');

    // 5. Вводим номер телефона
    await page.getByRole('textbox', { name: 'Номер телефона' }).fill('1111111111');

    await page.getByRole('button', { name: 'Оплатить картой' }).click();

    // 7. Ошибка
    await expect(page.getByText('Заполните поле')).toBeVisible();
});
