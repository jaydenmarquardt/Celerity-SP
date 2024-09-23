import { emptyString } from "../util/Strings";
import { UnknownObject } from "../util/Util.types";
import { SPListItem } from "./ListItem.class";
import { CheckinType, IFile } from "@pnp/sp/files";
import { errorLog } from "../util/Debug";
import { IWeb } from "@pnp/sp/webs";

import type { IFolder, IFolderInfo } from "@pnp/sp/folders/types";
import { setCache } from "../util/Cache";
import { SPDocumentLibrary } from "./DocumentLibrary";
import type { IFileItemInfo } from "./types/FileItem.types";
import { theSiteUrl } from "../core/instance/Site.instance";
import type { ApprovalStatus } from "./types/ListItem.types";

export class SPFileItem<
  T extends IFileItemInfo = IFileItemInfo
> extends SPListItem<T> {
  classType: string = "FileItem";

  public _file: IFileItemInfo & IFolderInfo;
  loadedFile: boolean;

  /**
   * The function returns a file object based on the server-relative path of the file.
   * @returns an object of type IFile.
   */
  fileQuery(): IFile & IFolder {
    if (this.isFolder()) {
      return this.web.getFolderByServerRelativePath(this.fileRef()) as IFolder &
        IFile;
    }
    return this.web.getFileByServerRelativePath(this.fileRef()) as IFolder &
      IFile;
  }

  url = (full: boolean = false): string => {
    if (this.listName === "Site Pages") return this.fileRef(full);
    return `${theSiteUrl(full)}/${this.listName}/Forms/DispForm.aspx?ID=${
      this.id
    }`;
  };

  previousUrl() {
    return this.item?.OData__CopySource || this.url();
  }

  editItemUrl(classic: boolean = false) {
    if (this.listName === "Site Pages") {
      return `${this.fileRef()}?Mode=Edit`;
    }
    const siteUrl = theSiteUrl();
    const formType = "EditForm.aspx";
    return `${siteUrl}/${this.listName}/Forms/${formType}?ID=${this.id}${
      classic ? "&IsDlg=1" : ""
    }`;
  }

  list(): SPDocumentLibrary<SPFileItem<T>, T> {
    return (
      this._list ||
      (this._list = new SPDocumentLibrary<SPFileItem<T>, T>(this.listName))
    );
  }

  title = (): string => this.data("Title") || this.data("FileLeafRef");

  /**
   * The function `file` is an asynchronous function that returns information about a file item, and if
   * the file is not already loaded, it loads the file and sets the `loadedFile` flag to true.
   * @returns a Promise that resolves to an object of type IFileItemInfo.
   */
  async file(): Promise<IFileItemInfo | IFolderInfo> {
    if (this.loadedFile) return this._file;

    try {
      if (!this.loaded) await this.get();
      this._file = await this.fileQuery().select("*")();
    } catch (e) {
      errorLog({
        component: "FileItem.class:Load",
        message: "Failed to load file item",
        type: "error",
        role: "user",
        severity: "low",
        data: { e, id: this.id },
      });
    }
    if (this._file) this.loadedFile = true;
    return this._file;
  }

  //Moving cross sites will not update links
  //Moving cross sites will not work unless custom scripts enabled
  // Set-PnPSite -Identity  https://<tenant>/sites/<site> -DenyAddAndCustomizePages $false
  async move(destinationPath: string, newWeb?: IWeb, skipRefresh = true) {
    const oldWeb = this.web;
    newWeb = newWeb ? newWeb : this.web;

    const existingUrl = this.fileRef()?.startsWith("/")
      ? this.fileRef()
      : `/${this.fileRef()}`;
    if (!this.loadedFile) await this.file();
    const newUrl = `${destinationPath}/${this.fileName()}`;
    const ifile = this.isFolder()
      ? oldWeb.getFolderByServerRelativePath(existingUrl)
      : oldWeb.getFileByServerRelativePath(existingUrl);

    await ifile.moveByPath(newUrl, true, {
      KeepBoth: false,
      RetainEditorAndModifiedOnMove: true,
      ShouldBypassSharedLocks: true,
    });
    const newIFile: IFile | IFolder = this.isFolder()
      ? newWeb.getFolderByServerRelativePath(newUrl)
      : newWeb.getFileByServerRelativePath(newUrl);
    const file = await newIFile.select("*")();
    const newIItem = await newIFile.getItem();
    const newItemDetails = await newIItem.getParentInfos();
    const newItem = await newIItem.select("*", "FileRef")();

    this.listName = newItemDetails.ParentList.Title;
    this._list = undefined;
    this.id = newItem.Id;
    if (this.item.FileRef !== file.ServerRelativeUrl) {
      await this.update({
        FileRef: file.ServerRelativeUrl,
      } as UnknownObject);
    }

    this.item.FileRef = file.ServerRelativeUrl;

    setCache(`listitem_${this.listName}_${this.id}`, this.item);

    this.setWeb(newWeb);
    if (!skipRefresh) await this.refresh();
    return file.ServerRelativeUrl;
  }

  /**
   * The function returns the name of the file.
   * @returns a string, specifically the name of a file.
   */
  fileName(): string {
    this.checkUnloaded();

    return this.item?.FileLeafRef || this._file?.Name;
  }

  fileType(): string {
    this.checkUnloaded();
    const names = this.fileName()?.split(".");
    const fileType = names?.[names.length - 1];
    return fileType;
  }

  /**
   * The size function returns the length of a file.
   * @returns The size of the file as a number.
   */
  size(): number {
    this.checkUnloaded();
    if (this.isFolder()) return this._file.ItemCount; //TODO full size
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
  async checkIn(message?: string, type?: CheckinType): Promise<void> {
    if (this.isFolder()) return;
    return await this.fileQuery().checkin(message, type);
  }

  /**
   * The `checkOut` function is an asynchronous function that calls the `checkout` method of the
   * `fileQuery` object and returns a promise.
   * @returns a Promise that resolves to void.
   */
  async checkOut(): Promise<void> {
    if (this.isFolder()) return;

    return await this.fileQuery().checkout();
  }

  /**
   * The function `undoCheckOut` is an asynchronous function that calls the `undoCheckout` method of
   * the `fileQuery` object and returns a Promise that resolves to `void`.
   * @returns The `undoCheckOut` function returns a Promise that resolves to `void`.
   */
  async undoCheckOut(): Promise<void> {
    if (this.isFolder()) return;

    return await this.fileQuery().undoCheckout();
  }

  /**
   * The `approve` function sets the moderation status of an item to approved and calls the `approve`
   * function of the `fileQuery` object.
   * @param {string} [message] - The `message` parameter is an optional string that represents a
   * message or comment to be associated with the approval action. It can be used to provide additional
   * information or context for the approval.
   * @returns The `approve` function returns a Promise that resolves to `void`.
   */
  async approve(message?: string): Promise<void> {
    if (this.isFolder()) return;

    this.item.OData__ModerationStatus = 0;
    return await this.fileQuery().approve(message);
  }

  /**
   * The `deny` function sets the moderation status of an item to "denied" and calls the `deny` function
   * of the `fileQuery` object.
   * @param {string} [message] - The `message` parameter is an optional string that represents the
   * reason for denying the item. It can be used to provide additional information or feedback to the
   * user regarding the denial of the item.
   * @returns The `deny` method is returning a promise that resolves to `void`.
   */
  async deny(message?: string): Promise<void> {
    if (this.isFolder()) return;

    this.item.OData__ModerationStatus = 1;
    return await this.fileQuery().deny(message);
  }

  /**
   * The function checks if the moderation status of a data object is published.
   * @returns a boolean value.
   */
  isPublished(): boolean {
    return (this.data("OData__ModerationStatus") || 0) === 0;
  }

  /**
   * The function checks if the moderation status of the data is set to "draft".
   * @returns A boolean value is being returned.
   */
  isDraft(): boolean {
    return this.data("OData__ModerationStatus") === 3;
  }

  /**
   * The function checks if the moderation status is rejected.
   * @returns A boolean value indicating whether the moderation status is rejected.
   */
  isRejected(): boolean {
    return this.data("OData__ModerationStatus") === 1;
  }

  /**
   * The function checks if the moderation status of a data object is pending approval.
   * @returns A boolean value indicating whether the moderation status of the data is pending approval.
   */
  isPendingApproval(): boolean {
    return this.data("OData__ModerationStatus") === 2;
  }

  /**
   * The function sets the moderation status of an item to 0 and then publishes it.
   * @param {string} [message] - The `message` parameter is an optional string that represents the
   * message to be included when publishing the item.
   * @returns The `publish` method returns a `Promise<void>`.
   */
  async publish(message?: string): Promise<void> {
    if (this.isFolder()) return;

    this.item.OData__ModerationStatus = 0;
    return await this.fileQuery().publish(message);
  }

  /**
   * The function unPublish sets the moderation status of an item to 3 and then calls the unpublish
   * method of the fileQuery object.
   * @param {string} [message] - The `message` parameter is an optional string that represents the
   * reason or message for unpublishing the item.
   * @returns The `unPublish` function returns a `Promise` that resolves to `void`.
   */
  async unPublish(message?: string): Promise<void> {
    if (this.isFolder()) return;

    this.item.OData__ModerationStatus = 3;
    return await this.fileQuery().unpublish(message);
  }

  /**
   * The `recycle` function is an asynchronous function that calls the `recycle` method of the
   * `fileQuery` object and returns a promise that resolves to a string.
   * @returns The `recycle()` method is returning a Promise that resolves to a string.
   */
  async recycle(): Promise<string> {
    return await this.fileQuery().recycle();
  }

  /**
   * The `deleteFile` function deletes a file using a file query.
   * @returns The `deleteFile` function is returning a `Promise` that resolves to `void`.
   */
  async deleteFile(): Promise<void> {
    return await this.fileQuery().delete();
  }

  /**
   * The function checks if the object is a folder based on its file system object type.
   * @returns A boolean value is being returned.
   */
  isFolder(): boolean {
    return (
      this.data("FileSystemObjectType") === 1 || this.data("FSObjType") === 1
    );
  }

  /* The `object` method is a function that returns an object of type `UnknownObject`. It combines the
  properties of `this.item` and `this._file` into a single object using the spread operator (`...`).
  If `this.item` or `this._file` is `null` or `undefined`, it will default to an empty object `{}`.
  The purpose of this method is to provide a convenient way to access all the properties of
  `this.item` and `this._file` in a single object. */
  object = (): UnknownObject => {
    this.checkUnloaded();
    return {
      ...(this.item || {}),
      ...(this._file || {}),
    };
  };

  /**
   * The function `refresh` is an asynchronous function that refreshes a file and returns a
   * `SPFileItem` object.
   * @returns The function `refresh()` is returning a Promise that resolves to an object of type
   * `SPFileItem<T>`.
   */
  async refresh(): Promise<SPFileItem<T>> {
    await super.refresh();
    try {
      this.loadedFile = false;
      this._file = undefined;

      await this.file();
    } catch (e) {
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
  }

  /**
   * The function "approvalStatus" returns the approval status of a document based on its moderation
   * status.
   * @returns an ApprovalStatus, which is a string value representing the approval status of a certain
   * item. The possible values for ApprovalStatus are 'Approved', 'Declined', 'Pending', 'Draft', and
   * 'Scheduled'. The function checks the value of the 'OData__ModerationStatus' property and returns
   * the corresponding ApprovalStatus value. If the 'OData__ModerationStatus'
   */
  approvalStatus(): ApprovalStatus {
    this.checkUnloaded();
    return ["Approved", "Declined", "Pending", "Draft", "Scheduled"][
      this.data("OData__ModerationStatus") || 0
    ] as ApprovalStatus;
  }

  /**
   * The function `approvalComments()` returns the moderation comments if the item is published,
   * otherwise it returns the check-in comments.
   * @returns either the value of the 'OData__ModerationComments' property or the value of the
   * 'CheckInComment' property, depending on whether the 'CheckInComment' property is empty or not.
   */
  approvalComments(): UnknownObject {
    this.checkUnloaded();
    //If published it will use OData__ModerationComments
    //if draft it will use CheckInComment
    return emptyString(this.data("CheckInComment"))
      ? this.data("OData__ModerationComments")
      : this.data("CheckInComment");
  }
}
