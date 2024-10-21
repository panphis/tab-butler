import { defineConfig } from 'vite'
import { resolve } from 'path'
import { peerDependencies, dependencies } from './package.json'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		react({
			'jsxRuntime': 'automatic'
		}),
		dts({
			include: ['src/**/*'],
		})
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'src', 'index.ts'),
			formats: ['es', 'cjs'],
			name: "ShadcnUI",
		},
		rollupOptions: {
			external: [...Object.keys(peerDependencies), ...Object.keys(dependencies)],
			output: {
				preserveModules: true,
				preserveModulesRoot: resolve(__dirname, 'src'),
				exports: 'auto'
			},
		},
		target: 'esnext',
		sourcemap: false,
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		}
	}
})