import "@pnp/sp/comments/clientside-page";

import type { ISearchQuery } from "@pnp/sp/search";
import {
  CanvasColumn,
  CanvasSection,
  CreateClientsidePage,
  IClientsidePage,
  IPageData,
} from "@pnp/sp/clientside-pages";
import type { ICommentInfo, ILikedByInformation } from "@pnp/sp/comments/types";
import type { IPageItemInfo, IPageViews } from "./types/PageItem.types";
import { SPFileItem } from "./FileItem.class";
import { SPListItem } from "./ListItem.class";
import { SPPageWebpart } from "./PageWebpart.class";
import { errorLog } from "../util/Debug";
import { IFieldInfo } from "@pnp/sp/fields";
import { IWeb } from "@pnp/sp/webs";
import { sp } from "../core/Celertity";
import { download } from "../util/Blob";
import { Obj } from "../util/Objects";
import { UnknownObject } from "../util/Util.types";

class SPPageItem<
  T extends IPageItemInfo = IPageItemInfo
> extends SPFileItem<T> {
  classType: string = "PageItem";

  public pageObject: IClientsidePage;

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

  constructor(id: number) {
    super("Site Pages", id);
    SPPageItem.extraFields = [
      ...SPListItem.extraFields,
      "PromotedState",
      "PageLayoutType",
    ];
  }

  /**
   * It returns the current page item as an SPPageItem.
   * @returns The return type is SPPageItem.
   */
  async get(): Promise<SPPageItem<T>> {
    if (!this.loaded) await super.get();
    try {
      if (!this.loadedFile) await super.file();
    } catch (e) {
      errorLog({
        component: "PageItem.class:Get",
        message: "Failed to load page file item",
        type: "error",
        role: "user",
        severity: "low",
        data: { e, id: this.id },
      });
    }

    return this;
  }

  getIcon = () => "PageLink";
  /* The above code is defining a method called `promotedState` in a TypeScript class. This method is
using the `data` function to retrieve the value of the 'PromotedState' property. */
  promotedState = () => this.data("PromotedState");
  /* The above code is defining a TypeScript arrow function called `isNews`. This function returns a
boolean value indicating whether the `promotedState` function returns the value 2. */
  isNews = () => this.promotedState() === 2;
  /* The above code is a TypeScript function that checks if a certain flag, 'Template', is present in
 the 'OData__SPSitePageFlags' data property. It returns true if the flag is present, and false
 otherwise. */
  isTemplate = () =>
    this.data("OData__SPSitePageFlags") &&
    this.data("OData__SPSitePageFlags")?.indexOf("Template") !== -1;
  /**
   * The function "promote" updates the PromotedState property of an object to either 0 or 2, depending
   * on the value of the "demote" parameter.
   * @param [demote=false] - The `demote` parameter is a boolean value that determines whether the
   * promotion should be demoted or not. If `demote` is `true`, the `PromotedState` will be set to 0,
   * indicating a demotion. If `demote` is `false` or not
   * @returns The `promote` function is returning the result of the `update` function, which is being
   * awaited.
   */
  async promote(demote = false) {
    return await this.update({
      PromotedState: demote ? 0 : 2,
    } as UnknownObject);
  }

  /**
   * A constructor function that returns a new instance of the class.
   * @param {any} item - any - The item to be converted to a SPPageItem.
   * @returns The super class of SPPageItem
   */
  public init(item: any, web?: IWeb) {
    super.init(item, web);
    return this;
  }

  /**
   * > If the page object is already loaded, return it. Otherwise, load it and return it
   * @returns The page object
   */

  public async page(): Promise<IClientsidePage> {
    if (this.pageObject) return this.pageObject;

    await this.get();
    this.checkUnloaded();

    const fileUrl = this.url();
    if (!fileUrl) throw new Error("No file url");
    this.pageObject = await this.web.loadClientsidePage(fileUrl);

    return this.pageObject;
  }

  /**
   * The function `comments` returns a promise that resolves to an array of `ICommentInfo` objects after
   * checking if the page is loaded and calling the `getComments` method on the `pageObject`.
   * @returns a Promise that resolves to an array of objects of type ICommentInfo.
   */
  async comments(): Promise<ICommentInfo[]> {
    this.checkUnloaded();
    await this.page();
    return await this.pageObject?.getComments();
  }

  /**
   * The function "commentCount" returns the number of comments.
   * @returns The commentCount function returns a Promise that resolves to a number.
   */
  async commentCount(): Promise<number> {
    return ((await this.comments()) || []).length;
  }

  /**
   * The `views` function retrieves page view information for a given URL using SharePoint search and
   * returns the view counts for different time periods.
   * @returns The function `views()` returns a Promise that resolves to an object of type `IPageViews`.
   */
  async views(): Promise<IPageViews> {
    if (this.viewInfo) return this.viewInfo;
    const itemViewData: UnknownObject = (
      await sp().search(<ISearchQuery>{
        SelectProperties: [
          "Title",
          "path",
          "ViewsLifeTime",
          "ViewsLifeTimeUniqueUsers",
          "ViewLast1Days",
          "ViewLast1DaysUniqueUsers",
          "ViewLast7Days",
          "ViewLast7DaysUniqueUsers",
          "ViewsLastMonths1",
          "ViewsLastMonths1UniqueUsers",
          "ViewsLastMonths3",
          "ViewsLastMonths3UniqueUsers",
        ],
        EnableInterleaving: true,

        Querytext: `path:"${this.url(true)}"`,
      })
    )?.PrimarySearchResults[0];
    if (!itemViewData)
      return {
        All: 0,
        AllUniqueUsers: 0,
        Today: 0,
        TodayUniqueUsers: 0,
        Week: 0,
        WeekUniqueUsers: 0,
        Month: 0,
        MonthUniqueUsers: 0,
        Quarter: 0,
        QuarterUniqueUsers: 0,
      };
    this.viewInfo = {
      All: Number(itemViewData.LifeTime || 0),
      AllUniqueUsers: Number(itemViewData.ViewsLifeTimeUniqueUsers || 0),
      Today: Number(itemViewData.ViewsLast1Days || 0),
      TodayUniqueUsers: Number(itemViewData.ViewsLast1DaysUniqueUsers || 0),
      Week: Number(itemViewData.ViewsLast7Days || 0),
      WeekUniqueUsers: Number(itemViewData.ViewsLast7DaysUniqueUsers || 0),
      Month: Number(itemViewData.ViewsLastMonths1 || 0),
      MonthUniqueUsers: Number(itemViewData.ViewsLastMonths1UniqueUsers || 0),
      Quarter: Number(itemViewData.ViewsLastMonths3 || 0),
      QuarterUniqueUsers: Number(itemViewData.ViewsLastMonths3UniqueUsers || 0),
    };
    return this.viewInfo;
  }

  _fields: IFieldInfo[];
  async fields(): Promise<IFieldInfo[]> {
    if (this._fields) return this._fields;
    const list = await this.list().get();
    const contentTypeFields = await this.query().contentType.fields.select(
      "*"
    )();
    const listFields = await list.fields();
    this._fields = contentTypeFields.concat(listFields);
    return this._fields;
  }

  async field(field: string): Promise<IFieldInfo> {
    const fields = await this.fields();
    return fields.find((f) => f.InternalName === field);
  }

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
  async viewCount(
    frequency: "All" | "Today" | "Week" | "Month" | "Quarter" = "All",
    unique: boolean = false
  ): Promise<number> {
    const viewInfo = await this.views();
    return viewInfo[`${frequency}${unique ? "UniqueUsers" : ""}`];
  }

  /**
   * The function "likeCount" returns the number of likes by calling the "likes" function asynchronously.
   * @returns The likeCount() function is returning a Promise that resolves to a number.
   */
  async likeCount(): Promise<number> {
    const likeInfo = await this.likes();
    return likeInfo;
  }

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
  }[] {
    if (this._sections) return this._sections;
    if (!this.pageObject) throw new Error("Page object not loaded");
    if (!this.pageObject.sections) return [];
    this._sections = this.pageObject.sections.map((section, index) => {
      const columns = this.columns(index);
      const webparts = [];
      columns.forEach((column) => {
        webparts.push(...column.webparts);
      });
      return {
        section,
        columns: this.columns(index),
        webparts: webparts,
      };
    });
    return this._sections;
  }

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
  }[] {
    if (!this.pageObject) throw new Error("Page object not loaded");

    if (!Obj(this.pageObject.sections).has(sectionIndex))
      throw new Error(`Section not found, section ${sectionIndex}`);
    const section: CanvasSection = Obj<CanvasSection[]>(
      this.pageObject.sections
    ).get(sectionIndex);

    return (section.columns || []).map((column) => {
      return {
        column,
        webparts: column.controls.map((control) => {
          return new SPPageWebpart(this.pageObject, control);
        }),
      };
    });
  }

  /**
   * The function "webparts" returns an array of SPPageWebpart objects by iterating through each
   * section and adding its webparts to the array.
   * @returns The function `webparts()` returns an array of `SPPageWebpart` objects.
   */
  webparts(): SPPageWebpart[] {
    if (!this.pageObject) throw new Error("Page object not loaded");
    const webparts = [];
    this.sections().forEach((section) => {
      webparts.push(...section.webparts);
    });

    return webparts;
  }

  /**
   * The function `json` returns the JSON data of a page object, after ensuring that the page object is
   * initialized.
   * @returns a Promise that resolves to a Partial<IPageData> object.
   */
  async json(): Promise<Partial<IPageData>> {
    if (!this.pageObject) await this.page();
    return this.pageObject["json"];
  }

  /**
   * The function downloads a JSON file and returns its contents as a partial object of type IPageData.
   * @returns a Promise that resolves to a Partial<IPageData> object.
   */
  async download(): Promise<Partial<IPageData>> {
    const json = await this.json();
    if (!json) throw new Error("No json");
    await download(`${json.FileName}`, JSON.stringify(json), "json");
    return json;
  }

  /* The above code is defining a TypeScript arrow function called "url". This function takes an
  optional boolean parameter "full" with a default value of false. */
  url = (full: boolean = false): string => this.fileRef(full);

  /**
   * It likes the page.
   * @returns The like() function is being returned.
   */
  like = async () => {
    const page = await this.web.loadClientsidePage(this.url());
    return await page.like();
  };
  /**
   * It unlikes the page.
   * @returns The page object is being returned.
   */
  unLike = async () => {
    const page = await this.web.loadClientsidePage(this.url());
    return await page.unlike();
  };

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
    const page = await this.web.loadClientsidePage(this.url());

    return await page.getLikedByInformation();
  }

  /**
   * The function "textWebparts" returns a promise that resolves to an array of webparts that are of
   * type "text" on a SharePoint page.
   * @returns an array of SPPageWebpart objects that have been filtered to only include webparts that
   * are of type "text".
   */
  async textWebparts(): Promise<SPPageWebpart[]> {
    await this.page();
    return this.webparts().filter((wp) => wp.isText());
  }
}

