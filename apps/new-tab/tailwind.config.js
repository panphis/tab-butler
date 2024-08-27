const baseConfig = require('@repo/tailwindcss-config');

/** @type {import('tailwindcss').Config} */
module.exports = {
	...baseConfig,
	theme: {
		extend: {
			colors: {
				light: "hsl(var(--light))",
				dark: "hsl(var(--dark))",
			},
		}
	},
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
};
