/* eslint-disable func-names */
export const debounce = <F extends (...params: any[]) => void>(func: F, timeout: number) => {
  let timer: NodeJS.Timeout;

  return function (...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  } as F;
};
