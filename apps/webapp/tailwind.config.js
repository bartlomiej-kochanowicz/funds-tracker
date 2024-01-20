import uiTheme from "../../packages/ui/tailwind.config";

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{ts,tsx}", "../../packages/ui/**/*.{ts,tsx}"],
	theme: uiTheme.theme,
	plugins: [],
};
