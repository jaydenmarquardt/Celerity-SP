import type { UnknownObject } from "../../util/Util.types";
export declare const instance: () => any;
/**
 * The function `addInstanceData` adds data to a global object using a specified key.
 * @param {string} key - A string representing the key or identifier for the instance data.
 * @param {UnknownObject} data - The `data` parameter is of type `UnknownObject`. It represents the
 * data that you want to add to the instance. The `UnknownObject` type is not a built-in type in
 * JavaScript or TypeScript, so it is likely a custom type defined elsewhere in your codebase. It could
 * be an
 * @returns If the `data` parameter is falsy (e.g. `null`, `undefined`, `false`, `0`, `""`), then
 * nothing is being returned.
 */
export declare const addInstaceData: (key: string, data: UnknownObject) => void;
/**
 * The function `addInstanceDataCheck` is a TypeScript function that adds instance data to a global
 * object and returns the data if it exists, otherwise it retrieves the data using a provided function
 * and stores it in the global object before returning it.
 * @param {string} key - The `key` parameter is a string that represents the unique identifier for the
 * instance data. It is used to store and retrieve the instance data from the `window[INSTANCE_KEY]` object.
 * @param data - The `data` parameter is a function that returns a promise. It is used to retrieve the
 * data that needs to be added to the instance.
 * @returns a Promise of type T.
 */
export declare function addInstaceDataCheck<T>(key: string, data: () => Promise<T>): Promise<T>;
export declare const clearInstanceData: (key: string) => void;
//# sourceMappingURL=Base.instance.d.ts.map