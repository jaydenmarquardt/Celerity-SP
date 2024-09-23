var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { errorLog } from "../../util/Debug";
const INSTANCE_KEY = "Celerity_instanceData";
export const instance = () => window[INSTANCE_KEY] || {};
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
export const addInstaceData = (key, data) => {
    if (!window[INSTANCE_KEY])
        window[INSTANCE_KEY] = {};
    if (!data)
        return;
    window[INSTANCE_KEY][key] = data;
};
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
export function addInstaceDataCheck(key, data) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        if (!data)
            return;
        if (!window[INSTANCE_KEY])
            window[INSTANCE_KEY] = {};
        if (((_a = window[INSTANCE_KEY]) === null || _a === void 0 ? void 0 : _a[key]) !== undefined)
            return (_b = window[INSTANCE_KEY]) === null || _b === void 0 ? void 0 : _b[key];
        try {
            window[INSTANCE_KEY][key] = yield data();
            return window[INSTANCE_KEY][key];
        }
        catch (e) {
            errorLog({
                component: `Instance:AddInstanceDataCheck:${key}`,
                message: "Failed to add data to instance",
                type: "error",
                role: "user",
                severity: "medium",
                data: { e, key, value: (_c = window[INSTANCE_KEY]) === null || _c === void 0 ? void 0 : _c[key] },
            });
        }
    });
}
export const clearInstanceData = (key) => {
    var _a;
    if ((_a = window[INSTANCE_KEY]) === null || _a === void 0 ? void 0 : _a[key])
        delete window[INSTANCE_KEY][key];
};
//# sourceMappingURL=Base.instance.js.map