export type Dict<T> = { [k: string]: T };

type ValueOf<T> = T[keyof T];
