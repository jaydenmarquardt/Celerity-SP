import { isCached, setCache } from "../util/Cache";
import { SPLUser } from "./User.class";
import { PermissionKind } from "@pnp/sp/security/types";
import { sp } from "../core/Celertity";
import { SocialActorTypes } from "@pnp/sp/social";

export class SPCurrentUser extends SPLUser {
  async get(): Promise<SPCurrentUser> {
    await super.get();
    await this.groups();
    return this;
  }

  async getFollowing() {
    return await sp().social.my.followed(
      SocialActorTypes.Document | SocialActorTypes.Site | SocialActorTypes.User
    );
  }

  /**
   * The function `hasPerm` checks if a user has a specific permission and caches the result for future
   * use.
   * @param {PermissionKind} perm - The parameter `perm` is of type `PermissionKind`. It represents the
   * permission that we want to check for.
   * @returns The function `hasPerm` returns a Promise that resolves to a boolean value.
   */
  async hasPerm(perm: PermissionKind): Promise<boolean> {
    const cache = isCached(`currentUser_Perm_${perm}`);
    if (cache) return cache;

    const result = await this.web.currentUserHasPermissions(perm);
    setCache(`currentUser_Perm_${perm}`, result);
    return result;
  }

  /**
   * The function checks if a given groupId exists in the _groups array.
   * @param {number} [groupId] - The `groupId` parameter is a number that represents the ID of a group.
   * @returns a boolean value.
   */
  inGroup(groupId?: number): boolean {
    if (groupId === undefined) return false;

    if (!this._groups) {
      return false;
    }
    return this._groups.some((g) => g.id === groupId);
  }

  //TODO graph me funcs
  //messages
  //events
  //planner tasks/projects
  //ondrive
  //preferences
  //graph groups
}
