import { IWeb } from "@pnp/sp/webs";
/**
 * It takes a URL as a string and returns an object with the URL's details
 * @param {string} url - The URL to parse.
 * @returns An object with the following properties:
 * href: The full URL
 * host: The hostname and port (if the port is not default)
 * hostname: Just the hostname
 * port: The port number
 * pathname: The path and filename
 * protocol: The web protocol used (http: or https:)
 * hash: The URL hash if one exists
 * search: The query
 */
declare function getUrlDetails(url: string): {
    href: string;
    host: string;
    hostname: string;
    port: string;
    pathname: string;
    protocol: string;
    hash: string;
    search: string;
};
/**
 * The function getCurrentPageUrl returns the server request path of the current page in a SharePoint
 * context.
 * @param {any} context - The `context` parameter is an object that contains information about the
 * current execution context. In this case, it is expected to have a property called `pageContext`
 * which contains information about the current page.
 * @returns the server request path of the current page.
 */
declare function getCurrentPageUrl(context: any): any;
/**
 * Will Return the url including The host and site
 * */
declare function getUrlFull(context: any): string;
/**
 * Will Return the url including The host and site
 * */
declare function getUrlFullPage(context: any): string;
/**
 * The function retrieves search parameters from the URL and returns them as an object.
 * @returns an object that contains the search parameters from the URL.
 */
declare function getSearchParameters(): any;
/**
 * Will Return the url path
 * EG. /SitePages/page.aspx
 * */
declare function getUrl(context: any): string;
/**
 * It takes the current context and returns the tenant URL
 * @param {any} context - The context object that is passed to the web part.
 * @returns The tenant URL
 */
declare function getTenantUrl(context: any): any;
/**
 * It returns the URL of the search center for the current tenant
 * @param {any} context - The context object that is passed to the SPFx web part.
 * @returns The URL of the search center for the current tenant.
 */
declare function getSearchCenterUrl(context: any): string;
/**
 * This function retrieves a specific parameter value from the URL query string.
 * @param {string} name - The name parameter is a string that represents the name of the URL parameter
 * that you want to retrieve from the current page's URL.
 * @returns a string value or null. The string value is the value of the URL parameter with the
 * specified name, obtained from the current window's URL search parameters using the `get()` method of
 * the `URLSearchParams` object. If the parameter is not found, the function returns `null`.
 */
declare function getUrlParam(name: string): string;
/**
 * This TypeScript function checks if a specific parameter exists in the URL search query.
 * @param {string} name - The name parameter is a string that represents the name of the URL parameter
 * that we want to check for existence in the current URL's query string.
 * @returns a boolean value indicating whether the specified URL parameter exists in the current
 * window's URL search parameters.
 */
declare function hasUrlParam(name: string): boolean;
/**
 * This function sets a URL parameter and updates the URL in the browser's history.
 * @param {string} name - The name of the URL parameter that you want to set or update. For example, if
 * you want to set the value of a parameter called "page", the name parameter would be "page".
 * @param {string} value - The value parameter is a string that represents the value to be set for the
 * URL parameter with the given name.
 */
declare function setUrlParam(name: string, value: any): void;
/**
 * This function retrieves and returns the URL parameters as an object with key-value pairs.
 * @returns The function `getUrlParams()` returns an object containing key-value pairs of the query
 * parameters in the current URL. The keys are the parameter names and the values are the parameter
 * values.
 */
declare function getUrlParams(): {
    [key: string]: string;
};
/**
 * The function removes a specified parameter from the URL query string and updates the URL
 * accordingly.
 * @param {string} paramName - The `paramName` parameter is a string that represents the name of the
 * query parameter that you want to remove from the URL.
 * @returns The function does not return anything. It has a return type of `void`, which means it does
 * not return any value.
 */
declare function removeUrlParam(paramName: string): void;
/**
 * The function `fromUrlSafe` decodes a URL-safe string and returns the corresponding JavaScript object
 * or value.
 * @param {string} urlSafeString - The `urlSafeString` parameter is a string that represents a URL-safe
 * encoded value.
 * @returns the decoded value of the URL-safe string. If the decoded value can be parsed as JSON, it
 * will return the parsed JSON object. Otherwise, it will return the decoded value as is.
 */
