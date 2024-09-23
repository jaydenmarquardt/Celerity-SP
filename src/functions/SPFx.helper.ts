import { SPHttpClient } from "@microsoft/sp-http";
import type { UnknownObject } from "../util/Util.types";
import { theContext } from "../core/instance/Context.instance";
import { IWeb } from "@pnp/sp/webs";
import { ItemInfo } from "../objects/types/ListItem.types";
import { clearCache, isCached, setCache } from "../util/Cache";
import { theIWeb } from "../core/instance/Web.instance";
import { sp } from "../core/Celertity";
import { NewItemConstructor } from "../objects/types/List.types";
import { SPListItem } from "../objects/ListItem.class";

export async function SPPostRequest(
  path: string,
  headers: UnknownObject,
  body: UnknownObject
) {
  const opts = {
    body: JSON.stringify(body),
    headers: {
      accept: "*/*, application/json; odata.metadata=minimal",
      ...(headers || {}),
    },
  };
  return await theContext().spHttpClient.post(
    path,
    SPHttpClient.configurations.v1,
    opts
  );
}

export async function itemsBy<T extends ItemInfo>(
  listTitle: string,
  where: string,
  filter: (item: T, index: number, items: T[]) => Promise<boolean> = async () =>
    true,
  web: IWeb = theIWeb(),
  props: string[] = []
): Promise<T[]> {
  const webKey = (await web()).Url;
  const cacheKey = `${listTitle}_items_by_${where.trim()}_on_${webKey}`;

  const cache = isCached(cacheKey);
  if (cache) return cache;

  const queryProps = {
    web,
    key: "",
    listName: listTitle,
    props: ["*", ...props],
    filter,
  };
  const items = await allItemsFiltered(queryProps);

  setCache(cacheKey, items);
  return items;
}

export async function allItemsFiltered<T>({
  filter: propFilter,
  listName,
  key,
  refresh,
  props,
  web,
}: {
  filter: (item: T, index: number, all: T[]) => Promise<boolean>;
  listName: string;
  props?: string[];
  key: string;
  refresh?: boolean;
  web?: IWeb;
}) {
  const items =
    (await allItems<T>({
      listName,
      refresh,
      props,
      iweb: web,
      key: `filteredItems_${listName}_${key}`,
    })) || [];
  const itemsFiltered = [];
  for (const item of items) {
    const filter = await propFilter(item, items.indexOf(item), items);
    if (filter) itemsFiltered.push(item);
  }

  return itemsFiltered;
}

export async function allItems<T = ItemInfo>({
  listName,
  key,
  props = ["*"],
  refresh = false,
  iweb = sp().web,
  expand,
}: {
  listName: string;
  key: string;
  props?: string[];
  refresh?: boolean;
  iweb?: IWeb;
  expand?: string[];
}): Promise<T[]> {
  const webKey = (await iweb()).Url;
  const cacheKey = `${key}_${listName}_${props.join("-")}_on_${webKey}`;
  if (refresh) {
    clearCache(cacheKey);
  }
  const cache = isCached(cacheKey);
  if (cache) return cache;

  let items: T[] = [];
  const list = iweb.lists.getByTitle(listName);
  try {
    for await (const batch of list.items
      .select(...props)
      .expand(...(expand || []))
      .top(5000)) {
      items = items.concat(batch);
    }
    setCache(cacheKey, items);
  } catch (e) {
    //Do nothing
  }

  return items;
}

export async function listItemsBy<
  T extends SPListItem<T1>,
  T1 extends ItemInfo
>(
  listTitle: string,
  where: string,
  filter: (
    item: ItemInfo,
    index: number,
    items: ItemInfo[]
  ) => Promise<boolean>,
  web: IWeb = theIWeb(),
  constructor?: NewItemConstructor<T, T1>
): Promise<T[]> {
  const items = await itemsBy<ItemInfo>(listTitle, where, filter, web, [
    "FileRef",
    "UniqueId",
  ]);
  return (items.map((item) => {
    return new (constructor || SPListItem)(listTitle, item.ID).init(item, web);
  }) || []) as T[];
}
