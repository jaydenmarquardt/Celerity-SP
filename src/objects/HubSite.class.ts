import type { IHubSite, IHubSiteInfo, IHubSiteWebData } from "@pnp/sp/hubsites";
import "@pnp/sp/hubsites";

import type { ISite } from "@pnp/sp/sites";
import type { ISiteInfo } from "@pnp/sp/sites/types";
import type { ISerializableNavigationNode } from "@pnp/sp/navigation";
import { IWeb, IWebInfo, Web } from "@pnp/sp/webs";
import { SPObject } from "./Object.class";
import { sp } from "../core/Celertity";
import { error, errorLog } from "../util/Debug";
import type { UnknownObject } from "../util/Util.types";
import type { ISlimSiteInfo } from "./types/Site.types";
import { theSiteUrl } from "../core/instance/Site.instance";
import type { IAppInfo } from "./types/App.types";
import { ISearchQuery } from "@pnp/sp/search/types";
import { SearchResults } from "@pnp/sp/search/query";

class SPHubSite extends SPObject<IHubSite> {
  loaded: boolean = false;
  info: IHubSiteInfo = undefined;
  data: Partial<IHubSiteWebData> | IHubSiteWebData = undefined;
  id: string;
  siteQuery: ISite;
  site: ISiteInfo;
  _siteId: string;
  webQuery: IWeb;
  webb: IWebInfo;
  _webId: string;
  subWebsList: (ISlimSiteInfo | IWebInfo)[];
  subWebsAllList: IWebInfo[];

  notHub: boolean = false;

  constructor(id?: string) {
    super();
    this.id = id;
  }

  /**
   * This function retrieves information about a hub site and its related site and web.
   * @returns a Promise that resolves to an object of type SPHubSite.
   */
  public async get(): Promise<SPHubSite> {
    if (this.loaded) return this;
    if (!this.id) {
      this.data = await await sp().web.hubSiteData(true);
      this.id = this.data?.relatedHubSiteIds?.[0];
    }
    if (!this.id) {
      error({
        component: "HubSite.class:Get",
        message: "No hub site for this site. Some features wont work.",
        type: "error",
        role: "user",
        severity: "high",
        data: { hub: this },
      });
      this.notHub = true;
      this.site = await sp().site();
      this.siteQuery = sp().site;
      this._siteId = this.site.Id;
      this.webQuery = sp().web;
      this.webb = await this.webQuery();
      this._webId = this.webb.Id;
      this.loaded = true;

      return this;
    }
    this.queryable = sp().hubSites.getById(this.id);

    this.info = await this.queryable();

    if (this.hasParentHub()) {
      this.id = this.parentHubID();
      this.queryable = sp().hubSites.getById(this.parentHubID());
      this.info = await this.queryable();
    }
    this.siteQuery = await this.query().getSite();
    this.site = await this.siteQuery();
    this._siteId = this.site.Id;

    this.webQuery = Web([this.web, this.url()]);
    this.webb = await this.webQuery();
    this._webId = this.webb.Id;

    this.loaded = true;

    return this;
  }

  /* The above code is defining a function called `rootISite` that returns an object of type `ISite`.
  The function is using the arrow function syntax and is returning the result of the `siteQuery`
  property. */
  rootISite = (): ISite => this.siteQuery;

  /* The above code is defining a function called `rootSite` that returns an object of type `ISiteInfo`.
The function returns the value of `this.site`. */
  rootSite = (): ISiteInfo => this.site;

  /* The above code is defining a method called `rootSiteID` in a TypeScript class. This method returns a
string value, which is the value of the `_siteId` property of the class. */
  rootSiteID = (): string => this._siteId;

  /* The above code is defining a function called `rootIWeb` which returns an object of type `IWeb`. The
function is using the arrow function syntax and is assigning `this.webQuery` to the returned object. */
  rootIWeb = (): IWeb => this.webQuery || sp().web;

  /* The above code is defining a function called `rootWeb` that returns an object of type `IWebInfo`.
The function is using an arrow function syntax and is returning the value of `this.webb`. */
  rootWeb = (): IWebInfo => this.webb;

  /* The above code is defining a TypeScript class method called `rootWebID` that returns a string value.
The method is using an arrow function syntax to define the method. The returned value is the value
of the `_webId` property of the class. */
  rootWebID = (): string => this._webId;

  /* The above code is defining a TypeScript arrow function called `tenantID`. This function returns a
string value, which is the `TenantInstanceId` property of the `info` object. */
  tenantID = (): string => this.info.TenantInstanceId;

  /* The above code is defining a TypeScript arrow function called `designID` that returns a string. The
function is accessing the `SiteDesignId` property of the `info` object. */
  designID = (): string => this.info.SiteDesignId;

