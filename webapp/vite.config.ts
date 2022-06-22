import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import analyze from 'rollup-plugin-analyzer';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    eslint(),
    analyze(),
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
