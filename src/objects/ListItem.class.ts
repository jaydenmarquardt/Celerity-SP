import { IRelatedItem } from "@pnp/sp/related-items";
import { SPObject } from "./Object.class";
import { SPLUser } from "./User.class";
import { ILikedByInformation } from "@pnp/sp/comments";
import { IItem } from "@pnp/sp/items";
import { RatingValues } from "@pnp/sp/comments/types";

import { sp } from "../core/Celertity";
import { clearCache, isCached, setCache } from "../util/Cache";
import { formatDate } from "../util/Date";
import { UnknownObject } from "../util/Util.types";
import { Obj } from "../util/Objects";
import { IItemVersionInfo, ItemInfo } from "./types/ListItem.types";
import { emptyString } from "../util/Strings";
import { errorLog } from "../util/Debug";
import {
  IAttachmentAddResult,
  IAttachmentInfo,
  IBasePermissions,
  IWeb,
  PermissionKind,
  SocialActorType,
  SocialFollowResult,
} from "@pnp/sp/presets/all";
import { SPList } from "./List.class";
import { theSiteUrl } from "../core/instance/Site.instance";
import { theTenancyUrl } from "../core/instance/Tenancy.instance";
import { theUser } from "../core/instance/User.instance";

class SPListItem<T extends ItemInfo = ItemInfo> extends SPObject<IItem> {
  classType: string = "ListItem";

  public listName: string;
  public _list: SPList<SPListItem<T>, T> | UnknownObject;
  public id: number;
  public item: T;
  static extraFields = [
    "FileRef",
    "FileLeafRef",
    "UniqueId",
    "ContentType/Name",
  ];

  constructor(listName: string, id: number) {
    super();
    this.listName = listName;
    this.id = id;
  }

  /* The above code is defining a function called "query" that returns an object of type "IItem". Inside
 the function, it is using the SharePoint Framework (SPFx) to retrieve a specific item from a
 SharePoint list based on the list name and item ID. */
  query = (): IItem =>
    this.web.lists.getByTitle(this.listName).items.getById(this.id);

  /* The above code is defining a method called "object" that returns a value of type T. Inside the
method, it checks if the "checkUnloaded" method returns true, and if so, it returns the value of the
"item" property. */
  object = (): T => this.checkUnloaded() && this.item;
  /* The above code is defining a function called "data" in TypeScript. This function takes in a
  parameter called "key" which is of type "keyof T", where "T" is a generic type. The function
  returns a value of type "T[keyof T] | undefined | UnknownObject". */
  data = (key: keyof T): T[keyof T] | undefined | UnknownObject => {
    if (!this.item) return undefined;
    return Obj<T>(this.object())?.get(key);
  };

  getIcon = () => "RowsGroup";
  /* The above code is written in TypeScript and defines a class method called `title`. This method
returns a string value that is obtained from a data property called 'Title'. If the 'Title' property
is not defined, the method returns an empty string. */
  title = (): string => this.data("Title") || "";
  /* The above code is written in TypeScript and defines a class method called `description`. This method
returns a string value that is retrieved from a data property called 'Description' using the `data`
method. If the 'Description' property is not found, an empty string is returned. */
  description = (): string => this.data("Description") || "";

  /* The above code is defining a TypeScript arrow function called "url". This function takes an
  optional boolean parameter "full" with a default value of false. */
  url = (full: boolean = false): string => {
    if (this.listName === "Site Pages") return this.fileRef(full);
    return `${theSiteUrl(full)}/Lists/${this.listName}/DispForm.aspx?ID=${
      this.id
    }`;
  };

  fileRef = (full: boolean = false): string => {
    return `${full ? theTenancyUrl() : ""}${this.data("FileRef")}`;
  };

  /* The above code is defining a method called `uniqueId` in a TypeScript class. This method returns a
string value. */
  uniqueId = (): string => this.checkUnloaded() && this.item["odata.id"];
  /* The above code is defining a TypeScript arrow function called `guid`. This function returns a string
value which is obtained from the `data` property of the current object, using the key `'GUID'`. If
the `data` property does not exist or does not have a value for the key `'GUID'`, the function will
return an empty string. */
  guid = (): string => this.data("GUID") || "";

  onClick = () => {};
  /* The above code is defining a method called `listId` in a TypeScript class. This method returns a
string value, which is the ID of a list. The ID is obtained by calling the `id()` method on a
private property `_list`. */
  listId = (): string => this._list.id();

