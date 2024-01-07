/* eslint-disable no-console */
import "@testing-library/jest-dom";

import matchMediaPolyfill from "mq-polyfill";
import ResizeObserver from "resize-observer-polyfill";

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
	}).dispatchEvent(new this.Event("resize"));
};

// mock ResizeObserver for react-laag liblary
window.ResizeObserver = ResizeObserver;
