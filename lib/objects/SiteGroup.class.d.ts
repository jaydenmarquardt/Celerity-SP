import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";
import { SPObject } from "./Object.class";
import { ISiteGroup, ISiteGroupInfo } from "@pnp/sp/site-groups";
import { SPLUser } from "./User.class";
declare class SPSiteGroup extends SPObject<ISiteGroup> {
    group: ISiteGroupInfo;
    name: string;
    _users: SPLUser[];
    id: number;
    constructor(name?: string, id?: number);
    query: () => ISiteGroup;
    init(group: ISiteGroupInfo): SPSiteGroup;
    /**
     * The function retrieves a site group and assigns its properties to the current object.
     * @returns an instance of the SPSiteGroup class.
     */
    get(): Promise<SPSiteGroup>;
    title: () => string;
    getIcon: () => string;
    users: () => Promise<SPLUser[]>;
    addUser: (user: SPLUser) => Promise<SPLUser>;
    removeUser: (user: SPLUser) => Promise<void>;
    update: (group: ISiteGroupInfo) => Promise<SPSiteGroup>;
}
declare function groupInit(group: ISiteGroupInfo): SPSiteGroup;
declare function groupsInit(groups: ISiteGroupInfo[]): SPSiteGroup[];
export { SPSiteGroup, groupInit, groupsInit };
//# sourceMappingURL=SiteGroup.class.d.ts.map