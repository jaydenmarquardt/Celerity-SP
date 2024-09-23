/**
 * ===========================================
 * -------------------WEB---------------------
 * ===========================================
 */

import type { IWeb, IWebInfo } from "@pnp/sp/webs/types";
import { thePageContext } from "./Context.instance";
import { sp } from "../Celertity";

/**
 * The function `theWebId` returns the ID of the current web page.
 * @returns A string representation of the web ID.
 */
export const theWebId = (): string => {
  return thePageContext()?.web?.id.toString();
};

/**
 * The function `theWebTitle` returns the title of the web page.
 * @returns A string value representing the title of the web page.
 */
export const theWebTitle = (): string => {
  return thePageContext()?.web?.title;
};

/**
 * The function `theWebUrl` returns the absolute or relative URL of the current web page.
 * @param [relative=false] - The "relative" parameter is a boolean value that determines whether the
 * returned URL should be relative or absolute.
 * @returns The function `theWebUrl` returns a string value. If the `relative` parameter is set to
 * `false`, it returns the absolute URL of the web page. If the `relative` parameter is set to `true`,
 * it returns the server-relative URL of the web page.
 */
export const theWebUrl = (relative = false): string => {
  return !relative
    ? thePageContext()?.web?.absoluteUrl
    : thePageContext()?.web?.serverRelativeUrl;
};

/**
 * The function `theTimeZone` returns the description of the time zone of the web in the page context.
 * @returns The function `theTimeZone` is returning a string value.
 */
export const theTimeZone = (): string => {
  return thePageContext()?.web?.timeZoneInfo?.description;
};

/**
 * The function `theLanguageCode` returns the language code of the current web page.
 * @returns the language code as a string.
 */
export const theLanguageCode = (): string => {
  return thePageContext()?.web?.languageName;
};

/**
 * The function returns the current SharePoint web.
 * @returns the `web` property of the `sp()` object.
 */
export const theIWeb = (): IWeb => {
  return sp().web;
};

/**
 * The function `theWeb` returns a promise that resolves to an object of type `IWebInfo`.
 * @returns The function `theWeb` is returning a promise that resolves to an object of type `IWebInfo`.
 */
export const theWeb = async (): Promise<IWebInfo> => {
  return await theIWeb()();
};
