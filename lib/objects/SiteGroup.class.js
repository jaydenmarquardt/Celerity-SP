var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";
import { SPObject } from "./Object.class";
import { userInit, usersInit } from "./User.class";
class SPSiteGroup extends SPObject {
    constructor(name, id) {
        super();
        this.query = () => {
            return this.web.siteGroups.getByName(this.name);
        };
        /* The `title` property is a getter function that returns the title of the site group. */
        this.title = () => this.checkUnloaded() && this.group.Title;
        this.getIcon = () => "Group";
        /* The `users` function is an asynchronous function that retrieves the users belonging to the site
        group. */
        this.users = () => __awaiter(this, void 0, void 0, function* () {
            if (this._users)
                return this._users;
            const users = yield this.query().users();
            this._users = usersInit(users);
            return this._users;
        });
        /* The `addUser` function is an asynchronous function that adds a user to the site group. */
        this.addUser = (user) => __awaiter(this, void 0, void 0, function* () {
            const addedUserQuery = yield this.query().users.add(user.loginName);
            const addedUser = yield addedUserQuery();
            return userInit(addedUser);
        });
        /* The `removeUser` function is an asynchronous function that removes a user from the site group. It
        takes a `SPLUser` object as a parameter and uses the `removeById` method to remove the user from
        the site group based on their ID. The function does not return any value (`Promise<void>`). */
        this.removeUser = (user) => __awaiter(this, void 0, void 0, function* () {
            yield this.query().users.removeById(user.id);
        });
        /* The `update` function is an asynchronous function that updates the properties of a site group. It
        takes a `ISiteGroupInfo` object as a parameter, which contains the updated properties of the site
        group. */
        this.update = (group) => __awaiter(this, void 0, void 0, function* () {
            const updatedGroupQuery = yield this.query().update(group);
            this.group = updatedGroupQuery;
            return this;
        });
        this.name = name;
        this.id = id;
    }
    init(group) {
        this.group = group;
        this.id = group.Id;
        this.name = group.Title;
        this.loaded = true;
        return this;
    }
    /**
     * The function retrieves a site group and assigns its properties to the current object.
     * @returns an instance of the SPSiteGroup class.
     */
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield this.query()();
            this.group = group;
            if (this.group) {
                this.loaded = true;
                this.id = this.group.Id;
                this.name = this.group.Title;
            }
            return this;
        });
    }
}
function groupInit(group) {
    return new SPSiteGroup(group.Title, group.Id).init(group);
}
function groupsInit(groups) {
    return groups.map((group) => groupInit(group));
}
export { SPSiteGroup, groupInit, groupsInit };
//# sourceMappingURL=SiteGroup.class.js.map