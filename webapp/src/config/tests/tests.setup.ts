/* eslint-disable no-console */
import ResizeObserver from 'resize-observer-polyfill';
import matchMediaPolyfill from 'mq-polyfill';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest-styled-components';

const originalError = console.error;

jest.mock('config/env', () => ({
  ENVIROMENT: 'dev',
  IS_DEVELOPMENT: true,
  API_URL: '',
  WEBAPP_PORT: '',
}));

/**
 * Define the window.matchMedia
 */
matchMediaPolyfill(window);

/**
 * For dispatching resize event
 * we must implement window.resizeTo in jsdom
 */
window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event('resize'));
};

// mock ResizeObserver for react-laag liblary
window.ResizeObserver = ResizeObserver;

beforeAll(() => {
  console.error = (...args) => {
    if (/Warning: ReactDOM.render is no longer supported in React 18./.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;

  jest.clearAllMocks();
});