  /* The above code is defining a method called `parentHubID` in a TypeScript class. This method returns
a string value, which is either the value of `this.info.ParentHubSiteId` or `this.info.ID`. If
`this.info.ParentHubSiteId` is falsy, then `this.info.ID` will be returned. */
  parentHubID = (): string => this.info.ParentHubSiteId || this.info.ID;

  /* The above code is defining a TypeScript class method called `themeKey` that returns a string value.
The method is defined using an arrow function syntax. */
  themeKey = (): string => this.data.themeKey;

  /* The above code is defining a TypeScript class method called `headerEmphasis` that returns a string
value. The value returned is the value of the `headerEmphasis` property of the `data` object. */
  headerEmphasis = (): string => this.data.headerEmphasis;

  /* The above code is defining a method called `metaNav` in a TypeScript class. This method returns a
boolean value based on the value of `usesMetadataNavigation` property of the class's `data`
property. */
  metaNav = (): boolean => this.data.usesMetadataNavigation;

  /* The above code is defining a method called `menuEnabled` which returns a boolean value. The value is
determined by accessing the `megaMenuEnabled` property of the `data` object. */
  menuEnabled = (): boolean => this.data.megaMenuEnabled;

  /* The above code is defining a function called `navItems` that returns an array of objects that
implement the `ISerializableNavigationNode` interface. The function is accessing the `navigation`
property of the `data` object. */
  navItems = (): ISerializableNavigationNode[] => this.data.navigation;

  /* The above code is defining an asynchronous function called `subWebs` that returns a Promise of an
  array of `ISlimSiteInfo` objects. */
  subWebs = async (full?: boolean): Promise<(ISlimSiteInfo | IWebInfo)[]> => {
    if (this.notHub) return [];
    if (this.subWebsList) return this.subWebsList;
    if (full) {
      const subs = [];
      const iwebs = await this.subIWebs();
      for (const iweb of iwebs) {
        subs.push(await iweb());
      }
      this.subWebsList = subs;
    } else {
      this.subWebsList = await this.childSites();
    }

    return this.subWebsList;
  };

  async childSites(): Promise<ISlimSiteInfo[]> {
    try {
      const uuid = this.id;
      const searchRes = await sp()
        .search(<ISearchQuery>{
          Querytext: `contentclass:STS_Site AND DepartmentId:${uuid}`,
          SelectProperties: ["Title", "SPSiteUrl", "WebId", "DepartmentId"],
          RowLimit: 1000,
          TrimDuplicates: false,
        })
        .then((r: SearchResults) => {
          return r.PrimarySearchResults;
        });
      return searchRes
        .map((r: any) => ({
          Title: r.Title,
          Url: r.SPSiteUrl,
          Id: r.SiteId,
          WebId: r.WebId,
        }))
        .filter((r: any) => r.Id !== uuid);
    } catch (e) {
      errorLog({
        component: "HubSites.helper:GetHubChildSites",
        message: `Failed to get Hub Child Sites - ${e.message}`,
        type: "error",
        role: "user",
        severity: "medium",
        data: { e },
      });
    }
    return [];
  }

  /* The above code is a TypeScript function called `allWebs` that returns a Promise of an array of
 `IWebInfo` objects. */
  allWebs = async (): Promise<IWebInfo[]> => {
    if (this.notHub) return [this.rootWeb()];
    if (!this.loaded) await this.get();
    const allWebs = [];
    const web = await Web([this.web, this.url()])();
    const subWebs = (await this.subWebs(true)) || [];
    allWebs.push(web);
    allWebs.push(...subWebs);
    return allWebs;
  };

  /* The above code is defining an asynchronous function called `allIWebs` that returns a promise of an
 array of `IWeb` objects. */
  allIWebs = async (): Promise<IWeb[]> => {
    if (this.notHub) return [this.webQuery];
    const allWebs = await this.allWebs();
    return allWebs.map((web) => {
      return Web([this.web, web.Url]);
    });
  };

  /* The above code is a TypeScript function named `subIWebs` that returns a Promise of an array of
  `IWeb` objects. */
  subIWebs = async (): Promise<IWeb[]> => {
    if (this.notHub) return [];
    const subwebs = (await this.subWebs()) || [];
    return subwebs.map((subweb) => {
      const web = Web([this.web, subweb.Url]);
      return web;
    });
  };

  /* The above code is defining a TypeScript function called `subWebsAll` that returns a Promise of an
 array of `IWebInfo` objects. */
  subWebsAll = async (): Promise<IWebInfo[]> => {
    if (this.notHub) return [];
    if (this.subWebsAllList) return this.subWebsAllList;
    if (!this.subWebsList) await this.subWebs();
    const subWebs = [];
    for (const subWeb of this.subWebsList) {
      if (!subWeb.Url) continue;
      const iweb = Web([this.web, subWeb.Url]);
      const websub = await iweb.select("*")();
      subWebs.push(websub);
    }
    this.subWebsAllList = subWebs;
    return this.subWebsAllList;
  };

