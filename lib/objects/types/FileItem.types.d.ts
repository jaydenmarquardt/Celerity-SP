import type { ItemInfo } from "./ListItem.types";
export interface IFileItemInfo extends ItemInfo {
    OData__SPSitePageFlags: string;
    OData__CopySource: string;
    OData__ModerationComments: unknown;
    OData__ModerationStatus: number;
    File_x0020_Type?: string;
    File_x0020_Size?: string;
    ExtraData?: string;
    FileSystemObjectType?: number;
    LinkFilename: string;
    Length?: string;
    Name?: string;
    MajorVersion: number;
    MinorVersion: number;
    CheckInComment: string;
    CheckOutType: number;
}
//# sourceMappingURL=FileItem.types.d.ts.map