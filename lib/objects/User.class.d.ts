import { SPObject } from "./Object.class";
import type { ISiteUser, ISiteUserInfo } from "@pnp/sp/site-users";
import { SPSiteGroup } from "./SiteGroup.class";
import type { IUserInfo } from "./types/User.types";
declare class SPLUser extends SPObject<ISiteUser> {
    id: number;
    loginName: string;
    loaded: boolean;
    user: IUserInfo;
    profileObject: any;
    fieldMap: any;
    constructor(id?: number, username?: string);
    query: () => ISiteUser;
    systemAccount: () => boolean;
    getIcon: () => string;
    /**
     * > The function gets the user from the SharePoint site using either the user's ID or login name
     * @returns The user object
     */
    get(): Promise<SPLUser>;
    /**
     * It returns the user profile object.
     * @returns The profileObject is being returned.
     */
    profile(): Promise<any>;
    /**
     * If the user is not loaded, return undefined. Otherwise, return the user's IsSiteAdmin property
     * @returns A boolean value.
     */
    isAdmin(): boolean;
    /**
     * If the user is not loaded, return undefined. Otherwise, return the user's login name
     * @returns The username of the current user.
     */
    username(): string;
    /**
     * If the user is not loaded, return undefined. Otherwise, split the user's name into first and last
     * names, and return the first letter of each
     * @returns The initials of the user's first and last name.
     */
    initials(): string;
    /**
     * It returns an array of the user's first and last name
     * @returns The names of the user.
     */
    names(): string[];
    /**
     * The function fullName() returns the first name and last name of the person
     * @returns The first name and the last name.
     */
    fullName(): string;
    /**
     * It returns the first name in the array of names
     * @returns The first name in the array.
     */
    firstName(): string;
    /**
     * The function `preferedName()` returns the value of the field 'PreferredName' if it exists in the
     * `fieldMap` object.
     * @returns the value of the field 'PreferredName' from the fieldMap.
     */
    preferedName(): any;
    /**
     * The function returns the first name from a preferred name string, or undefined if the fieldMap is
     * not defined.
     * @returns the first name from the preferred name.
     */
    preferedNameFirstName(): any;
    /**
     * The position() function returns the value of the 'Title' field if the fieldMap exists, otherwise
     * it returns undefined.
     * @returns the value of the field with the key 'Title' from the fieldMap object.
     */
    position(): any;
    /**
     * The office function returns the value of the 'Office' field or the 'SPS-Location' field if it
     * exists, or undefined if neither field exists.
     * @returns the value of the 'Office' field or the 'SPS-Location' field.
     */
    office(): any;
    /**
     * The function returns the value of the 'SPS-TimeZone' field if it exists, otherwise it returns
     * undefined.
     * @returns the value of the field 'SPS-TimeZone' if the fieldMap exists, otherwise it returns
     * undefined.
     */
    timezone(): any;
    /**
     * The email function returns the email address of the user if it is loaded, otherwise it returns
     * undefined.
     * @returns The email address of the user.
     */
    email(): string;
    /**
     * The phone function returns the value of either the 'WorkPhone' or 'CellPhone' field, or undefined
     * if the fieldMap is not defined.
     * @returns the value of either the 'WorkPhone' field or the 'CellPhone' field.
     */
    phone(): any;
    /**
     * It returns the last name of the person
     * @returns The last name of the person.
     */
    lastName(): string;
    /**
     * If the fieldMap is not defined, return undefined. Otherwise, return the fieldMap
     * @returns The fieldMap object.
     */
    fields(): UserProfileFields;
    /**
     * It returns the value of the fieldMap property with the key of the key parameter
     * @param {keyof UserProfileFields} key - The name of the field to retrieve.
     * @returns The value of the fieldMap key.
     */
    field(key: keyof UserProfileFields): any;
    /**
     * If the user has an email address, return the user photo from the user information list, otherwise
     * return the picture URL from the list item
     * @param {number} [size] - The size of the image you want to return.  If you don't pass a size, it
     * will return the medium size.
     * @returns The image of the user
     */
    image(size?: number): any;
    /**
     * If the user is loaded and has a profile object, then return true if the user has reportees
     * @returns The length of the array of reportees.
     */
    isManager(): boolean;
    /**
     * If the profile is not loaded, return undefined. If the profile object is not loaded, return
     * undefined. If the profile object does not have a Peers property, return an empty array. Otherwise,
     * return an array of SPLUser objects, one for each user name in the Peers property
     * @returns An array of SPLUser objects
     */
    coWorkers(): any;
    /**
     * If the profile is not loaded, return undefined. If the profile object is not loaded, return
     * undefined. If the profile object does not have any direct reports, return an empty array.
     * Otherwise, return an array of SPLUser objects, one for each direct report
     * @returns An array of SPLUser objects
     */
    reportees(): any;
    /**
     * "If the profile is loaded, and the profile has a manager, return a new SPLUser object for the
     * manager."
     *
     * The first line of the function is a comment. Comments are ignored by the compiler
     * @returns A new SPLUser object
     */
    manager(): SPLUser;
    /**
     * The function initializes a SPLUser object with the provided user data.
     * @param {any} user - The "user" parameter is of type "any", which means it can accept any data
     * type. It is used to pass the user object to the constructor of the SPLUser class.
     * @returns The `SPLUser` object is being returned.
     */
    init(user: any): SPLUser;
    _groups: SPSiteGroup[];
    /**
     * The function "groups" returns a Promise that resolves to an array of SPSiteGroup objects, either
     * from a cache or by querying the groups for a user.
     * @returns a Promise that resolves to an array of SPSiteGroup objects.
     */
    groups(): Promise<SPSiteGroup[]>;
}
export declare function userInit(user: ISiteUserInfo): SPLUser;
export declare function usersInit(users: ISiteUserInfo[]): SPLUser[];
export { SPLUser };
export interface UserProfileFields {
    ADGuid: string;
    AboutMe: string;
    AccountName: string;
    Assistant: string;
    CellPhone: string;
    Department: string;
    DelveFlags: string;
    Fax: string;
    FirstName: string;
    HomePhone: string;
    LastName: string;
    Manager: string;
    Office: string;
    OfficeGraphEnabled: string;
    PersonalSpace: string;
    PictureURL: string;
    PreferredDataLocation: string;
    PreferredName: string;
    PulseMRUPeople: string;
    QuickLinks: string;
    SID: string;
    "SPS-AdjustHijriDays": string;
    "SPS-AltCalendarType": string;
    "SPS-Birthday": string;
    "SPS-CalendarType": string;
    "SPS-ClaimID": string;
    "SPS-ClaimProviderID": string;
    "SPS-ClaimProviderType": string;
    "SPS-ContentLanguages": string;
    "SPS-DataSource": string;
    "SPS-Department": string;
    "SPS-DisplayOrder": string;
    "SPS-DistinguishedName": string;
    "SPS-DontSuggestList": string;
    "SPS-Dotted-line": string;
    "SPS-EmailOptin": string;
    "SPS-FeedIdentifier": string;
    "SPS-FirstDayOfWeek": string;
    "SPS-FirstWeekOfYear": string;
    "SPS-HideFromAddressLists": string;
    "SPS-HireDate": string;
    "SPS-Interests": string;
    "SPS-JobTitle": string;
    "SPS-LastColleagueAdded": string;
    "SPS-LastKeywordAdded": string;
    "SPS-Location": string;
    "SPS-Locale": string;
    "SPS-MUILanguages": string;
    "SPS-MasterAccountName": string;
    "SPS-MemberOf": string;
    "SPS-MultiGeoFlags": string;
    "SPS-MySiteUpgrade": string;
    "SPS-O15FirstRunExperience": string;
    "SPS-OWAUrl": string;
    "SPS-ObjectExists": string;
    "SPS-PastProjects": string;
    "SPS-Peers": string;
    "SPS-PersonalSiteCapabilities": string;
    "SPS-PersonalSiteFirstCreationError": string;
    "SPS-PersonalSiteFirstCreationTime": string;
    "SPS-PersonalSiteInstantiationState": string;
    "SPS-PersonalSiteLastCreationTime": string;
    "SPS-PersonalSiteNumberOfRetries": string;
    "SPS-PictureExchangeSyncState": string;
    "SPS-PicturePlaceholderState": string;
    "SPS-PictureTimestamp": string;
    "SPS-PointPublishingUrl": string;
    "SPS-PrivacyActivity": string;
    "SPS-PrivacyPeople": string;
    "SPS-ProxyAddresses": string;
    "SPS-PublicSiteRedirect": string;
    "SPS-RecipientTypeDetails": string;
    "SPS-RegionalSettings-FollowWeb": string;
    "SPS-RegionalSettings-Initialized": string;
    "SPS-Responsibility": string;
    "SPS-SIPAddress": string;
    "SPS-SavedAccountName": string;
    "SPS-SavedSID": string;
    "SPS-School": string;
    "SPS-SharePointHomeExperienceState": string;
    "SPS-ShowWeeks": string;
    "SPS-SourceObjectDN": string;
    "SPS-StatusNotes": string;
    "SPS-TenantInstanceId": string;
    "SPS-Time24": string;
    "SPS-TimeZone": string;
    "SPS-UserPrincipalName": string;
    "SPS-UserType": string;
    "SPS-WebSite": string;
    "SPS-WorkDayEndHour": string;
    "SPS-WorkDayStartHour": string;
    "SPS-WorkDays": string;
    "SPS-RefreshToken": string;
    "SPS-ResourceAccountName": string;
    "SPS-ResourceSID": string;
    "SPS-Skills": string;
    "SPS-SipAddress": string;
    SPUserProfile_GUID: string;
    Title: string;
    UserName: string;
    WorkEmail: string;
    WorkPhone: string;
    "msOnline-ObjectId": string;
}
//# sourceMappingURL=User.class.d.ts.map