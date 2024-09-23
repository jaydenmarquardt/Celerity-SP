var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { emptyString } from "../util/Strings";
import { SPListItem } from "./ListItem.class";
import { errorLog } from "../util/Debug";
import { setCache } from "../util/Cache";
import { SPDocumentLibrary } from "./DocumentLibrary";
import { theSiteUrl } from "../core/instance/Site.instance";
export class SPFileItem extends SPListItem {
    constructor() {
        super(...arguments);
        this.classType = "FileItem";
        this.url = (full = false) => {
            if (this.listName === "Site Pages")
                return this.fileRef(full);
            return `${theSiteUrl(full)}/${this.listName}/Forms/DispForm.aspx?ID=${this.id}`;
        };
        this.title = () => this.data("Title") || this.data("FileLeafRef");
        /* The `object` method is a function that returns an object of type `UnknownObject`. It combines the
        properties of `this.item` and `this._file` into a single object using the spread operator (`...`).
        If `this.item` or `this._file` is `null` or `undefined`, it will default to an empty object `{}`.
        The purpose of this method is to provide a convenient way to access all the properties of
        `this.item` and `this._file` in a single object. */
        this.object = () => {
            this.checkUnloaded();
            return Object.assign(Object.assign({}, (this.item || {})), (this._file || {}));
        };
    }
    /**
     * The function returns a file object based on the server-relative path of the file.
     * @returns an object of type IFile.
     */
    fileQuery() {
        if (this.isFolder()) {
            return this.web.getFolderByServerRelativePath(this.fileRef());
        }
        return this.web.getFileByServerRelativePath(this.fileRef());
    }
    previousUrl() {
        var _a;
        return ((_a = this.item) === null || _a === void 0 ? void 0 : _a.OData__CopySource) || this.url();
    }
    editItemUrl(classic = false) {
        if (this.listName === "Site Pages") {
            return `${this.fileRef()}?Mode=Edit`;
        }
        const siteUrl = theSiteUrl();
        const formType = "EditForm.aspx";
        return `${siteUrl}/${this.listName}/Forms/${formType}?ID=${this.id}${classic ? "&IsDlg=1" : ""}`;
    }
    list() {
        return (this._list ||
            (this._list = new SPDocumentLibrary(this.listName)));
    }
    /**
     * The function `file` is an asynchronous function that returns information about a file item, and if
     * the file is not already loaded, it loads the file and sets the `loadedFile` flag to true.
     * @returns a Promise that resolves to an object of type IFileItemInfo.
     */
    file() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.loadedFile)
                return this._file;
            try {
                if (!this.loaded)
                    yield this.get();
                this._file = yield this.fileQuery().select("*")();
            }
            catch (e) {
                errorLog({
                    component: "FileItem.class:Load",
                    message: "Failed to load file item",
                    type: "error",
                    role: "user",
                    severity: "low",
                    data: { e, id: this.id },
                });
            }
            if (this._file)
                this.loadedFile = true;
            return this._file;
        });
    }
    //Moving cross sites will not update links
    //Moving cross sites will not work unless custom scripts enabled
    // Set-PnPSite -Identity  https://<tenant>/sites/<site> -DenyAddAndCustomizePages $false
    move(destinationPath, newWeb, skipRefresh = true) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const oldWeb = this.web;
            newWeb = newWeb ? newWeb : this.web;
            const existingUrl = ((_a = this.fileRef()) === null || _a === void 0 ? void 0 : _a.startsWith("/"))
                ? this.fileRef()
                : `/${this.fileRef()}`;
            if (!this.loadedFile)
                yield this.file();
            const newUrl = `${destinationPath}/${this.fileName()}`;
            const ifile = this.isFolder()
                ? oldWeb.getFolderByServerRelativePath(existingUrl)
                : oldWeb.getFileByServerRelativePath(existingUrl);
            yield ifile.moveByPath(newUrl, true, {
                KeepBoth: false,
                RetainEditorAndModifiedOnMove: true,
                ShouldBypassSharedLocks: true,
            });
            const newIFile = this.isFolder()
                ? newWeb.getFolderByServerRelativePath(newUrl)
                : newWeb.getFileByServerRelativePath(newUrl);
            const file = yield newIFile.select("*")();
            const newIItem = yield newIFile.getItem();
            const newItemDetails = yield newIItem.getParentInfos();
            const newItem = yield newIItem.select("*", "FileRef")();
            this.listName = newItemDetails.ParentList.Title;
            this._list = undefined;
            this.id = newItem.Id;
            if (this.item.FileRef !== file.ServerRelativeUrl) {
                yield this.update({
                    FileRef: file.ServerRelativeUrl,
                });
            }
            this.item.FileRef = file.ServerRelativeUrl;
            setCache(`listitem_${this.listName}_${this.id}`, this.item);
            this.setWeb(newWeb);
            if (!skipRefresh)
                yield this.refresh();
            return file.ServerRelativeUrl;
        });
    }
    /**
     * The function returns the name of the file.
     * @returns a string, specifically the name of a file.
     */
    fileName() {
        var _a, _b;
        this.checkUnloaded();
        return ((_a = this.item) === null || _a === void 0 ? void 0 : _a.FileLeafRef) || ((_b = this._file) === null || _b === void 0 ? void 0 : _b.Name);
    }
    fileType() {
        var _a;
        this.checkUnloaded();
        const names = (_a = this.fileName()) === null || _a === void 0 ? void 0 : _a.split(".");
        const fileType = names === null || names === void 0 ? void 0 : names[names.length - 1];
        return fileType;
    }
    /**
     * The size function returns the length of a file.
     * @returns The size of the file as a number.
     */
    size() {
        this.checkUnloaded();
        if (this.isFolder())
            return this._file.ItemCount; //TODO full size
        return Number(this._file.Length);
    }
    /**
     * The `checkIn` function is an asynchronous function that calls the `checkin` method of the
     * `fileQuery` object with an optional message and type parameter.
     * @param {string} [message] - The `message` parameter is an optional string that represents a
     * message or comment associated with the check-in. It can be used to provide additional information
     * or context about the check-in.
     * @param {CheckinType} [type] - The `type` parameter is an optional parameter that specifies the
     * type of check-in. It is of type `CheckinType`.
     * @returns a Promise that resolves to void.
     */
    checkIn(message, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isFolder())
                return;
            return yield this.fileQuery().checkin(message, type);
        });
    }
    /**
     * The `checkOut` function is an asynchronous function that calls the `checkout` method of the
     * `fileQuery` object and returns a promise.
     * @returns a Promise that resolves to void.
     */
    checkOut() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isFolder())
                return;
            return yield this.fileQuery().checkout();
        });
    }
    /**
     * The function `undoCheckOut` is an asynchronous function that calls the `undoCheckout` method of
     * the `fileQuery` object and returns a Promise that resolves to `void`.
     * @returns The `undoCheckOut` function returns a Promise that resolves to `void`.
     */
    undoCheckOut() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isFolder())
                return;
            return yield this.fileQuery().undoCheckout();
        });
    }
    /**
     * The `approve` function sets the moderation status of an item to approved and calls the `approve`
     * function of the `fileQuery` object.
     * @param {string} [message] - The `message` parameter is an optional string that represents a
     * message or comment to be associated with the approval action. It can be used to provide additional
     * information or context for the approval.
     * @returns The `approve` function returns a Promise that resolves to `void`.
     */
    approve(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isFolder())
                return;
            this.item.OData__ModerationStatus = 0;
            return yield this.fileQuery().approve(message);
        });
    }
    /**
     * The `deny` function sets the moderation status of an item to "denied" and calls the `deny` function
     * of the `fileQuery` object.
     * @param {string} [message] - The `message` parameter is an optional string that represents the
     * reason for denying the item. It can be used to provide additional information or feedback to the
     * user regarding the denial of the item.
     * @returns The `deny` method is returning a promise that resolves to `void`.
     */
    deny(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isFolder())
                return;
            this.item.OData__ModerationStatus = 1;
            return yield this.fileQuery().deny(message);
        });
    }
    /**
     * The function checks if the moderation status of a data object is published.
     * @returns a boolean value.
     */
    isPublished() {
        return (this.data("OData__ModerationStatus") || 0) === 0;
    }
    /**
     * The function checks if the moderation status of the data is set to "draft".
     * @returns A boolean value is being returned.
     */
    isDraft() {
        return this.data("OData__ModerationStatus") === 3;
    }
    /**
     * The function checks if the moderation status is rejected.
     * @returns A boolean value indicating whether the moderation status is rejected.
     */
    isRejected() {
        return this.data("OData__ModerationStatus") === 1;
    }
    /**
     * The function checks if the moderation status of a data object is pending approval.
     * @returns A boolean value indicating whether the moderation status of the data is pending approval.
     */
    isPendingApproval() {
        return this.data("OData__ModerationStatus") === 2;
    }
    /**
     * The function sets the moderation status of an item to 0 and then publishes it.
     * @param {string} [message] - The `message` parameter is an optional string that represents the
     * message to be included when publishing the item.
     * @returns The `publish` method returns a `Promise<void>`.
     */
    publish(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isFolder())
                return;
            this.item.OData__ModerationStatus = 0;
            return yield this.fileQuery().publish(message);
        });
    }
    /**
     * The function unPublish sets the moderation status of an item to 3 and then calls the unpublish
     * method of the fileQuery object.
     * @param {string} [message] - The `message` parameter is an optional string that represents the
     * reason or message for unpublishing the item.
     * @returns The `unPublish` function returns a `Promise` that resolves to `void`.
     */
    unPublish(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isFolder())
                return;
            this.item.OData__ModerationStatus = 3;
            return yield this.fileQuery().unpublish(message);
        });
    }
    /**
     * The `recycle` function is an asynchronous function that calls the `recycle` method of the
     * `fileQuery` object and returns a promise that resolves to a string.
     * @returns The `recycle()` method is returning a Promise that resolves to a string.
     */
    recycle() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.fileQuery().recycle();
        });
    }
    /**
     * The `deleteFile` function deletes a file using a file query.
     * @returns The `deleteFile` function is returning a `Promise` that resolves to `void`.
     */
    deleteFile() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.fileQuery().delete();
        });
    }
    /**
     * The function checks if the object is a folder based on its file system object type.
     * @returns A boolean value is being returned.
     */
    isFolder() {
        return (this.data("FileSystemObjectType") === 1 || this.data("FSObjType") === 1);
    }
    /**
     * The function `refresh` is an asynchronous function that refreshes a file and returns a
     * `SPFileItem` object.
     * @returns The function `refresh()` is returning a Promise that resolves to an object of type
     * `SPFileItem<T>`.
     */
    refresh() {
        const _super = Object.create(null, {
            refresh: { get: () => super.refresh }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.refresh.call(this);
            try {
                this.loadedFile = false;
                this._file = undefined;
                yield this.file();
            }
            catch (e) {
                this.loadedFile = true;
                errorLog({
                    component: "FileItem.class:Refresh",
                    message: "Failed to refresh file item",
                    type: "error",
                    role: "user",
                    severity: "low",
                    data: { e, id: this.id },
                });
            }
            return this;
        });
    }
    /**
     * The function "approvalStatus" returns the approval status of a document based on its moderation
     * status.
     * @returns an ApprovalStatus, which is a string value representing the approval status of a certain
     * item. The possible values for ApprovalStatus are 'Approved', 'Declined', 'Pending', 'Draft', and
     * 'Scheduled'. The function checks the value of the 'OData__ModerationStatus' property and returns
     * the corresponding ApprovalStatus value. If the 'OData__ModerationStatus'
     */
    approvalStatus() {
        this.checkUnloaded();
        return ["Approved", "Declined", "Pending", "Draft", "Scheduled"][this.data("OData__ModerationStatus") || 0];
    }
    /**
     * The function `approvalComments()` returns the moderation comments if the item is published,
     * otherwise it returns the check-in comments.
     * @returns either the value of the 'OData__ModerationComments' property or the value of the
     * 'CheckInComment' property, depending on whether the 'CheckInComment' property is empty or not.
     */
    approvalComments() {
        this.checkUnloaded();
        //If published it will use OData__ModerationComments
        //if draft it will use CheckInComment
        return emptyString(this.data("CheckInComment"))
            ? this.data("OData__ModerationComments")
            : this.data("CheckInComment");
    }
}
//# sourceMappingURL=FileItem.class.js.map