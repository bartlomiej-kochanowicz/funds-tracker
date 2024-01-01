/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class", '[data-mode="dark"]'],
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			scale: {
				97: "0.97",
			},
		},
	},
	plugins: [],
};
