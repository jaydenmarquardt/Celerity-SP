/**
 * ===========================================
 * ------------------GROUPS-------------------
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
import { groupsInit, groupInit, } from "../../objects/SiteGroup.class";
import { theIWeb } from "./Web.instance";
/**
 * The function `theGroups` returns a promise that resolves to an array of `SPSiteGroup` objects after
 * retrieving site groups using the `theIWeb().siteGroups()` method.
 * @returns a Promise that resolves to an array of SPSiteGroup objects.
 */
export const theGroups = () => __awaiter(void 0, void 0, void 0, function* () {
    const groups = (yield theIWeb().siteGroups()) || [];
    return groupsInit(groups);
});
/**
 * The function `theOwnerGroup` returns the associated owner group of a web.
 * @returns The function `theOwnerGroup` is returning a Promise that resolves to an object of type
 * `SPSiteGroup`.
 */
export const theOwnerGroup = () => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield theIWeb().associatedOwnerGroup();
    return groupInit(group);
});
/**
 * The function `theMemberGroup` returns the associated member group of a web.
 * @returns a Promise that resolves to an object of type SPSiteGroup.
 */
export const theMemberGroup = () => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield theIWeb().associatedMemberGroup();
    return groupInit(group);
});
/**
 * The function `theVisitorGroup` returns the associated visitor group of a SharePoint site.
 * @returns a Promise that resolves to an object of type SPSiteGroup.
 */
export const theVisitorGroup = () => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield theIWeb().associatedVisitorGroup();
    return groupInit(group);
});
//# sourceMappingURL=Groups.instance.js.map