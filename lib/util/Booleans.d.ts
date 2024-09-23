/**
 * The function checks if a value is null, undefined, or an empty string.
 * @param {unknown} val - The parameter `val` is of type `any`, which means it can be any data type
 * (string, number, boolean, object, etc.). The function `nullIsh` checks if the value of `val` is
 * either `undefined`, `null`, or an empty string (`''`).
 * @returns The function `nullIsh` takes in a parameter `val` of type `any` and checks if it is equal
 * to `undefined`, `null`, or an empty string (`''`). If `val` is equal to any of these values, the
 * function returns `true`. Otherwise, it returns `false`.
 */
export declare function nullIsh(val: unknown): boolean;
/**
 * The function checks if a given string represents a boolean value.
 * @param {string} val - val is a string parameter that represents a value that needs to be checked if
 * it is a boolean string.
 * @returns The function isBooleanString returns a boolean value.
 */
export declare function isBooleanString(val: string): boolean;
/**
 * The function "toBoolean" converts a string value to a boolean value, returning true if the string is
 * "true" and false otherwise.
 * @param {string} val - val is a string parameter that represents a value that needs to be converted
 * to a boolean.
 * @returns a boolean value.
 */
export declare function toBoolean(val: string | boolean | undefined): boolean;
/**
 * The function `booleanToYesNo` converts a boolean value to a string representation of "Yes" if the
 * value is true, and "No" if the value is false.
 * @param {boolean} val - A boolean value that represents a condition or state.
 * @returns a string value. If the input boolean value is true, it returns 'Yes', otherwise it returns
 * 'No'.
 */
export declare function booleanToYesNo(val: boolean, yes?: string, no?: string, na?: string): string;
/**
 * The function `isUndefined` in TypeScript checks if a value is undefined and returns a boolean
 * result.
 * @param {unknown} val - The parameter `val` in the `isUndefined` function is of type `unknown`.
 * @returns The function `isUndefined` returns a boolean value indicating whether the input `val` is
 * equal to `undefined`.
 */
export declare function isUndefined(val: unknown): boolean;
//# sourceMappingURL=Booleans.d.ts.map