var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "@pnp/sp/hubsites";
import { Web } from "@pnp/sp/webs";
import { SPObject } from "./Object.class";
import { sp } from "../core/Celertity";
import { error, errorLog } from "../util/Debug";
import { theSiteUrl } from "../core/instance/Site.instance";
class SPHubSite extends SPObject {
    constructor(id) {
        super();
        this.loaded = false;
        this.info = undefined;
        this.data = undefined;
        this.notHub = false;
        /* The above code is defining a function called `rootISite` that returns an object of type `ISite`.
        The function is using the arrow function syntax and is returning the result of the `siteQuery`
        property. */
        this.rootISite = () => this.siteQuery;
        /* The above code is defining a function called `rootSite` that returns an object of type `ISiteInfo`.
      The function returns the value of `this.site`. */
        this.rootSite = () => this.site;
        /* The above code is defining a method called `rootSiteID` in a TypeScript class. This method returns a
      string value, which is the value of the `_siteId` property of the class. */
        this.rootSiteID = () => this._siteId;
        /* The above code is defining a function called `rootIWeb` which returns an object of type `IWeb`. The
      function is using the arrow function syntax and is assigning `this.webQuery` to the returned object. */
        this.rootIWeb = () => this.webQuery || sp().web;
        /* The above code is defining a function called `rootWeb` that returns an object of type `IWebInfo`.
      The function is using an arrow function syntax and is returning the value of `this.webb`. */
        this.rootWeb = () => this.webb;
        /* The above code is defining a TypeScript class method called `rootWebID` that returns a string value.
      The method is using an arrow function syntax to define the method. The returned value is the value
      of the `_webId` property of the class. */
        this.rootWebID = () => this._webId;
        /* The above code is defining a TypeScript arrow function called `tenantID`. This function returns a
      string value, which is the `TenantInstanceId` property of the `info` object. */
        this.tenantID = () => this.info.TenantInstanceId;
        /* The above code is defining a TypeScript arrow function called `designID` that returns a string. The
      function is accessing the `SiteDesignId` property of the `info` object. */
        this.designID = () => this.info.SiteDesignId;
        /* The above code is defining a method called `parentHubID` in a TypeScript class. This method returns
      a string value, which is either the value of `this.info.ParentHubSiteId` or `this.info.ID`. If
      `this.info.ParentHubSiteId` is falsy, then `this.info.ID` will be returned. */
        this.parentHubID = () => this.info.ParentHubSiteId || this.info.ID;
        /* The above code is defining a TypeScript class method called `themeKey` that returns a string value.
      The method is defined using an arrow function syntax. */
        this.themeKey = () => this.data.themeKey;
        /* The above code is defining a TypeScript class method called `headerEmphasis` that returns a string
      value. The value returned is the value of the `headerEmphasis` property of the `data` object. */
        this.headerEmphasis = () => this.data.headerEmphasis;
        /* The above code is defining a method called `metaNav` in a TypeScript class. This method returns a
      boolean value based on the value of `usesMetadataNavigation` property of the class's `data`
      property. */
        this.metaNav = () => this.data.usesMetadataNavigation;
        /* The above code is defining a method called `menuEnabled` which returns a boolean value. The value is
      determined by accessing the `megaMenuEnabled` property of the `data` object. */
        this.menuEnabled = () => this.data.megaMenuEnabled;
        /* The above code is defining a function called `navItems` that returns an array of objects that
      implement the `ISerializableNavigationNode` interface. The function is accessing the `navigation`
      property of the `data` object. */
        this.navItems = () => this.data.navigation;
        /* The above code is defining an asynchronous function called `subWebs` that returns a Promise of an
        array of `ISlimSiteInfo` objects. */
        this.subWebs = (full) => __awaiter(this, void 0, void 0, function* () {
            if (this.notHub)
                return [];
            if (this.subWebsList)
                return this.subWebsList;
            if (full) {
                const subs = [];
                const iwebs = yield this.subIWebs();
                for (const iweb of iwebs) {
                    subs.push(yield iweb());
                }
                this.subWebsList = subs;
            }
            else {
                this.subWebsList = yield this.childSites();
            }
            return this.subWebsList;
        });
        /* The above code is a TypeScript function called `allWebs` that returns a Promise of an array of
       `IWebInfo` objects. */
        this.allWebs = () => __awaiter(this, void 0, void 0, function* () {
            if (this.notHub)
                return [this.rootWeb()];
            if (!this.loaded)
                yield this.get();
            const allWebs = [];
            const web = yield Web([this.web, this.url()])();
            const subWebs = (yield this.subWebs(true)) || [];
            allWebs.push(web);
            allWebs.push(...subWebs);
            return allWebs;
        });
        /* The above code is defining an asynchronous function called `allIWebs` that returns a promise of an
       array of `IWeb` objects. */
        this.allIWebs = () => __awaiter(this, void 0, void 0, function* () {
            if (this.notHub)
                return [this.webQuery];
            const allWebs = yield this.allWebs();
            return allWebs.map((web) => {
                return Web([this.web, web.Url]);
            });
        });
        /* The above code is a TypeScript function named `subIWebs` that returns a Promise of an array of
        `IWeb` objects. */
        this.subIWebs = () => __awaiter(this, void 0, void 0, function* () {
            if (this.notHub)
                return [];
            const subwebs = (yield this.subWebs()) || [];
            return subwebs.map((subweb) => {
                const web = Web([this.web, subweb.Url]);
                return web;
            });
        });
        /* The above code is defining a TypeScript function called `subWebsAll` that returns a Promise of an
       array of `IWebInfo` objects. */
        this.subWebsAll = () => __awaiter(this, void 0, void 0, function* () {
            if (this.notHub)
                return [];
            if (this.subWebsAllList)
                return this.subWebsAllList;
            if (!this.subWebsList)
                yield this.subWebs();
            const subWebs = [];
            for (const subWeb of this.subWebsList) {
                if (!subWeb.Url)
                    continue;
                const iweb = Web([this.web, subWeb.Url]);
                const websub = yield iweb.select("*")();
                subWebs.push(websub);
            }
            this.subWebsAllList = subWebs;
            return this.subWebsAllList;
        });
        /* The above code is defining a TypeScript arrow function called `hasParentHub` that returns a
        boolean value. It checks if the `ParentHubSiteId` property of the `info` object is not equal to
        the string `'00000000-0000-0000-0000-000000000000'`. If it is not equal, it means that the object
        has a parent hub site and the function returns `true`. Otherwise, it returns `false`. */
        this.hasParentHub = () => { var _a; return ((_a = this.info) === null || _a === void 0 ? void 0 : _a.ParentHubSiteId) !== "00000000-0000-0000-0000-000000000000"; };
        /* The above code is defining a method called `url` that returns a string. The value of the string is
      obtained from the `SiteUrl` property of an object called `info`. */
        this.url = () => { var _a; return ((_a = this.info) === null || _a === void 0 ? void 0 : _a.SiteUrl) || theSiteUrl(); };
        /* The above code is defining a TypeScript class method called "logo" that returns a string. The method
      is using the arrow function syntax and accessing a property called "LogoUrl" from an object called
      "info". */
        this.logo = () => { var _a; return (_a = this.info) === null || _a === void 0 ? void 0 : _a.LogoUrl; };
        /* The above code is defining a TypeScript class method called "title" that returns a string. The
      method is using the arrow function syntax and accessing the "Title" property of the "info" object. */
        this.title = () => { var _a; return (_a = this.info) === null || _a === void 0 ? void 0 : _a.Title; };
        /* The above code is defining a TypeScript class with a method called "description". The method returns
      a string value, which is obtained from the "Description" property of the "info" object. */
        this.description = () => { var _a; return (_a = this.info) === null || _a === void 0 ? void 0 : _a.Description; };
        this.id = id;
    }
    /**
     * This function retrieves information about a hub site and its related site and web.
     * @returns a Promise that resolves to an object of type SPHubSite.
     */
    get() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.loaded)
                return this;
            if (!this.id) {
                this.data = yield yield sp().web.hubSiteData(true);
                this.id = (_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.relatedHubSiteIds) === null || _b === void 0 ? void 0 : _b[0];
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
                this.site = yield sp().site();
                this.siteQuery = sp().site;
                this._siteId = this.site.Id;
                this.webQuery = sp().web;
                this.webb = yield this.webQuery();
                this._webId = this.webb.Id;
                this.loaded = true;
                return this;
            }
            this.queryable = sp().hubSites.getById(this.id);
            this.info = yield this.queryable();
            if (this.hasParentHub()) {
                this.id = this.parentHubID();
                this.queryable = sp().hubSites.getById(this.parentHubID());
                this.info = yield this.queryable();
            }
            this.siteQuery = yield this.query().getSite();
            this.site = yield this.siteQuery();
            this._siteId = this.site.Id;
            this.webQuery = Web([this.web, this.url()]);
            this.webb = yield this.webQuery();
            this._webId = this.webb.Id;
            this.loaded = true;
            return this;
        });
    }
    childSites() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uuid = this.id;
                const searchRes = yield sp()
                    .search({
                    Querytext: `contentclass:STS_Site AND DepartmentId:${uuid}`,
                    SelectProperties: ["Title", "SPSiteUrl", "WebId", "DepartmentId"],
                    RowLimit: 1000,
                    TrimDuplicates: false,
                })
                    .then((r) => {
                    return r.PrimarySearchResults;
                });
                return searchRes
                    .map((r) => ({
                    Title: r.Title,
                    Url: r.SPSiteUrl,
                    Id: r.SiteId,
                    WebId: r.WebId,
                }))
                    .filter((r) => r.Id !== uuid);
            }
            catch (e) {
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
        });
    }
    apps() {
        return __awaiter(this, void 0, void 0, function* () {
            const allWebs = yield this.allIWebs();
            const allApps = [];
            for (const iweb of allWebs) {
                try {
                    const web = yield iweb();
                    const apps = (yield iweb.appcatalog()) || [];
                    allApps.push(...apps.map((app) => (Object.assign(Object.assign({}, app), { catalogUrl: `${web.Url}/AppCatalog`, webUrl: web.Url, webTitle: web.Title, iWeb: iweb }))));
                }
                catch (e) {
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
        });
    }
    uploadAppToSites(fileName, blob) {
        return __awaiter(this, void 0, void 0, function* () {
            const allWebs = yield this.allIWebs();
            const responses = [];
            for (const iweb of allWebs) {
                try {
                    //Will fail if no app catalog
                    let app = yield findAppByName(iweb, fileName);
                    if (!!app) {
                        iweb.appcatalog
                            .getAppById(app.ID)
                            .remove()
                            .catch((e) => errorLog({
                            component: "HubSite.class:RemoveApp",
                            message: "Failed to remove app from site",
                            type: "error",
                            role: "admin",
                            severity: "low",
                            data: { e, fileName },
                        }));
                    }
                    const res = yield iweb.appcatalog.add(fileName, blob);
                    if (!res) {
                        throw new Error("Failed to upload app to site");
                    }
                    app = yield findAppByName(iweb, fileName);
                    if (!app)
                        throw new Error("Failed to get uploaded app");
                    if (!(app === null || app === void 0 ? void 0 : app.Deployed)) {
                        yield iweb.appcatalog
                            .getAppById(app.ID)
                            .deploy()
                            .catch((e) => errorLog({
                            component: "HubSite.class:DeployApp",
                            message: "Failed to deploy app to site",
                            type: "error",
                            role: "user",
                            severity: "low",
                            data: { e, fileName },
                        }));
                    }
                    else {
                        yield iweb.appcatalog
                            .getAppById(app.ID)
                            .upgrade()
                            .catch((e) => errorLog({
                            component: "HubSite.class:UpgradeApp",
                            message: "Failed to upgrade app",
                            type: "error",
                            role: "user",
                            severity: "low",
                            data: { e, fileName },
                        }));
                    }
                    // await iweb.appcatalog.getAppById(res.data.UniqueId).deploy();
                    //try delete then add then deploy
                    responses.push(res);
                }
                catch (e) {
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
        });
    }
}
function findAppByName(web, name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apps = yield web.appcatalog();
            return apps.find((app) => app.Title === name);
        }
        catch (e) {
            return undefined;
        }
    });
}
export { SPHubSite };
//# sourceMappingURL=HubSite.class.js.map