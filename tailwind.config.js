/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				border: '#444',
			}
		},
	},
	safelist: [
		'border-border',
	],
	plugins: [],
}

