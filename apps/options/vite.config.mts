import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"
import { resolve } from "path";
import { withPageConfig } from "@repo/vite-config";
const rootDir = resolve(__dirname);



// const config = withPageConfig({
// 	resolve: {
// 		alias: {
// 			"@": resolve(__dirname, "src"),
// 		},
// 	},
// 	publicDir: resolve(rootDir, "public"),
// 	build: {
// 		outDir: resolve(rootDir, "..", "..", "dist", "options"),
// 	},
// });


const config = defineConfig({
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
	publicDir: resolve(rootDir, "public"),
	build: {
		target: 'esnext',
		outDir: resolve(rootDir, "..", "..", "dist", "options"),
	},
});

export default config;
