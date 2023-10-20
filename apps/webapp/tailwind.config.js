module.exports = {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{ts,tsx}", "../../packages/ui/**/*.{ts,tsx}"],
	theme: {
		extend: {
			scale: {
				99: "0.99",
			},
		},
	},
	plugins: [],
};
