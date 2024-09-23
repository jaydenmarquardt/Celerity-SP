import { ServiceKey } from "@microsoft/sp-core-library";

export interface IPageContext {
  readonly serviceKey: ServiceKey<any>;
  _logSource;
  _pageContextInfoId;
  _pageContextUserDynamicProperty;
  _pageContextSiteDataDynamicProperty;
  _pageContextUrlDataDynamicProperty;
  _pageContextSearchDataDynamicProperty;
  _aadInfo;
  _cultureInfo;
  _list;
  _listItem;
  _page;
  _site;
  _user;
  _web;
  _spFeatureInfo;
  _legacyPageContext;
  _isInitialized;
  _serviceScope;
  _pageContextDataSource;
  _searchData;
  _initializationData;
  _getPropertyDefinitions;
  _getPropertyValue;
  _getAnnotatedPropertyValue;
  _getUrlQueryParameterCollection;
  _getUrlFragmentIdentifier;

  get aadInfo(): IAzureActiveDirectoryInfo; //AzureActiveDirectoryInfo
  get cultureInfo(): any; //CultureInfo
  get list(): any | undefined; //SPList
  get listItem(): any | undefined; //SPListItem
  get site(): any; //SPSite
  get user(): any; //SPUser
  get web(): any; //SPWeb
  get legacyPageContext(): any;
  get isInitialized(): boolean;
}

export interface IGuid {
  _guid: string;
  toString: () => string;
}
type MaybeMore = { [key: string]: any };

export interface IAzureActiveDirectoryInfo extends MaybeMore {
  instanceUrl: string;
  tenantId: IGuid;
  userId: IGuid;
}
