import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"
import { resolve } from "path";
import { withPageConfig } from "@repo/vite-config";


const rootDir = resolve(__dirname);
const config = withPageConfig(defineConfig({
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
	publicDir: resolve(rootDir, "public"),
	build: {
		outDir: resolve(rootDir, "..", "..", "dist", "options"),
	},
}));
export default config;
