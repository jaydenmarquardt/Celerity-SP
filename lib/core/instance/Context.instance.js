import { instance } from "./Base.instance";
/**
 * The function returns the context of a base component.
 * @returns the value of `W[INSTANCE_KEY]['context']`.
 */
export const theContext = () => {
    return instance()["context"];
};
/**
 * The function `thePageContext` returns the page context.
 * @returns the `pageContext` property of the `theContext()` function, casted as `any`.
 */
export const thePageContext = () => {
    var _a;
    return (_a = theContext()) === null || _a === void 0 ? void 0 : _a.pageContext;
};
/**
 * The function `theLegacyContext` returns the legacy page context from `thePageContext`.
 * @returns the `legacyPageContext` property of the `thePageContext()` function.
 */
// @deprecated - will break eventually
export const theLegacyContext = () => {
    var _a;
    return (_a = thePageContext()) === null || _a === void 0 ? void 0 : _a.legacyPageContext;
};
export const theRequestPath = () => {
    var _a, _b;
    return (_b = (_a = thePageContext()) === null || _a === void 0 ? void 0 : _a.site) === null || _b === void 0 ? void 0 : _b.serverRequestPath;
};
export const isSiteContents = () => {
    return theRequestPath() === "/_layouts/15/viewlsts.aspx";
};
export const isListView = () => {
    const context = thePageContext();
    if ((context === null || context === void 0 ? void 0 : context.list) === undefined)
        return false;
    if ((context === null || context === void 0 ? void 0 : context.listItem) !== undefined)
        return false;
    return true;
};
export const isListItemView = (listTitle) => {
    var _a;
    const context = thePageContext();
    if ((context === null || context === void 0 ? void 0 : context.list) === undefined)
        return false;
    if ((context === null || context === void 0 ? void 0 : context.listItem) === undefined)
        return false;
    return !listTitle || ((_a = context === null || context === void 0 ? void 0 : context.list) === null || _a === void 0 ? void 0 : _a.title) === listTitle;
};
export const isPageView = () => {
    var _a, _b;
    return ((_b = (_a = thePageContext()) === null || _a === void 0 ? void 0 : _a.list) === null || _b === void 0 ? void 0 : _b.title) === "Site Pages";
};
export const isFrontEnd = () => {
    return isListItemView();
};
export const isBackend = () => {
    return !isFrontEnd();
};
//# sourceMappingURL=Context.instance.js.map