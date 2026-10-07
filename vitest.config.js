import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

// fileURLToPath, а не URL().pathname: путь к проекту содержит кириллицу,
// и pathname отдаёт его percent-encoded, из-за чего алиас @ не резолвится
const srcPath = fileURLToPath(new URL('./src', import.meta.url))

export default defineConfig({
    plugins: [vue()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: 'vitest.setup.js',
        // e2e Playwright лежат в src/blocks/*.spec.ts и под vitest не идут
        include: ['tests/**/*.test.{js,ts}', 'src/**/*.test.{js,ts}'],
        // заготовка, закомментированная целиком: тестов внутри нет,
        // и vitest на таком файле падает
        exclude: ['src/blocks/PayForm.test.ts'],
    },
    resolve: {
        alias: [{ find: '@', replacement: srcPath }],
    },
})
