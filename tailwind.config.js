/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				border: 'var(--color-border)',
			}
		},
	},
	safelist: [
		'border-border',
	],
	plugins: [],
}

