import { defineConfig } from 'vite';
import { resolve } from 'path';
import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets';
import makeManifestPlugin from './utils/plugins/make-manifest-plugin';
import { watchPublicPlugin, watchRebuildPlugin } from '@repo/hmr';
import { isDev, isProduction, watchOption } from '@repo/vite-config';

const rootDir = resolve(__dirname);

const outDir = resolve(rootDir, '..', '..', 'dist');
export default defineConfig({
	resolve: {
		alias: {
		},
	},
	plugins: [
		libAssetsPlugin({
			outputPath: outDir,
		}),
		watchPublicPlugin(),
		makeManifestPlugin({ outDir }),
		isDev && watchRebuildPlugin({ reload: true }),
	],
	publicDir: resolve(rootDir, 'public'),
	build: {
		emptyOutDir: false,
		lib: {
			entry: [
				resolve(__dirname, 'lib/background.ts'),
				resolve(__dirname, 'lib/scriptCreateBookMark.ts'),
				resolve(__dirname, 'lib/scriptCloseBookmark.ts')
			]
		},
		outDir,
		sourcemap: isDev,
		minify: isProduction,
		reportCompressedSize: isProduction,
		watch: watchOption,
		rollupOptions: {
			external: ['chrome'],
		},
	},
});
