module.exports = {
	extends: ["custom/react"],
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
