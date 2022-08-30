import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    eslint(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/locales/*',
          dest: 'locales',
        },
      ],
    }),
  ],
  build: {
    outDir: './dist',
  },
});
