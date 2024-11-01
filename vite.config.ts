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
			}
		}
	},
	resolve: {
		alias: {
			'@': path.resolve('src'),
		}
	},
})
