import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `
          @import "/src/assets/scss/index.scss";
        `
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
    }
  }
})
