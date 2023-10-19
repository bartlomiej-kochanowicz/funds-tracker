const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project,
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "eslint-plugin-prettier", "prettier"],
	extends: [
		"airbnb-base",
		"airbnb-typescript/base",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
		"prettier",
	],
	settings: {
		"import/resolver": {
			typescript: {},
		},
	},
	root: true,
	env: {
		node: true,
		jest: true,
	},
};
