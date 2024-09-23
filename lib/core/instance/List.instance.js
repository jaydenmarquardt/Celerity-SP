/**
 * ===========================================
 * ------------------LIST---------------------
 * ===========================================
 */
import { isListItemView, thePageContext } from "./Context.instance";
import { theIWeb } from "./Web.instance";
import { instance } from "./Base.instance";
/**
 * The function `theListId` returns the ID of the list from the page context.
 * @returns A string representation of the ID of the list.
 */
export const theListId = () => {
    var _a, _b, _c;
    return (_c = (_b = (_a = thePageContext()) === null || _a === void 0 ? void 0 : _a.list) === null || _b === void 0 ? void 0 : _b.id) === null || _c === void 0 ? void 0 : _c.toString();
};
/**
 * The function `theListUrl` returns the server relative URL of the current list.
 * @returns the server relative URL of the list.
 */
export const theListUrl = () => {
    var _a, _b;
    return (_b = (_a = thePageContext()) === null || _a === void 0 ? void 0 : _a.list) === null || _b === void 0 ? void 0 : _b.serverRelativeUrl;
};
/**
 * The function `theListTitle` returns the title of the list from the page context.
 * @returns the title of the list from the page context.
 */
export const theListTitle = () => {
    var _a, _b;
    return (_b = (_a = thePageContext()) === null || _a === void 0 ? void 0 : _a.list) === null || _b === void 0 ? void 0 : _b.title;
};
/**
 * The function `isSitePage` returns true if the title of the current page is 'Site Pages'.
 * @returns A boolean value is being returned.
 */
export const isSitePage = () => {
    return isListItemView("Site Pages");
};
/**
 * The function returns the list of site pages from a given web.
 * @param {IWeb} web - The "web" parameter is of type "IWeb" and it is optional. It represents the web
 * or site where the list is located. If no value is provided for this parameter, it will default to
 * the result of calling the "theIWeb()" function.
 * @returns an instance of the "Site Pages" list from the provided web.
 */
export const theIPageList = (web = theIWeb()) => {
    return web.lists.getByTitle("Site Pages");
};
/**
 * The function `theIList` returns an instance of `IList` based on the provided `IWeb` object and the
 * title of the list.
 * @param {IWeb} web - The `web` parameter is of type `IWeb`, which is an interface representing a
 * SharePoint web. It is used to interact with the SharePoint web and perform operations such as
 * getting lists, creating lists, etc.
 * @returns an instance of the IList interface.
 */
export const theIList = (web = theIWeb()) => {
    if (!theListTitle())
        return undefined;
    return web.lists.getByTitle(theListTitle());
};
/**
 * The function returns the list object from a specific instance.
 * @returns the value of `instance()['list']`.
 */
export const theList = () => {
    return instance()["list"];
};
//# sourceMappingURL=List.instance.js.map