import { SPCurrentUser } from "../objects/CurrentUser.class";
import { ISlimSiteInfo } from "../objects/types/Site.types";
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
import { BaseComponentContext } from "@microsoft/sp-component-base";
import { SPPageItem } from "../objects/PageItem.class";
import { SPHubSite } from "../objects/HubSite.class";

/**
 * The function sets a custom data attribute on the body element of the document.
 * @param {string} key - A string representing the key or name of the data attribute to be set on the
 * body element.
 * @param {string} value - The value parameter is a string that represents the value you want to set
 * for the specified key.
 */
export function setBodyData(key: string, value: string) {
  document.body.setAttribute(`data-${key}`, value);
}

export const initPageData = async () => {
  if (isSiteContents()) {
    setBodyData("is-sitecontents", "true");
  }
  if (isListView()) {
    setBodyData("is-list", "true");
    setBodyData("list", theListTitle());
    const list = await new SPList(theListTitle()).get();
    await addInstaceDataCheck("list", async () => list);
  }

  if (!isListItemView() || nullIsh(theItemId())) return;
  setBodyData("list", theListTitle());
  const list = await new SPList(theListTitle()).get();
  await addInstaceDataCheck("list", async () => list);
  await addInstaceDataCheck(
    "item",
    async () => await new SPListItem(theListTitle(), theItemId()).get()
  );

  if (isSitePage()) {
    await addInstaceDataCheck("page", async () => {
      const p = await new SPPageItem(theItemId()).get();
      await p.page();

      return p;
    });

    setBodyData("is-page", isSitePage()?.toString());
    setBodyData("page-layout", thePage()?.data("PageLayoutType"));
    setBodyData("is-news", thePage()?.isNews()?.toString());
    setBodyData("is-template", thePage()?.isTemplate()?.toString());
  }
};

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
export const initInstanceData = async (context: BaseComponentContext) => {
  addInstaceData("context", context);
  const user = await addInstaceDataCheck(
    "user",
    async () => await new SPCurrentUser(theUserId()).get()
  );
  await addInstaceDataCheck("profile", async () => await user.profile());
  await initPageData();

  try {
    await addInstaceDataCheck("hub", async () => {
      W["CELERITYHub"] =
        W["CELERITYHub"] ||
        (await new SPHubSite().get().catch((e) => {
          errorLog({
            component: "Instance:AddInstance.Hub",
            message: "Failed to add to instance - hub",
            type: "error",
            role: "user",
            severity: "medium",
            data: { e },
          });
        }));

      W["CELERITYConfig"] = await W["CELERITYHub"].config().catch((e) =>
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
    }).catch((e) =>
      errorLog({
        component: "Instance:Load.Hub",
        message: "Failed to load to instance - hub/config",
        type: "error",
        role: "user",
        severity: "medium",
        data: { e },
      })
    );

    (await addInstaceDataCheck(
      "webs",
      async () => await theHub()?.subWebs()
    )) as ISlimSiteInfo[];
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

  const isHub = theHub()?.data?.name === theWebTitle();

  setBodyData("is-hub-site", isHub?.toString());
  setBodyData("is-sub-site", (!isHub)?.toString());
  setBodyData("hub-name", theHub()?.data?.name);

  setBodyData("tenancy-id", theTenancyId());
  setBodyData("hub-id", theHub()?.id);
  setBodyData("site-id", theSiteId()?.toString());
  setBodyData("web-id", theWebId()?.toString());
  setBodyData("list-id", theListId()?.toString());
  setBodyData("item-id", theItemId()?.toString());
  setBodyData("user-id", theUserId()?.toString());
  setBodyData("list-title", theListTitle()?.toString());
  setBodyData("CELERITY-version", "1.0.1.1");
  setBodyData("device", getDeviceType());
  setBodyData("os", getOperatingSystem());
  setBodyData("browser", getBrowser());
};
export const onNewPageInstanceData = async (context: BaseComponentContext) => {
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
    await initPageData();

    setBodyData("list-id", theListId()?.toString());
    setBodyData("item-id", theItemId()?.toString());
    setBodyData("list-title", theListTitle()?.toString());
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
};
