module.exports = {
	extends: ["@funds-tracker/eslint-config/react"],
	parserOptions: {
		project: "tsconfig.json",
		tsconfigRootDir: __dirname,
		sourceType: "module",
	},
	settings: {
		"import/resolver": {
			typescript: {
				project: "./tsconfig.json",
			},
			node: {
				paths: ["src"],
			},
		},
	},
	rules: {
		"import/no-extraneous-dependencies": [
			"error",
			{
				devDependencies: [
					"**/*.spec.*",
					"**/*.test.*",
					"**/*.po.*",
					"**/*/test-utils.tsx",
					"**/*/setupTests.ts",
					"**/__generated__/*",
					"**/src/config/codegen.ts",
				],
				peerDependencies: true,
			},
		],
	},
};
