import { defineConfig, mergeConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from '@primevue/core'

export default defineConfig({
    plugins: [vue()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: 'vitest.setup.js',
        alias: {
            '@/': new URL('./src/', import.meta.url).pathname,
        },
    },
    resolve: {
        alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
    }
},)