import "@pnp/sp/presets/all";
import "@pnp/graph/presets/all";
import { IWeb, IWebInfo } from "@pnp/sp/webs";
import { ISPQueryable } from "@pnp/sp/spqueryable";
declare class SPObject<T = ISPQueryable> {
    classType: string;
    loaded: boolean;
    web: IWeb;
    _webInfo: IWebInfo;
    queryable: T;
    constructor();
    /**
     * This function sets the web property of the class to the web object passed in
     * @param {Web} web - The web object that is used to make the REST calls.
     */
    setWeb(web: IWeb): void;
    webInfo: () => Promise<IWebInfo>;
    webId: () => string;
    webQueryUrl: () => string;
    query: () => T;
    getIcon: () => string;
    checkUnloaded: (harsh?: boolean) => boolean;
    unloadedError: (harsh?: boolean) => void;
}
export { SPObject };
//# sourceMappingURL=Object.class.d.ts.map