import { SortDirection } from "@pnp/sp/search/types";
export declare type CAMLFieldType = "Text" | "Integer" | "Boolean" | "DateTime" | "Lookup" | "ContentTypeId";
export declare type ValueType = "Text" | "Integer" | "Boolean" | "DateTime";
export declare type ConditionOperator = "Eq" | "Neq" | "Geq" | "Leq" | "Contains";
export declare type ConditionLogic = "OR" | "AND";
export declare type CAMLScope = "Recursive" | "RecursiveAll" | "FilesOnly" | "FilesOnlyRecursive";
export interface ICAMLCondition {
    k: string;
    t: ValueType;
    m: ConditionOperator;
    p?: ConditionLogic;
    v: string | string[];
    raw?: string;
}
export interface IOrderBy {
    k: string;
    d: SortDirection;
}
export interface IPagedInfo {
    ids: number[];
    pages: number[][];
    pageIds: number[];
    totalItems: number;
    totalPages: number;
}
//# sourceMappingURL=Caml.types.d.ts.map