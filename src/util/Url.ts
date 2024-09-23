/* eslint-disable security/detect-unsafe-regex */
import { IWeb, Web } from "@pnp/sp/webs";
import { transformToAssocArray } from "./Array";
import { emptyString } from "./Strings";
import { sp } from "../core/Celertity";

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
function getUrlDetails(url: string) {
  const a = document.createElement("a");
  a.href = url;
  return {
    href: a.href,
    host: a.host,
    hostname: a.hostname,
    port: a.port,
    pathname: a.pathname,
    protocol: a.protocol,
    hash: a.hash,
    search: a.search,
  };
}

/**
 * The function getCurrentPageUrl returns the server request path of the current page in a SharePoint
 * context.
 * @param {any} context - The `context` parameter is an object that contains information about the
 * current execution context. In this case, it is expected to have a property called `pageContext`
 * which contains information about the current page.
 * @returns the server request path of the current page.
 */
function getCurrentPageUrl(context: any) {
  return context.pageContext.site.serverRequestPath;
}

/**
 * Will Return the url including The host and site
 * */
function getUrlFull(context: any): string {
  return context.pageContext.site.absoluteUrl;
}

/**
 * Will Return the url including The host and site
 * */
function getUrlFullPage(context: any): string {
  let url = context.pageContext.site.absoluteUrl;
  url = url.replace(context.pageContext.site.serverRelativeUrl, "");
  url += context.pageContext.site.serverRequestPath;
  return url;
}

/**
 * The function retrieves search parameters from the URL and returns them as an object.
 * @returns an object that contains the search parameters from the URL.
 */
function getSearchParameters() {
  const prmstr = window.location.search.substr(1);
  return prmstr !== null && prmstr !== "" ? transformToAssocArray(prmstr) : {};
}

/**
 * Will Return the url path
 * EG. /SitePages/page.aspx
 * */
function getUrl(context: any): string {
  return context.pageContext.site.serverRequestPath;
}

/**
 * It takes the current context and returns the tenant URL
 * @param {any} context - The context object that is passed to the web part.
 * @returns The tenant URL
 */
function getTenantUrl(context: any) {
  let url = context.pageContext.site.absoluteUrl;
  url = url.replace(context.pageContext.site.serverRelativeUrl, "");

  if (url.indexOf("https://") === -1 && url.indexOf("https:/") !== -1) {
    url = url.replace("https:/", "https://");
  }
  return url;
}

/**
 * It returns the URL of the search center for the current tenant
 * @param {any} context - The context object that is passed to the SPFx web part.
 * @returns The URL of the search center for the current tenant.
 */
function getSearchCenterUrl(context: any) {
  return `${getTenantUrl(context)}/search/Pages`;
}

/**
 * This function retrieves a specific parameter value from the URL query string.
 * @param {string} name - The name parameter is a string that represents the name of the URL parameter
 * that you want to retrieve from the current page's URL.
 * @returns a string value or null. The string value is the value of the URL parameter with the
 * specified name, obtained from the current window's URL search parameters using the `get()` method of
 * the `URLSearchParams` object. If the parameter is not found, the function returns `null`.
 */
function getUrlParam(name: string): string {
  const searchParams = new URLSearchParams(window.location.search);
  return fromUrlSafe(searchParams?.get(name));
}

/**
 * This TypeScript function checks if a specific parameter exists in the URL search query.
 * @param {string} name - The name parameter is a string that represents the name of the URL parameter
 * that we want to check for existence in the current URL's query string.
 * @returns a boolean value indicating whether the specified URL parameter exists in the current
 * window's URL search parameters.
 */
function hasUrlParam(name: string): boolean {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.has(name);
}

/**
 * This function sets a URL parameter and updates the URL in the browser's history.
 * @param {string} name - The name of the URL parameter that you want to set or update. For example, if
 * you want to set the value of a parameter called "page", the name parameter would be "page".
 * @param {string} value - The value parameter is a string that represents the value to be set for the
 * URL parameter with the given name.
 */
function setUrlParam(name: string, value: any): void {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(name, toUrlSafe(value));
  const newUrl = `${window.location.origin}${
    window.location.pathname
  }?${searchParams.toString()}`;
  window.history.replaceState({ path: newUrl }, "", newUrl);
}

/**
 * This function retrieves and returns the URL parameters as an object with key-value pairs.
 * @returns The function `getUrlParams()` returns an object containing key-value pairs of the query
 * parameters in the current URL. The keys are the parameter names and the values are the parameter
 * values.
 */
function getUrlParams(): { [key: string]: string } {
  const searchParams = new URLSearchParams(window.location.search);
  const params: { [key: string]: string } = {};
  searchParams.forEach((value, key) => {
    if (!value) return;
    params[key] = fromUrlSafe(value);
  });
  return params;
}

