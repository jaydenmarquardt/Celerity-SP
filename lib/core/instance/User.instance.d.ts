/**
 * ===========================================
 * -------------------USER---------------------
 * ===========================================
 */
import { ISiteUser } from "@pnp/sp/site-users";
import { SPCurrentUser } from "../../objects/CurrentUser.class";
import { UnknownObject } from "../../util/Util.types";
/**
 * The function `theUserId` returns the user ID from the legacy context.
 * @returns A number is being returned.
 */
export declare const theUserId: () => number;
/**
 * The function `theUserUuid` returns the user UUID from the page context.
 * @returns A string value representing the user UUID.
 */
export declare const theUserUuid: () => string;
/**
 * The function `theUserTitle` returns the diSPay name of the user in the page context.
 * @returns The function `theUserTitle` returns the diSPay name of the user.
 */
export declare const theUserTitle: () => string;
/**
 * The function `theUserEmail` returns the email of the user in the current page context.
 * @returns The email of the user in the page context.
 */
export declare const theUserEmail: () => string;
/**
 * The function `theUserName` returns the login name of the user in the current page context.
 * @returns A string value representing the login name of the user.
 */
export declare const theUserName: () => string;
/**
 * The function returns the site user with the specified ID.
 * @returns an object of type `ISiteUser`.
 */
export declare const theIUser: () => ISiteUser;
/**
 * The function returns the current user object.
 * @returns the value of `instance()['user']`.
 */
export declare const theUser: () => SPCurrentUser;
/**
 * The function `theUserProfile` returns the profile object from the `instance()` variable.
 * @returns the value of `instance()['profile']`.
 */
export declare const theUserProfile: () => UnknownObject;
//# sourceMappingURL=User.instance.d.ts.map