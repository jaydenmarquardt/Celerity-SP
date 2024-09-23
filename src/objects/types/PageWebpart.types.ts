import type { UnknownObject } from "../../util/Util.types";

export enum Emphasis {
  None = 0,
  Neutral = 1, //Grey
  Soft = 2, //Light Primary
  Strong = 3, //Primary
  Grey = 1, //Grey
  Light = 2, //Light Primary
  Primary = 3, //Primary
}

export enum ControlType {
  Text = 4,
  Webpart = 3,
}

export interface IPosition {
  zoneIndex: number;
  sectionIndex: number;
  controlIndex?: number;
  sectionFactor?: ColumnFactor;
  layoutIndex: number;
}

export interface WebpartSaveData {
  id: string;
  instanceId: string;
  title: string;
  description: string;
  serverProcessedContent?: {
    htmlStrings?: Record<string, string>;
    searchablePlainTexts?: Record<string, string>;
    imageSources?: Record<string, string>;
    links?: Record<string, string>;
  };
  dataVersion: string;
  properties: UnknownObject;
}

export type ColumnFactor =
  | 0 //Full Bleed
  | 1 //Non Standard 1/12
  | 2 //Non Standard - 1/6th column | 2/12
  | 3 // Non Standard - 1/4th column | 3/12
  | 4 //Standard - 1/3rd column | 4/12
  | 5 // Non Standard - 5/12
  | 6 //Standard - Half Column 1/2 | 6/12
  | 7 // Non Standard - 7/12
  | 8 // Standard - 2 Third column - 2/3rds | 8/12
  | 9 // Non Standard - 9/12
  | 10 //Non Standard - 5/6ths 10/12
  | 11 // Non Standard - 11/12
  | 12; //Standard - Single Column -  12/12
