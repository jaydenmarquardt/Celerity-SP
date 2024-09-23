var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "@pnp/sp/presets/all";
import "@pnp/graph/presets/all";
import { sp } from "../core/Celertity";
import { errorLog } from "../util/Debug";
class SPObject {
    constructor() {
        this.classType = "Object";
        this.loaded = false;
        /* The `webInfo` function is an asynchronous arrow function that returns the `_webInfo` property of the
      class. If `_webInfo` is already defined, it is returned immediately. Otherwise, it waits for the
      `web` object to be resolved and assigns the result to `_webInfo` before returning it. */
        this.webInfo = () => __awaiter(this, void 0, void 0, function* () { return this._webInfo || (this._webInfo = yield this.web()); });
        /* The `webId` function is an arrow function that returns the `Id` property of the `_webInfo` object.
      It is a shorthand way of defining a function that does not take any arguments and returns a value.
      In this case, it returns the `Id` property of the `_webInfo` object, which represents the ID of the
      web. */
        this.webId = () => this._webInfo.Id;
        /* The `webQueryUrl` function is an arrow function that returns the URL of the web object. It uses the
      `toUrl()` method of the `web` object to get the URL. This function can be used to retrieve the URL
      of the web for making REST API calls or other operations that require the web URL. */
        this.webQueryUrl = () => this.web.toUrl();
        /* The line `query = (): T => this.queryable;` is defining a method called `query` on the `SPObject`
      class. This method has an arrow function syntax and does not take any arguments. It returns the
      `queryable` property of the class, which has a generic type `T`. The return type of the arrow
      function is also `T`. */
        this.query = () => this.queryable;
        /* The `getIcon` function is an arrow function that returns the string value `'Database'`. It is a
      shorthand way of defining a function that does not take any arguments and returns a value. In this
      case, it returns the string `'Database'`. */
        this.getIcon = () => "Database";
        /* The `checkUnloaded` function is a method of the `SPObject` class. It takes an optional parameter
        `harsh` with a default value of `true`. */
        this.checkUnloaded = (harsh = true) => {
            if (this.loaded)
                return true;
            this.unloadedError(harsh);
            return false;
        };
        /* The `unloadedError` function is a method of the `SPObject` class. It takes an optional parameter
        `harsh` with a default value of `false`. */
        this.unloadedError = (harsh = false) => {
            errorLog({
                component: "Object.class:UnloadedCheck",
                message: "Tried to use an object that has not been loaded yet.",
                type: "error",
                role: "user",
                severity: "low",
                data: { classType: this.classType, object: this },
            });
            if (harsh)
                throw new Error("This object has not been loaded yet.");
        };
        this.web = sp().web;
    }
    /**
     * This function sets the web property of the class to the web object passed in
     * @param {Web} web - The web object that is used to make the REST calls.
     */
    setWeb(web) {
        if (web === undefined)
            web = sp().web;
        this.web = web;
        this._webInfo = undefined;
    }
}
export { SPObject };
//# sourceMappingURL=Object.class.js.map