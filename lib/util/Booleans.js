/**
 * The function checks if a value is null, undefined, or an empty string.
 * @param {unknown} val - The parameter `val` is of type `any`, which means it can be any data type
 * (string, number, boolean, object, etc.). The function `nullIsh` checks if the value of `val` is
 * either `undefined`, `null`, or an empty string (`''`).
 * @returns The function `nullIsh` takes in a parameter `val` of type `any` and checks if it is equal
 * to `undefined`, `null`, or an empty string (`''`). If `val` is equal to any of these values, the
 * function returns `true`. Otherwise, it returns `false`.
 */
export function nullIsh(val) {
    return (val === undefined ||
        val === null ||
        val === '' ||
        val === 'undefined' ||
        val === 'null');
}
/**
 * The function checks if a given string represents a boolean value.
 * @param {string} val - val is a string parameter that represents a value that needs to be checked if
 * it is a boolean string.
 * @returns The function isBooleanString returns a boolean value.
 */
export function isBooleanString(val) {
    if (val === undefined)
        return false;
    if (typeof val === 'boolean')
        return true;
    return val === 'true' || val === 'false';
}
/**
 * The function "toBoolean" converts a string value to a boolean value, returning true if the string is
 * "true" and false otherwise.
 * @param {string} val - val is a string parameter that represents a value that needs to be converted
 * to a boolean.
 * @returns a boolean value.
 */
export function toBoolean(val) {
    if (val === undefined)
        return false;
    if (!val)
        return false;
    if (typeof val === 'boolean')
        return val;
    return val === 'true';
}
/**
 * The function `booleanToYesNo` converts a boolean value to a string representation of "Yes" if the
 * value is true, and "No" if the value is false.
 * @param {boolean} val - A boolean value that represents a condition or state.
 * @returns a string value. If the input boolean value is true, it returns 'Yes', otherwise it returns
 * 'No'.
 */
export function booleanToYesNo(val, yes = 'Yes', no = 'No', na = 'NA') {
    if (val === undefined || val === null)
        return na;
    return val ? yes : no;
}
/**
 * The function `isUndefined` in TypeScript checks if a value is undefined and returns a boolean
 * result.
 * @param {unknown} val - The parameter `val` in the `isUndefined` function is of type `unknown`.
 * @returns The function `isUndefined` returns a boolean value indicating whether the input `val` is
 * equal to `undefined`.
 */
export function isUndefined(val) {
    return val === undefined;
}
//# sourceMappingURL=Booleans.js.map