var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SPObject } from "./Object.class";
import { SPLUser } from "./User.class";
import { sp } from "../core/Celertity";
import { clearCache, isCached, setCache } from "../util/Cache";
import { formatDate } from "../util/Date";
import { Obj } from "../util/Objects";
import { emptyString } from "../util/Strings";
import { errorLog } from "../util/Debug";
import { PermissionKind, SocialActorType, } from "@pnp/sp/presets/all";
import { SPList } from "./List.class";
import { theSiteUrl } from "../core/instance/Site.instance";
import { theTenancyUrl } from "../core/instance/Tenancy.instance";
import { theUser } from "../core/instance/User.instance";
class SPListItem extends SPObject {
    constructor(listName, id) {
        super();
        this.classType = "ListItem";
        /* The above code is defining a function called "query" that returns an object of type "IItem". Inside
       the function, it is using the SharePoint Framework (SPFx) to retrieve a specific item from a
       SharePoint list based on the list name and item ID. */
        this.query = () => this.web.lists.getByTitle(this.listName).items.getById(this.id);
        /* The above code is defining a method called "object" that returns a value of type T. Inside the
      method, it checks if the "checkUnloaded" method returns true, and if so, it returns the value of the
      "item" property. */
        this.object = () => this.checkUnloaded() && this.item;
        /* The above code is defining a function called "data" in TypeScript. This function takes in a
        parameter called "key" which is of type "keyof T", where "T" is a generic type. The function
        returns a value of type "T[keyof T] | undefined | UnknownObject". */
        this.data = (key) => {
            var _a;
            if (!this.item)
                return undefined;
            return (_a = Obj(this.object())) === null || _a === void 0 ? void 0 : _a.get(key);
        };
        this.getIcon = () => "RowsGroup";
        /* The above code is written in TypeScript and defines a class method called `title`. This method
      returns a string value that is obtained from a data property called 'Title'. If the 'Title' property
      is not defined, the method returns an empty string. */
        this.title = () => this.data("Title") || "";
        /* The above code is written in TypeScript and defines a class method called `description`. This method
      returns a string value that is retrieved from a data property called 'Description' using the `data`
      method. If the 'Description' property is not found, an empty string is returned. */
        this.description = () => this.data("Description") || "";
        /* The above code is defining a TypeScript arrow function called "url". This function takes an
        optional boolean parameter "full" with a default value of false. */
        this.url = (full = false) => {
            if (this.listName === "Site Pages")
                return this.fileRef(full);
            return `${theSiteUrl(full)}/Lists/${this.listName}/DispForm.aspx?ID=${this.id}`;
        };
        this.fileRef = (full = false) => {
            return `${full ? theTenancyUrl() : ""}${this.data("FileRef")}`;
        };
        /* The above code is defining a method called `uniqueId` in a TypeScript class. This method returns a
      string value. */
        this.uniqueId = () => this.checkUnloaded() && this.item["odata.id"];
        /* The above code is defining a TypeScript arrow function called `guid`. This function returns a string
      value which is obtained from the `data` property of the current object, using the key `'GUID'`. If
      the `data` property does not exist or does not have a value for the key `'GUID'`, the function will
      return an empty string. */
        this.guid = () => this.data("GUID") || "";
        this.onClick = () => { };
        /* The above code is defining a method called `listId` in a TypeScript class. This method returns a
      string value, which is the ID of a list. The ID is obtained by calling the `id()` method on a
      private property `_list`. */
        this.listId = () => this._list.id();
        /* The above code is a TypeScript method called `contentTypeId`. It returns a string value. */
        this.contentTypeId = () => { var _a; return (this.checkUnloaded() && ((_a = this.item) === null || _a === void 0 ? void 0 : _a.ContentTypeId)) || ""; };
        /* The above code is defining an asynchronous function called `contentType`. Inside the function, it is
      using the `query` method to retrieve data from a content type. The `contentType.select('*')()` is a
      method chaining syntax that selects all fields from the content type. The `await` keyword is used to
      wait for the query to complete before returning the result. */
        this.contentType = () => __awaiter(this, void 0, void 0, function* () {
            const cached = isCached(`listitem_${this.listName}_${this.id}_contentType`);
            if (cached) {
                return cached;
            }
            const ct = yield this.query().contentType.select("*")();
            setCache(`listitem_${this.listName}_${this.id}_contentType`, ct);
            return ct;
        });
        /* The above code is defining a TypeScript function called `contentTypeName`. This function is an
        asynchronous function that returns a Promise of type string. */
        this.contentTypeName = () => __awaiter(this, void 0, void 0, function* () { return (yield this.contentType()).Name; });
        /* The above code is defining an asynchronous function called `allData` that returns a Promise of an
        object of type `UnknownObject`. Inside the function, it is using the `await` keyword to wait for
        the result of a `query()` function and then calling the `fieldValuesAsHTML()` method on the
        result. */
        this.allData = () => __awaiter(this, void 0, void 0, function* () { return yield this.query().fieldValuesAsHTML(); });
        /* The above code is defining an asynchronous function called `attachments` that returns a promise of
       an array of `IAttachmentInfo` objects. Inside the function, it is using the `await` keyword to wait
       for the result of a `query()` function call, and then calling the `attachmentFiles()` method on the
       result of that query. */
        this.attachments = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.query().attachmentFiles();
        });
        /* The above code is defining an asynchronous function called `attachment`. This function takes in
        two parameters: `name`, which is a string representing the name of the attachment file, and
        `type`, which is a string literal type that can be one of four values: 'text', 'blob', 'json', or
        'buffer'. The `type` parameter has a default value of 'text'. */
        this.attachment = (name, type = "text") => __awaiter(this, void 0, void 0, function* () {
            const q = yield this.query().attachmentFiles.getByName(name);
            if (type === "text")
                return yield q.getText();
            if (type === "blob")
                return yield q.getBlob();
            if (type === "json")
                return yield q.getJSON();
            if (type === "buffer")
                return yield q.getBuffer();
            return yield q.getText();
        });
        /* The above code is a TypeScript function called `hasAttachment` that takes a `name` parameter of
        type `string`. It is an asynchronous function that returns a `Promise<boolean>`. */
        this.hasAttachment = (name) => __awaiter(this, void 0, void 0, function* () {
            const attachments = yield this.attachments();
            if (!attachments)
                return false;
            return !!attachments.find((a) => a.FileName === name);
        });
        /* The above code is defining an asynchronous function called "delete" that returns a Promise with a
       void type. Inside the function, it is using the "query" method to delete data. The "await" keyword
       is used to wait for the deletion operation to complete before moving on. */
        this.delete = () => __awaiter(this, void 0, void 0, function* () {
            yield this.query().delete();
        });
        /* The above code is defining an asynchronous function called `updateAttachment`. This function takes
        in two parameters: `name` (a string) and `content` (a string). */
        this.updateAttachment = (name, content) => __awaiter(this, void 0, void 0, function* () {
            return yield this.query().attachmentFiles.add(name, content);
        });
        /* The above code is a TypeScript function called `addAttachment`. It takes in two parameters: `name`
       (a string) and `content` (a string or a File object). */
        this.addAttachment = (name, content) => __awaiter(this, void 0, void 0, function* () {
            name = name.replace(/[~#%&*{}\\:<>?/+|]/gi, "");
            name = name.replace(" ", "_");
            const fileExists = yield this.hasAttachment(name);
            if (!!fileExists) {
                yield this.deleteAttachment(name);
            }
            return yield this.query().attachmentFiles.add(name, content);
        });
        /* The above code is defining an asynchronous function called `deleteAttachment` that takes a
       parameter `name` of type string. This function returns a Promise that resolves to void. */
        this.deleteAttachment = (name) => __awaiter(this, void 0, void 0, function* () {
            return yield this.query().attachmentFiles.getByName(name).delete();
        });
        /* The above code is a TypeScript function that defines a method called `tags`. This method returns an
      array of strings. However, the implementation of the method is empty, as there are no statements or
      logic inside the method body. */
        this.tags = () => [];
        /**
         * It likes the page.
         * @returns The like() function is being returned.
         */
        this.like = () => __awaiter(this, void 0, void 0, function* () { return yield this.query().like(); });
        /**
         * It unlikes the page.
         * @returns The page object is being returned.
         */
        this.unLike = () => __awaiter(this, void 0, void 0, function* () { return yield this.query().unlike(); });
        /* The above code is defining a method called "rate" that takes a parameter "rating" of type
      "RatingValues". It is an asynchronous method that awaits the result of a query and then calls the
      "rate" method on the query object with the "rating" parameter. */
        this.rate = (rating) => __awaiter(this, void 0, void 0, function* () { return yield this.query().rate(rating); });
        this.listName = listName;
        this.id = id;
    }
    /**
     * This gets overridden by child classes with publishing features
     * @returns true
     */
    isPublished() {
        return true;
    }
    /**
     * > This function gets the list item from the SharePoint list
     * @returns The item is being returned.
     */
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const { listName, id } = this;
            if (this.loaded)
                return this;
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
            const itemQuery = this.query().select(`${["*", SPListItem.extraFields].join(",")}`);
            const item = yield itemQuery();
            this.item = item;
            setCache(`listitem_${listName}_${id}`, this.item);
            if (this.item) {
                this.loaded = true;
            }
            return this;
        });
    }
    /**
     * The `refresh` function clears the cache, sets the `loaded` property to false, and then calls the
     * `get` function to retrieve the updated item.
     * @returns a Promise that resolves to an SPListItem of type T.
     */
    refresh() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            clearCache(`listitem_${this.listName}_${this.id}`);
            try {
                this.loaded = false;
                this.item = undefined;
                return yield this.get();
            }
            catch (e) {
                this.loaded = true;
                errorLog({
                    component: "ListItem.class:Refresh",
                    message: "Failed to refresh item",
                    type: "error",
                    role: "user",
                    severity: "low",
                    data: { e, id: this.id, item: this.item, url: (_a = this.item) === null || _a === void 0 ? void 0 : _a.FileRef },
                });
            }
        });
    }
    editItemUrl(classic = false) {
        if (this.listName === "Site Pages") {
            return `${this.fileRef()}?Mode=Edit`;
        }
        const siteUrl = theSiteUrl();
        const formType = "EditForm.aspx";
        return `${siteUrl}/Lists/${this.listName}/${formType}?ID=${this.id}${classic ? "&IsDlg=1" : ""}`;
    }
    /**
     * The list() function returns an instance of SPList<T> or creates a new instance if it doesn't
     * exist.
     * @returns The method is returning an instance of the SPList<T> class.
     */
    list() {
        return (this._list || (this._list = new SPList(this.listName)));
    }
    setList(list) {
        this._list = list;
    }
    /**
     * It initializes the item and sets the loaded property to true.
     * @param {any} item - any - This is the item that you want to load into the list item.
     * @returns The SPListItem object
     */
    init(item, web) {
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
    isSame(item) {
        if (!item || !item.item)
            return false;
        if (!this.item)
            return false;
        return this.url() === item.url();
    }
    /**
     * It takes an object of properties, merges them with the existing item, and then updates the item in
     * SharePoint
     * @param {any} props - any - This is the properties that you want to update.
     * @returns The updated item
     */
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            this.item = Object.assign(Object.assign({}, this.item), props);
            yield this.web.lists
                .getByTitle(this.listName)
                .items.getById(this.id)
                .update(props);
            yield this.refresh();
            return this;
        });
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
    preview(resolution = 6) {
        this.checkUnloaded();
        const path = this.url();
        if (!path)
            return undefined;
        const url = `/_layouts/15/getpreview.ashx?resolution=${resolution}&path=${path}`;
        return url;
    }
    /**
     * The `thumbnail` function returns the banner image as a string or undefined.
     * @returns The `thumbnail` method is returning a value of type `string` or `undefined`.
     */
    thumbnail() {
        return this.banner();
    }
    /**
     * If the item is loaded, return the banner image URL
     * @returns The banner image url
     */
    banner() {
        var _a;
        this.checkUnloaded();
        const banner = this.data("BannerImageUrl");
        return typeof banner === "string"
            ? banner
            : (_a = this.data("BannerImageUrl")) === null || _a === void 0 ? void 0 : _a.Url;
    }
    /**
     * The function checks if the current banner is the default banner.
     * @returns a boolean value.
     */
    isDefaultBanner() {
        var _a;
        this.checkUnloaded();
        return (_a = this.thumbnail()) === null || _a === void 0 ? void 0 : _a.endsWith("/_layouts/15/images/sitepagethumbnail.png");
    }
    /**
     * It returns the created date of the item.
     * @param {string} [format] - The format to use when converting the date to a string.  If not
     * specified, the raw date is returned.
     * @returns The created date of the item.
     */
    created(format) {
        this.checkUnloaded();
        if (!format)
            return this.data("Created");
        return formatDate(new Date(this.data("Created")), format);
    }
    /**
     * It returns the modified date of the item.
     * @param {string} [format] - The format to use for the date.  If not specified, the default format
     * is used.
     * @returns The modified date of the item.
     */
    modified(format) {
        var _a;
        this.checkUnloaded();
        if (!format)
            return this.data("Modified");
        return ((_a = this.item) === null || _a === void 0 ? void 0 : _a.Modified)
            ? formatDate(new Date(this.data("Modified")), format)
            : undefined;
    }
    /**
     * The function "date" returns the modified date in the specified format.
     * @param {string} [format] - The format parameter is an optional string that specifies the desired
     * format for the date.
     * @returns a string or undefined value.
     */
    date(format) {
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
    publishDate(format) {
        this.checkUnloaded();
        if (!format)
            return this.data("FirstPublishedDate");
        return formatDate(new Date(this.data("FirstPublishedDate")), format);
    }
    /**
     * It returns the author of the list item.
     * @returns A new SPLUser object with the AuthorId property set to the value of the AuthorId property
     * of the current item.
     */
    author() {
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
    isFollowed() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield sp().social.isFollowed(this.socialActor());
        });
    }
    /**
     * > Add the current item to the current user's list of followed items
     * @returns The item that was added to the list.
     */
    follow() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield sp().social.follow(this.socialActor());
        });
    }
    /**
     * > This function removes the current item from the current user's list of favourite items
     * @returns The item that was unfavourited.
     */
    unFollow() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield sp().social.stopFollowing(this.socialActor());
        });
    }
    toggleFollow() {
        return __awaiter(this, void 0, void 0, function* () {
            const isFav = yield this.isFollowed();
            try {
                if (isFav)
                    yield this.unFollow();
                else
                    yield this.follow();
                return !isFav;
            }
            catch (e) {
                return isFav;
            }
        });
    }
    /**
     * "If the item is loaded, return a new SPLUser object with the EditorId property of the item."
     *
     * The first line of the function is a comment. Comments are ignored by the compiler. They are used
     * to document the code
     * @returns A new instance of the SPLUser class.
     */
    editor() {
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
    checkedOutBy() {
        this.checkUnloaded();
        if (!this.data("CheckoutUserId"))
            return undefined;
        const user = new SPLUser(this.data("CheckoutUserId"));
        user.setWeb(this.web);
        return user;
    }
    /**
     * > This function returns a list of related items for the current item
     * @returns An array of related items.
     */
    related() {
        return __awaiter(this, void 0, void 0, function* () {
            const related = yield this.web.relatedItems.getRelatedItems(this.listName, this.id);
            if (!related)
                return [];
            return related.map((rel) => {
                const relatedSPLItem = new SPListItem(rel.ListId, rel.ItemId);
                relatedSPLItem.setWeb(this.web);
                return relatedSPLItem;
            });
        });
    }
    /**
     * The function "versions" retrieves and returns the versions of an item.
     * @returns a Promise that resolves to an array of IItemVersionInfo objects.
     */
    versions() {
        return __awaiter(this, void 0, void 0, function* () {
            const versions = yield this.query().select("Versions").expand("Versions")();
            return versions.Versions;
        });
    }
    /**
     * The function returns the version string of the OData UI.
     * @returns The version number of the OData UI.
     */
    version() {
        this.checkUnloaded();
        return this.data("OData__UIVersionString");
    }
    /**
     * The function "publishedVersion" returns the first version of an item that is marked as the current
     * version.
     * @returns the first version of an item that is marked as the current version.
     */
    publishedVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkUnloaded();
            const versions = yield this.versions();
            if (!versions)
                return undefined;
            const firstVersion = versions.reverse().find((v) => v.IsCurrentVersion);
            return firstVersion;
        });
    }
    /**
     * It returns the number of likes for the current post
     * @returns The number of likes on the post.
     */
    likes() {
        return __awaiter(this, void 0, void 0, function* () {
            const likeInfo = yield this.likeInfo();
            if (!likeInfo)
                return 0;
            return likeInfo.likeCount;
        });
    }
    /**
     * It returns a boolean value that indicates whether the current user has liked the current post
     * @returns A boolean value.
     */
    isLiked() {
        return __awaiter(this, void 0, void 0, function* () {
            const likeInfo = yield this.likeInfo();
            if (!likeInfo)
                return false;
            return likeInfo.isLikedByUser;
        });
    }
    /**
     * It returns the information of the users who liked the post.
     * @returns An array of objects containing the user's name and profile picture.
     */
    likeInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id)
                return undefined;
            return yield this.query().getLikedByInformation();
        });
    }
    /**
     * The function "hasPermissions" checks if a user has a specific permission.
     * @param {PermissionKind} perm - The `perm` parameter is of type `PermissionKind`. It represents the
     * permission that we want to check if the user has.
     * @returns The function `hasPermissions` returns a Promise that resolves to a boolean value.
     */
    hasPermissions(perm) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.query().userHasPermissions(theUser().username(), perm);
        });
    }
    /**
     * The function returns the current user's effective permissions by querying the database.
     * @returns a Promise that resolves to an object of type IBasePermissions.
     */
    permissions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.query().getCurrentUserEffectivePermissions();
        });
    }
    /**
     * The function "canView" checks if the user has permission to view list items.
     * @returns The function `canView()` returns a promise that resolves to a boolean value.
     */
    canView() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.hasPermissions(PermissionKind.ViewListItems);
        });
    }
    /**
     * The function "canEdit" checks if the user has permission to edit list items and returns a boolean
     * value indicating whether they can or not.
     * @returns a Promise that resolves to a boolean value.
     */
    canEdit() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.hasPermissions(PermissionKind.EditListItems);
        });
    }
    /**
     * The function "canDelete" checks if the user has permission to delete list items.
     * @returns The function `canDelete()` returns a promise that resolves to a boolean value.
     */
    canDelete() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.hasPermissions(PermissionKind.DeleteListItems);
        });
    }
    /**
     * The function "canApprove" checks if the user has the permission to approve items.
     * @returns a Promise that resolves to a boolean value.
     */
    canApprove() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.hasPermissions(PermissionKind.ApproveItems);
        });
    }
}
SPListItem.extraFields = [
    "FileRef",
    "FileLeafRef",
    "UniqueId",
    "ContentType/Name",
];
export { SPListItem };
//# sourceMappingURL=ListItem.class.js.map