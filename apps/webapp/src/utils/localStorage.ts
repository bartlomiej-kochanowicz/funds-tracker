/**
 * @param {string} key - name of local storage key
 * @return {object} Data under provided key
 */
export const loadStore = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch {
    return undefined;
  }
};

/**
 * @param {unknown} value - data to save in local storage
 * @param {string} key - name of local storage key
 */
export const saveStore = (value: unknown, key: string) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch {
    throw new Error("Can't save changes in local storage");
  }
};

/**
 * @param {string} key - name of local storage key
 */
export const removeStore = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch {
    throw new Error("Can't remove data in local storage");
  }
};
