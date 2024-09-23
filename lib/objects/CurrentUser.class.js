var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isCached, setCache } from "../util/Cache";
import { SPLUser } from "./User.class";
import { sp } from "../core/Celertity";
import { SocialActorTypes } from "@pnp/sp/social";
export class SPCurrentUser extends SPLUser {
    get() {
        const _super = Object.create(null, {
            get: { get: () => super.get }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.get.call(this);
            yield this.groups();
            return this;
        });
    }
    getFollowing() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield sp().social.my.followed(SocialActorTypes.Document | SocialActorTypes.Site | SocialActorTypes.User);
        });
    }
    /**
     * The function `hasPerm` checks if a user has a specific permission and caches the result for future
     * use.
     * @param {PermissionKind} perm - The parameter `perm` is of type `PermissionKind`. It represents the
     * permission that we want to check for.
     * @returns The function `hasPerm` returns a Promise that resolves to a boolean value.
     */
    hasPerm(perm) {
        return __awaiter(this, void 0, void 0, function* () {
            const cache = isCached(`currentUser_Perm_${perm}`);
            if (cache)
                return cache;
            const result = yield this.web.currentUserHasPermissions(perm);
            setCache(`currentUser_Perm_${perm}`, result);
            return result;
        });
    }
    /**
     * The function checks if a given groupId exists in the _groups array.
     * @param {number} [groupId] - The `groupId` parameter is a number that represents the ID of a group.
     * @returns a boolean value.
     */
    inGroup(groupId) {
        if (groupId === undefined)
            return false;
        if (!this._groups) {
            return false;
        }
        return this._groups.some((g) => g.id === groupId);
    }
}
//# sourceMappingURL=CurrentUser.class.js.map