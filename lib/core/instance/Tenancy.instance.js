/**
 * ===========================================
 * ---------------TENANCY---------------------
 * ===========================================
 */
import { thePageContext } from "./Context.instance";
/**
 * The function `theTenancyId` returns the tenant ID from the page context.
 * @returns A string representation of the tenant ID.
 */
export const theTenancyId = () => {
    var _a, _b, _c;
    return (_c = (_b = (_a = thePageContext()) === null || _a === void 0 ? void 0 : _a.aadInfo) === null || _b === void 0 ? void 0 : _b.tenantId) === null || _c === void 0 ? void 0 : _c.toString();
};
/**
 * The function returns the URL of the current tenancy.
 * @returns A string that represents the URL of the current tenancy.
 */
export const theTenancyUrl = () => {
    return `https://${location.host}`;
};
//# sourceMappingURL=Tenancy.instance.js.map