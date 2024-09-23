import type { IWeb, IWebInfo } from "@pnp/sp/webs";
import { SPObject } from "./Object.class";
import { sp } from "../core/Celertity";
import { errorLog } from "../util/Debug";
import { newIWeb } from "../functions/PnP.helper";

class SPWeb extends SPObject<IWeb> {
  loaded: boolean = false;
  data: IWebInfo = undefined;
  url: string;

  constructor(fullUrl?: string, web?: IWeb) {
    super();
    const q = web || fullUrl ? newIWeb(fullUrl) : sp().web;

    this.queryable = q;
    this.web = q;
    this.url = fullUrl;
  }

  /**
   * This function retrieves information about a hub site and its related site and web.
   * @returns a Promise that resolves to an object of type SPHubSite.
   */
  public async get(): Promise<SPWeb> {
    if (this.loaded) return this;
    const info = await this.query()().catch((e) =>
      errorLog({
        component: "Web.class:Get",
        message: "Failed to get web information.",
        type: "error",
        role: "user",
        severity: "low",
        data: { e },
      })
    );

    if (!info) return this;
    this.data = info;

    this.loaded = true;
    return this;
  }

  //title
  //url
  //description
  //logo
  //get hub
  //get site
  //update
  //get sibling webs
  //apply theme
  //delete
  //get changes
  //app catalog
  //Add app
  //get app
  //remove app
  //upgrade app
  //apps
  //content types
  //features
  //lists
  //document list
  //site page list
  //site assets
  //groups
  //users
  //navigation
}

export default SPWeb;