/**
 * The function removes a specified parameter from the URL query string and updates the URL
 * accordingly.
 * @param {string} paramName - The `paramName` parameter is a string that represents the name of the
 * query parameter that you want to remove from the URL.
 * @returns The function does not return anything. It has a return type of `void`, which means it does
 * not return any value.
 */
function removeUrlParam(paramName: string): void {
  const urlParts = window.location.href.split("?");
  if (urlParts.length <= 1) {
    // No query string found, do nothing
    return;
  }
  const queryString = urlParts[1];
  const queryParams = new URLSearchParams(queryString);
  queryParams.delete(paramName);
  const newQueryString = queryParams.toString();
  if (newQueryString === "") {
    // No query parameters left, update URL without query string
    window.history.replaceState(null, "", urlParts[0]);
  } else {
    window.history.replaceState(null, "", urlParts[0] + "?" + newQueryString);
  }
}

/**
 * The function `fromUrlSafe` decodes a URL-safe string and returns the corresponding JavaScript object
 * or value.
 * @param {string} urlSafeString - The `urlSafeString` parameter is a string that represents a URL-safe
 * encoded value.
 * @returns the decoded value of the URL-safe string. If the decoded value can be parsed as JSON, it
 * will return the parsed JSON object. Otherwise, it will return the decoded value as is.
 */
function fromUrlSafe(urlSafeString: string): any {
  if (urlSafeString === null || urlSafeString === undefined) return "#null";
  const decodedValue = decodeURIComponent(
    urlSafeString?.replace(/(%[0-9A-F]{2})+/g, decodeURIComponent)
  );
  try {
    return JSON.parse(decodedValue);
  } catch {
    return decodedValue;
  }
}

/**
 * The `toUrlSafe` function takes any value, encodes it as a URL-safe string, and replaces certain
 * characters with their corresponding URL-encoded values.
 * @param {any} value - The `value` parameter in the `toUrlSafe` function is the value that needs to be
 * converted to a URL-safe string. It can be of any type, including null or undefined.
 * @returns a URL-safe string representation of the input value.
 */
function toUrlSafe(value: any): string {
  if (value === null || value === undefined) return "#null";
  const encodedValue = encodeURIComponent(JSON.stringify(value));
  return encodedValue?.replace(/[-_.!~*'()]/g, (char) => {
    switch (char) {
      case "-":
        return "%2D";
      case "_":
        return "%5F";
      case ".":
        return "%2E";
      case "!":
        return "%21";
      case "~":
        return "%7E";
      case "*":
        return "%2A";
      case "'":
        return "%27";
      case "(":
        return "%28";
      case ")":
        return "%29";
      default:
        return char;
    }
  });
}

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
const getCurrentUrl = (includeQueryParams: boolean = false) => {
  let url =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname;
  if (includeQueryParams && window.location.search) {
    url += window.location.search;
  }
  return url;
};

/**
 * The function `isUrlActive` checks if a given URL is currently active in the browser.
 * @param {string} url - The `url` parameter is a string representing the URL that you want to check if
 * it is active or not.
 * @returns a boolean value.
 */
const isUrlActive = (url: string) => {
  // Convert relative URL to absolute
  const anchor = document.createElement("a");
  anchor.href = url;
  const convertedUrl = anchor.href;
  return (
    getCurrentUrl(true) === convertedUrl ||
    getCurrentUrl(false) === convertedUrl
  );
};

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
async function testLink(link: HTMLAnchorElement): Promise<number> {
  try {
    const url = link.href;
    const response = await fetch(url, { method: "HEAD" });
    return response.status;
  } catch {
    return 500;
  }
}

/**
 * The function `isUrlAnchor` checks if a given URL starts with a '#' character.
 * @param {string} url - A string representing a URL.
 */
const isUrlAnchor = (url: string): boolean => url?.startsWith("#");

/**
 * The function `isUrlContact` checks if a given URL is a contact URL (either an email or a phone
 * number).
 * @param {string} url - The `url` parameter is a string that represents a URL.
 */
const isUrlContact = (url: string): boolean =>
  url?.startsWith("mailto:") || url?.startsWith("tel:");

/**
 * The function `isUrlJS` checks if a given URL starts with "javascript:".
 * @param {string} url - A string representing a URL.
 */
// eslint-disable-next-line no-script-url
const isUrlJS = (url: string): boolean => url?.startsWith("javascript:");

/**
 * The function `isUrlInsecure` checks if a given URL starts with 'http://' and returns a boolean
 * value.
 * @param {string} url - A string representing a URL.
 */
const isUrlInsecure = (url: string): boolean => url?.startsWith("http://");

/**
 * The function `isUrlLink` checks if a given URL is a link and not an anchor, contact, or JavaScript
 * URL.
 * @param {string} url - The `url` parameter is a string that represents a URL.
 */
const isUrlLink = (url: string): boolean =>
  !isUrlAnchor(url) && !isUrlContact(url) && !isUrlJS(url);

