import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";
import { SPObject } from "./Object.class";
import { ISiteGroup, ISiteGroupInfo } from "@pnp/sp/site-groups";
import { SPLUser, userInit, usersInit } from "./User.class";

class SPSiteGroup extends SPObject<ISiteGroup> {
  group: ISiteGroupInfo;
  name: string;
  _users: SPLUser[];
  id: number;

  constructor(name?: string, id?: number) {
    super();
    this.name = name;
    this.id = id;
  }

  query: () => ISiteGroup = () => {
    return this.web.siteGroups.getByName(this.name);
  };

  init(group: ISiteGroupInfo): SPSiteGroup {
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
  async get(): Promise<SPSiteGroup> {
    const group = await this.query()();

    this.group = group;
    if (this.group) {
      this.loaded = true;
      this.id = this.group.Id;
      this.name = this.group.Title;
    }
    return this;
  }

  /* The `title` property is a getter function that returns the title of the site group. */
  title = (): string => this.checkUnloaded() && this.group.Title;
  getIcon = () => "Group";

  /* The `users` function is an asynchronous function that retrieves the users belonging to the site
  group. */
  users = async (): Promise<SPLUser[]> => {
    if (this._users) return this._users;
    const users = await this.query().users();
    this._users = usersInit(users);
    return this._users;
  };

  /* The `addUser` function is an asynchronous function that adds a user to the site group. */
  addUser = async (user: SPLUser): Promise<SPLUser> => {
    const addedUserQuery = await this.query().users.add(user.loginName);
    const addedUser = await addedUserQuery();
    return userInit(addedUser);
  };

  /* The `removeUser` function is an asynchronous function that removes a user from the site group. It
  takes a `SPLUser` object as a parameter and uses the `removeById` method to remove the user from
  the site group based on their ID. The function does not return any value (`Promise<void>`). */
  removeUser = async (user: SPLUser): Promise<void> => {
    await this.query().users.removeById(user.id);
  };

  /* The `update` function is an asynchronous function that updates the properties of a site group. It
  takes a `ISiteGroupInfo` object as a parameter, which contains the updated properties of the site
  group. */
  update = async (group: ISiteGroupInfo): Promise<SPSiteGroup> => {
    const updatedGroupQuery: ISiteGroupInfo = await this.query().update(group);
    this.group = updatedGroupQuery;
    return this;
  };
}

function groupInit(group: ISiteGroupInfo): SPSiteGroup {
  return new SPSiteGroup(group.Title, group.Id).init(group);
}

function groupsInit(groups: ISiteGroupInfo[]): SPSiteGroup[] {
  return groups.map((group: ISiteGroupInfo) => groupInit(group));
}

export { SPSiteGroup, groupInit, groupsInit };
