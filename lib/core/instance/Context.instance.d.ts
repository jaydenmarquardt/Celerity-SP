import { BaseComponentContext } from "@microsoft/sp-component-base";
import type { IPageContext } from "../types/Context.types";
/**
 * The function returns the context of a base component.
 * @returns the value of `W[INSTANCE_KEY]['context']`.
 */
export declare const theContext: () => BaseComponentContext;
/**
 * The function `thePageContext` returns the page context.
 * @returns the `pageContext` property of the `theContext()` function, casted as `any`.
 */
export declare const thePageContext: () => IPageContext;
/**
 * The function `theLegacyContext` returns the legacy page context from `thePageContext`.
 * @returns the `legacyPageContext` property of the `thePageContext()` function.
 */
export declare const theLegacyContext: () => any;
export declare const theRequestPath: () => string;
export declare const isSiteContents: () => boolean;
export declare const isListView: () => boolean;
export declare const isListItemView: (listTitle?: string) => boolean;
export declare const isPageView: () => boolean;
export declare const isFrontEnd: () => boolean;
export declare const isBackend: () => boolean;
//# sourceMappingURL=Context.instance.d.ts.map