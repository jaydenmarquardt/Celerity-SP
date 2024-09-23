/**
 * ===========================================
 * ------------------GROUPS-------------------
 * ===========================================
 */

import type { ISiteGroupInfo } from "@pnp/sp/site-groups";
import {
  SPSiteGroup,
  groupsInit,
  groupInit,
} from "../../objects/SiteGroup.class";
import { theIWeb } from "./Web.instance";

/**
 * The function `theGroups` returns a promise that resolves to an array of `SPSiteGroup` objects after
 * retrieving site groups using the `theIWeb().siteGroups()` method.
 * @returns a Promise that resolves to an array of SPSiteGroup objects.
 */
export const theGroups = async (): Promise<SPSiteGroup[]> => {
  const groups: ISiteGroupInfo[] = (await theIWeb().siteGroups()) || [];

  return groupsInit(groups);
};

/**
 * The function `theOwnerGroup` returns the associated owner group of a web.
 * @returns The function `theOwnerGroup` is returning a Promise that resolves to an object of type
 * `SPSiteGroup`.
 */
export const theOwnerGroup = async (): Promise<SPSiteGroup> => {
  const group = await theIWeb().associatedOwnerGroup();

  return groupInit(group);
};

/**
 * The function `theMemberGroup` returns the associated member group of a web.
 * @returns a Promise that resolves to an object of type SPSiteGroup.
 */
export const theMemberGroup = async (): Promise<SPSiteGroup> => {
  const group = await theIWeb().associatedMemberGroup();

  return groupInit(group);
};

/**
 * The function `theVisitorGroup` returns the associated visitor group of a SharePoint site.
 * @returns a Promise that resolves to an object of type SPSiteGroup.
 */
export const theVisitorGroup = async (): Promise<SPSiteGroup> => {
  const group = await theIWeb().associatedVisitorGroup();

  return groupInit(group);
};
