import "@pnp/sp/presets/all";
import "@pnp/graph/presets/all";

import { IWeb, IWebInfo } from "@pnp/sp/webs";
import { sp } from "../core/Celertity";
import { ISPQueryable } from "@pnp/sp/spqueryable";
import { errorLog } from "../util/Debug";

class SPObject<T = ISPQueryable> {
  classType: string = "Object";

  loaded: boolean = false;
  web: IWeb;
  _webInfo: IWebInfo;
  queryable: T;

  constructor() {
    this.web = sp().web;
  }

  /**
   * This function sets the web property of the class to the web object passed in
   * @param {Web} web - The web object that is used to make the REST calls.
   */
  public setWeb(web: IWeb) {
    if (web === undefined) web = sp().web;
    this.web = web;
    this._webInfo = undefined;
  }

  /* The `webInfo` function is an asynchronous arrow function that returns the `_webInfo` property of the
class. If `_webInfo` is already defined, it is returned immediately. Otherwise, it waits for the
`web` object to be resolved and assigns the result to `_webInfo` before returning it. */
  webInfo = async () => this._webInfo || (this._webInfo = await this.web());

  /* The `webId` function is an arrow function that returns the `Id` property of the `_webInfo` object.
It is a shorthand way of defining a function that does not take any arguments and returns a value.
In this case, it returns the `Id` property of the `_webInfo` object, which represents the ID of the
web. */
  webId = () => this._webInfo.Id;

  /* The `webQueryUrl` function is an arrow function that returns the URL of the web object. It uses the
`toUrl()` method of the `web` object to get the URL. This function can be used to retrieve the URL
of the web for making REST API calls or other operations that require the web URL. */
  webQueryUrl = () => this.web.toUrl();

  /* The line `query = (): T => this.queryable;` is defining a method called `query` on the `SPObject`
class. This method has an arrow function syntax and does not take any arguments. It returns the
`queryable` property of the class, which has a generic type `T`. The return type of the arrow
function is also `T`. */
  query = (): T => this.queryable;

  /* The `getIcon` function is an arrow function that returns the string value `'Database'`. It is a
shorthand way of defining a function that does not take any arguments and returns a value. In this
case, it returns the string `'Database'`. */
  getIcon = () => "Database";

  /* The `checkUnloaded` function is a method of the `SPObject` class. It takes an optional parameter
  `harsh` with a default value of `true`. */
  checkUnloaded = (harsh = true) => {
    if (this.loaded) return true;
    this.unloadedError(harsh);
    return false;
  };

  /* The `unloadedError` function is a method of the `SPObject` class. It takes an optional parameter
  `harsh` with a default value of `false`. */
  unloadedError = (harsh = false) => {
    errorLog({
      component: "Object.class:UnloadedCheck",
      message: "Tried to use an object that has not been loaded yet.",
      type: "error",
      role: "user",
      severity: "low",
      data: { classType: this.classType, object: this },
    });

    if (harsh) throw new Error("This object has not been loaded yet.");
  };
}

export { SPObject };
