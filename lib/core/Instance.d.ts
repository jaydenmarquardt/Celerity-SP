import { BaseComponentContext } from "@microsoft/sp-component-base";
/**
 * The function sets a custom data attribute on the body element of the document.
 * @param {string} key - A string representing the key or name of the data attribute to be set on the
 * body element.
 * @param {string} value - The value parameter is a string that represents the value you want to set
 * for the specified key.
 */
export declare function setBodyData(key: string, value: string): void;
export declare const initPageData: () => Promise<void>;
/**
 * The `initInstanceData` function initializes instance data by fetching various information and
 * setting them as body data.
 * @param {BaseComponentContext} context - The context parameter is of type BaseComponentContext. It is
 * used to provide the context of the component where the initInstanceData function is being called.
 * This context can be used to access properties and methods specific to the component.
 * @param {ICELERITYConfig | Partial<ICELERITYConfig>} config - The `config` parameter is an object that
 * represents the configuration settings for the CELERITY instance. It can be of type `ICELERITYConfig` or
 * `Partial<ICELERITYConfig>`.
 */
export declare const initInstanceData: (
  context: BaseComponentContext
) => Promise<void>;
export declare const onNewPageInstanceData: (
  context: BaseComponentContext
) => Promise<void>;
//# sourceMappingURL=Instance.d.ts.map
