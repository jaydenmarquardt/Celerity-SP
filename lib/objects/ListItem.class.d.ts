import { SPObject } from "./Object.class";
import { SPLUser } from "./User.class";
import { ILikedByInformation } from "@pnp/sp/comments";
import { IItem } from "@pnp/sp/items";
import { RatingValues } from "@pnp/sp/comments/types";
import { UnknownObject } from "../util/Util.types";
import { IItemVersionInfo, ItemInfo } from "./types/ListItem.types";
import { IAttachmentAddResult, IAttachmentInfo, IBasePermissions, IWeb, PermissionKind, SocialActorType, SocialFollowResult } from "@pnp/sp/presets/all";
import { SPList } from "./List.class";
declare class SPListItem<T extends ItemInfo = ItemInfo> extends SPObject<IItem> {
    classType: string;
    listName: string;
    _list: SPList<SPListItem<T>, T> | UnknownObject;
    id: number;
    item: T;
    static extraFields: string[];
    constructor(listName: string, id: number);
    query: () => IItem;
    object: () => T;
    data: (key: keyof T) => T[keyof T] | undefined | UnknownObject;
    getIcon: () => string;
    title: () => string;
    description: () => string;
    url: (full?: boolean) => string;
    fileRef: (full?: boolean) => string;
    uniqueId: () => string;
    guid: () => string;
    onClick: () => void;
    listId: () => string;
    contentTypeId: () => string;
    contentType: () => Promise<any>;
    contentTypeName: () => Promise<string>;
    allData: () => Promise<UnknownObject>;
    /**
     * This gets overridden by child classes with publishing features
     * @returns true
     */
    isPublished(): boolean;
    attachments: () => Promise<IAttachmentInfo[]>;
    attachment: (name: string, type?: "text" | "blob" | "json" | "buffer") => Promise<string | Blob | ArrayBuffer>;
    hasAttachment: (name: string) => Promise<boolean>;
    delete: () => Promise<void>;
    updateAttachment: (name: string, content: string) => Promise<IAttachmentAddResult>;
    addAttachment: (name: string, content: string | File) => Promise<IAttachmentAddResult>;
    deleteAttachment: (name: string) => Promise<void>;
    /**
     * > This function gets the list item from the SharePoint list
     * @returns The item is being returned.
     */
    get(): Promise<SPListItem<T>>;
    /**
     * The `refresh` function clears the cache, sets the `loaded` property to false, and then calls the
     * `get` function to retrieve the updated item.
     * @returns a Promise that resolves to an SPListItem of type T.
     */
    refresh(): Promise<SPListItem<T>>;
    editItemUrl(classic?: boolean): string;
    /**
     * The list() function returns an instance of SPList<T> or creates a new instance if it doesn't
     * exist.
     * @returns The method is returning an instance of the SPList<T> class.
     */
    list(): SPList<SPListItem<T>, T>;
    setList(list: UnknownObject): void;
    tags: () => string[];
    /**
     * It initializes the item and sets the loaded property to true.
     * @param {any} item - any - This is the item that you want to load into the list item.
     * @returns The SPListItem object
     */
    init(item: ItemInfo | UnknownObject, web?: IWeb): SPListItem<T>;
    /**
     * The function checks if two SPListItems are the same by comparing their URLs.
     * @param {SPListItem} item - The parameter "item" is of type SPListItem, which is an object that
     * represents an item in a SharePoint list.
     * @returns A boolean value is being returned.
     */
    isSame(item: SPListItem): boolean;
    /**
     * It takes an object of properties, merges them with the existing item, and then updates the item in
     * SharePoint
     * @param {any} props - any - This is the properties that you want to update.
     * @returns The updated item
     */
    update(props: Partial<T>): Promise<SPListItem<T>>;
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
    preview(resolution?: number): string | undefined;
    /**
     * The `thumbnail` function returns the banner image as a string or undefined.
     * @returns The `thumbnail` method is returning a value of type `string` or `undefined`.
     */
    thumbnail(): string | undefined;
    /**
     * If the item is loaded, return the banner image URL
     * @returns The banner image url
     */
    banner(): string | undefined;
    /**
     * The function checks if the current banner is the default banner.
     * @returns a boolean value.
     */
    isDefaultBanner(): boolean;
    /**
     * It returns the created date of the item.
     * @param {string} [format] - The format to use when converting the date to a string.  If not
     * specified, the raw date is returned.
     * @returns The created date of the item.
     */
    created(format?: string): string | undefined;
    /**
     * It returns the modified date of the item.
     * @param {string} [format] - The format to use for the date.  If not specified, the default format
     * is used.
     * @returns The modified date of the item.
     */
    modified(format?: string): string | undefined;
    /**
     * The function "date" returns the modified date in the specified format.
     * @param {string} [format] - The format parameter is an optional string that specifies the desired
     * format for the date.
     * @returns a string or undefined value.
     */
    date(format?: string): string | undefined;
    /**
     * The function `publishDate` returns the first published date of an object in a specified format, or
     * undefined if no format is provided.
     * @param {string} [format] - The `format` parameter is an optional string that specifies the desired
     * format for the published date. If no format is provided, the function will return the published
     * date as a string in the default format.
     * @returns a string value or undefined.
     */
    publishDate(format?: string): string | undefined;
    /**
     * It returns the author of the list item.
     * @returns A new SPLUser object with the AuthorId property set to the value of the AuthorId property
     * of the current item.
     */
    author(): SPLUser;
    socialActor(): {
        ActorType: SocialActorType;
        ContentUri: string;
    };
    /**
     * It returns a boolean value.
     * @returns An array of list items that the current user is following.
     */
    isFollowed(): Promise<boolean>;
    /**
     * > Add the current item to the current user's list of followed items
     * @returns The item that was added to the list.
     */
    follow(): Promise<SocialFollowResult>;
    /**
     * > This function removes the current item from the current user's list of favourite items
     * @returns The item that was unfavourited.
     */
    unFollow(): Promise<any>;
    toggleFollow(): Promise<boolean>;
    /**
     * "If the item is loaded, return a new SPLUser object with the EditorId property of the item."
     *
     * The first line of the function is a comment. Comments are ignored by the compiler. They are used
     * to document the code
     * @returns A new instance of the SPLUser class.
     */
    editor(): SPLUser;
    /**
     * "If the item is loaded and checked out, return a new SPLUser object for the user who checked out
     * the item."
     *
     * The first line of the function is a comment. It's a good idea to include comments in your code.
     * Comments are ignored by the compiler, but they help you and other developers understand what your
     * code is doing
     * @returns A user object
     */
    checkedOutBy(): SPLUser | undefined;
    /**
     * > This function returns a list of related items for the current item
     * @returns An array of related items.
     */
    related(): Promise<SPListItem[]>;
    /**
     * The function "versions" retrieves and returns the versions of an item.
     * @returns a Promise that resolves to an array of IItemVersionInfo objects.
     */
    versions(): Promise<IItemVersionInfo[]>;
    /**
     * The function returns the version string of the OData UI.
     * @returns The version number of the OData UI.
     */
    version(): string;
    /**
     * The function "publishedVersion" returns the first version of an item that is marked as the current
     * version.
     * @returns the first version of an item that is marked as the current version.
     */
    publishedVersion(): Promise<IItemVersionInfo>;
    /**
     * It likes the page.
     * @returns The like() function is being returned.
     */
    like: () => Promise<void>;
    /**
     * It unlikes the page.
     * @returns The page object is being returned.
     */
    unLike: () => Promise<void>;
    rate: (rating: RatingValues) => Promise<number>;
    /**
     * It returns the number of likes for the current post
     * @returns The number of likes on the post.
     */
    likes(): Promise<number>;
    /**
     * It returns a boolean value that indicates whether the current user has liked the current post
     * @returns A boolean value.
     */
    isLiked(): Promise<boolean>;
    /**
     * It returns the information of the users who liked the post.
     * @returns An array of objects containing the user's name and profile picture.
     */
    likeInfo(): Promise<ILikedByInformation>;
    /**
     * The function "hasPermissions" checks if a user has a specific permission.
     * @param {PermissionKind} perm - The `perm` parameter is of type `PermissionKind`. It represents the
     * permission that we want to check if the user has.
     * @returns The function `hasPermissions` returns a Promise that resolves to a boolean value.
     */
    hasPermissions(perm: PermissionKind): Promise<boolean>;
    /**
     * The function returns the current user's effective permissions by querying the database.
     * @returns a Promise that resolves to an object of type IBasePermissions.
     */
    permissions(): Promise<IBasePermissions>;
    /**
     * The function "canView" checks if the user has permission to view list items.
     * @returns The function `canView()` returns a promise that resolves to a boolean value.
     */
    canView(): Promise<boolean>;
    /**
     * The function "canEdit" checks if the user has permission to edit list items and returns a boolean
     * value indicating whether they can or not.
     * @returns a Promise that resolves to a boolean value.
     */
    canEdit(): Promise<boolean>;
    /**
     * The function "canDelete" checks if the user has permission to delete list items.
     * @returns The function `canDelete()` returns a promise that resolves to a boolean value.
     */
    canDelete(): Promise<boolean>;
    /**
     * The function "canApprove" checks if the user has the permission to approve items.
     * @returns a Promise that resolves to a boolean value.
     */
    canApprove(): Promise<boolean>;
}
export { SPListItem };
//# sourceMappingURL=ListItem.class.d.ts.map