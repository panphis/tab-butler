import { defineConfig } from 'vite'
import path from 'path';

export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'), // 入口文件
			formats: ['es', 'cjs'], // 生成 ESM 和 CommonJS 格式
			fileName: (format: string) => `index.${format}.js`, // 输出文件的命名规则
		},
		rollupOptions: {
			external: [], // 外部依赖可以根据需要配置
		},
	},
});