/**
 * ===========================================
 * -------------------WEB---------------------
 * ===========================================
 */
import type { IWeb, IWebInfo } from "@pnp/sp/webs/types";
/**
 * The function `theWebId` returns the ID of the current web page.
 * @returns A string representation of the web ID.
 */
export declare const theWebId: () => string;
/**
 * The function `theWebTitle` returns the title of the web page.
 * @returns A string value representing the title of the web page.
 */
export declare const theWebTitle: () => string;
/**
 * The function `theWebUrl` returns the absolute or relative URL of the current web page.
 * @param [relative=false] - The "relative" parameter is a boolean value that determines whether the
 * returned URL should be relative or absolute.
 * @returns The function `theWebUrl` returns a string value. If the `relative` parameter is set to
 * `false`, it returns the absolute URL of the web page. If the `relative` parameter is set to `true`,
 * it returns the server-relative URL of the web page.
 */
export declare const theWebUrl: (relative?: boolean) => string;
/**
 * The function `theTimeZone` returns the description of the time zone of the web in the page context.
 * @returns The function `theTimeZone` is returning a string value.
 */
export declare const theTimeZone: () => string;
/**
 * The function `theLanguageCode` returns the language code of the current web page.
 * @returns the language code as a string.
 */
export declare const theLanguageCode: () => string;
/**
 * The function returns the current SharePoint web.
 * @returns the `web` property of the `sp()` object.
 */
export declare const theIWeb: () => IWeb;
/**
 * The function `theWeb` returns a promise that resolves to an object of type `IWebInfo`.
 * @returns The function `theWeb` is returning a promise that resolves to an object of type `IWebInfo`.
 */
export declare const theWeb: () => Promise<IWebInfo>;
//# sourceMappingURL=Web.instance.d.ts.map