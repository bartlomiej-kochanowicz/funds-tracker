/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module 'mq-polyfill' {
  export default function matchMediaPolyfill(window: Window): void;
}
