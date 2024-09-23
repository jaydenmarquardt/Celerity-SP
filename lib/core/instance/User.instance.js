/**
 * ===========================================
 * -------------------USER---------------------
 * ===========================================
 */
import { instance } from "./Base.instance";
import { theLegacyContext, thePageContext } from "./Context.instance";
import { theIWeb } from "./Web.instance";
/**
 * The function `theUserId` returns the user ID from the legacy context.
 * @returns A number is being returned.
 */
// @deprecated - will break eventually
export const theUserId = () => {
    var _a;
    return (_a = theLegacyContext()) === null || _a === void 0 ? void 0 : _a.userId;
};
/**
 * The function `theUserUuid` returns the user UUID from the page context.
 * @returns A string value representing the user UUID.
 */
export const theUserUuid = () => {
    var _a, _b, _c;
    return (_c = (_b = (_a = thePageContext()) === null || _a === void 0 ? void 0 : _a.aadInfo) === null || _b === void 0 ? void 0 : _b.userId) === null || _c === void 0 ? void 0 : _c.toString();
};
/**
 * The function `theUserTitle` returns the diSPay name of the user in the page context.
 * @returns The function `theUserTitle` returns the diSPay name of the user.
 */
export const theUserTitle = () => {
    var _a, _b;
    return (_b = (_a = thePageContext()) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.diSPayName;
};
/**
 * The function `theUserEmail` returns the email of the user in the current page context.
 * @returns The email of the user in the page context.
 */
export const theUserEmail = () => {
    var _a, _b;
    return (_b = (_a = thePageContext()) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.email;
};
/**
 * The function `theUserName` returns the login name of the user in the current page context.
 * @returns A string value representing the login name of the user.
 */
export const theUserName = () => {
    var _a, _b;
    return (_b = (_a = thePageContext()) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.loginName;
};
/**
 * The function returns the site user with the specified ID.
 * @returns an object of type `ISiteUser`.
 */
export const theIUser = () => {
    return theIWeb().getUserById(theUserId());
};
/**
 * The function returns the current user object.
 * @returns the value of `instance()['user']`.
 */
export const theUser = () => {
    return instance()["user"];
};
/**
 * The function `theUserProfile` returns the profile object from the `instance()` variable.
 * @returns the value of `instance()['profile']`.
 */
export const theUserProfile = () => {
    return instance()["profile"];
};
//# sourceMappingURL=User.instance.js.map