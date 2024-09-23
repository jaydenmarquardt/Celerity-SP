var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SPObject } from "./Object.class";
import { sp } from "../core/Celertity";
import { errorLog } from "../util/Debug";
import { newIWeb } from "../functions/PnP.helper";
class SPWeb extends SPObject {
    constructor(fullUrl, web) {
        super();
        this.loaded = false;
        this.data = undefined;
        const q = web || fullUrl ? newIWeb(fullUrl) : sp().web;
        this.queryable = q;
        this.web = q;
        this.url = fullUrl;
    }
    /**
     * This function retrieves information about a hub site and its related site and web.
     * @returns a Promise that resolves to an object of type SPHubSite.
     */
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.loaded)
                return this;
            const info = yield this.query()().catch((e) => errorLog({
                component: "Web.class:Get",
                message: "Failed to get web information.",
                type: "error",
                role: "user",
                severity: "low",
                data: { e },
            }));
            if (!info)
                return this;
            this.data = info;
            this.loaded = true;
            return this;
        });
    }
}
export default SPWeb;
//# sourceMappingURL=Web.class.js.map