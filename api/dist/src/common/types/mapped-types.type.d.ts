export declare type Dict<T extends string> = {
    [k in T]: T;
};
export declare type ValueOf<T> = T[keyof T];
