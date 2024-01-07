module.exports = {
	extends: ["custom/react", "plugin:storybook/recommended"],
	parserOptions: {
		project: "tsconfig.json",
		tsconfigRootDir: __dirname,
		sourceType: "module",
	},
	rules: {
		"import/no-extraneous-dependencies": [
			"error",
			{
				devDependencies: ["**/*.spec.*", "**/*.stories.*", "*.config.*", "**/setupTests.ts"],
				peerDependencies: true,
			},
		],
	},
};
