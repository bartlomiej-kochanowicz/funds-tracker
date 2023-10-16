export const throttle = (func: Function, timeout: number) => {
  let ready: boolean = true;

  return (...args: unknown[]) => {
    if (!ready) {
      return;
    }

    ready = false;
    func(...args);
    setTimeout(() => {
      ready = true;
    }, timeout);
  };
};
