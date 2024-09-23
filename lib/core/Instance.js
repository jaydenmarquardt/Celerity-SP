var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { SPCurrentUser } from "../objects/CurrentUser.class";
import { nullIsh } from "../util/Booleans";
import { errorLog } from "../util/Debug";
import { getDeviceType, getOperatingSystem, getBrowser } from "../util/Device";
import { addListener, triggerEvent } from "../util/Listeners";
import { W } from "../util/Util.types";
import { SPListItem } from "../objects/ListItem.class";
import { SPList } from "../objects/List.class";
import {
  isListItemView,
  isListView,
  isSiteContents,
} from "./instance/Context.instance";
import {
  addInstaceDataCheck,
  addInstaceData,
  clearInstanceData,
} from "./instance/Base.instance";
import { theHub } from "./instance/Hub.instance";
import { theListTitle, isSitePage, theListId } from "./instance/List.instance";
import { theItemId, thePage } from "./instance/ListItem.instance";
import { theSiteId } from "./instance/Site.instance";
import { theTenancyId } from "./instance/Tenancy.instance";
import { theUserId } from "./instance/User.instance";
import { theWebTitle, theWebId } from "./instance/Web.instance";
import { SPPageItem } from "../objects/PageItem.class";
import { SPHubSite } from "../objects/HubSite.class";
/**
 * The function sets a custom data attribute on the body element of the document.
 * @param {string} key - A string representing the key or name of the data attribute to be set on the
 * body element.
 * @param {string} value - The value parameter is a string that represents the value you want to set
 * for the specified key.
 */
export function setBodyData(key, value) {
  document.body.setAttribute(`data-${key}`, value);
}
export const initPageData = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    if (isSiteContents()) {
      setBodyData("is-sitecontents", "true");
    }
    if (isListView()) {
      setBodyData("is-list", "true");
      setBodyData("list", theListTitle());
      const list = yield new SPList(theListTitle()).get();
      yield addInstaceDataCheck("list", () =>
        __awaiter(void 0, void 0, void 0, function* () {
          return list;
        })
      );
    }
    if (!isListItemView() || nullIsh(theItemId())) return;
    setBodyData("list", theListTitle());
    const list = yield new SPList(theListTitle()).get();
    yield addInstaceDataCheck("list", () =>
      __awaiter(void 0, void 0, void 0, function* () {
        return list;
      })
    );
    yield addInstaceDataCheck("item", () =>
      __awaiter(void 0, void 0, void 0, function* () {
        return yield new SPListItem(theListTitle(), theItemId()).get();
      })
    );
    if (isSitePage()) {
      yield addInstaceDataCheck("page", () =>
        __awaiter(void 0, void 0, void 0, function* () {
          const p = yield new SPPageItem(theItemId()).get();
          yield p.page();
          return p;
        })
      );
      setBodyData(
        "is-page",
        (_a = isSitePage()) === null || _a === void 0 ? void 0 : _a.toString()
      );
      setBodyData(
        "page-layout",
        (_b = thePage()) === null || _b === void 0
          ? void 0
          : _b.data("PageLayoutType")
      );
      setBodyData(
        "is-news",
        (_d =
          (_c = thePage()) === null || _c === void 0 ? void 0 : _c.isNews()) ===
          null || _d === void 0
          ? void 0
          : _d.toString()
      );
      setBodyData(
        "is-template",
        (_f =
          (_e = thePage()) === null || _e === void 0
            ? void 0
            : _e.isTemplate()) === null || _f === void 0
          ? void 0
          : _f.toString()
      );
    }
  });
/**
 * The `initInstanceData` function initializes instance data by fetching various information and
 * setting them as body data.
 * @param {BaseComponentContext} context - The context parameter is of type BaseComponentContext. It is
 * used to provide the context of the component where the initInstanceData function is being called.
 * This context can be used to access properties and methods specific to the component.
 * @param {ICELERITYConfig | Partial<ICELERITYConfig>} config - The `config` parameter is an object that
 * represents the configuration settings for the CELERITY instance. It can be of type `ICELERITYConfig` or
 * `Partial<ICELERITYConfig>`.
 */
