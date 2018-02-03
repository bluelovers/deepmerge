declare function deepmerge<T>(x: Partial<T>, y: Partial<T>, options?: deepmerge.Options): T;
declare function deepmerge<T1, T2>(x: T1, y: T2, options?: deepmerge.Options): T1 & T2;
declare namespace deepmerge {
    interface Options {
        clone?: boolean;
        arrayMerge?(destination: any[], source: any[], options?: Options): any[];
        isMergeableObject?(value: any, isMergeableObject: (value) => boolean, optionsArgument?: Options, key?: any): void;
        isMergeableObject?(value: any, isMergeableObject: (value) => boolean, optionsArgument?: Options, key?: any): boolean;
    }
    const isMergeable: (value) => boolean;
    const all: <T>(array: Partial<T>[], optionsArgument?: Options) => T;
}
export = deepmerge;
declare global  {
    interface Window {
        deepmerge<T>(x: Partial<T>, y: Partial<T>, options?: deepmerge.Options): T;
        deepmerge<T1, T2>(x: T1, y: T2, options?: deepmerge.Options): T1 & T2;
    }
}
export {};
