/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class", '[data-mode="dark"]'],
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			scale: {
				99: "0.99",
			},
		},
	},
	plugins: [],
};
