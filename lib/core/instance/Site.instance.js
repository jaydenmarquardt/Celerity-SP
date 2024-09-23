/**
 * ===========================================
 * ------------------SITE---------------------
 * ===========================================
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { thePageContext } from "./Context.instance";
import { sp } from "../Celertity";
/**
 * The function `theSiteId` returns the ID of the current site.
 * @returns A string representation of the site ID.
 */
export const theSiteId = () => {
    var _a, _b, _c;
    return (_c = (_b = (_a = thePageContext()) === null || _a === void 0 ? void 0 : _a.site) === null || _b === void 0 ? void 0 : _b.id) === null || _c === void 0 ? void 0 : _c.toString();
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
export const theSiteUrl = (absolute = false) => {
    var _a, _b, _c, _d;
    return absolute
        ? (_b = (_a = thePageContext()) === null || _a === void 0 ? void 0 : _a.site) === null || _b === void 0 ? void 0 : _b.absoluteUrl
        : (_d = (_c = thePageContext()) === null || _c === void 0 ? void 0 : _c.site) === null || _d === void 0 ? void 0 : _d.serverRelativeUrl;
};
export const isSearchPage = () => {
    var _a, _b;
    return (_b = (_a = window.location) === null || _a === void 0 ? void 0 : _a.href) === null || _b === void 0 ? void 0 : _b.startsWith(`${theSiteUrl(true)}/_layouts/15/search.aspx`);
};
/**
 * The function `theHomeUrl` returns the absolute or server-relative URL of the home page.
 * @param [absolute=false] - The `absolute` parameter is a boolean value that determines whether the
 * returned URL should be an absolute URL or a relative URL.
 * @returns The function `theHomeUrl` returns a string value. If the `absolute` parameter is `true`, it
 * returns the absolute URL of the home page. Otherwise, it returns the server-relative URL of the home
 * page.
 */
export const theHomeUrl = (absolute = false) => {
    var _a, _b, _c, _d;
    if (absolute)
        return (_b = (_a = thePageContext()) === null || _a === void 0 ? void 0 : _a.site) === null || _b === void 0 ? void 0 : _b.absoluteUrl;
    return (_d = (_c = thePageContext()) === null || _c === void 0 ? void 0 : _c.site) === null || _d === void 0 ? void 0 : _d.serverRelativeUrl;
};
/**
 * The function returns the current SharePoint site.
 * @returns the `site` property of the `sp()` object.
 * @returns the `site` property of the `sp()` object.
 */
export const theISite = () => {
    return sp().site;
};
/**
 * The function `theSite` returns a promise that resolves to an `ISiteInfo` object.
 * @returns The function `theSite` is returning a promise that resolves to an object of type
 * `ISiteInfo`.
 */
export const theSite = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield theISite()();
});
//# sourceMappingURL=Site.instance.js.map