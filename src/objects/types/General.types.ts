export type FSObjType =
  | 0 // File
  | 1 //Folder
  | 2; //Web

export type StringBoolean =
  | "0" //False
  | "1"; //True;

export type StringNumber = string; //EG "0"
export type StringHTML = string; //EG "<div></div>"
export type StringUrl = string; //EG "https://"
export type StringRelativeUrl = string; //EG "/sites/sitename/sitepages/page.aspx"
export type StringUUID = string; //EG "b6917cb1-93a0-4b97-a84d-7cf49975d4ec"
export type StringDate = string; //EG "2023-08-02T01:52:25Z"
export type StringFormattedDate = string; //EG 7/30/2023 6:26 PM
export type StringUserLogin = string; //EG "i:0#.f|membership|user@email.digital"
export type StringUserTitle = string; //EG "Firstname Lastname"
