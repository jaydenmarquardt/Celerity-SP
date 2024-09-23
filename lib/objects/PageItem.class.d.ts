import "@pnp/sp/comments/clientside-page";
import { CanvasColumn, CanvasSection, IClientsidePage, IPageData } from "@pnp/sp/clientside-pages";
import type { ICommentInfo, ILikedByInformation } from "@pnp/sp/comments/types";
import type { IPageItemInfo, IPageViews } from "./types/PageItem.types";
import { SPFileItem } from "./FileItem.class";
import { SPListItem } from "./ListItem.class";
import { SPPageWebpart } from "./PageWebpart.class";
import { IFieldInfo } from "@pnp/sp/fields";
import { IWeb } from "@pnp/sp/webs";
declare class SPPageItem<T extends IPageItemInfo = IPageItemInfo> extends SPFileItem<T> {
    classType: string;
    pageObject: IClientsidePage;
    _sections: {
        webparts: SPPageWebpart[];
        columns: {
            webparts: SPPageWebpart[];
            column: CanvasColumn;
        }[];
        section: CanvasSection;
    }[];
    childItems: SPPageItem[];
    viewInfo: {
        All: number;
        AllUniqueUsers: number;
        Today: number;
        TodayUniqueUsers: number;
        Week: number;
        WeekUniqueUsers: number;
        Month: number;
        MonthUniqueUsers: number;
        Quarter: number;
        QuarterUniqueUsers: number;
    };
    constructor(id: number);
    /**
     * It returns the current page item as an SPPageItem.
     * @returns The return type is SPPageItem.
     */
    get(): Promise<SPPageItem<T>>;
    getIcon: () => string;
    promotedState: () => any;
    isNews: () => boolean;
    isTemplate: () => boolean;
    /**
     * The function "promote" updates the PromotedState property of an object to either 0 or 2, depending
     * on the value of the "demote" parameter.
     * @param [demote=false] - The `demote` parameter is a boolean value that determines whether the
     * promotion should be demoted or not. If `demote` is `true`, the `PromotedState` will be set to 0,
     * indicating a demotion. If `demote` is `false` or not
     * @returns The `promote` function is returning the result of the `update` function, which is being
     * awaited.
     */
    promote(demote?: boolean): Promise<SPListItem<T>>;
    /**
     * A constructor function that returns a new instance of the class.
     * @param {any} item - any - The item to be converted to a SPPageItem.
     * @returns The super class of SPPageItem
     */
    init(item: any, web?: IWeb): this;
    /**
     * > If the page object is already loaded, return it. Otherwise, load it and return it
     * @returns The page object
     */
    page(): Promise<IClientsidePage>;
    /**
     * The function `comments` returns a promise that resolves to an array of `ICommentInfo` objects after
     * checking if the page is loaded and calling the `getComments` method on the `pageObject`.
     * @returns a Promise that resolves to an array of objects of type ICommentInfo.
     */
    comments(): Promise<ICommentInfo[]>;
    /**
     * The function "commentCount" returns the number of comments.
     * @returns The commentCount function returns a Promise that resolves to a number.
     */
    commentCount(): Promise<number>;
    /**
     * The `views` function retrieves page view information for a given URL using SharePoint search and
     * returns the view counts for different time periods.
     * @returns The function `views()` returns a Promise that resolves to an object of type `IPageViews`.
     */
    views(): Promise<IPageViews>;
    _fields: IFieldInfo[];
    fields(): Promise<IFieldInfo[]>;
    field(field: string): Promise<IFieldInfo>;
    /**
     * The function "viewCount" returns the number of views based on the specified frequency and
     * uniqueness.
     * @param {'All' | 'Today' | 'Week' | 'Month' | 'Quarter'} [frequency=All] - The "frequency"
     * parameter determines the time period for which the view count is calculated. It can have one of
     * the following values:
     * @param {boolean} [unique=false] - The `unique` parameter is a boolean that determines whether to
     * count unique users or not. If `unique` is set to `true`, the function will return the count of
     * unique users. If `unique` is set to `false` or not provided, the function will return the total
     * count of
     * @returns the view count based on the specified frequency and uniqueness.
     */
    viewCount(frequency?: "All" | "Today" | "Week" | "Month" | "Quarter", unique?: boolean): Promise<number>;
    /**
     * The function "likeCount" returns the number of likes by calling the "likes" function asynchronously.
     * @returns The likeCount() function is returning a Promise that resolves to a number.
     */
    likeCount(): Promise<number>;
    /**
     * The function returns an array of sections, each containing an array of webparts and columns.
     * @returns an array of objects. Each object in the array represents a section on a page and contains
     * the following properties:
     */
    sections(): {
        webparts: SPPageWebpart[];
        columns: {
            webparts: SPPageWebpart[];
            column: CanvasColumn;
        }[];
        section: CanvasSection;
    }[];
    /**
     * The function "columns" returns an array of objects containing the webparts and column information
     * for a given section index.
     * @param {number} sectionIndex - The sectionIndex parameter is a number that represents the index of
     * the section in the page object. It is used to retrieve the specific section from the page object
     * and return the columns and webparts within that section.
     * @returns an array of objects. Each object in the array has two properties: "webparts" and
     * "column". The "webparts" property is an array of SPPageWebpart objects, and the "column" property
     * is a CanvasColumn object.
     */
    columns(sectionIndex: number): {
        webparts: SPPageWebpart[];
        column: CanvasColumn;
    }[];
    /**
     * The function "webparts" returns an array of SPPageWebpart objects by iterating through each
     * section and adding its webparts to the array.
     * @returns The function `webparts()` returns an array of `SPPageWebpart` objects.
     */
    webparts(): SPPageWebpart[];
    /**
     * The function `json` returns the JSON data of a page object, after ensuring that the page object is
     * initialized.
     * @returns a Promise that resolves to a Partial<IPageData> object.
     */
    json(): Promise<Partial<IPageData>>;
    /**
     * The function downloads a JSON file and returns its contents as a partial object of type IPageData.
     * @returns a Promise that resolves to a Partial<IPageData> object.
     */
    download(): Promise<Partial<IPageData>>;
    url: (full?: boolean) => string;
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
     * The function "textWebparts" returns a promise that resolves to an array of webparts that are of
     * type "text" on a SharePoint page.
     * @returns an array of SPPageWebpart objects that have been filtered to only include webparts that
     * are of type "text".
     */
    textWebparts(): Promise<SPPageWebpart[]>;
}
/**
 * The function imports a page from JSON data, creates a clientside page using the data, saves the
 * page, retrieves the item, and returns it as a SPPageItem.
 * @param {string} json - A string representing the JSON data of a page to be imported.
 * @returns a Promise that resolves to an SPPageItem object.
 */
export declare function importPageFromJSON(json: string): Promise<SPPageItem>;
export { SPPageItem };
//# sourceMappingURL=PageItem.class.d.ts.map