import { isCached, setCache } from "../util/Cache";
import { formatDate } from "../util/Date";
import { SPObject } from "./Object.class";
import { SPListItem } from "./ListItem.class";
import { sp } from "../core/Celertity";
import { ICamlQuery, IList, IListInfo } from "@pnp/sp/lists";
import { IContentTypeInfo } from "@pnp/sp/content-types";

import { ItemInfo } from "./types/ListItem.types";
import { IViewInfo } from "@pnp/sp/views";
import { IWeb } from "@pnp/sp/webs";
import { IFieldInfo } from "@pnp/sp/fields";
import { PermissionKind } from "@pnp/sp/security";
import { UnknownObject } from "../util/Util.types";
import {
  ListInfo,
  NewItemConstructor,
  ListIndex,
  ItemIndex,
} from "./types/List.types";
import { theSiteUrl } from "../core/instance/Site.instance";
import { listItemsBy } from "../functions/SPFx.helper";
import type { CAMLFieldType } from "../functions/types/Caml.types";

class SPList<
  T extends SPListItem<UnknownObject> = SPListItem<ItemInfo>,
  T1 extends ItemInfo = ItemInfo
> extends SPObject<IList> {
  public listName: string;
  public loaded: boolean = false;
  public list: ListInfo;
  public itemsList: T[];
  public contentTypesEach: IContentTypeInfo[];
  public itemConstructor: NewItemConstructor<T, T1> | UnknownObject;

  constructor(
    listName: string,
    itemConstructor?: NewItemConstructor<T, T1> | UnknownObject
  ) {
    super();
    this.listName = listName;
    this.queryable = this.web.lists.getByTitle(listName);
    this.itemConstructor = itemConstructor || SPListItem;
  }

  public setItemConstructor(constructor: NewItemConstructor<T, T1>): void {
    this.itemConstructor = constructor;
  }

  /**
   * The function retrieves a SharePoint list and caches it if it is not already cached.
   * @returns a Promise that resolves to an object of type SPList<T>.
   */
  public async get(): Promise<SPList<T, T1>> {
    const { web, listName } = this;
    if (this.list) return this;
    const cached = isCached(`list_${listName}`);
    if (cached) {
      this.list = cached;
      if (this.list) {
        this.loaded = true;
      }
      return this;
    }

    this.list = await web.lists.getByTitle(listName)();

    setCache(`list_${listName}`, this.list);
    if (this.list) {
      this.loaded = true;
    }
    return this;
  }

  /* The `id` method is a shorthand arrow function that returns the `Id` property of the `list` object if
it exists, otherwise it returns an empty string. It is used to retrieve the ID of the SharePoint
list. */
  id = () => this.list?.Id || "";

  /* The `title` method is an arrow function that returns the `Title` property of the `list` object if it
exists, otherwise it returns an empty string. It is used to retrieve the title of the SharePoint
list. */
  title = () => this.list?.Title || "";

  /**
   * The `update` function updates the properties of a list and performs a query to update the list in
   * the database.
   * @param props - Partial<ListInfo> - This is an object that contains partial information about a
   * list. It can have any subset of properties defined in the ListInfo interface.
   * @returns a Promise that resolves to an updated SPList object.
   */
  async update(props: Partial<ListInfo>): Promise<SPList<T, T1>> {
    if (!this.list) await this.get();
    this.list = { ...this.list, ...props };
    await this.query().update(props);
    return this;
  }

  public setWeb(web: IWeb): void {
    if (!web || !web.lists) return;
    super.setWeb(web);
    this.queryable = this.web.lists.getByTitle(this.listName);
  }

  /**
   * The function checks if a list exists and returns a boolean value indicating its existence.
   * @returns The function `exists()` returns a Promise that resolves to a boolean value.
   */
  async exists(): Promise<boolean> {
    if (!!this.list) return true;
    try {
      await this.get().catch((e) => {
        throw e;
      });
      return !!this.list;
    } catch (e) {
      return false;
    }
  }

  /**
   * The init function initializes a SPList object with a given list information and returns the
   * object.
   * @param {ListInfo} list - The "list" parameter is of type "ListInfo". It is an object that contains
   * information about a list, such as its name, title, and other properties.
   * @returns The `init` function is returning an instance of the `SPList<T>` class.
   */
  init(list: ListInfo): SPList<T, T1> {
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
  async addItem(item: Partial<T1>): Promise<T> {
    const res = await this.query().items.add(item);
    const newItem = new this.itemConstructor(this.listName, res.data.Id) as T;
    await newItem.get();
    return newItem;
  }

  /**
   * The function "contentTypes" returns a promise that resolves to an array of content type
   * information.
   * @returns a Promise that resolves to an array of IContentTypeInfo objects.
   */
  async contentTypes(): Promise<IContentTypeInfo[]> {
    if (this.contentTypesEach) return this.contentTypesEach;

    const contentTypes: IContentTypeInfo[] = await this.web.lists
      .getByTitle(this.listName)
      .contentTypes();

    this.contentTypesEach = contentTypes;

    return contentTypes;
  }

  /**
   * The function `contentTypeByName` returns the content type information for a given name.
   * @param {string} name - A string representing the name of the content type to search for.
   * @returns a Promise that resolves to an object of type IContentTypeInfo.
   */
  async contentTypeByName(name: string): Promise<IContentTypeInfo> {
    const contentTypes = await this.contentTypes();
    const ct = contentTypes.find((ct) => ct.Name === name);

    return ct;
  }

  async contentTypeById(id: string): Promise<IContentTypeInfo> {
    return await this.web.lists
      .getByTitle(this.listName)
      .contentTypes.getById(id)();
  }

  /**
   * The function `contentTypeIDByName` returns the StringId of a content type given its name.
   * @param {string} name - The `name` parameter is a string that represents the name of a content
   * type.
   * @returns a Promise that resolves to a string.
   */
  async contentTypeIDByName(name: string): Promise<string> {
    return (await this.contentTypeByName(name))?.StringId;
  }

  /**
   * The function returns the first content type from an array of content types, or undefined if the
   * array is empty.
   * @returns The method is returning the first element of the `contentTypesEach` array, which is of
   * type `IContentTypeInfo`.
   */
  public defaultContentType(): IContentTypeInfo {
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
  public created(format?: string): string | undefined {
    if (!this.loaded) return undefined;
    if (!format) return this.list.Created;
    return formatDate(this.list.Created, format);
  }

  /**
   * The uniqueId function returns the value of the 'odata.id' property from the list object if the
   * loaded property is true, otherwise it returns undefined.
   * @returns a string value or undefined.
   */
  public uniqueId(): string | undefined {
    if (!this.loaded) return undefined;
    return this.list["odata.id"];
  }

  /**
   * The function retrieves items from a SharePoint list and returns them as an array of specified
   * type.
   * @returns an array of items of type T1.
   */
  public async items(count = -1): Promise<T[]> {
    if (this.itemsList) return this.itemsList as unknown as T[];

    if (count !== -1) {
      const rawItems = (await this.web.lists
        .getByTitle(this.listName)
        .items.top(count)()) as T[];

      const items = rawItems.map((rawItem: any) => {
        return new this.itemConstructor(this.listName, rawItem.Id).init(
          rawItem,
          this.web
        ) as T;
      });

      this.itemsList = items;

      return items as unknown as T[];
    }
    const canSearch = await this.canSearch();
    if (canSearch) {
      const items = await this.query()
        .items.select("*", ...SPListItem.extraFields)
        .top(5000)();
      return (
        items.map((item, index) => {
          return new this.itemConstructor(this.listName, item.ID).init(
            item,
            this.web
          ) as T;
        }) || []
      );
    } else {
      const items: T[] = (await listItemsBy<T, T1>(
        this.listName,
        "allItems",
        async (i, index, all) => {
          return true;
        },
        this.web,
        this.itemConstructor
      )) as T[];

      const trimmed = items.slice(0, count);
      return trimmed;
    }
  }

  _index: ListIndex;
  /* The above code is defining an asynchronous function called `index`. This function returns a
  Promise that resolves to a `ListIndex` object. */
  index = async (): Promise<ListIndex> => {
    if (this._index) return this._index;
    const listQuery: T1[] = await this.query()
      .items.select("Id", "Title")
      .top(4000)();
    const indecies: ItemIndex[] = listQuery.map((item: T1, index: number) => ({
      index,
      ID: Number(item.Id),
      Title: item.Title,
    }));

    this._index = {
      items: indecies,
      total: listQuery.length,
      firstId: indecies[0].ID || 0,
      lastId: indecies?.length ? indecies[indecies?.length - 1].ID : 0,
    };
    return this._index;
  };

  /**
   * The function "itemsByCAMLQuery" retrieves items from a SharePoint list using a CAML query and
   * returns them as an array of specified type.
   * @param {ICamlQuery} query - The `query` parameter is of type `ICamlQuery`, which represents a CAML
   * query used to retrieve items from a SharePoint list.
   * @returns an array of items of type T1.
   */
  public async itemsByCAMLQuery(query: ICamlQuery): Promise<T[]> {
    const rawItems = (await this.query().getItemsByCAMLQuery(query)) as T[];
    const items = rawItems.map((rawItem: any) => {
      return new this.itemConstructor(this.listName, rawItem.Id).init(
        rawItem,
        this.web
      ) as T;
    });

    return items as unknown as T[];
  }

  /**
   * The function "views" returns a promise that resolves to an array of objects containing information
   * about views.
   * @returns The function `views()` is returning a Promise that resolves to an array of `IViewInfo`
   * objects.
   */
  views(): Promise<IViewInfo[]> {
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
  async itemsWhere(where: string): Promise<T[]> {
    return await this.itemsByCAMLQuery({
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
  async itemsByField(
    field: string,
    type: CAMLFieldType,
    value: string
  ): Promise<T[]> {
    return await this.itemsWhere(
      `
      <Eq>
        <FieldRef Name="${field}" ${
        type === "Lookup" ? 'LookupId="TRUE"' : ""
      } />
        <Value Type="${type}">
          ${value}
        </Value>
      </Eq>
      `
    );
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
  async canAdd(): Promise<boolean> {
    return await this.query().currentUserHasPermissions(
      PermissionKind.AddListItems
    );
  }

  /**
   * The function "canSearch" checks if the list has been loaded and returns a boolean indicating
   * whether the item count is less than 5000.
   * @returns The function `canSearch` returns a Promise that resolves to a boolean value.
   */
  async canSearch(): Promise<boolean> {
    if (!this.loaded) await this.get();
    return this.list.ItemCount < 5000;
  }

  /**
   * The function `byID` retrieves a SharePoint list by its ID and returns a `SPList` object.
   * @param {string} listId - The `listId` parameter is a string that represents the unique identifier
   * of a SharePoint list.
   * @returns a Promise that resolves to an instance of the SPList class.
   */
  static async byID<T extends SPListItem<T1>, T1 extends ItemInfo>(
    listId: string
  ): Promise<SPList<T, T1>> {
    const list = await sp().web.lists.getById(listId)();
    return new SPList<T, T1>(list.Title).init(list);
  }

  _fields: IFieldInfo[];
  async fields(): Promise<IFieldInfo[]> {
    if (this._fields) return this._fields;
    const fields = await this.query().fields();
    this._fields = fields;
    return fields;
  }

  /**
   * The `latest` function retrieves the latest items from a SharePoint list, either by using a query
   * or by fetching all items and sorting them by creation date.
   * @param {number} [count=10] - The `count` parameter is the number of items to retrieve. It has a
   * default value of 10, but you can pass a different value to retrieve a specific number of items.
   * @returns The function `latest` returns a Promise that resolves to an array of `SPListItem<T>`
   * objects.
   */
  async latest(count: number = 10, orderByField = "Created"): Promise<T[]> {
    await this.get();
    const canSearch = await this.canSearch();
    if (canSearch) {
      const items = await this.query()
        .items.orderBy(orderByField, false)
        .select("*", ...SPListItem.extraFields)
        .top(count)();
      return (
        items.map((item, index) => {
          const itemN = new this.itemConstructor(this.listName, item.ID).init(
            item,
            this.web
          ) as T;
          itemN.setList(this);
          return itemN;
        }) || []
      );
    } else {
      const items: T[] = (await listItemsBy<T, T1>(
        this.listName,
        "latest",
        async (i, index, all) => {
          return true;
        },
        this.web,
        this.itemConstructor
      )) as T[];

      items.sort((a, b) => {
        return b.created().localeCompare(a.created());
      });
      const trimmed = items.slice(0, count);
      return (
        trimmed.map((item, index) => {
          item.setList(this);
          return item;
        }) || []
      );
    }
  }
}

export { SPList };
