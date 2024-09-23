/**
 * ===========================================
 * ------------------GROUPS-------------------
 * ===========================================
 */
import { SPSiteGroup } from "../../objects/SiteGroup.class";
/**
 * The function `theGroups` returns a promise that resolves to an array of `SPSiteGroup` objects after
 * retrieving site groups using the `theIWeb().siteGroups()` method.
 * @returns a Promise that resolves to an array of SPSiteGroup objects.
 */
export declare const theGroups: () => Promise<SPSiteGroup[]>;
/**
 * The function `theOwnerGroup` returns the associated owner group of a web.
 * @returns The function `theOwnerGroup` is returning a Promise that resolves to an object of type
 * `SPSiteGroup`.
 */
export declare const theOwnerGroup: () => Promise<SPSiteGroup>;
/**
 * The function `theMemberGroup` returns the associated member group of a web.
 * @returns a Promise that resolves to an object of type SPSiteGroup.
 */
export declare const theMemberGroup: () => Promise<SPSiteGroup>;
/**
 * The function `theVisitorGroup` returns the associated visitor group of a SharePoint site.
 * @returns a Promise that resolves to an object of type SPSiteGroup.
 */
export declare const theVisitorGroup: () => Promise<SPSiteGroup>;
//# sourceMappingURL=Groups.instance.d.ts.map