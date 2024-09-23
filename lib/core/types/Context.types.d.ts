import { ServiceKey } from "@microsoft/sp-core-library";
export interface IPageContext {
    readonly serviceKey: ServiceKey<any>;
    _logSource: any;
    _pageContextInfoId: any;
    _pageContextUserDynamicProperty: any;
    _pageContextSiteDataDynamicProperty: any;
    _pageContextUrlDataDynamicProperty: any;
    _pageContextSearchDataDynamicProperty: any;
    _aadInfo: any;
    _cultureInfo: any;
    _list: any;
    _listItem: any;
    _page: any;
    _site: any;
    _user: any;
    _web: any;
    _spFeatureInfo: any;
    _legacyPageContext: any;
    _isInitialized: any;
    _serviceScope: any;
    _pageContextDataSource: any;
    _searchData: any;
    _initializationData: any;
    _getPropertyDefinitions: any;
    _getPropertyValue: any;
    _getAnnotatedPropertyValue: any;
    _getUrlQueryParameterCollection: any;
    _getUrlFragmentIdentifier: any;
    get aadInfo(): IAzureActiveDirectoryInfo;
    get cultureInfo(): any;
    get list(): any | undefined;
    get listItem(): any | undefined;
    get site(): any;
    get user(): any;
    get web(): any;
    get legacyPageContext(): any;
    get isInitialized(): boolean;
}
export interface IGuid {
    _guid: string;
    toString: () => string;
}
declare type MaybeMore = {
    [key: string]: any;
};
export interface IAzureActiveDirectoryInfo extends MaybeMore {
    instanceUrl: string;
    tenantId: IGuid;
    userId: IGuid;
}
export {};
//# sourceMappingURL=Context.types.d.ts.map