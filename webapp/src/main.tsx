import React from 'react';
import { createRoot } from 'react-dom/client';
import { worker } from 'mocks/browser';
import App from './App';
import 'base';

const container = document.getElementById('root');
const root = createRoot(container!);

const prepare = async () => {
  if (import.meta.env.DEV) {
    worker.start();
  }
};

prepare().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