/**
 * The function imports a page from JSON data, creates a clientside page using the data, saves the
 * page, retrieves the item, and returns it as a SPPageItem.
 * @param {string} json - A string representing the JSON data of a page to be imported.
 * @returns a Promise that resolves to an SPPageItem object.
 */
export async function importPageFromJSON(json: string): Promise<SPPageItem> {
  let pageData: IPageData | UnknownObject = JSON.parse(json);

  const page: IClientsidePage = await CreateClientsidePage(
    sp().web,
    pageData.FileName?.replaceAll(".aspx", ""),
    pageData.Title,
    pageData.PageLayoutType
  );
  const createdPageData = page["json"];
  pageData = {
    ...pageData,
    "odata.editLink": createdPageData["odata.editLink"],
    "odata.id": createdPageData["odata.id"],
    "odata.type": createdPageData["odata.type"],
    "odata.metadata": createdPageData["odata.metadata"],
    Id: createdPageData.Id,
    UniqueId: createdPageData.UniqueId,
    AbsoluteUrl: createdPageData.AbsoluteUrl,
    AlternativeUrlMap: createdPageData.AlternativeUrlMap,
  };

  page.fromJSON(pageData);

  await page.save(true);
  const item = await (await page.getItem())();

  const pageItem = new SPPageItem(item.Id);
  await pageItem.get();
  return pageItem;
}

export { SPPageItem };