declare function fromUrlSafe(urlSafeString: string): any;
/**
 * The `toUrlSafe` function takes any value, encodes it as a URL-safe string, and replaces certain
 * characters with their corresponding URL-encoded values.
 * @param {any} value - The `value` parameter in the `toUrlSafe` function is the value that needs to be
 * converted to a URL-safe string. It can be of any type, including null or undefined.
 * @returns a URL-safe string representation of the input value.
 */
declare function toUrlSafe(value: any): string;
/**
 * The getCurrentUrl function returns the current URL, optionally including query parameters.
 * @param {boolean} [includeQueryParams=false] - The `includeQueryParams` parameter is a boolean value
 * that determines whether or not to include query parameters in the returned URL. If set to `true`,
 * the query parameters will be included in the URL. If set to `false` or not provided, the query
 * parameters will be excluded from the URL
 * @returns The function `getCurrentUrl` returns the current URL of the webpage. If the
 * `includeQueryParams` parameter is set to `true`, it also includes any query parameters in the
 * returned URL.
 */
declare const getCurrentUrl: (includeQueryParams?: boolean) => string;
/**
 * The function `isUrlActive` checks if a given URL is currently active in the browser.
 * @param {string} url - The `url` parameter is a string representing the URL that you want to check if
 * it is active or not.
 * @returns a boolean value.
 */
declare const isUrlActive: (url: string) => boolean;
/**
 * The function `testLink` takes an HTML anchor element as input and returns the status code of the
 * HTTP response when making a HEAD request to the URL specified in the anchor element's `href`
 * attribute, or 500 if an error occurs.
 * @param {HTMLAnchorElement} link - The `link` parameter is of type `HTMLAnchorElement`, which
 * represents an HTML anchor element (i.e., a hyperlink). It is used to extract the `href` attribute of
 * the anchor element, which contains the URL of the link.
 * @returns The function `testLink` returns a Promise that resolves to a number. The number represents
 * the status code of the HTTP response when making a HEAD request to the URL specified in the `link`
 * parameter. If the request is successful, the function returns the status code. If an error occurs
 * during the request, the function returns 500.
 */
declare function testLink(link: HTMLAnchorElement): Promise<number>;
/**
 * The function `isUrlExternal` checks if a given URL is an external link.
 * @param {string} url - The `url` parameter is a string that represents a URL.
 */
declare const isUrlExternal: (url: string) => boolean;
declare const isUrlRelative: (url: string) => boolean;
declare const linkType: (url: string) => "unknown" | "empty" | "anchor" | "contact" | "js" | "external" | "internal" | "insecure";
export interface LinkInfo {
    url: string;
    text: string;
    isInternal: boolean;
    isExternal: boolean;
    isInsecure: boolean;
    isAnchor: boolean;
    isContact: boolean;
    isJS: boolean;
    element?: HTMLElement;
}
export interface LinkScanCheckResult extends LinkInfo {
    status: number;
    isBroken: boolean;
    scanned: boolean;
}
/**
 * The function `linkInfo` takes an HTML anchor element as input and returns information about the
 * link, such as its URL, status, whether it is broken, internal or external, insecure, an anchor, a
 * contact link, a JavaScript link, and the element's text.
 * @param {HTMLAnchorElement} link - The `link` parameter is of type `HTMLAnchorElement`, which
 * represents an HTML anchor element (i.e., `<a>` tag) that contains a hyperlink.
 * @returns a Promise that resolves to a LinkCheckResult object.
 */
declare function linkInfo(link: HTMLAnchorElement, scan?: boolean): Promise<LinkScanCheckResult>;
declare function getLinkInfo(link: HTMLAnchorElement): LinkInfo;
export declare function getWebFromUrl(url: string): IWeb;
declare function scanHTMLForLinks(html: string): Promise<LinkInfo[]>;
export { isUrlActive, testLink, linkType, toUrlSafe, getLinkInfo, linkInfo, removeUrlParam, scanHTMLForLinks, fromUrlSafe, getUrlParam, hasUrlParam, setUrlParam, getUrlParams, getSearchCenterUrl, getTenantUrl, getUrl, isUrlExternal, getSearchParameters, getUrlFullPage, getUrlFull, getUrlDetails, getCurrentPageUrl, isUrlRelative, getCurrentUrl, };
//# sourceMappingURL=Url.d.ts.map