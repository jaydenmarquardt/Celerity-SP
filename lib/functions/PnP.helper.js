import { Web } from "@pnp/sp/webs/types";
import { sp } from "../core/Celertity";
export function newIWeb(webUrl, oldIWeb = sp().web) {
    return Web([oldIWeb, webUrl]);
}
//# sourceMappingURL=PnP.helper.js.map