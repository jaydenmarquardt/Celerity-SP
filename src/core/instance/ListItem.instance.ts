/**
 * ===========================================
 * ------------------ITEM---------------------
 * ===========================================
 */

import { IItem } from "@pnp/sp/items/types";
import { thePageContext } from "./Context.instance";
import { theIList } from "./List.instance";
import { SPListItem } from "../../objects/ListItem.class";
import { instance } from "./Base.instance";
import { SPPageItem } from "../../objects/PageItem.class";

/**
 * The function `theItemId` returns the id of a list item from the page context.
 * @returns the id of the listItem object from thePageContext.
 */
export const theItemId = (): number => {
  return thePageContext()?.listItem?.id;
};

/**
 * The function `theItemUuid` returns the unique ID of a list item.
 * @returns A string value representing the unique ID of a list item.
 */
export const theItemUuid = (): string => {
  return thePageContext()?.listItem?.uniqueId?.toString();
};

/**
 * The function returns an item from a list based on its ID.
 * @returns an object of type IItem.
 */
export const theIItem = (): IItem => {
  return theIList().items.getById(theItemId());
};

/**
 * The function returns the item from a specific instance.
 * @returns the value of `instance()['item']`.
 */
export const theItem = (): SPListItem => {
  return instance()["item"];
};

/**
 * The function returns the page item from a specific instance.
 * @returns the value of `instance()['page']`, which is of type `SPPageItem`.
 */
export const thePage = (): SPPageItem => {
  return instance()["page"];
};

/**
 * The function returns the parent page item.
 * @returns the value of `instance()['parentPage']`.
 */
export const theParentPage = (): SPPageItem => {
  return instance()["parentPage"];
};
