import react from "@vitejs/plugin-react";
import { resolve } from "path";
import eslint from "vite-plugin-eslint";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";


const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export default defineConfig({
	server: {
		port: 3000,
		host: true,
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/config/tests/setupTests.ts",
		coverage: {
			provider: "v8",
			reporter: ["text", "html"],
			exclude: ["node_modules/", "src/utils/test-utils.tsx", "src/config/tests/"],
		},
	},
	resolve: {
		alias: [
			{
				find: "@web/aero-ui",
				replacement: resolve(__dirname, "./node_modules/@funds-tracker/ui"),
			},
		],
	},
	plugins: [
		react(),
		tsconfigPaths(),
		svgr(),
		VitePWA({
			devOptions: {
				enabled: IS_DEVELOPMENT,
			},
			registerType: "autoUpdate",
			injectRegister: "auto",
			includeAssets: ["logo.svg", "favicon.ico", "apple-touch-icon-180x180.png"],
			manifest: {
				name: "Funds Tracker",
				short_name: "Funds Tracker",
				description: "Manage your investments as simple as possible",
				theme_color: "#F9F9FA",
				start_url: "/",
				icons: [
					{
						src: "pwa-64x64.png",
						sizes: "64x64",
						type: "image/png",
					},
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "maskable-icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
			},
		}),
		eslint(),
	],
	build: {
		assetsDir: "static",
		outDir: "./dist",
	},
});
