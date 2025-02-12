import { defineConfig } from 'vite';
import { watchRebuildPlugin } from '@repo/hmr';
import react from '@vitejs/plugin-react-swc';
import deepmerge from 'deepmerge';
import { isDev, isProduction } from './env.mjs';

export const watchOption = isDev ? {
  buildDelay: 50,
  chokidar: {
    ignored: [
      /\/packages\/.*\.(ts|tsx|map)$/,
    ]
  }
} : undefined;

const esbuildConfig = isProduction ? {
  drop: ['console', 'debugger'],
} : {}

/**
 * @typedef {import('vite').UserConfig} UserConfig
 * @param {UserConfig} config
 * @returns {UserConfig}
 */

const defaultConfig = {
  base: '',
  plugins: [
    react(),
    isDev && watchRebuildPlugin({ refresh: true })
  ],
  build: {
    sourcemap: isDev,
    minify: isProduction,
    reportCompressedSize: isProduction,
    emptyOutDir: isProduction,
    watch: watchOption,
    rollupOptions: {
      external: ['chrome'],
    },
    target: ['esnext']
  },
  esbuild: esbuildConfig,
  define: {
    'process.env.NODE_ENV': isDev ? `"development"` : `"production"`,
  },
};


export function withPageConfig(config) {
  return defineConfig(
    deepmerge(
      defaultConfig,
      config,
    ),
  );
}
