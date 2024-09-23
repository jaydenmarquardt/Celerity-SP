import { IWeb, Web } from "@pnp/sp/webs/types";
import { sp } from "../core/Celertity";

export function newIWeb(webUrl: string, oldIWeb: IWeb = sp().web) {
  return Web([oldIWeb, webUrl]);
}
