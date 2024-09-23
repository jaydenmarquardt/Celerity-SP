import { SortDirection } from "@pnp/sp/search/types";

export type CAMLFieldType =
  | "Text"
  | "Integer"
  | "Boolean"
  | "DateTime"
  | "Lookup"
  | "ContentTypeId";
export type ValueType = "Text" | "Integer" | "Boolean" | "DateTime";
export type ConditionOperator = "Eq" | "Neq" | "Geq" | "Leq" | "Contains";
export type ConditionLogic = "OR" | "AND";
export type CAMLScope =
  | "Recursive"
  | "RecursiveAll"
  | "FilesOnly"
  | "FilesOnlyRecursive";

/* The `ICAMLCondition` interface is defining a structure for representing a condition in a CAML
(Collaborative Application Markup Language) query. It has the following properties: */
export interface ICAMLCondition {
  k: string; // Field key
  t: ValueType; // Field type
  m: ConditionOperator;
  p?: ConditionLogic;
  v: string | string[];
  raw?: string;
}

export interface IOrderBy {
  k: string; // Field key
  d: SortDirection;
}

/* The `IPagedInfo` interface is defining a structure for storing information about pagination. It has
the following properties: */
export interface IPagedInfo {
  ids: number[];
  pages: number[][];
  pageIds: number[];
  totalItems: number;
  totalPages: number;
}
