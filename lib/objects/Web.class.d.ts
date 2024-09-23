import type { IWeb, IWebInfo } from "@pnp/sp/webs";
import { SPObject } from "./Object.class";
declare class SPWeb extends SPObject<IWeb> {
    loaded: boolean;
    data: IWebInfo;
    url: string;
    constructor(fullUrl?: string, web?: IWeb);
    /**
     * This function retrieves information about a hub site and its related site and web.
     * @returns a Promise that resolves to an object of type SPHubSite.
     */
    get(): Promise<SPWeb>;
}
export default SPWeb;
//# sourceMappingURL=Web.class.d.ts.map