/**
 * ===========================================
 * ------------------ITEM---------------------
 * ===========================================
 */
import { thePageContext } from "./Context.instance";
import { theIList } from "./List.instance";
import { instance } from "./Base.instance";
/**
 * The function `theItemId` returns the id of a list item from the page context.
 * @returns the id of the listItem object from thePageContext.
 */
export const theItemId = () => {
    var _a, _b;
    return (_b = (_a = thePageContext()) === null || _a === void 0 ? void 0 : _a.listItem) === null || _b === void 0 ? void 0 : _b.id;
};
/**
 * The function `theItemUuid` returns the unique ID of a list item.
 * @returns A string value representing the unique ID of a list item.
 */
export const theItemUuid = () => {
    var _a, _b, _c;
    return (_c = (_b = (_a = thePageContext()) === null || _a === void 0 ? void 0 : _a.listItem) === null || _b === void 0 ? void 0 : _b.uniqueId) === null || _c === void 0 ? void 0 : _c.toString();
};
/**
 * The function returns an item from a list based on its ID.
 * @returns an object of type IItem.
 */
export const theIItem = () => {
    return theIList().items.getById(theItemId());
};
/**
 * The function returns the item from a specific instance.
 * @returns the value of `instance()['item']`.
 */
export const theItem = () => {
    return instance()["item"];
};
/**
 * The function returns the page item from a specific instance.
 * @returns the value of `instance()['page']`, which is of type `SPPageItem`.
 */
export const thePage = () => {
    return instance()["page"];
};
/**
 * The function returns the parent page item.
 * @returns the value of `instance()['parentPage']`.
 */
export const theParentPage = () => {
    return instance()["parentPage"];
};
//# sourceMappingURL=ListItem.instance.js.map