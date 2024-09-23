import { SPObject } from "./Object.class";
import { sp } from "../core/Celertity";
import type { ISiteUser, ISiteUserInfo } from "@pnp/sp/site-users";
import { SPSiteGroup, groupsInit } from "./SiteGroup.class";
import { errorLog } from "../util/Debug";
import { isCached, setCache } from "../util/Cache";
import { emptyString } from "../util/Strings";
import type { IUserInfo } from "./types/User.types";

class SPLUser extends SPObject<ISiteUser> {
  public id: number;
  public loginName: string;
  public loaded: boolean = false;
  public user: IUserInfo;
  public profileObject: any;
  public fieldMap: any = {};

  constructor(id?: number, username?: string) {
    super();
    this.id = id;
    this.loginName = username;
  }

  /* The above code is defining a TypeScript function called `query` which returns an `ISiteUser`
  object. */
  query = (): ISiteUser => {
    if (!this.queryable) {
      if (this.id) this.queryable = this.web.siteUsers.getById(this.id);
      if (this.loginName)
        this.queryable = this.web.siteUsers.getByLoginName(this.loginName);

      if (!this.queryable) {
        errorLog({
          component: "User.class:Query",
          message: "Failed to create user query- no id or login name",
          type: "error",
          role: "user",
          severity: "low",
          data: { id: this.id, loginName: this.loginName },
        });
      }
    }

    return this.queryable;
  };

  /* The above code is defining a TypeScript arrow function called `systemAccount`. This function returns
a boolean value based on the condition that the result of calling the `fullName` method is equal to
the string 'System Account'. */
  systemAccount = (): boolean => this.fullName() === "System Account";

  getIcon = (): string => (this.systemAccount() ? "PlayerSettings" : "Contact");

  /**
   * > The function gets the user from the SharePoint site using either the user's ID or login name
   * @returns The user object
   */
  async get(): Promise<SPLUser> {
    if (this.loaded || this.user) return this;
    try {
      const cached = isCached(`user_${this.id}_${this.loginName}`);
      if (cached) {
        this.user = cached;
        if (this.user) {
          this.loaded = true;
        }
        return this;
      }
      const user: IUserInfo = await this.query()();
      this.user = user;
    } catch (e) {
      (e) => {
        errorLog({
          component: "User.class:Get",
          message: "Failed to load user",
          type: "error",
          role: "user",
          severity: "low",
          data: { e, id: this.id, loginName: this.loginName },
        });
      };
    }

    if (this.user) {
      this.loaded = true;
      setCache(`user_${this.id}_${this.loginName}`, this.user);
    }
    return this;
  }

  /**
   * It returns the user profile object.
   * @returns The profileObject is being returned.
   */
  public async profile() {
    if (!this.loaded) return undefined;
    if (this.profileObject) return this.profileObject;
    const cached = isCached(`user_${this.id}_${this.loginName}_profile`);
    if (cached && cached.UserProfileProperties) {
      cached.UserProfileProperties.map((field: any) => {
        this.fieldMap[field.Key] = field.Value;
      });
      this.profileObject = cached;
      return cached;
    }
    this.profileObject = await sp().profiles.getPropertiesFor(
      this.user.LoginName
    );

    if (!this.profileObject || !this.profileObject.UserProfileProperties)
      return undefined;

    this.profileObject.UserProfileProperties.map((field: any) => {
      this.fieldMap[field.Key] = field.Value;
    });
    setCache(`user_${this.id}_${this.loginName}_profile`, this.profileObject);
    return this.profileObject;
  }

  /**
   * If the user is not loaded, return undefined. Otherwise, return the user's IsSiteAdmin property
   * @returns A boolean value.
   */
  public isAdmin() {
    if (!this.loaded) return undefined;
    return this.user.IsSiteAdmin;
  }

  /**
   * If the user is not loaded, return undefined. Otherwise, return the user's login name
   * @returns The username of the current user.
   */
  public username() {
    if (!this.loaded) return undefined;
    return this.user.LoginName;
  }

