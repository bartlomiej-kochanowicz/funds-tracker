export type Dict<T extends string> = { [k in T]: T };

export type ValueOf<T> = T[keyof T];
