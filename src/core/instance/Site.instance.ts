/**
 * ===========================================
 * ------------------SITE---------------------
 * ===========================================
 */

import type { ISite, ISiteInfo } from "@pnp/sp/sites/types";
import { thePageContext } from "./Context.instance";
import { sp } from "../Celertity";

/**
 * The function `theSiteId` returns the ID of the current site.
 * @returns A string representation of the site ID.
 */
export const theSiteId = (): string => {
  return thePageContext()?.site?.id?.toString();
};

/**
 * The function `theSiteUrl` returns the absolute or server-relative URL of the current site.
 * @param [absolute=false] - The `absolute` parameter is a boolean value that determines whether the
 * returned URL should be an absolute URL or a server-relative URL.
 * @returns The function `theSiteUrl` returns a string value. If the `absolute` parameter is set to
 * `true`, it returns the absolute URL of the site from the `thePageContext().site.absoluteUrl`
 * property. Otherwise, it returns the server-relative URL of the site from the
 * `thePageContext().site.serverRelativeUrl` property.
 */
export const theSiteUrl = (absolute = false): string => {
  return absolute
    ? thePageContext()?.site?.absoluteUrl
    : thePageContext()?.site?.serverRelativeUrl;
};
export const isSearchPage = (): boolean => {
  return window.location?.href?.startsWith(
    `${theSiteUrl(true)}/_layouts/15/search.aspx`
  );
};
/**
 * The function `theHomeUrl` returns the absolute or server-relative URL of the home page.
 * @param [absolute=false] - The `absolute` parameter is a boolean value that determines whether the
 * returned URL should be an absolute URL or a relative URL.
 * @returns The function `theHomeUrl` returns a string value. If the `absolute` parameter is `true`, it
 * returns the absolute URL of the home page. Otherwise, it returns the server-relative URL of the home
 * page.
 */
export const theHomeUrl = (absolute = false): string => {
  if (absolute) return thePageContext()?.site?.absoluteUrl;
  return thePageContext()?.site?.serverRelativeUrl;
};

/**
 * The function returns the current SharePoint site.
 * @returns the `site` property of the `sp()` object.
 * @returns the `site` property of the `sp()` object.
 */
export const theISite = (): ISite => {
  return sp().site;
};

/**
 * The function `theSite` returns a promise that resolves to an `ISiteInfo` object.
 * @returns The function `theSite` is returning a promise that resolves to an object of type
 * `ISiteInfo`.
 */
export const theSite = async (): Promise<ISiteInfo> => {
  return await theISite()();
};
