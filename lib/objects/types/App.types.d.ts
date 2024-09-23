import type { IWeb } from "@pnp/sp/webs/types";
export interface IAppInfo {
    AadAppId: string;
    AadPermissions: string;
    AppCatalogVersion: string;
    CanUpgrade: boolean;
    CDNLocation: string;
    ContainsTenantWideExtension: boolean;
    CurrentVersionDeployed: boolean;
    Deployed: boolean;
    ErrorMessage: string;
    ID: string;
    InstalledVersion: string;
    IsClientSideSolution: boolean;
    IsEnabled: boolean;
    IsPackageDefaultSkipFeatureDeployment: boolean;
    IsValidAppPackage: boolean;
    ProductId: string;
    ShortDescription: string;
    SkipDeploymentFeature: boolean;
    StoreAssetId: string;
    SupportsTeamsTabs: boolean;
    ThumbnailUrl: string;
    Title: string;
    catalogUrl?: string;
    webUrl?: string;
    webTitle?: string;
    iWeb?: IWeb;
}
//# sourceMappingURL=App.types.d.ts.map