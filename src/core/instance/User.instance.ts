/**
 * ===========================================
 * -------------------USER---------------------
 * ===========================================
 */

import { ISiteUser } from "@pnp/sp/site-users";
import { SPCurrentUser } from "../../objects/CurrentUser.class";
import { UnknownObject } from "../../util/Util.types";
import { instance } from "./Base.instance";
import { theLegacyContext, thePageContext } from "./Context.instance";
import { theIWeb } from "./Web.instance";

/**
 * The function `theUserId` returns the user ID from the legacy context.
 * @returns A number is being returned.
 */
// @deprecated - will break eventually
export const theUserId = (): number => {
  return theLegacyContext()?.userId;
};

/**
 * The function `theUserUuid` returns the user UUID from the page context.
 * @returns A string value representing the user UUID.
 */
export const theUserUuid = (): string => {
  return thePageContext()?.aadInfo?.userId?.toString();
};

/**
 * The function `theUserTitle` returns the diSPay name of the user in the page context.
 * @returns The function `theUserTitle` returns the diSPay name of the user.
 */
export const theUserTitle = (): string => {
  return thePageContext()?.user?.diSPayName;
};

/**
 * The function `theUserEmail` returns the email of the user in the current page context.
 * @returns The email of the user in the page context.
 */
export const theUserEmail = (): string => {
  return thePageContext()?.user?.email;
};

/**
 * The function `theUserName` returns the login name of the user in the current page context.
 * @returns A string value representing the login name of the user.
 */
export const theUserName = (): string => {
  return thePageContext()?.user?.loginName;
};

/**
 * The function returns the site user with the specified ID.
 * @returns an object of type `ISiteUser`.
 */
export const theIUser = (): ISiteUser => {
  return theIWeb().getUserById(theUserId());
};

/**
 * The function returns the current user object.
 * @returns the value of `instance()['user']`.
 */
export const theUser = (): SPCurrentUser => {
  return instance()["user"];
};

/**
 * The function `theUserProfile` returns the profile object from the `instance()` variable.
 * @returns the value of `instance()['profile']`.
 */
export const theUserProfile = (): UnknownObject => {
  return instance()["profile"];
};
