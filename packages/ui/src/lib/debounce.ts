/* eslint-disable func-names */
const debounce = <F extends (...params: any[]) => void>(func: F, timeout: number = 1000) => {
	let timer: NodeJS.Timeout;

	return function (...args: any) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func(...args);
		}, timeout);
	} as F;
};

export { debounce };
