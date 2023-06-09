import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vitest/config';

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const IS_DOCKER = process.env.DOCKER === 'true';

export default defineConfig({
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api/graphql': {
        rewrite: path => (IS_DEVELOPMENT ? path.replace(/^\/api/, '') : path),
        target: `http://${IS_DOCKER ? 'webserver' : 'localhost'}:3001/graphql`,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/config/tests/setupTests.ts',
    coverage: {
      provider: 'c8',
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'src/utils/test-utils.tsx', 'src/config/tests/'],
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayName: true,
              fileName: false,
            },
          ],
        ],
      },
    }),
    tsconfigPaths(),
    svgr(),
    eslint(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/locales/*.json',
          dest: 'locales',
        },
      ],
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'maskable-icon.svg'],
      manifest: {
        name: 'Funds Tracker',
        short_name: 'Funds Tracker',
        description: 'Manage your investments as simple as possible',
        theme_color: '#F9F9FA',
        start_url: '/',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'maskable-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  build: {
    assetsDir: 'static',
    outDir: './dist',
  },
});
