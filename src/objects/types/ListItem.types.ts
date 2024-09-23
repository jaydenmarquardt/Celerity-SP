import { UnknownObject } from "../../util/Util.types";
import { SPListItem } from "../ListItem.class";
import { FSObjType } from "./General.types";

export type SPListItemIsh<T extends SPListItem<any>> = T | SPListItem<any>;

export type ApprovalStatus =
  | "Approved"
  | "Denied"
  | "Pending"
  | "Draft"
  | "Scheduled";
export type ItemInfo = {
  Id: number | string;
  ID: number;
  GUID: string;
  UniqueId: string;
  Title?: string;
  Description?: string;
  ContentTypeId: string;
  ContentType: UnknownObject;
  Attachments?: boolean | UnknownObject;
  PageLayoutType: "Article" | "Home" | "SingleWebPartAppPage" | "RepostPage";
  FSObjType: FSObjType;

  FileLeafRef?: string;
  FileRef?: string;
  BannerImageUrl?: {
    Description: string;
    Url: string;
  };
  Created: string;
  Modified: string;
  FirstPublishedDate: string;
  AuthorId: number;
  EditorId: number;
  CheckoutUserId: number;

  Author: UnknownObject;
  Editor: UnknownObject;

  ServerRedirectedEmbedUrl: string;
  _ShortcutUrl: string;

  //Revisions and versions
  OData__UIVersionString: string;
  OData__UIVersion: number;

  //ODATA
  "odata.metadata": string;
  "odata.type": string;
  "odata.id": string;
  "odata.editLink": string;
};

export interface IItemVersionInfo {
  "odata.type": string;
  "odata.id": string;
  "odata.editLink": string;
  Created: string;
  IsCurrentVersion: boolean;
  VersionId: number;
  VersionLabel: string;
  MetaInfo: string;
  OData__x005f_ModerationStatus: number;
  OData__x005f_Level: number;
  Last_x005f_x0020_x005f_Modified: string;
  ID: number;
  UniqueId: string;
  owshiddenversion: number;
  FSObjType: string;
  Created_x005f_x0020_x005f_Date: string;
  ProgId: string;
  FileLeafRef: string;
  Modified: string;
  HTML_x005f_x0020_x005f_File_x005f_x0020_x005f_Type: null | string;
  CheckoutUser: null | any; // More specific type if known
  ScopeId: string;
  FileRef: string;
  Editor: {
    LookupId: number;
    LookupValue: string;
    Email: string;
  };
}
