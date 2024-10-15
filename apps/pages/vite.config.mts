import { resolve } from 'path';
import { withPageConfig } from '@repo/vite-config';

const rootDir = resolve(__dirname);

const config = withPageConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  publicDir: resolve(rootDir, 'public'),
  build: {
    outDir: resolve(rootDir, '..', '..', 'dist', 'pages'),
    rollupOptions: {
      input: {
        "new-tab": resolve(__dirname, 'new-tab.html'),
        options: resolve(__dirname, 'options.html'),
        popup: resolve(__dirname, 'popup.html')
      }
    }
  },
});

export default config