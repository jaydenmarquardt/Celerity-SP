import type { IFileItemInfo } from "./FileItem.types";
export interface IPageItemInfo extends IFileItemInfo {
    PromotedState?: number;
    OData__SPSitePageFlags: string;
    OData__ModerationComments: unknown;
    OData__ModerationStatus: number;
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
//# sourceMappingURL=PageItem.types.d.ts.map