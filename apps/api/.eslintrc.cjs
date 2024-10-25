module.exports = {
	extends: ["@funds-tracker/eslint-config/typescript"],
	parserOptions: {
		project: "tsconfig.json",
		tsconfigRootDir: __dirname,
		sourceType: "module",
	},
};
