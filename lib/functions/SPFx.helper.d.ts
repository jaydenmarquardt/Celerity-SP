import type { UnknownObject } from "../util/Util.types";
import { IWeb } from "@pnp/sp/webs";
import { ItemInfo } from "../objects/types/ListItem.types";
import { NewItemConstructor } from "../objects/types/List.types";
import { SPListItem } from "../objects/ListItem.class";
export declare function SPPostRequest(path: string, headers: UnknownObject, body: UnknownObject): Promise<import("@microsoft/sp-http-base").SPHttpClientResponse>;
export declare function itemsBy<T extends ItemInfo>(listTitle: string, where: string, filter?: (item: T, index: number, items: T[]) => Promise<boolean>, web?: IWeb, props?: string[]): Promise<T[]>;
export declare function allItemsFiltered<T>({ filter: propFilter, listName, key, refresh, props, web, }: {
    filter: (item: T, index: number, all: T[]) => Promise<boolean>;
    listName: string;
    props?: string[];
    key: string;
    refresh?: boolean;
    web?: IWeb;
}): Promise<any[]>;
export declare function allItems<T = ItemInfo>({ listName, key, props, refresh, iweb, expand, }: {
    listName: string;
    key: string;
    props?: string[];
    refresh?: boolean;
    iweb?: IWeb;
    expand?: string[];
}): Promise<T[]>;
export declare function listItemsBy<T extends SPListItem<T1>, T1 extends ItemInfo>(listTitle: string, where: string, filter: (item: ItemInfo, index: number, items: ItemInfo[]) => Promise<boolean>, web?: IWeb, constructor?: NewItemConstructor<T, T1>): Promise<T[]>;
//# sourceMappingURL=SPFx.helper.d.ts.map