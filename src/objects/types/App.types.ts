import type { IWeb } from "@pnp/sp/webs/types";

export interface IAppInfo {
  AadAppId: string; //UUID
  AadPermissions: string; //Command separated list of graph permissions
  AppCatalogVersion: string;
  CanUpgrade: boolean;
  CDNLocation: string; //'SharePoint Online'
  ContainsTenantWideExtension: boolean;
  CurrentVersionDeployed: boolean;
  Deployed: boolean;
  ErrorMessage: string; //Error message
  ID: string; //uuid
  InstalledVersion: string;
  IsClientSideSolution: boolean;
  IsEnabled: boolean;
  IsPackageDefaultSkipFeatureDeployment: boolean;
  IsValidAppPackage: boolean;
  ProductId: string; //uuid
  ShortDescription: string;
  SkipDeploymentFeature: boolean;
  StoreAssetId: string;
  SupportsTeamsTabs: boolean;
  ThumbnailUrl: string;
  Title: string;

  //Custom
  catalogUrl?: string;
  webUrl?: string;
  webTitle?: string;
  iWeb?: IWeb;
}
