/**
 * ===========================================
 * ------------------LIST---------------------
 * ===========================================
 */
import type { IWeb } from "@pnp/sp/webs/types";
import type { IList } from "@pnp/sp/lists/types";
import { SPList } from "../../objects/List.class";
/**
 * The function `theListId` returns the ID of the list from the page context.
 * @returns A string representation of the ID of the list.
 */
export declare const theListId: () => string;
/**
 * The function `theListUrl` returns the server relative URL of the current list.
 * @returns the server relative URL of the list.
 */
export declare const theListUrl: () => string;
/**
 * The function `theListTitle` returns the title of the list from the page context.
 * @returns the title of the list from the page context.
 */
export declare const theListTitle: () => string;
/**
 * The function `isSitePage` returns true if the title of the current page is 'Site Pages'.
 * @returns A boolean value is being returned.
 */
export declare const isSitePage: () => boolean;
/**
 * The function returns the list of site pages from a given web.
 * @param {IWeb} web - The "web" parameter is of type "IWeb" and it is optional. It represents the web
 * or site where the list is located. If no value is provided for this parameter, it will default to
 * the result of calling the "theIWeb()" function.
 * @returns an instance of the "Site Pages" list from the provided web.
 */
export declare const theIPageList: (web?: IWeb) => IList;
/**
 * The function `theIList` returns an instance of `IList` based on the provided `IWeb` object and the
 * title of the list.
 * @param {IWeb} web - The `web` parameter is of type `IWeb`, which is an interface representing a
 * SharePoint web. It is used to interact with the SharePoint web and perform operations such as
 * getting lists, creating lists, etc.
 * @returns an instance of the IList interface.
 */
export declare const theIList: (web?: IWeb) => IList;
/**
 * The function returns the list object from a specific instance.
 * @returns the value of `instance()['list']`.
 */
export declare const theList: () => SPList;
//# sourceMappingURL=List.instance.d.ts.map