module.exports = {
	extends: ["@funds-tracker/eslint-config/react", "plugin:storybook/recommended"],
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
		// Disable import/extensions rule because it's not working properly with TypeScript for import like "@/src/*"
		"import/extensions": "off"
	}
};