/**
 * The function `isUrlExternal` checks if a given URL is an external link.
 * @param {string} url - The `url` parameter is a string that represents a URL.
 */
const isUrlExternal = (url: string): boolean =>
  isUrlLink(url) &&
  !url?.startsWith(`${window.location.protocol}//${window.location.host}`) &&
  !url?.startsWith("/");

/**
 * The function `isUrlInternal` checks if a given URL is an internal link.
 * @param {string} url - The `url` parameter is a string that represents a URL.
 */
const isUrlInternal = (url: string): boolean =>
  isUrlLink(url) && !isUrlExternal(url);

const isUrlRelative = (url: string): boolean => url.startsWith("/");

/* The above code is defining a function called `linkType` that takes a string parameter `url` and
returns a string. The function checks the given `url` against various conditions using different
helper functions (`emptyString`, `isUrlAnchor`, `isUrlContact`, `isUrlJS`, `isUrlExternal`,
`isUrlInternal`, `isUrlInsecure`) and returns a specific string based on the condition that matches.
If none of the conditions match, it returns 'unknown'. */
const linkType = (
  url: string
):
  | "unknown"
  | "empty"
  | "anchor"
  | "contact"
  | "js"
  | "external"
  | "internal"
  | "insecure" => {
  if (emptyString(url)) return "empty";
  if (isUrlAnchor(url)) return "anchor";
  if (isUrlContact(url)) return "contact";
  if (isUrlJS(url)) return "js";
  if (isUrlExternal(url)) return "external";
  if (isUrlInternal(url)) return "internal";
  if (isUrlInsecure(url)) return "insecure";
  return "unknown";
};

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
async function linkInfo(
  link: HTMLAnchorElement,
  scan: boolean = true
): Promise<LinkScanCheckResult> {
  const url = link.getAttribute("href");
  const linkRecord: LinkScanCheckResult = {
    url: url,
    status: 200,
    isBroken: !url,
    isInternal: isUrlInternal(url),
    isExternal: isUrlExternal(url),
    isInsecure: isUrlInsecure(url),
    isAnchor: isUrlAnchor(url),
    isContact: isUrlContact(url),
    isJS: isUrlJS(url),
    element: link,
    text: link.innerText,
    scanned: scan,
  };
  if (
    !(
      linkRecord.isExternal ||
      linkRecord.isBroken ||
      linkRecord.isAnchor ||
      linkRecord.isContact ||
      linkRecord.isJS
    )
  ) {
    linkRecord.status = scan ? await testLink(link) : undefined;
    linkRecord.isBroken = scan ? linkRecord.status >= 400 : undefined;
  }
  return linkRecord;
}

function getLinkInfo(link: HTMLAnchorElement): LinkInfo {
  const url = link.getAttribute("href");
  const linkRecord: LinkInfo = {
    url: url,
    isInternal: isUrlInternal(url),
    isExternal: isUrlExternal(url),
    isInsecure: isUrlInsecure(url),
    isAnchor: isUrlAnchor(url),
    isContact: isUrlContact(url),
    isJS: isUrlJS(url),
    element: link,
    text: link.innerText,
  };

  return linkRecord;
}

export function getWebFromUrl(url: string): IWeb {
  const Url = new URL(url);

  // Extract the site URL up to the second segment
  const pathSegments = Url.pathname.split("/").filter((segment) => segment);
  let webUrl = `${Url.origin}/${pathSegments[0]}`;
  if (pathSegments.length > 1) {
    webUrl += `/${pathSegments[1]}`;
  }

  // Return the web object
  return Web([sp().web, webUrl]);
}

async function scanHTMLForLinks(html: string): Promise<LinkInfo[]> {
  if (!html) return [];

  try {
    // Create a DOM parser to parse the HTML string
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Find all anchor elements
    const links: HTMLAnchorElement[] = Array.from(doc.querySelectorAll("a"));
    const referenceUrls: LinkInfo[] = [];

    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (href && !href.startsWith("#")) {
        const info = getLinkInfo(link);
        if (!info) return;
        referenceUrls.push(info);
      }
    });

    return referenceUrls;
  } catch (error) {
    // If parsing fails, return an empty array
    return [];
  }
}
export {
  isUrlActive,
  testLink,
  linkType,
  toUrlSafe,
  getLinkInfo,
  linkInfo,
  removeUrlParam,
  scanHTMLForLinks,
  fromUrlSafe,
  getUrlParam,
  hasUrlParam,
  setUrlParam,
  getUrlParams,
  getSearchCenterUrl,
  getTenantUrl,
  getUrl,
  isUrlExternal,
  getSearchParameters,
  getUrlFullPage,
  getUrlFull,
  getUrlDetails,
  getCurrentPageUrl,
  isUrlRelative,
  getCurrentUrl,
};
