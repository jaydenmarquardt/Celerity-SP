import { UnknownObject } from "../util/Util.types";
import { SPListItem } from "./ListItem.class";
import { CheckinType, IFile } from "@pnp/sp/files";
import { IWeb } from "@pnp/sp/webs";
import type { IFolder, IFolderInfo } from "@pnp/sp/folders/types";
import { SPDocumentLibrary } from "./DocumentLibrary";
import type { IFileItemInfo } from "./types/FileItem.types";
import type { ApprovalStatus } from "./types/ListItem.types";
export declare class SPFileItem<T extends IFileItemInfo = IFileItemInfo> extends SPListItem<T> {
    classType: string;
    _file: IFileItemInfo & IFolderInfo;
    loadedFile: boolean;
    /**
     * The function returns a file object based on the server-relative path of the file.
     * @returns an object of type IFile.
     */
    fileQuery(): IFile & IFolder;
    url: (full?: boolean) => string;
    previousUrl(): string;
    editItemUrl(classic?: boolean): string;
    list(): SPDocumentLibrary<SPFileItem<T>, T>;
    title: () => string;
    /**
     * The function `file` is an asynchronous function that returns information about a file item, and if
     * the file is not already loaded, it loads the file and sets the `loadedFile` flag to true.
     * @returns a Promise that resolves to an object of type IFileItemInfo.
     */
    file(): Promise<IFileItemInfo | IFolderInfo>;
    move(destinationPath: string, newWeb?: IWeb, skipRefresh?: boolean): Promise<string>;
    /**
     * The function returns the name of the file.
     * @returns a string, specifically the name of a file.
     */
    fileName(): string;
    fileType(): string;
    /**
     * The size function returns the length of a file.
     * @returns The size of the file as a number.
     */
    size(): number;
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
    checkIn(message?: string, type?: CheckinType): Promise<void>;
    /**
     * The `checkOut` function is an asynchronous function that calls the `checkout` method of the
     * `fileQuery` object and returns a promise.
     * @returns a Promise that resolves to void.
     */
    checkOut(): Promise<void>;
    /**
     * The function `undoCheckOut` is an asynchronous function that calls the `undoCheckout` method of
     * the `fileQuery` object and returns a Promise that resolves to `void`.
     * @returns The `undoCheckOut` function returns a Promise that resolves to `void`.
     */
    undoCheckOut(): Promise<void>;
    /**
     * The `approve` function sets the moderation status of an item to approved and calls the `approve`
     * function of the `fileQuery` object.
     * @param {string} [message] - The `message` parameter is an optional string that represents a
     * message or comment to be associated with the approval action. It can be used to provide additional
     * information or context for the approval.
     * @returns The `approve` function returns a Promise that resolves to `void`.
     */
    approve(message?: string): Promise<void>;
    /**
     * The `deny` function sets the moderation status of an item to "denied" and calls the `deny` function
     * of the `fileQuery` object.
     * @param {string} [message] - The `message` parameter is an optional string that represents the
     * reason for denying the item. It can be used to provide additional information or feedback to the
     * user regarding the denial of the item.
     * @returns The `deny` method is returning a promise that resolves to `void`.
     */
    deny(message?: string): Promise<void>;
    /**
     * The function checks if the moderation status of a data object is published.
     * @returns a boolean value.
     */
    isPublished(): boolean;
    /**
     * The function checks if the moderation status of the data is set to "draft".
     * @returns A boolean value is being returned.
     */
    isDraft(): boolean;
    /**
     * The function checks if the moderation status is rejected.
     * @returns A boolean value indicating whether the moderation status is rejected.
     */
    isRejected(): boolean;
    /**
     * The function checks if the moderation status of a data object is pending approval.
     * @returns A boolean value indicating whether the moderation status of the data is pending approval.
     */
    isPendingApproval(): boolean;
    /**
     * The function sets the moderation status of an item to 0 and then publishes it.
     * @param {string} [message] - The `message` parameter is an optional string that represents the
     * message to be included when publishing the item.
     * @returns The `publish` method returns a `Promise<void>`.
     */
    publish(message?: string): Promise<void>;
    /**
     * The function unPublish sets the moderation status of an item to 3 and then calls the unpublish
     * method of the fileQuery object.
     * @param {string} [message] - The `message` parameter is an optional string that represents the
     * reason or message for unpublishing the item.
     * @returns The `unPublish` function returns a `Promise` that resolves to `void`.
     */
    unPublish(message?: string): Promise<void>;
    /**
     * The `recycle` function is an asynchronous function that calls the `recycle` method of the
     * `fileQuery` object and returns a promise that resolves to a string.
     * @returns The `recycle()` method is returning a Promise that resolves to a string.
     */
    recycle(): Promise<string>;
    /**
     * The `deleteFile` function deletes a file using a file query.
     * @returns The `deleteFile` function is returning a `Promise` that resolves to `void`.
     */
    deleteFile(): Promise<void>;
    /**
     * The function checks if the object is a folder based on its file system object type.
     * @returns A boolean value is being returned.
     */
    isFolder(): boolean;
    object: () => UnknownObject;
    /**
     * The function `refresh` is an asynchronous function that refreshes a file and returns a
     * `SPFileItem` object.
     * @returns The function `refresh()` is returning a Promise that resolves to an object of type
     * `SPFileItem<T>`.
     */
    refresh(): Promise<SPFileItem<T>>;
    /**
     * The function "approvalStatus" returns the approval status of a document based on its moderation
     * status.
     * @returns an ApprovalStatus, which is a string value representing the approval status of a certain
     * item. The possible values for ApprovalStatus are 'Approved', 'Declined', 'Pending', 'Draft', and
     * 'Scheduled'. The function checks the value of the 'OData__ModerationStatus' property and returns
     * the corresponding ApprovalStatus value. If the 'OData__ModerationStatus'
     */
    approvalStatus(): ApprovalStatus;
    /**
     * The function `approvalComments()` returns the moderation comments if the item is published,
     * otherwise it returns the check-in comments.
     * @returns either the value of the 'OData__ModerationComments' property or the value of the
     * 'CheckInComment' property, depending on whether the 'CheckInComment' property is empty or not.
     */
    approvalComments(): UnknownObject;
}
//# sourceMappingURL=FileItem.class.d.ts.map