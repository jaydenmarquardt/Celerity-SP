var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import { SPHttpClient } from "@microsoft/sp-http";
import { theContext } from "../core/instance/Context.instance";
import { clearCache, isCached, setCache } from "../util/Cache";
import { theIWeb } from "../core/instance/Web.instance";
import { sp } from "../core/Celertity";
import { SPListItem } from "../objects/ListItem.class";
export function SPPostRequest(path, headers, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const opts = {
            body: JSON.stringify(body),
            headers: Object.assign({ accept: "*/*, application/json; odata.metadata=minimal" }, (headers || {})),
        };
        return yield theContext().spHttpClient.post(path, SPHttpClient.configurations.v1, opts);
    });
}
export function itemsBy(listTitle, where, filter = () => __awaiter(this, void 0, void 0, function* () { return true; }), web = theIWeb(), props = []) {
    return __awaiter(this, void 0, void 0, function* () {
        const webKey = (yield web()).Url;
        const cacheKey = `${listTitle}_items_by_${where.trim()}_on_${webKey}`;
        const cache = isCached(cacheKey);
        if (cache)
            return cache;
        const queryProps = {
            web,
            key: "",
            listName: listTitle,
            props: ["*", ...props],
            filter,
        };
        const items = yield allItemsFiltered(queryProps);
        setCache(cacheKey, items);
        return items;
    });
}
export function allItemsFiltered({ filter: propFilter, listName, key, refresh, props, web, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const items = (yield allItems({
            listName,
            refresh,
            props,
            iweb: web,
            key: `filteredItems_${listName}_${key}`,
        })) || [];
        const itemsFiltered = [];
        for (const item of items) {
            const filter = yield propFilter(item, items.indexOf(item), items);
            if (filter)
                itemsFiltered.push(item);
        }
        return itemsFiltered;
    });
}
export function allItems({ listName, key, props = ["*"], refresh = false, iweb = sp().web, expand, }) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        const webKey = (yield iweb()).Url;
        const cacheKey = `${key}_${listName}_${props.join("-")}_on_${webKey}`;
        if (refresh) {
            clearCache(cacheKey);
        }
        const cache = isCached(cacheKey);
        if (cache)
            return cache;
        let items = [];
        const list = iweb.lists.getByTitle(listName);
        try {
            try {
                for (var _b = __asyncValues(list.items
                    .select(...props)
                    .expand(...(expand || []))
                    .top(5000)), _c; _c = yield _b.next(), !_c.done;) {
                    const batch = _c.value;
                    items = items.concat(batch);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            setCache(cacheKey, items);
        }
        catch (e) {
            //Do nothing
        }
        return items;
    });
}
export function listItemsBy(listTitle, where, filter, web = theIWeb(), constructor) {
    return __awaiter(this, void 0, void 0, function* () {
        const items = yield itemsBy(listTitle, where, filter, web, [
            "FileRef",
            "UniqueId",
        ]);
        return (items.map((item) => {
            return new (constructor || SPListItem)(listTitle, item.ID).init(item, web);
        }) || []);
    });
}
//# sourceMappingURL=SPFx.helper.js.map