export const initInstanceData = (context) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    addInstaceData("context", context);
    const user = yield addInstaceDataCheck("user", () =>
      __awaiter(void 0, void 0, void 0, function* () {
        return yield new SPCurrentUser(theUserId()).get();
      })
    );
    yield addInstaceDataCheck("profile", () =>
      __awaiter(void 0, void 0, void 0, function* () {
        return yield user.profile();
      })
    );
    yield initPageData();
    try {
      yield addInstaceDataCheck("hub", () =>
        __awaiter(void 0, void 0, void 0, function* () {
          W["CELERITYHub"] =
            W["CELERITYHub"] ||
            (yield new SPHubSite().get().catch((e) => {
              errorLog({
                component: "Instance:AddInstance.Hub",
                message: "Failed to add to instance - hub",
                type: "error",
                role: "user",
                severity: "medium",
                data: { e },
              });
            }));
          W["CELERITYConfig"] = yield W["CELERITYHub"].config().catch((e) =>
            errorLog({
              component: "Instance:LoadHubConfig",
              message: "Failed to load hub config",
              type: "error",
              role: "user",
              severity: "medium",
              data: { e },
            })
          );
          addListener("hubConfigChange", ([newConfig]) => {
            W["CELERITYConfig"] = newConfig;
          });
          return W["CELERITYHub"];
        })
      ).catch((e) =>
        errorLog({
          component: "Instance:Load.Hub",
          message: "Failed to load to instance - hub/config",
          type: "error",
          role: "user",
          severity: "medium",
          data: { e },
        })
      );
      yield addInstaceDataCheck("webs", () =>
        __awaiter(void 0, void 0, void 0, function* () {
          var _u;
          return yield (_u = theHub()) === null || _u === void 0
            ? void 0
            : _u.subWebs();
        })
      );
    } catch (e) {
      errorLog({
        component: "Instance:Load.Hub",
        message: "Failed to load hub",
        type: "error",
        role: "user",
        severity: "medium",
        data: { e },
      });
    }
    const isHub =
      ((_h = (_g = theHub()) === null || _g === void 0 ? void 0 : _g.data) ===
        null || _h === void 0
        ? void 0
        : _h.name) === theWebTitle();
    setBodyData(
      "is-hub-site",
      isHub === null || isHub === void 0 ? void 0 : isHub.toString()
    );
    setBodyData(
      "is-sub-site",
      (_j = !isHub) === null || _j === void 0 ? void 0 : _j.toString()
    );
    setBodyData(
      "hub-name",
      (_l = (_k = theHub()) === null || _k === void 0 ? void 0 : _k.data) ===
        null || _l === void 0
        ? void 0
        : _l.name
    );
    setBodyData("tenancy-id", theTenancyId());
    setBodyData(
      "hub-id",
      (_m = theHub()) === null || _m === void 0 ? void 0 : _m.id
    );
    setBodyData(
      "site-id",
      (_o = theSiteId()) === null || _o === void 0 ? void 0 : _o.toString()
    );
    setBodyData(
      "web-id",
      (_p = theWebId()) === null || _p === void 0 ? void 0 : _p.toString()
    );
    setBodyData(
      "list-id",
      (_q = theListId()) === null || _q === void 0 ? void 0 : _q.toString()
    );
    setBodyData(
      "item-id",
      (_r = theItemId()) === null || _r === void 0 ? void 0 : _r.toString()
    );
    setBodyData(
      "user-id",
      (_s = theUserId()) === null || _s === void 0 ? void 0 : _s.toString()
    );
    setBodyData(
      "list-title",
      (_t = theListTitle()) === null || _t === void 0 ? void 0 : _t.toString()
    );
    setBodyData("CELERITY-version", "1.0.1.1");
    setBodyData("device", getDeviceType());
    setBodyData("os", getOperatingSystem());
    setBodyData("browser", getBrowser());
  });
export const onNewPageInstanceData = (context) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _v, _w, _x;
    try {
      const oldPage = thePage();
      //New context data
      addInstaceData("context", context);
      //Clear old page data
      clearInstanceData("item");
      clearInstanceData("list");
      clearInstanceData("page");
      clearInstanceData("parentPage");
      //New page data
      yield initPageData();
      setBodyData(
        "list-id",
        (_v = theListId()) === null || _v === void 0 ? void 0 : _v.toString()
      );
      setBodyData(
        "item-id",
        (_w = theItemId()) === null || _w === void 0 ? void 0 : _w.toString()
      );
      setBodyData(
        "list-title",
        (_x = theListTitle()) === null || _x === void 0 ? void 0 : _x.toString()
      );
      const newPage = thePage();
      triggerEvent("pageChanged", oldPage, newPage);
    } catch (e) {
      errorLog({
        component: "Instance:OnNewPage",
        message: "Failed to set new page data",
        type: "error",
        role: "user",
        severity: "critical",
        data: { e },
      });
    }
  });
//# sourceMappingURL=Instance.js.map
