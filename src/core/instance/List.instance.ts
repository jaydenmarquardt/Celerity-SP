/**
 * ===========================================
 * ------------------LIST---------------------
 * ===========================================
 */

import type { IWeb } from "@pnp/sp/webs/types";
import { isListItemView, thePageContext } from "./Context.instance";
import { theIWeb } from "./Web.instance";
import type { IList } from "@pnp/sp/lists/types";
import { SPList } from "../../objects/List.class";
import { instance } from "./Base.instance";

/**
 * The function `theListId` returns the ID of the list from the page context.
 * @returns A string representation of the ID of the list.
 */
export const theListId = (): string => {
  return thePageContext()?.list?.id?.toString();
};

/**
 * The function `theListUrl` returns the server relative URL of the current list.
 * @returns the server relative URL of the list.
 */
export const theListUrl = (): string => {
  return thePageContext()?.list?.serverRelativeUrl;
};

/**
 * The function `theListTitle` returns the title of the list from the page context.
 * @returns the title of the list from the page context.
 */
export const theListTitle = (): string => {
  return thePageContext()?.list?.title;
};

/**
 * The function `isSitePage` returns true if the title of the current page is 'Site Pages'.
 * @returns A boolean value is being returned.
 */
export const isSitePage = (): boolean => {
  return isListItemView("Site Pages");
};

/**
 * The function returns the list of site pages from a given web.
 * @param {IWeb} web - The "web" parameter is of type "IWeb" and it is optional. It represents the web
 * or site where the list is located. If no value is provided for this parameter, it will default to
 * the result of calling the "theIWeb()" function.
 * @returns an instance of the "Site Pages" list from the provided web.
 */
export const theIPageList = (web: IWeb = theIWeb()): IList => {
  return web.lists.getByTitle("Site Pages");
};

/**
 * The function `theIList` returns an instance of `IList` based on the provided `IWeb` object and the
 * title of the list.
 * @param {IWeb} web - The `web` parameter is of type `IWeb`, which is an interface representing a
 * SharePoint web. It is used to interact with the SharePoint web and perform operations such as
 * getting lists, creating lists, etc.
 * @returns an instance of the IList interface.
 */
export const theIList = (web: IWeb = theIWeb()): IList => {
  if (!theListTitle()) return undefined;
  return web.lists.getByTitle(theListTitle());
};

/**
 * The function returns the list object from a specific instance.
 * @returns the value of `instance()['list']`.
 */
export const theList = (): SPList => {
  return instance()["list"];
};
