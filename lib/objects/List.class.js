var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isCached, setCache } from "../util/Cache";
import { formatDate } from "../util/Date";
import { SPObject } from "./Object.class";
import { SPListItem } from "./ListItem.class";
import { sp } from "../core/Celertity";
import { PermissionKind } from "@pnp/sp/security";
import { theSiteUrl } from "../core/instance/Site.instance";
import { listItemsBy } from "../functions/SPFx.helper";
class SPList extends SPObject {
    constructor(listName, itemConstructor) {
        super();
        this.loaded = false;
        /* The `id` method is a shorthand arrow function that returns the `Id` property of the `list` object if
      it exists, otherwise it returns an empty string. It is used to retrieve the ID of the SharePoint
      list. */
        this.id = () => { var _a; return ((_a = this.list) === null || _a === void 0 ? void 0 : _a.Id) || ""; };
        /* The `title` method is an arrow function that returns the `Title` property of the `list` object if it
      exists, otherwise it returns an empty string. It is used to retrieve the title of the SharePoint
      list. */
        this.title = () => { var _a; return ((_a = this.list) === null || _a === void 0 ? void 0 : _a.Title) || ""; };
        /* The above code is defining an asynchronous function called `index`. This function returns a
        Promise that resolves to a `ListIndex` object. */
        this.index = () => __awaiter(this, void 0, void 0, function* () {
            if (this._index)
                return this._index;
            const listQuery = yield this.query()
                .items.select("Id", "Title")
                .top(4000)();
            const indecies = listQuery.map((item, index) => ({
                index,
                ID: Number(item.Id),
                Title: item.Title,
            }));
            this._index = {
                items: indecies,
                total: listQuery.length,
                firstId: indecies[0].ID || 0,
                lastId: (indecies === null || indecies === void 0 ? void 0 : indecies.length) ? indecies[(indecies === null || indecies === void 0 ? void 0 : indecies.length) - 1].ID : 0,
            };
            return this._index;
        });
        this.listName = listName;
        this.queryable = this.web.lists.getByTitle(listName);
        this.itemConstructor = itemConstructor || SPListItem;
    }
    setItemConstructor(constructor) {
        this.itemConstructor = constructor;
    }
    /**
     * The function retrieves a SharePoint list and caches it if it is not already cached.
     * @returns a Promise that resolves to an object of type SPList<T>.
     */
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const { web, listName } = this;
            if (this.list)
                return this;
            const cached = isCached(`list_${listName}`);
            if (cached) {
                this.list = cached;
                if (this.list) {
                    this.loaded = true;
                }
                return this;
            }
            this.list = yield web.lists.getByTitle(listName)();
            setCache(`list_${listName}`, this.list);
            if (this.list) {
                this.loaded = true;
            }
            return this;
        });
    }
    /**
     * The `update` function updates the properties of a list and performs a query to update the list in
     * the database.
     * @param props - Partial<ListInfo> - This is an object that contains partial information about a
     * list. It can have any subset of properties defined in the ListInfo interface.
     * @returns a Promise that resolves to an updated SPList object.
     */
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.list)
                yield this.get();
            this.list = Object.assign(Object.assign({}, this.list), props);
            yield this.query().update(props);
            return this;
        });
    }
    setWeb(web) {
        if (!web || !web.lists)
            return;
        super.setWeb(web);
        this.queryable = this.web.lists.getByTitle(this.listName);
    }
    /**
     * The function checks if a list exists and returns a boolean value indicating its existence.
     * @returns The function `exists()` returns a Promise that resolves to a boolean value.
     */
    exists() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!!this.list)
                return true;
            try {
                yield this.get().catch((e) => {
                    throw e;
                });
                return !!this.list;
            }
            catch (e) {
                return false;
            }
        });
    }
    /**
     * The init function initializes a SPList object with a given list information and returns the
     * object.
     * @param {ListInfo} list - The "list" parameter is of type "ListInfo". It is an object that contains
     * information about a list, such as its name, title, and other properties.
     * @returns The `init` function is returning an instance of the `SPList<T>` class.
     */
    init(list) {
        this.list = list;
        if (this.list) {
            this.loaded = true;
            this.queryable = this.web.lists.getByTitle(this.listName);
        }
        return this;
    }
    /**
     * The `addItem` function adds a new item to a SharePoint list and returns the newly created item.
     * @param item - The parameter "item" is of type "Partial<T>", which means it is a partial object of
     * type T. It represents the item that needs to be added to the list.
     * @returns a Promise that resolves to an instance of SPListItem<T>.
     */
    addItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.query().items.add(item);
            const newItem = new this.itemConstructor(this.listName, res.data.Id);
            yield newItem.get();
            return newItem;
        });
    }
    /**
     * The function "contentTypes" returns a promise that resolves to an array of content type
     * information.
     * @returns a Promise that resolves to an array of IContentTypeInfo objects.
     */
    contentTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.contentTypesEach)
                return this.contentTypesEach;
            const contentTypes = yield this.web.lists
                .getByTitle(this.listName)
                .contentTypes();
            this.contentTypesEach = contentTypes;
            return contentTypes;
        });
    }
    /**
     * The function `contentTypeByName` returns the content type information for a given name.
     * @param {string} name - A string representing the name of the content type to search for.
     * @returns a Promise that resolves to an object of type IContentTypeInfo.
     */
    contentTypeByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const contentTypes = yield this.contentTypes();
            const ct = contentTypes.find((ct) => ct.Name === name);
            return ct;
        });
    }
    contentTypeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.web.lists
                .getByTitle(this.listName)
                .contentTypes.getById(id)();
        });
    }
    /**
     * The function `contentTypeIDByName` returns the StringId of a content type given its name.
     * @param {string} name - The `name` parameter is a string that represents the name of a content
     * type.
     * @returns a Promise that resolves to a string.
     */
    contentTypeIDByName(name) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = (yield this.contentTypeByName(name))) === null || _a === void 0 ? void 0 : _a.StringId;
        });
    }
    /**
     * The function returns the first content type from an array of content types, or undefined if the
     * array is empty.
     * @returns The method is returning the first element of the `contentTypesEach` array, which is of
     * type `IContentTypeInfo`.
     */
    defaultContentType() {
        if (!this.contentTypesEach || this.contentTypesEach.length === 0)
            return undefined;
        return this.contentTypesEach[0];
    }
    /**
     * The function "created" returns the formatted creation date of an object if it is loaded, otherwise
     * it returns undefined.
     * @param {string} [format] - The `format` parameter is an optional string that specifies the desired
     * format for the date. If the `format` parameter is not provided, the function will return the date
     * in the default format.
     * @returns a string if the format parameter is provided, or undefined if the loaded property is false
     * or if the format parameter is not provided.
     */
    created(format) {
        if (!this.loaded)
            return undefined;
        if (!format)
            return this.list.Created;
        return formatDate(this.list.Created, format);
    }
    /**
     * The uniqueId function returns the value of the 'odata.id' property from the list object if the
     * loaded property is true, otherwise it returns undefined.
     * @returns a string value or undefined.
     */
    uniqueId() {
        if (!this.loaded)
            return undefined;
        return this.list["odata.id"];
    }
    /**
     * The function retrieves items from a SharePoint list and returns them as an array of specified
     * type.
     * @returns an array of items of type T1.
     */
    items(count = -1) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.itemsList)
                return this.itemsList;
            if (count !== -1) {
                const rawItems = (yield this.web.lists
                    .getByTitle(this.listName)
                    .items.top(count)());
                const items = rawItems.map((rawItem) => {
                    return new this.itemConstructor(this.listName, rawItem.Id).init(rawItem, this.web);
                });
                this.itemsList = items;
                return items;
            }
            const canSearch = yield this.canSearch();
            if (canSearch) {
                const items = yield this.query()
                    .items.select("*", ...SPListItem.extraFields)
                    .top(5000)();
                return (items.map((item, index) => {
                    return new this.itemConstructor(this.listName, item.ID).init(item, this.web);
                }) || []);
            }
            else {
                const items = (yield listItemsBy(this.listName, "allItems", (i, index, all) => __awaiter(this, void 0, void 0, function* () {
                    return true;
                }), this.web, this.itemConstructor));
                const trimmed = items.slice(0, count);
                return trimmed;
            }
        });
    }
    /**
     * The function "itemsByCAMLQuery" retrieves items from a SharePoint list using a CAML query and
     * returns them as an array of specified type.
     * @param {ICamlQuery} query - The `query` parameter is of type `ICamlQuery`, which represents a CAML
     * query used to retrieve items from a SharePoint list.
     * @returns an array of items of type T1.
     */
    itemsByCAMLQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawItems = (yield this.query().getItemsByCAMLQuery(query));
            const items = rawItems.map((rawItem) => {
                return new this.itemConstructor(this.listName, rawItem.Id).init(rawItem, this.web);
            });
            return items;
        });
    }
    /**
     * The function "views" returns a promise that resolves to an array of objects containing information
     * about views.
     * @returns The function `views()` is returning a Promise that resolves to an array of `IViewInfo`
     * objects.
     */
    views() {
        return this.query().views.select("*")();
    }
    /**
     * The function "itemsWhere" retrieves items from a SharePoint list based on a CAML query filter.
     * @param {string} where - The `where` parameter is a string that represents the CAML query condition
     * used to filter the items in the SharePoint list. It is used to specify the criteria for selecting
     * items based on their field values.
     * @returns a Promise that resolves to an array of items that match the specified CAML query. The
     * type of the items in the array is determined by the generic type parameter T1, which defaults to
     * SPListItem.
     */
    itemsWhere(where) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.itemsByCAMLQuery({
                ViewXml: `
      <View>
        <Query>
          <Where>
            ${where}
          </Where>
        </Query>
      </View>`
                    .trim()
                    .replaceAll("  ", "")
                    .replaceAll("\n", ""),
            });
        });
    }
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
    itemsByField(field, type, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.itemsWhere(`
      <Eq>
        <FieldRef Name="${field}" ${type === "Lookup" ? 'LookupId="TRUE"' : ""} />
        <Value Type="${type}">
          ${value}
        </Value>
      </Eq>
      `);
        });
    }
    url() {
        const siteUrl = theSiteUrl();
        return `${siteUrl}/${this.listName.replace(" ", "")}`;
    }
    /**
     * The `newItemUrl` function generates a URL for creating a new item in a SharePoint list.
     * @returns The `newItemUrl()` function is returning a URL that points to a new form for creating a
     * new item in a list. The URL is constructed using the site URL, the list name, and the form type.
     */
    newItemUrl() {
        const siteUrl = theSiteUrl();
        const formType = "NewForm.aspx";
        return `${siteUrl}/Lists/${this.listName}/${formType}`;
    }
    /**
     * The function `canAdd` checks if the current user has permissions to add list items.
     * @returns The `canAdd` method is returning a Promise that resolves to a boolean value. The boolean
     * value indicates whether the current user has permissions to add list items, based on the result of
     * the `currentUserHasPermissions` method with the argument `PermissionKind.AddListItems`.
     */
    canAdd() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.query().currentUserHasPermissions(PermissionKind.AddListItems);
        });
    }
    /**
     * The function "canSearch" checks if the list has been loaded and returns a boolean indicating
     * whether the item count is less than 5000.
     * @returns The function `canSearch` returns a Promise that resolves to a boolean value.
     */
    canSearch() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.loaded)
                yield this.get();
            return this.list.ItemCount < 5000;
        });
    }
    /**
     * The function `byID` retrieves a SharePoint list by its ID and returns a `SPList` object.
     * @param {string} listId - The `listId` parameter is a string that represents the unique identifier
     * of a SharePoint list.
     * @returns a Promise that resolves to an instance of the SPList class.
     */
    static byID(listId) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield sp().web.lists.getById(listId)();
            return new SPList(list.Title).init(list);
        });
    }
    fields() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._fields)
                return this._fields;
            const fields = yield this.query().fields();
            this._fields = fields;
            return fields;
        });
    }
    /**
     * The `latest` function retrieves the latest items from a SharePoint list, either by using a query
     * or by fetching all items and sorting them by creation date.
     * @param {number} [count=10] - The `count` parameter is the number of items to retrieve. It has a
     * default value of 10, but you can pass a different value to retrieve a specific number of items.
     * @returns The function `latest` returns a Promise that resolves to an array of `SPListItem<T>`
     * objects.
     */
    latest(count = 10, orderByField = "Created") {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.get();
            const canSearch = yield this.canSearch();
            if (canSearch) {
                const items = yield this.query()
                    .items.orderBy(orderByField, false)
                    .select("*", ...SPListItem.extraFields)
                    .top(count)();
                return (items.map((item, index) => {
                    const itemN = new this.itemConstructor(this.listName, item.ID).init(item, this.web);
                    itemN.setList(this);
                    return itemN;
                }) || []);
            }
            else {
                const items = (yield listItemsBy(this.listName, "latest", (i, index, all) => __awaiter(this, void 0, void 0, function* () {
                    return true;
                }), this.web, this.itemConstructor));
                items.sort((a, b) => {
                    return b.created().localeCompare(a.created());
                });
                const trimmed = items.slice(0, count);
                return (trimmed.map((item, index) => {
                    item.setList(this);
                    return item;
                }) || []);
            }
        });
    }
}
export { SPList };
//# sourceMappingURL=List.class.js.map