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
export const theTenancyId = (): string => {
  return thePageContext()?.aadInfo?.tenantId?.toString();
};

/**
 * The function returns the URL of the current tenancy.
 * @returns A string that represents the URL of the current tenancy.
 */
export const theTenancyUrl = (): string => {
  return `https://${location.host}`;
};