  /* The above code is defining a TypeScript arrow function called `hasParentHub` that returns a
  boolean value. It checks if the `ParentHubSiteId` property of the `info` object is not equal to
  the string `'00000000-0000-0000-0000-000000000000'`. If it is not equal, it means that the object
  has a parent hub site and the function returns `true`. Otherwise, it returns `false`. */
  hasParentHub = (): boolean =>
    this.info?.ParentHubSiteId !== "00000000-0000-0000-0000-000000000000";

  /* The above code is defining a method called `url` that returns a string. The value of the string is
obtained from the `SiteUrl` property of an object called `info`. */
  url = (): string => this.info?.SiteUrl || theSiteUrl();

  /* The above code is defining a TypeScript class method called "logo" that returns a string. The method
is using the arrow function syntax and accessing a property called "LogoUrl" from an object called
"info". */
  logo = (): string => this.info?.LogoUrl;

  /* The above code is defining a TypeScript class method called "title" that returns a string. The
method is using the arrow function syntax and accessing the "Title" property of the "info" object. */
  title = (): string => this.info?.Title;

  /* The above code is defining a TypeScript class with a method called "description". The method returns
a string value, which is obtained from the "Description" property of the "info" object. */
  description = (): string => this.info?.Description;

  async apps(): Promise<IAppInfo[]> {
    const allWebs = await this.allIWebs();
    const allApps = [];
    for (const iweb of allWebs) {
      try {
        const web = await iweb();
        const apps: IAppInfo[] = (await iweb.appcatalog()) || [];

        allApps.push(
          ...apps.map((app) => ({
            ...app,
            catalogUrl: `${web.Url}/AppCatalog`,
            webUrl: web.Url,
            webTitle: web.Title,
            iWeb: iweb,
          }))
        );
      } catch (e) {
        errorLog({
          component: "HubSite.class:GetApps",
          message: "Failed to get apps from site",
          type: "error",
          role: "admin",
          severity: "low",
          data: { e },
        });
      }
    }
    return allApps;
  }

  async uploadAppToSites(
    fileName: string,
    blob: Blob
  ): Promise<UnknownObject[]> {
    const allWebs = await this.allIWebs();
    const responses = [];
    for (const iweb of allWebs) {
      try {
        //Will fail if no app catalog

        let app: IAppInfo = await findAppByName(iweb, fileName);
        if (!!app) {
          iweb.appcatalog
            .getAppById(app.ID)
            .remove()
            .catch((e) =>
              errorLog({
                component: "HubSite.class:RemoveApp",
                message: "Failed to remove app from site",
                type: "error",
                role: "admin",
                severity: "low",
                data: { e, fileName },
              })
            );
        }

        const res = await iweb.appcatalog.add(fileName, blob);
        if (!res) {
          throw new Error("Failed to upload app to site");
        }
        app = await findAppByName(iweb, fileName);
        if (!app) throw new Error("Failed to get uploaded app");
        if (!app?.Deployed) {
          await iweb.appcatalog
            .getAppById(app.ID)
            .deploy()
            .catch((e) =>
              errorLog({
                component: "HubSite.class:DeployApp",
                message: "Failed to deploy app to site",
                type: "error",
                role: "user",
                severity: "low",
                data: { e, fileName },
              })
            );
        } else {
          await iweb.appcatalog
            .getAppById(app.ID)
            .upgrade()
            .catch((e) =>
              errorLog({
                component: "HubSite.class:UpgradeApp",
                message: "Failed to upgrade app",
                type: "error",
                role: "user",
                severity: "low",
                data: { e, fileName },
              })
            );
        }

        // await iweb.appcatalog.getAppById(res.data.UniqueId).deploy();
        //try delete then add then deploy
        responses.push(res);
      } catch (e) {
        errorLog({
          component: "HubSite.class:UploadAppToSite",
          message: "Failed to upload app to site",
          type: "error",
          role: "admin",
          severity: "low",
          data: { e, fileName },
        });
      }
    }
    if (responses.length === 0)
      errorLog({
        component: "HubSite.class:UploadAppToAllSites",
        message: "Failed to upload app to all sites",
        type: "error",
        role: "admin",
        severity: "low",
        data: { fileName },
      });
    return responses;
  }

  //app catalog
  //theme stuff
  //add sub webs
  //remove sub webs
  //export IA
}

async function findAppByName(web: IWeb, name: string) {
  try {
    const apps = await web.appcatalog();
    return apps.find((app) => app.Title === name);
  } catch (e) {
    return undefined;
  }
}

export { SPHubSite };
