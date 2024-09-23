import type { IHubSite, IHubSiteInfo, IHubSiteWebData } from "@pnp/sp/hubsites";
import "@pnp/sp/hubsites";
import type { ISite } from "@pnp/sp/sites";
import type { ISiteInfo } from "@pnp/sp/sites/types";
import type { ISerializableNavigationNode } from "@pnp/sp/navigation";
import { IWeb, IWebInfo } from "@pnp/sp/webs";
import { SPObject } from "./Object.class";
import type { UnknownObject } from "../util/Util.types";
import type { ISlimSiteInfo } from "./types/Site.types";
import type { IAppInfo } from "./types/App.types";
declare class SPHubSite extends SPObject<IHubSite> {
    loaded: boolean;
    info: IHubSiteInfo;
    data: Partial<IHubSiteWebData> | IHubSiteWebData;
    id: string;
    siteQuery: ISite;
    site: ISiteInfo;
    _siteId: string;
    webQuery: IWeb;
    webb: IWebInfo;
    _webId: string;
    subWebsList: (ISlimSiteInfo | IWebInfo)[];
    subWebsAllList: IWebInfo[];
    notHub: boolean;
    constructor(id?: string);
    /**
     * This function retrieves information about a hub site and its related site and web.
     * @returns a Promise that resolves to an object of type SPHubSite.
     */
    get(): Promise<SPHubSite>;
    rootISite: () => ISite;
    rootSite: () => ISiteInfo;
    rootSiteID: () => string;
    rootIWeb: () => IWeb;
    rootWeb: () => IWebInfo;
    rootWebID: () => string;
    tenantID: () => string;
    designID: () => string;
    parentHubID: () => string;
    themeKey: () => string;
    headerEmphasis: () => string;
    metaNav: () => boolean;
    menuEnabled: () => boolean;
    navItems: () => ISerializableNavigationNode[];
    subWebs: (full?: boolean) => Promise<(ISlimSiteInfo | IWebInfo)[]>;
    childSites(): Promise<ISlimSiteInfo[]>;
    allWebs: () => Promise<IWebInfo[]>;
    allIWebs: () => Promise<IWeb[]>;
    subIWebs: () => Promise<IWeb[]>;
    subWebsAll: () => Promise<IWebInfo[]>;
    hasParentHub: () => boolean;
    url: () => string;
    logo: () => string;
    title: () => string;
    description: () => string;
    apps(): Promise<IAppInfo[]>;
    uploadAppToSites(fileName: string, blob: Blob): Promise<UnknownObject[]>;
}
export { SPHubSite };
//# sourceMappingURL=HubSite.class.d.ts.map