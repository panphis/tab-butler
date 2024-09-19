import { defineConfig } from 'vite';
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';
import { peerDependencies, devDependencies, dependencies } from './package.json'


const config = defineConfig({
  base: '',
  plugins: [
    react({
      'jsxRuntime': 'automatic'
    }),
    dts({
      include: ['src/**/*'],
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  },
  build: {
    sourcemap: true,
    minify: false,
    target: ['esnext'],

    lib: {
      entry: resolve(__dirname, 'src', 'index.ts'),
      formats: ['es'],
      name: "theme",
      fileName: (format, entryName) => {
        return `${entryName}.${format}.js`
      },
    },
    rollupOptions: {
      external: [...Object.keys(devDependencies), ...Object.keys(peerDependencies), ...Object.keys(dependencies), 'react', 'react-dom'],
      output: {
        // 定义外部依赖的全局变量（适用于 UMD 格式）
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        preserveModules: true,
        preserveModulesRoot: resolve(__dirname, 'src'),
        exports: 'auto'
      }
    },
  },
});

export default config