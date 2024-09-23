import { SPLUser } from "./User.class";
import { PermissionKind } from "@pnp/sp/security/types";
export declare class SPCurrentUser extends SPLUser {
    get(): Promise<SPCurrentUser>;
    getFollowing(): Promise<import("@pnp/sp/social").ISocialActor[]>;
    /**
     * The function `hasPerm` checks if a user has a specific permission and caches the result for future
     * use.
     * @param {PermissionKind} perm - The parameter `perm` is of type `PermissionKind`. It represents the
     * permission that we want to check for.
     * @returns The function `hasPerm` returns a Promise that resolves to a boolean value.
     */
    hasPerm(perm: PermissionKind): Promise<boolean>;
    /**
     * The function checks if a given groupId exists in the _groups array.
     * @param {number} [groupId] - The `groupId` parameter is a number that represents the ID of a group.
     * @returns a boolean value.
     */
    inGroup(groupId?: number): boolean;
}
//# sourceMappingURL=CurrentUser.class.d.ts.map