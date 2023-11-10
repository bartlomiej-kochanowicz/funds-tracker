module.exports = {
	extends: ["custom/react", "plugin:storybook/recommended"],
	parserOptions: {
		project: "tsconfig.json",
		tsconfigRootDir: __dirname,
		sourceType: "module",
	},
};
