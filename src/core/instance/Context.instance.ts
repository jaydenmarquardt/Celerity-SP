import { BaseComponentContext } from "@microsoft/sp-component-base";
import { instance } from "./Base.instance";
import type { IPageContext } from "../types/Context.types";

/**
 * The function returns the context of a base component.
 * @returns the value of `W[INSTANCE_KEY]['context']`.
 */
export const theContext = (): BaseComponentContext => {
  return instance()["context"];
};

/**
 * The function `thePageContext` returns the page context.
 * @returns the `pageContext` property of the `theContext()` function, casted as `any`.
 */
export const thePageContext = (): IPageContext => {
  return theContext()?.pageContext as any;
};

/**
 * The function `theLegacyContext` returns the legacy page context from `thePageContext`.
 * @returns the `legacyPageContext` property of the `thePageContext()` function.
 */
// @deprecated - will break eventually
export const theLegacyContext = (): any => {
  return thePageContext()?.legacyPageContext;
};

export const theRequestPath = (): string => {
  return thePageContext()?.site?.serverRequestPath;
};

export const isSiteContents = (): boolean => {
  return theRequestPath() === "/_layouts/15/viewlsts.aspx";
};

export const isListView = (): boolean => {
  const context = thePageContext();
  if (context?.list === undefined) return false;
  if (context?.listItem !== undefined) return false;
  return true;
};

export const isListItemView = (listTitle?: string): boolean => {
  const context = thePageContext();
  if (context?.list === undefined) return false;
  if (context?.listItem === undefined) return false;

  return !listTitle || context?.list?.title === listTitle;
};

export const isPageView = (): boolean => {
  return thePageContext()?.list?.title === "Site Pages";
};
export const isFrontEnd = (): boolean => {
  return isListItemView();
};
export const isBackend = (): boolean => {
  return !isFrontEnd();
};