  /**
   * If the user is not loaded, return undefined. Otherwise, split the user's name into first and last
   * names, and return the first letter of each
   * @returns The initials of the user's first and last name.
   */
  public initials() {
    if (!this.loaded) return undefined;
    const names = this.user.Title.split(" ");
    if (names.length === 1) names[1] = names[0];
    const firstName = names[0];
    const lastName = names[1];
    return `${firstName[0]} ${lastName[0]}`;
  }

  /**
   * It returns an array of the user's first and last name
   * @returns The names of the user.
   */
  public names() {
    if (!this.loaded) return undefined;
    const names = (this.user?.title || this.user?.Title || "No Name")
      .split(" ")
      .filter((word: string) => word.trim().length);
    if (names.length === 1) names[1] = names[0];

    return names;
  }

  /**
   * The function fullName() returns the first name and last name of the person
   * @returns The first name and the last name.
   */
  public fullName() {
    if (!this.loaded) return undefined;
    return `${this.names()[0]} ${this.names()[1]}`;
  }

  /**
   * It returns the first name in the array of names
   * @returns The first name in the array.
   */
  firstName() {
    if (!this.loaded) return undefined;
    return this.names()[0];
  }

  /**
   * The function `preferedName()` returns the value of the field 'PreferredName' if it exists in the
   * `fieldMap` object.
   * @returns the value of the field 'PreferredName' from the fieldMap.
   */
  preferedName() {
    if (!this.fieldMap) return undefined;
    return this.field("PreferredName");
  }

  /**
   * The function returns the first name from a preferred name string, or undefined if the fieldMap is
   * not defined.
   * @returns the first name from the preferred name.
   */
  preferedNameFirstName() {
    if (!this.fieldMap) return undefined;
    const names = this.preferedName()
      .split(" ")
      .filter((word: string) => word.trim().length);
    if (names.length === 1) names[1] = names[0];
    return names[0];
  }

  /**
   * The position() function returns the value of the 'Title' field if the fieldMap exists, otherwise
   * it returns undefined.
   * @returns the value of the field with the key 'Title' from the fieldMap object.
   */
  position() {
    if (!this.fieldMap) return undefined;
    return this.field("Title");
  }

  /**
   * The office function returns the value of the 'Office' field or the 'SPS-Location' field if it
   * exists, or undefined if neither field exists.
   * @returns the value of the 'Office' field or the 'SPS-Location' field.
   */
  office() {
    if (!this.fieldMap) return undefined;
    return this.field("Office") || this.field("SPS-Location");
  }

  /**
   * The function returns the value of the 'SPS-TimeZone' field if it exists, otherwise it returns
   * undefined.
   * @returns the value of the field 'SPS-TimeZone' if the fieldMap exists, otherwise it returns
   * undefined.
   */
  timezone() {
    if (!this.fieldMap) return undefined;
    return this.field("SPS-TimeZone");
  }

  /**
   * The email function returns the email address of the user if it is loaded, otherwise it returns
   * undefined.
   * @returns The email address of the user.
   */
  email() {
    if (!this.loaded) return undefined;
    return this.user.Email;
  }

  /**
   * The phone function returns the value of either the 'WorkPhone' or 'CellPhone' field, or undefined
   * if the fieldMap is not defined.
   * @returns the value of either the 'WorkPhone' field or the 'CellPhone' field.
   */
  phone() {
    if (!this.fieldMap) return undefined;
    return this.field("WorkPhone") || this.field("CellPhone");
  }

  /**
   * It returns the last name of the person
   * @returns The last name of the person.
   */
  lastName() {
    if (!this.loaded) return undefined;
    return this.names()[1];
  }

  /**
   * If the fieldMap is not defined, return undefined. Otherwise, return the fieldMap
   * @returns The fieldMap object.
   */
  public fields(): UserProfileFields {
    if (!this.fieldMap) return undefined;
    return this.fieldMap;
  }

  /**
   * It returns the value of the fieldMap property with the key of the key parameter
   * @param {keyof UserProfileFields} key - The name of the field to retrieve.
   * @returns The value of the fieldMap key.
   */
  public field(key: keyof UserProfileFields) {
    if (!this.fieldMap) return undefined;
    key = key
      ?.replaceAll("{", "")
      ?.replaceAll("}", "") as keyof UserProfileFields;

    return !emptyString(this.fieldMap[key]) ? this.fieldMap[key] : undefined;
  }