  /* The above code is a TypeScript method called `contentTypeId`. It returns a string value. */
  contentTypeId = (): string =>
    (this.checkUnloaded() && this.item?.ContentTypeId) || "";
  /* The above code is defining an asynchronous function called `contentType`. Inside the function, it is
using the `query` method to retrieve data from a content type. The `contentType.select('*')()` is a
method chaining syntax that selects all fields from the content type. The `await` keyword is used to
wait for the query to complete before returning the result. */
  contentType = async () => {
    const cached = isCached(`listitem_${this.listName}_${this.id}_contentType`);
    if (cached) {
      return cached;
    }
    const ct = await this.query().contentType.select("*")();
    setCache(`listitem_${this.listName}_${this.id}_contentType`, ct);
    return ct;
  };
  /* The above code is defining a TypeScript function called `contentTypeName`. This function is an
  asynchronous function that returns a Promise of type string. */
  contentTypeName = async (): Promise<string> =>
    (await this.contentType()).Name;

  /* The above code is defining an asynchronous function called `allData` that returns a Promise of an
  object of type `UnknownObject`. Inside the function, it is using the `await` keyword to wait for
  the result of a `query()` function and then calling the `fieldValuesAsHTML()` method on the
  result. */
  allData = async (): Promise<UnknownObject> =>
    await this.query().fieldValuesAsHTML();

  /**
   * This gets overridden by child classes with publishing features
   * @returns true
   */
  isPublished(): boolean {
    return true;
  }

  /* The above code is defining an asynchronous function called `attachments` that returns a promise of
 an array of `IAttachmentInfo` objects. Inside the function, it is using the `await` keyword to wait
 for the result of a `query()` function call, and then calling the `attachmentFiles()` method on the
 result of that query. */
  attachments = async (): Promise<IAttachmentInfo[]> => {
    return await this.query().attachmentFiles();
  };

  /* The above code is defining an asynchronous function called `attachment`. This function takes in
  two parameters: `name`, which is a string representing the name of the attachment file, and
  `type`, which is a string literal type that can be one of four values: 'text', 'blob', 'json', or
  'buffer'. The `type` parameter has a default value of 'text'. */
  attachment = async (
    name: string,
    type: "text" | "blob" | "json" | "buffer" = "text"
  ): Promise<string | Blob | ArrayBuffer> => {
    const q = await this.query().attachmentFiles.getByName(name);
    if (type === "text") return await q.getText();
    if (type === "blob") return await q.getBlob();
    if (type === "json") return await q.getJSON();
    if (type === "buffer") return await q.getBuffer();
    return await q.getText();
  };

  /* The above code is a TypeScript function called `hasAttachment` that takes a `name` parameter of
  type `string`. It is an asynchronous function that returns a `Promise<boolean>`. */
  hasAttachment = async (name: string): Promise<boolean> => {
    const attachments = await this.attachments();
    if (!attachments) return false;

    return !!attachments.find((a) => a.FileName === name);
  };

  /* The above code is defining an asynchronous function called "delete" that returns a Promise with a
 void type. Inside the function, it is using the "query" method to delete data. The "await" keyword
 is used to wait for the deletion operation to complete before moving on. */
  delete = async (): Promise<void> => {
    await this.query().delete();
  };

  /* The above code is defining an asynchronous function called `updateAttachment`. This function takes
  in two parameters: `name` (a string) and `content` (a string). */
  updateAttachment = async (
    name: string,
    content: string
  ): Promise<IAttachmentAddResult> => {
    return await this.query().attachmentFiles.add(name, content);
  };

