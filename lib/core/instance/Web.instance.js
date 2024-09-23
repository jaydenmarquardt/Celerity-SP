/**
 * ===========================================
 * -------------------WEB---------------------
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
 * The function `theWebId` returns the ID of the current web page.
 * @returns A string representation of the web ID.
 */
export const theWebId = () => {
    var _a, _b;
    return (_b = (_a = thePageContext()) === null || _a === void 0 ? void 0 : _a.web) === null || _b === void 0 ? void 0 : _b.id.toString();
};
/**
 * The function `theWebTitle` returns the title of the web page.
 * @returns A string value representing the title of the web page.
 */
export const theWebTitle = () => {
    var _a, _b;
    return (_b = (_a = thePageContext()) === null || _a === void 0 ? void 0 : _a.web) === null || _b === void 0 ? void 0 : _b.title;
};
/**
 * The function `theWebUrl` returns the absolute or relative URL of the current web page.
 * @param [relative=false] - The "relative" parameter is a boolean value that determines whether the
 * returned URL should be relative or absolute.
 * @returns The function `theWebUrl` returns a string value. If the `relative` parameter is set to
 * `false`, it returns the absolute URL of the web page. If the `relative` parameter is set to `true`,
 * it returns the server-relative URL of the web page.
 */
export const theWebUrl = (relative = false) => {
    var _a, _b, _c, _d;
    return !relative
        ? (_b = (_a = thePageContext()) === null || _a === void 0 ? void 0 : _a.web) === null || _b === void 0 ? void 0 : _b.absoluteUrl
        : (_d = (_c = thePageContext()) === null || _c === void 0 ? void 0 : _c.web) === null || _d === void 0 ? void 0 : _d.serverRelativeUrl;
};
/**
 * The function `theTimeZone` returns the description of the time zone of the web in the page context.
 * @returns The function `theTimeZone` is returning a string value.
 */
export const theTimeZone = () => {
    var _a, _b, _c;
    return (_c = (_b = (_a = thePageContext()) === null || _a === void 0 ? void 0 : _a.web) === null || _b === void 0 ? void 0 : _b.timeZoneInfo) === null || _c === void 0 ? void 0 : _c.description;
};
/**
 * The function `theLanguageCode` returns the language code of the current web page.
 * @returns the language code as a string.
 */
export const theLanguageCode = () => {
    var _a, _b;
    return (_b = (_a = thePageContext()) === null || _a === void 0 ? void 0 : _a.web) === null || _b === void 0 ? void 0 : _b.languageName;
};
/**
 * The function returns the current SharePoint web.
 * @returns the `web` property of the `sp()` object.
 */
export const theIWeb = () => {
    return sp().web;
};
/**
 * The function `theWeb` returns a promise that resolves to an object of type `IWebInfo`.
 * @returns The function `theWeb` is returning a promise that resolves to an object of type `IWebInfo`.
 */
export const theWeb = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield theIWeb()();
});
//# sourceMappingURL=Web.instance.js.map