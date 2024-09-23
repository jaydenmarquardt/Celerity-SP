import type { IFileItemInfo } from "./FileItem.types";

export interface IPageItemInfo extends IFileItemInfo {
  PromotedState?: number;

  //ODATA
  OData__SPSitePageFlags: string;

  //Revisions and versions
  OData__ModerationComments: unknown;
  OData__ModerationStatus: number;

  //Dont use

  CanvasContent1: string;
}

export interface IPageViews {
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
}
