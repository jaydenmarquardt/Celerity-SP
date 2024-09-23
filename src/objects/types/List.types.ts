import type { IListInfo } from "@pnp/sp/lists";
import type { ItemInfo } from "./ListItem.types";
import { SPListItem } from "../ListItem.class";

export interface ListIndex {
  items: ItemIndex[];
  total: number;
  firstId: number;
  lastId: number;
}

export interface ItemIndex {
  index: number;
  ID: number;
  Title: string;
}

export interface ListInfo extends IListInfo {
  DisableCommenting?: boolean;
}
export type NewItemConstructor<
  T extends SPListItem<T1>,
  T1 extends ItemInfo
> = new (props: any) => T;
