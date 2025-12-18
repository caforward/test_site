import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './src/blocks', // папка, где лежат .spec.ts файлы
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        /* Базовый URL твоего сайта на хостинге */
        baseURL: 'https://caforward.ru',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure', // Сделает скриншот, если тест упадет
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