  /**
   * If the user has an email address, return the user photo from the user information list, otherwise
   * return the picture URL from the list item
   * @param {number} [size] - The size of the image you want to return.  If you don't pass a size, it
   * will return the medium size.
   * @returns The image of the user
   */
  public image(size?: number) {
    if (!this.loaded) return undefined;
    let wSize = "M";
    if (size > 80) wSize = "L";
    if (this.user.Email) {
      return `/_layouts/15/userphoto.aspx?size=${wSize}&username=${this.user.Email}`;
    }
    if (this.field("PictureURL")) {
      return this.field("PictureURL").replace("MThumb", wSize + "Thumb");
    }
    return undefined;
  }

  /**
   * If the user is loaded and has a profile object, then return true if the user has reportees
   * @returns The length of the array of reportees.
   */
  public isManager() {
    if (!this.loaded) return undefined;
    if (!this.profileObject) return undefined;

    return this.reportees().length > 0;
  }

  /**
   * If the profile is not loaded, return undefined. If the profile object is not loaded, return
   * undefined. If the profile object does not have a Peers property, return an empty array. Otherwise,
   * return an array of SPLUser objects, one for each user name in the Peers property
   * @returns An array of SPLUser objects
   */
  public coWorkers() {
    if (!this.loaded) return undefined;
    if (!this.profileObject) return undefined;
    const userNames = this.profileObject.Peers;
    if (!userNames || userNames.length === 0) return [];
    return userNames.map((userName: string) => {
      return new SPLUser(undefined, userName);
    });
  }

  /**
   * If the profile is not loaded, return undefined. If the profile object is not loaded, return
   * undefined. If the profile object does not have any direct reports, return an empty array.
   * Otherwise, return an array of SPLUser objects, one for each direct report
   * @returns An array of SPLUser objects
   */
  public reportees() {
    if (!this.loaded) return undefined;
    if (!this.profileObject) return undefined;
    const userNames = this.profileObject.DirectReports;
    if (!userNames || userNames.length === 0) return [];
    return userNames.map((userName: string) => {
      return new SPLUser(undefined, userName);
    });
  }

  /**
   * "If the profile is loaded, and the profile has a manager, return a new SPLUser object for the
   * manager."
   *
   * The first line of the function is a comment. Comments are ignored by the compiler
   * @returns A new SPLUser object
   */
  public manager() {
    if (!this.loaded) return undefined;
    if (!this.profileObject) return undefined;
    const username = this.field("Manager");
    if (!username) return undefined;
    return new SPLUser(undefined, username);
  }

  /**
   * The function initializes a SPLUser object with the provided user data.
   * @param {any} user - The "user" parameter is of type "any", which means it can accept any data
   * type. It is used to pass the user object to the constructor of the SPLUser class.
   * @returns The `SPLUser` object is being returned.
   */
  public init(user: any): SPLUser {
    this.user = user;
    this.id = user.id;
    if (this.user) {
      this.loaded = true;
    }
    return this;
  }

  _groups: SPSiteGroup[];
  /**
   * The function "groups" returns a Promise that resolves to an array of SPSiteGroup objects, either
   * from a cache or by querying the groups for a user.
   * @returns a Promise that resolves to an array of SPSiteGroup objects.
   */
  async groups(): Promise<SPSiteGroup[]> {
    if (this._groups) return this._groups;
    const cache = isCached(`user_${this.id}_${this.loginName}_groups`);
    if (cache) return cache;

    const groups = groupsInit(await this.query().groups());

    setCache(`user_${this.id}_${this.loginName}_groups`, groups);
    this._groups = groups;
    return groups;
  }

  //TODO user graph presence
  //user graph data
}

export function userInit(user: ISiteUserInfo): SPLUser {
  return new SPLUser(user.Id).init(user);
}

export function usersInit(users: ISiteUserInfo[]): SPLUser[] {
  return users.map((user: ISiteUserInfo) => userInit(user));
}

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