  /* The above code is a TypeScript function called `addAttachment`. It takes in two parameters: `name`
 (a string) and `content` (a string or a File object). */
  addAttachment = async (
    name: string,
    content: string | File
  ): Promise<IAttachmentAddResult> => {
    name = name.replace(/[~#%&*{}\\:<>?/+|]/gi, "");
    name = name.replace(" ", "_");

    const fileExists = await this.hasAttachment(name);

    if (!!fileExists) {
      await this.deleteAttachment(name);
    }

    return await this.query().attachmentFiles.add(name, content);
  };

  /* The above code is defining an asynchronous function called `deleteAttachment` that takes a
 parameter `name` of type string. This function returns a Promise that resolves to void. */
  deleteAttachment = async (name: string): Promise<void> => {
    return await this.query().attachmentFiles.getByName(name).delete();
  };

  /**
   * > This function gets the list item from the SharePoint list
   * @returns The item is being returned.
   */
  async get(): Promise<SPListItem<T>> {
    const { listName, id } = this;
    if (this.loaded) return this;
    const cached = isCached(`listitem_${listName}_${id}`);
    if (cached) {
      this.item = cached;
      if (this.item) {
        this.loaded = true;
      }
      return this;
    }
    if (emptyString(listName)) {
      errorLog({
        component: "ListItem.class:Get",
        message: "Failed to load item - listName is blank",
        type: "error",
        role: "user",
        severity: "low",
        data: { listName, id },
      });
      setCache(`listitem_${listName}_${id}`, undefined);

      return this;
    }
    if (id === undefined || id === null) {
      errorLog({
        component: "ListItem.class:Get",
        message: "Failed to load item - id is blank",
        type: "error",
        role: "user",
        severity: "low",
        data: { listName, id },
      });
      setCache(`listitem_${listName}_${id}`, undefined);

      return this;
    }

    const itemQuery = this.query().select(
      `${["*", SPListItem.extraFields].join(",")}`
    );

    const item = await itemQuery();
    this.item = item;
    setCache(`listitem_${listName}_${id}`, this.item);
    if (this.item) {
      this.loaded = true;
    }
    return this;
  }

  /**
   * The `refresh` function clears the cache, sets the `loaded` property to false, and then calls the
   * `get` function to retrieve the updated item.
   * @returns a Promise that resolves to an SPListItem of type T.
   */
  async refresh(): Promise<SPListItem<T>> {
    clearCache(`listitem_${this.listName}_${this.id}`);

    try {
      this.loaded = false;
      this.item = undefined;

      return await this.get();
    } catch (e) {
      this.loaded = true;
      errorLog({
        component: "ListItem.class:Refresh",
        message: "Failed to refresh item",
        type: "error",
        role: "user",
        severity: "low",
        data: { e, id: this.id, item: this.item, url: this.item?.FileRef },
      });
    }
  }

  editItemUrl(classic: boolean = false) {
    if (this.listName === "Site Pages") {
      return `${this.fileRef()}?Mode=Edit`;
    }
    const siteUrl = theSiteUrl();
    const formType = "EditForm.aspx";
    return `${siteUrl}/Lists/${this.listName}/${formType}?ID=${this.id}${
      classic ? "&IsDlg=1" : ""
    }`;
  }

  /**
   * The list() function returns an instance of SPList<T> or creates a new instance if it doesn't
   * exist.
   * @returns The method is returning an instance of the SPList<T> class.
   */
  list(): SPList<SPListItem<T>, T> {
    return (
      this._list || (this._list = new SPList<SPListItem<T>, T>(this.listName))
    );
  }

  setList(list: UnknownObject) {
    this._list = list;
  }

  /* The above code is a TypeScript function that defines a method called `tags`. This method returns an
array of strings. However, the implementation of the method is empty, as there are no statements or
logic inside the method body. */
  tags = (): string[] => [];

  /**
   * It initializes the item and sets the loaded property to true.
   * @param {any} item - any - This is the item that you want to load into the list item.
   * @returns The SPListItem object
   */
  public init(item: ItemInfo | UnknownObject, web?: IWeb): SPListItem<T> {
    this.item = item;
    this.id = item.Id;
    if (web) {
      this.web = web;
      this._webInfo = undefined;
    }

    if (this.item) {
      this.loaded = true;
    }
    return this;
  }

  /**
   * The function checks if two SPListItems are the same by comparing their URLs.
   * @param {SPListItem} item - The parameter "item" is of type SPListItem, which is an object that
   * represents an item in a SharePoint list.
   * @returns A boolean value is being returned.
   */
  isSame(item: SPListItem): boolean {
    if (!item || !item.item) return false;
    if (!this.item) return false;
    return this.url() === item.url();
  }

  /**
   * It takes an object of properties, merges them with the existing item, and then updates the item in
   * SharePoint
   * @param {any} props - any - This is the properties that you want to update.
   * @returns The updated item
   */
  public async update(props: Partial<T>): Promise<SPListItem<T>> {
    this.item = { ...this.item, ...props };
    await this.web.lists
      .getByTitle(this.listName)
      .items.getById(this.id)
      .update(props);
    await this.refresh();
    return this;
  }

  /**
   *
   * resolution:
   *    - 0: 300px
   *    - 1: 480px
   *    - 2: 750px
   *    - 3: 1024px
   *    - 4: 1600px
   *    - 5: 2560px
   *    - 6: Original File
   * @returns Url to thumbnail
   */
  public preview(resolution: number = 6): string | undefined {
    this.checkUnloaded();
    const path: string | false = this.url();
    if (!path) return undefined;
    const url = `/_layouts/15/getpreview.ashx?resolution=${resolution}&path=${path}`;

    return url;
  }

  /**
   * The `thumbnail` function returns the banner image as a string or undefined.
   * @returns The `thumbnail` method is returning a value of type `string` or `undefined`.
   */
  public thumbnail(): string | undefined {
    return this.banner();
  }

  /**
   * If the item is loaded, return the banner image URL
   * @returns The banner image url
   */
  public banner(): string | undefined {
    this.checkUnloaded();
    const banner = this.data("BannerImageUrl");
    return typeof banner === "string"
      ? banner
      : this.data("BannerImageUrl")?.Url;
  }

  /**
   * The function checks if the current banner is the default banner.
   * @returns a boolean value.
   */
  isDefaultBanner(): boolean {
    this.checkUnloaded();
    return this.thumbnail()?.endsWith(
      "/_layouts/15/images/sitepagethumbnail.png"
    );
  }

  /**
   * It returns the created date of the item.
   * @param {string} [format] - The format to use when converting the date to a string.  If not
   * specified, the raw date is returned.
   * @returns The created date of the item.
   */
  public created(format?: string): string | undefined {
    this.checkUnloaded();
    if (!format) return this.data("Created");
    return formatDate(new Date(this.data("Created")), format);
  }

  /**
   * It returns the modified date of the item.
   * @param {string} [format] - The format to use for the date.  If not specified, the default format
   * is used.
   * @returns The modified date of the item.
   */
  public modified(format?: string): string | undefined {
    this.checkUnloaded();
    if (!format) return this.data("Modified");
    return this.item?.Modified
      ? formatDate(new Date(this.data("Modified")), format)
      : undefined;
  }

  /**
   * The function "date" returns the modified date in the specified format.
   * @param {string} [format] - The format parameter is an optional string that specifies the desired
   * format for the date.
   * @returns a string or undefined value.
   */
  public date(format?: string): string | undefined {
    return this.modified(format);
  }

  /**
   * The function `publishDate` returns the first published date of an object in a specified format, or
   * undefined if no format is provided.
   * @param {string} [format] - The `format` parameter is an optional string that specifies the desired
   * format for the published date. If no format is provided, the function will return the published
   * date as a string in the default format.
   * @returns a string value or undefined.
   */
  public publishDate(format?: string): string | undefined {
    this.checkUnloaded();
    if (!format) return this.data("FirstPublishedDate");
    return formatDate(new Date(this.data("FirstPublishedDate")), format);
  }

  /**
   * It returns the author of the list item.
   * @returns A new SPLUser object with the AuthorId property set to the value of the AuthorId property
   * of the current item.
   */
  public author(): SPLUser {
    this.checkUnloaded();
    const user = new SPLUser(this.data("AuthorId"));
    user.setWeb(this.web);
    return user;
  }

  socialActor() {
    this.checkUnloaded();
    return {
      ActorType: SocialActorType.Document,
      ContentUri: this.fileRef(true),
    };
  }

  /**
   * It returns a boolean value.
   * @returns An array of list items that the current user is following.
   */
  public async isFollowed(): Promise<boolean> {
    return await sp().social.isFollowed(this.socialActor());
  }

  /**
   * > Add the current item to the current user's list of followed items
   * @returns The item that was added to the list.
   */
  async follow(): Promise<SocialFollowResult> {
    return await sp().social.follow(this.socialActor());
  }

  /**
   * > This function removes the current item from the current user's list of favourite items
   * @returns The item that was unfavourited.
   */
  async unFollow(): Promise<any> {
    return await sp().social.stopFollowing(this.socialActor());
  }

  async toggleFollow() {
    const isFav = await this.isFollowed();

    try {
      if (isFav) await this.unFollow();
      else await this.follow();

      return !isFav;
    } catch (e) {
      return isFav;
    }
  }

  /**
   * "If the item is loaded, return a new SPLUser object with the EditorId property of the item."
   *
   * The first line of the function is a comment. Comments are ignored by the compiler. They are used
   * to document the code
   * @returns A new instance of the SPLUser class.
   */
  public editor(): SPLUser {
    this.checkUnloaded();
    const user = new SPLUser(this.data("EditorId"));
    user.setWeb(this.web);
    return user;
  }

  /**
   * "If the item is loaded and checked out, return a new SPLUser object for the user who checked out
   * the item."
   *
   * The first line of the function is a comment. It's a good idea to include comments in your code.
   * Comments are ignored by the compiler, but they help you and other developers understand what your
   * code is doing
   * @returns A user object
   */
  public checkedOutBy(): SPLUser | undefined {
    this.checkUnloaded();
    if (!this.data("CheckoutUserId")) return undefined;
    const user = new SPLUser(this.data("CheckoutUserId"));
    user.setWeb(this.web);
    return user;
  }

  /**
   * > This function returns a list of related items for the current item
   * @returns An array of related items.
   */
  public async related(): Promise<SPListItem[]> {
    const related: IRelatedItem[] = await this.web.relatedItems.getRelatedItems(
      this.listName,
      this.id
    );
    if (!related) return [];

    return related.map((rel) => {
      const relatedSPLItem = new SPListItem(rel.ListId, rel.ItemId);
      relatedSPLItem.setWeb(this.web);
      return relatedSPLItem;
    });
  }

  /**
   * The function "versions" retrieves and returns the versions of an item.
   * @returns a Promise that resolves to an array of IItemVersionInfo objects.
   */
  async versions(): Promise<IItemVersionInfo[]> {
    const versions = await this.query().select("Versions").expand("Versions")();
    return versions.Versions;
  }

  /**
   * The function returns the version string of the OData UI.
   * @returns The version number of the OData UI.
   */
  version(): string {
    this.checkUnloaded();
    return this.data("OData__UIVersionString");
  }

  /**
   * The function "publishedVersion" returns the first version of an item that is marked as the current
   * version.
   * @returns the first version of an item that is marked as the current version.
   */
  async publishedVersion(): Promise<IItemVersionInfo> {
    this.checkUnloaded();
    const versions = await this.versions();
    if (!versions) return undefined;
    const firstVersion = versions.reverse().find((v) => v.IsCurrentVersion);
    return firstVersion;
  }

  /**
   * It likes the page.
   * @returns The like() function is being returned.
   */
  like = async () => await this.query().like();
  /**
   * It unlikes the page.
   * @returns The page object is being returned.
   */
  unLike = async () => await this.query().unlike();

  /* The above code is defining a method called "rate" that takes a parameter "rating" of type
"RatingValues". It is an asynchronous method that awaits the result of a query and then calls the
"rate" method on the query object with the "rating" parameter. */
  rate = async (rating: RatingValues) => await this.query().rate(rating);

  /**
   * It returns the number of likes for the current post
   * @returns The number of likes on the post.
   */
  public async likes(): Promise<number> {
    const likeInfo: ILikedByInformation = await this.likeInfo();
    if (!likeInfo) return 0;

    return likeInfo.likeCount;
  }

  /**
   * It returns a boolean value that indicates whether the current user has liked the current post
   * @returns A boolean value.
   */
  public async isLiked(): Promise<boolean> {
    const likeInfo: any = await this.likeInfo();
    if (!likeInfo) return false;
    return likeInfo.isLikedByUser;
  }

  /**
   * It returns the information of the users who liked the post.
   * @returns An array of objects containing the user's name and profile picture.
   */
  public async likeInfo(): Promise<ILikedByInformation> {
    if (!this.id) return undefined;
    return await this.query().getLikedByInformation();
  }

  /**
   * The function "hasPermissions" checks if a user has a specific permission.
   * @param {PermissionKind} perm - The `perm` parameter is of type `PermissionKind`. It represents the
   * permission that we want to check if the user has.
   * @returns The function `hasPermissions` returns a Promise that resolves to a boolean value.
   */
  async hasPermissions(perm: PermissionKind): Promise<boolean> {
    return await this.query().userHasPermissions(theUser().username(), perm);
  }

  /**
   * The function returns the current user's effective permissions by querying the database.
   * @returns a Promise that resolves to an object of type IBasePermissions.
   */
  async permissions(): Promise<IBasePermissions> {
    return await this.query().getCurrentUserEffectivePermissions();
  }

  /**
   * The function "canView" checks if the user has permission to view list items.
   * @returns The function `canView()` returns a promise that resolves to a boolean value.
   */
  async canView(): Promise<boolean> {
    return await this.hasPermissions(PermissionKind.ViewListItems);
  }

  /**
   * The function "canEdit" checks if the user has permission to edit list items and returns a boolean
   * value indicating whether they can or not.
   * @returns a Promise that resolves to a boolean value.
   */
  async canEdit(): Promise<boolean> {
    return await this.hasPermissions(PermissionKind.EditListItems);
  }

  /**
   * The function "canDelete" checks if the user has permission to delete list items.
   * @returns The function `canDelete()` returns a promise that resolves to a boolean value.
   */
  async canDelete(): Promise<boolean> {
    return await this.hasPermissions(PermissionKind.DeleteListItems);
  }

  /**
   * The function "canApprove" checks if the user has the permission to approve items.
   * @returns a Promise that resolves to a boolean value.
   */
  async canApprove(): Promise<boolean> {
    return await this.hasPermissions(PermissionKind.ApproveItems);
  }
}

export { SPListItem };
