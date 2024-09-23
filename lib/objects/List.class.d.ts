import { SPObject } from "./Object.class";
import { SPListItem } from "./ListItem.class";
import { ICamlQuery, IList } from "@pnp/sp/lists";
import { IContentTypeInfo } from "@pnp/sp/content-types";
import { ItemInfo } from "./types/ListItem.types";
import { IViewInfo } from "@pnp/sp/views";
import { IWeb } from "@pnp/sp/webs";
import { IFieldInfo } from "@pnp/sp/fields";
import { UnknownObject } from "../util/Util.types";
import { ListInfo, NewItemConstructor, ListIndex } from "./types/List.types";
import type { CAMLFieldType } from "../functions/types/Caml.types";
declare class SPList<T extends SPListItem<UnknownObject> = SPListItem<ItemInfo>, T1 extends ItemInfo = ItemInfo> extends SPObject<IList> {
    listName: string;
    loaded: boolean;
    list: ListInfo;
    itemsList: T[];
    contentTypesEach: IContentTypeInfo[];
    itemConstructor: NewItemConstructor<T, T1> | UnknownObject;
    constructor(listName: string, itemConstructor?: NewItemConstructor<T, T1> | UnknownObject);
    setItemConstructor(constructor: NewItemConstructor<T, T1>): void;
    /**
     * The function retrieves a SharePoint list and caches it if it is not already cached.
     * @returns a Promise that resolves to an object of type SPList<T>.
     */
    get(): Promise<SPList<T, T1>>;
    id: () => string;
    title: () => string;
    /**
     * The `update` function updates the properties of a list and performs a query to update the list in
     * the database.
     * @param props - Partial<ListInfo> - This is an object that contains partial information about a
     * list. It can have any subset of properties defined in the ListInfo interface.
     * @returns a Promise that resolves to an updated SPList object.
     */
    update(props: Partial<ListInfo>): Promise<SPList<T, T1>>;
    setWeb(web: IWeb): void;
    /**
     * The function checks if a list exists and returns a boolean value indicating its existence.
     * @returns The function `exists()` returns a Promise that resolves to a boolean value.
     */
    exists(): Promise<boolean>;
    /**
     * The init function initializes a SPList object with a given list information and returns the
     * object.
     * @param {ListInfo} list - The "list" parameter is of type "ListInfo". It is an object that contains
     * information about a list, such as its name, title, and other properties.
     * @returns The `init` function is returning an instance of the `SPList<T>` class.
     */
    init(list: ListInfo): SPList<T, T1>;
    /**
     * The `addItem` function adds a new item to a SharePoint list and returns the newly created item.
     * @param item - The parameter "item" is of type "Partial<T>", which means it is a partial object of
     * type T. It represents the item that needs to be added to the list.
     * @returns a Promise that resolves to an instance of SPListItem<T>.
     */
    addItem(item: Partial<T1>): Promise<T>;
    /**
     * The function "contentTypes" returns a promise that resolves to an array of content type
     * information.
     * @returns a Promise that resolves to an array of IContentTypeInfo objects.
     */
    contentTypes(): Promise<IContentTypeInfo[]>;
    /**
     * The function `contentTypeByName` returns the content type information for a given name.
     * @param {string} name - A string representing the name of the content type to search for.
     * @returns a Promise that resolves to an object of type IContentTypeInfo.
     */
    contentTypeByName(name: string): Promise<IContentTypeInfo>;
    contentTypeById(id: string): Promise<IContentTypeInfo>;
    /**
     * The function `contentTypeIDByName` returns the StringId of a content type given its name.
     * @param {string} name - The `name` parameter is a string that represents the name of a content
     * type.
     * @returns a Promise that resolves to a string.
     */
    contentTypeIDByName(name: string): Promise<string>;
    /**
     * The function returns the first content type from an array of content types, or undefined if the
     * array is empty.
     * @returns The method is returning the first element of the `contentTypesEach` array, which is of
     * type `IContentTypeInfo`.
     */
    defaultContentType(): IContentTypeInfo;
    /**
     * The function "created" returns the formatted creation date of an object if it is loaded, otherwise
     * it returns undefined.
     * @param {string} [format] - The `format` parameter is an optional string that specifies the desired
     * format for the date. If the `format` parameter is not provided, the function will return the date
     * in the default format.
     * @returns a string if the format parameter is provided, or undefined if the loaded property is false
     * or if the format parameter is not provided.
     */
    created(format?: string): string | undefined;
    /**
     * The uniqueId function returns the value of the 'odata.id' property from the list object if the
     * loaded property is true, otherwise it returns undefined.
     * @returns a string value or undefined.
     */
    uniqueId(): string | undefined;
    /**
     * The function retrieves items from a SharePoint list and returns them as an array of specified
     * type.
     * @returns an array of items of type T1.
     */
    items(count?: number): Promise<T[]>;
    _index: ListIndex;
    index: () => Promise<ListIndex>;
    /**
     * The function "itemsByCAMLQuery" retrieves items from a SharePoint list using a CAML query and
     * returns them as an array of specified type.
     * @param {ICamlQuery} query - The `query` parameter is of type `ICamlQuery`, which represents a CAML
     * query used to retrieve items from a SharePoint list.
     * @returns an array of items of type T1.
     */
    itemsByCAMLQuery(query: ICamlQuery): Promise<T[]>;
    /**
     * The function "views" returns a promise that resolves to an array of objects containing information
     * about views.
     * @returns The function `views()` is returning a Promise that resolves to an array of `IViewInfo`
     * objects.
     */
    views(): Promise<IViewInfo[]>;
    /**
     * The function "itemsWhere" retrieves items from a SharePoint list based on a CAML query filter.
     * @param {string} where - The `where` parameter is a string that represents the CAML query condition
     * used to filter the items in the SharePoint list. It is used to specify the criteria for selecting
     * items based on their field values.
     * @returns a Promise that resolves to an array of items that match the specified CAML query. The
     * type of the items in the array is determined by the generic type parameter T1, which defaults to
     * SPListItem.
     */
    itemsWhere(where: string): Promise<T[]>;
    /**
     * The function "itemsByField" retrieves items from a SharePoint list based on a specified field,
     * type, and value.
     * @param {string} field - The "field" parameter is a string that represents the name of the field in
     * the SharePoint list that you want to filter on.
     * @param {CAMLFieldType} type - The "type" parameter is the type of the field in the SharePoint
     * list. It can be one of the following values:
     * @param {string} value - The "value" parameter is the value that you want to use for filtering the
     * items. It will be used in the CAML query to compare against the specified field.
     * @returns a Promise that resolves to an array of items of type T1.
     */
    itemsByField(field: string, type: CAMLFieldType, value: string): Promise<T[]>;
    url(): string;
    /**
     * The `newItemUrl` function generates a URL for creating a new item in a SharePoint list.
     * @returns The `newItemUrl()` function is returning a URL that points to a new form for creating a
     * new item in a list. The URL is constructed using the site URL, the list name, and the form type.
     */
    newItemUrl(): string;
    /**
     * The function `canAdd` checks if the current user has permissions to add list items.
     * @returns The `canAdd` method is returning a Promise that resolves to a boolean value. The boolean
     * value indicates whether the current user has permissions to add list items, based on the result of
     * the `currentUserHasPermissions` method with the argument `PermissionKind.AddListItems`.
     */
    canAdd(): Promise<boolean>;
    /**
     * The function "canSearch" checks if the list has been loaded and returns a boolean indicating
     * whether the item count is less than 5000.
     * @returns The function `canSearch` returns a Promise that resolves to a boolean value.
     */
    canSearch(): Promise<boolean>;
    /**
     * The function `byID` retrieves a SharePoint list by its ID and returns a `SPList` object.
     * @param {string} listId - The `listId` parameter is a string that represents the unique identifier
     * of a SharePoint list.
     * @returns a Promise that resolves to an instance of the SPList class.
     */
    static byID<T extends SPListItem<T1>, T1 extends ItemInfo>(listId: string): Promise<SPList<T, T1>>;
    _fields: IFieldInfo[];
    fields(): Promise<IFieldInfo[]>;
    /**
     * The `latest` function retrieves the latest items from a SharePoint list, either by using a query
     * or by fetching all items and sorting them by creation date.
     * @param {number} [count=10] - The `count` parameter is the number of items to retrieve. It has a
     * default value of 10, but you can pass a different value to retrieve a specific number of items.
     * @returns The function `latest` returns a Promise that resolves to an array of `SPListItem<T>`
     * objects.
     */
    latest(count?: number, orderByField?: string): Promise<T[]>;
}
export { SPList };
//# sourceMappingURL=List.class.d.ts.map