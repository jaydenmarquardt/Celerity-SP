export declare type ICELERITYEvent =
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
declare function getListeners(): any;
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
declare function removeListener(
  key: ICELERITYEvent,
  callback: (props: any) => void
): any;
/**
 * It adds a callback to the listeners object, and returns the index of the callback in the array
 * @param {ICELERITYEvent} key - The key of the listener.
 * @param callback - (props: any) => void
 * @returns The index of the callback in the array of listeners.
 */
declare function addListener(
  key: ICELERITYEvent,
  callback: (props: any) => void
): number;
/**
 * It takes a key and any number of props, gets the listeners for that key, and then calls each
 * listener with the props
 * @param {ICELERITYEvent} key - string - The key of the event you want to trigger.
 * @param {any} props - any - this is the data that will be passed to the listener.
 * @returns A function that takes a key and any number of props and returns undefined.
 */
declare function triggerEvent(key: ICELERITYEvent, ...props: any): void;
/**
 * The `onUrlParamsChange` function listens for changes in URL parameters and triggers a callback
 * function with the new and old parameters.
 * @param callback - The `callback` parameter is a function that takes two arguments: `params` and
 * `oldParams`.
 */
export declare function onUrlParamsChange(
  callback: (
    params: {
      [key: string]: string;
    },
    oldParams: {
      [key: string]: string;
    }
  ) => void
): void;
/**
 * The function `onEditModeChange` takes a callback function as a parameter and calls it with a boolean
 * value indicating whether the edit mode has changed based on the URL parameters.
 * @param callback - The `callback` parameter is a function that takes a single argument `isEditMode`
 * of type boolean. This function will be called whenever the edit mode changes. If the edit mode is
 * turned on, `isEditMode` will be `true`, and if the edit mode is turned off, `is
 */
export declare function onEditModeChange(
  callback: (isEditMode: boolean) => void
): void;
export { addListener, triggerEvent, removeListener, getListeners };
//# sourceMappingURL=Listeners.d.ts.map
