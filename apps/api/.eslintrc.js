module.exports = {
	extends: ["custom/typescript"],
	parserOptions: {
		project: "tsconfig.json",
		tsconfigRootDir: __dirname,
		sourceType: "module",
	},
};
