import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';


const config = defineConfig({
  base: '',
  plugins: [react()],
  build: {
    sourcemap: true,
    minify: false,
    target: ['esnext'],
    lib: {
      entry: './index.ts',
      name: 'index',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      // 将 React 和 ReactDOM 作为外部依赖
      external: ['react', 'react-dom', 'chrome'],
      output: {
        // 定义外部依赖的全局变量（适用于 UMD 格式）
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});

export default config