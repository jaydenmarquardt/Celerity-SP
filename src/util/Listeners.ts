import { areObjectsEqual } from "./Objects";
import { getUrlParams } from "./Url";
import { W } from "./Util.types";

const LISTENER_KEY: string = "hnsListeners";

export type ICELERITYEvent =
  | "urlParamsChange"
  | "editModeChange"
  | "richTextEditorFocused"
  | "menu-edit-open"
  | "menu-edit-close"
  | "sp-url-change"
  | "pageChanged"
  | "setGlobalSetting"
  | "hubConfigChange";

/**
 * It returns an object that is stored on the window object
 * @returns An object with a key of LISTENER_KEY.
 */
function getListeners() {
  if (!W[LISTENER_KEY]) W[LISTENER_KEY] = {};
  return W[LISTENER_KEY];
}

/**
 * The function removes a callback function from the listeners associated with a specific key.
 * @param {ICELERITYEvent} key - The key parameter is of type ICELERITYEvent, which is likely an interface or
 * type representing an event in the CELERITY framework. It is used to identify the specific event for
 * which the listener is being removed.
 * @param callback - The `callback` parameter is a function that will be called when the event
 * specified by the `key` parameter is triggered. The `callback` function takes a single parameter
 * `props` of type `any`, which represents the data passed to the event listener when the event is
 * triggered.
 * @returns the updated listeners object after removing the specified callback from the listeners
 * array.
 */
function removeListener(key: ICELERITYEvent, callback: (props: any) => void) {
  const listeners = getListeners();
  if (!listeners[key]) {
    return;
  }
  const index = listeners[key].indexOf(callback);

  if (index > -1) {
    W[LISTENER_KEY] = listeners[key].splice(index, 1);
  }

  return listeners;
}

/**
 * It adds a callback to the listeners object, and returns the index of the callback in the array
 * @param {ICELERITYEvent} key - The key of the listener.
 * @param callback - (props: any) => void
 * @returns The index of the callback in the array of listeners.
 */
function addListener(key: ICELERITYEvent, callback: (props: any) => void) {
  const listeners = getListeners();
  if (!listeners[key]) {
    listeners[key] = [];
  }

  listeners[key].push(callback);

  return listeners[key].length - 1;
}

/**
 * It takes a key and any number of props, gets the listeners for that key, and then calls each
 * listener with the props
 * @param {ICELERITYEvent} key - string - The key of the event you want to trigger.
 * @param {any} props - any - this is the data that will be passed to the listener.
 * @returns A function that takes a key and any number of props and returns undefined.
 */
function triggerEvent(key: ICELERITYEvent, ...props: any) {
  const listenersAll = getListeners();
  const listeners = listenersAll[key];
  if (!listeners) return;
  listeners.map(function (listener: (props: any) => void) {
    listener(props);
  });
}

let urlParamListener = undefined;
let oldParams = undefined;

/**
 * The `onUrlParamsChange` function listens for changes in URL parameters and triggers a callback
 * function with the new and old parameters.
 * @param callback - The `callback` parameter is a function that takes two arguments: `params` and
 * `oldParams`.
 */
export function onUrlParamsChange(
  callback: (
    params: {
      [key: string]: string;
    },
    oldParams: {
      [key: string]: string;
    }
  ) => void
) {
  addListener("urlParamsChange", ([newParams, oldParams]) =>
    callback(newParams, oldParams)
  );
  if (!urlParamListener) {
    urlParamListener = setInterval(() => {
      const newParams = getUrlParams();
      const oldOldParams = { ...oldParams };
      if (!areObjectsEqual(newParams, oldOldParams)) {
        oldParams = newParams;
        triggerEvent("urlParamsChange", newParams, oldOldParams);
      }
    }, 2000);
  }
}

/**
 * The function `onEditModeChange` takes a callback function as a parameter and calls it with a boolean
 * value indicating whether the edit mode has changed based on the URL parameters.
 * @param callback - The `callback` parameter is a function that takes a single argument `isEditMode`
 * of type boolean. This function will be called whenever the edit mode changes. If the edit mode is
 * turned on, `isEditMode` will be `true`, and if the edit mode is turned off, `is
 */
export function onEditModeChange(callback: (isEditMode: boolean) => void) {
  onUrlParamsChange((params, oldParams) => {
    const wasEdit = oldParams?.Mode === "Edit";
    const isEdit = params?.Mode === "Edit";

    if (wasEdit && !isEdit) {
      callback(false);
    }
    if (!wasEdit && isEdit) {
      callback(true);
    }
  });
}

export { addListener, triggerEvent, removeListener, getListeners };
