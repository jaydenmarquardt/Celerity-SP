/**
 * ===========================================
 * ------------------SITE---------------------
 * ===========================================
 */
import type { ISite, ISiteInfo } from "@pnp/sp/sites/types";
/**
 * The function `theSiteId` returns the ID of the current site.
 * @returns A string representation of the site ID.
 */
export declare const theSiteId: () => string;
/**
 * The function `theSiteUrl` returns the absolute or server-relative URL of the current site.
 * @param [absolute=false] - The `absolute` parameter is a boolean value that determines whether the
 * returned URL should be an absolute URL or a server-relative URL.
 * @returns The function `theSiteUrl` returns a string value. If the `absolute` parameter is set to
 * `true`, it returns the absolute URL of the site from the `thePageContext().site.absoluteUrl`
 * property. Otherwise, it returns the server-relative URL of the site from the
 * `thePageContext().site.serverRelativeUrl` property.
 */
export declare const theSiteUrl: (absolute?: boolean) => string;
export declare const isSearchPage: () => boolean;
/**
 * The function `theHomeUrl` returns the absolute or server-relative URL of the home page.
 * @param [absolute=false] - The `absolute` parameter is a boolean value that determines whether the
 * returned URL should be an absolute URL or a relative URL.
 * @returns The function `theHomeUrl` returns a string value. If the `absolute` parameter is `true`, it
 * returns the absolute URL of the home page. Otherwise, it returns the server-relative URL of the home
 * page.
 */
export declare const theHomeUrl: (absolute?: boolean) => string;
/**
 * The function returns the current SharePoint site.
 * @returns the `site` property of the `sp()` object.
 * @returns the `site` property of the `sp()` object.
 */
export declare const theISite: () => ISite;
/**
 * The function `theSite` returns a promise that resolves to an `ISiteInfo` object.
 * @returns The function `theSite` is returning a promise that resolves to an object of type
 * `ISiteInfo`.
 */
export declare const theSite: () => Promise<ISiteInfo>;
//# sourceMappingURL=Site.instance.d.ts.map