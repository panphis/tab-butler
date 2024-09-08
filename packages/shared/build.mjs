import * as esbuild from 'esbuild';

/**
 * @type { import("esbuild").BuildOptions }
 */
const buildOptions = {
	entryPoints: ['./index.ts', './lib/**/*.ts', './lib/**/*.tsx'],
	tsconfig: './tsconfig.json',
	bundle: false,
	target: 'esnext',
	outdir: './dist',
	sourcemap: true,
	format: 'esm'
};

await esbuild.build(buildOptions);
