import { errorLog } from "../../util/Debug";
import type { UnknownObject } from "../../util/Util.types";

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
export const addInstaceData = (key: string, data: UnknownObject) => {
  if (!window[INSTANCE_KEY]) window[INSTANCE_KEY] = {};
  if (!data) return;
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
export async function addInstaceDataCheck<T>(
  key: string,
  data: () => Promise<T>
): Promise<T> {
  if (!data) return;
  if (!window[INSTANCE_KEY]) window[INSTANCE_KEY] = {};

  if (window[INSTANCE_KEY]?.[key] !== undefined)
    return window[INSTANCE_KEY]?.[key];
  try {
    window[INSTANCE_KEY][key] = await data();
    return window[INSTANCE_KEY][key];
  } catch (e) {
    errorLog({
      component: `Instance:AddInstanceDataCheck:${key}`,
      message: "Failed to add data to instance",
      type: "error",
      role: "user",
      severity: "medium",
      data: { e, key, value: window[INSTANCE_KEY]?.[key] },
    });
  }
}

export const clearInstanceData = (key: string) => {
  if (window[INSTANCE_KEY]?.[key]) delete window[INSTANCE_KEY][key];
};
