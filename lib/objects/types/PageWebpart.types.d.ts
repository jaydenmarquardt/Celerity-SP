import type { UnknownObject } from "../../util/Util.types";
export declare enum Emphasis {
    None = 0,
    Neutral = 1,
    Soft = 2,
    Strong = 3,
    Grey = 1,
    Light = 2,
    Primary = 3
}
export declare enum ControlType {
    Text = 4,
    Webpart = 3
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
export declare type ColumnFactor = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
//# sourceMappingURL=PageWebpart.types.d.ts.map