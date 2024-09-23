/**
 * ===========================================
 * ------------------ITEM---------------------
 * ===========================================
 */
import { IItem } from "@pnp/sp/items/types";
import { SPListItem } from "../../objects/ListItem.class";
import { SPPageItem } from "../../objects/PageItem.class";
/**
 * The function `theItemId` returns the id of a list item from the page context.
 * @returns the id of the listItem object from thePageContext.
 */
export declare const theItemId: () => number;
/**
 * The function `theItemUuid` returns the unique ID of a list item.
 * @returns A string value representing the unique ID of a list item.
 */
export declare const theItemUuid: () => string;
/**
 * The function returns an item from a list based on its ID.
 * @returns an object of type IItem.
 */
export declare const theIItem: () => IItem;
/**
 * The function returns the item from a specific instance.
 * @returns the value of `instance()['item']`.
 */
export declare const theItem: () => SPListItem;
/**
 * The function returns the page item from a specific instance.
 * @returns the value of `instance()['page']`, which is of type `SPPageItem`.
 */
export declare const thePage: () => SPPageItem;
/**
 * The function returns the parent page item.
 * @returns the value of `instance()['parentPage']`.
 */
export declare const theParentPage: () => SPPageItem;
//# sourceMappingURL=ListItem.instance.d.ts.map