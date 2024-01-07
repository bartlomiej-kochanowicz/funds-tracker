/** @type {import('tailwindcss').Config} */
const uiTheme = require("../../packages/ui/tailwind.config");

module.exports = {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{ts,tsx}", "../../packages/ui/**/*.{ts,tsx}"],
	theme: uiTheme.theme,
	plugins: [],
};
