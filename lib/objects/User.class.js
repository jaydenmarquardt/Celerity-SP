var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SPObject } from "./Object.class";
import { sp } from "../core/Celertity";
import { groupsInit } from "./SiteGroup.class";
import { errorLog } from "../util/Debug";
import { isCached, setCache } from "../util/Cache";
import { emptyString } from "../util/Strings";
class SPLUser extends SPObject {
    constructor(id, username) {
        super();
        this.loaded = false;
        this.fieldMap = {};
        /* The above code is defining a TypeScript function called `query` which returns an `ISiteUser`
        object. */
        this.query = () => {
            if (!this.queryable) {
                if (this.id)
                    this.queryable = this.web.siteUsers.getById(this.id);
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
        this.systemAccount = () => this.fullName() === "System Account";
        this.getIcon = () => (this.systemAccount() ? "PlayerSettings" : "Contact");
        this.id = id;
        this.loginName = username;
    }
    /**
     * > The function gets the user from the SharePoint site using either the user's ID or login name
     * @returns The user object
     */
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.loaded || this.user)
                return this;
            try {
                const cached = isCached(`user_${this.id}_${this.loginName}`);
                if (cached) {
                    this.user = cached;
                    if (this.user) {
                        this.loaded = true;
                    }
                    return this;
                }
                const user = yield this.query()();
                this.user = user;
            }
            catch (e) {
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
        });
    }
    /**
     * It returns the user profile object.
     * @returns The profileObject is being returned.
     */
    profile() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.loaded)
                return undefined;
            if (this.profileObject)
                return this.profileObject;
            const cached = isCached(`user_${this.id}_${this.loginName}_profile`);
            if (cached && cached.UserProfileProperties) {
                cached.UserProfileProperties.map((field) => {
                    this.fieldMap[field.Key] = field.Value;
                });
                this.profileObject = cached;
                return cached;
            }
            this.profileObject = yield sp().profiles.getPropertiesFor(this.user.LoginName);
            if (!this.profileObject || !this.profileObject.UserProfileProperties)
                return undefined;
            this.profileObject.UserProfileProperties.map((field) => {
                this.fieldMap[field.Key] = field.Value;
            });
            setCache(`user_${this.id}_${this.loginName}_profile`, this.profileObject);
            return this.profileObject;
        });
    }
    /**
     * If the user is not loaded, return undefined. Otherwise, return the user's IsSiteAdmin property
     * @returns A boolean value.
     */
    isAdmin() {
        if (!this.loaded)
            return undefined;
        return this.user.IsSiteAdmin;
    }
    /**
     * If the user is not loaded, return undefined. Otherwise, return the user's login name
     * @returns The username of the current user.
     */
    username() {
        if (!this.loaded)
            return undefined;
        return this.user.LoginName;
    }
    /**
     * If the user is not loaded, return undefined. Otherwise, split the user's name into first and last
     * names, and return the first letter of each
     * @returns The initials of the user's first and last name.
     */
    initials() {
        if (!this.loaded)
            return undefined;
        const names = this.user.Title.split(" ");
        if (names.length === 1)
            names[1] = names[0];
        const firstName = names[0];
        const lastName = names[1];
        return `${firstName[0]} ${lastName[0]}`;
    }
    /**
     * It returns an array of the user's first and last name
     * @returns The names of the user.
     */
    names() {
        var _a, _b;
        if (!this.loaded)
            return undefined;
        const names = (((_a = this.user) === null || _a === void 0 ? void 0 : _a.title) || ((_b = this.user) === null || _b === void 0 ? void 0 : _b.Title) || "No Name")
            .split(" ")
            .filter((word) => word.trim().length);
        if (names.length === 1)
            names[1] = names[0];
        return names;
    }
    /**
     * The function fullName() returns the first name and last name of the person
     * @returns The first name and the last name.
     */
    fullName() {
        if (!this.loaded)
            return undefined;
        return `${this.names()[0]} ${this.names()[1]}`;
    }
    /**
     * It returns the first name in the array of names
     * @returns The first name in the array.
     */
    firstName() {
        if (!this.loaded)
            return undefined;
        return this.names()[0];
    }
    /**
     * The function `preferedName()` returns the value of the field 'PreferredName' if it exists in the
     * `fieldMap` object.
     * @returns the value of the field 'PreferredName' from the fieldMap.
     */
    preferedName() {
        if (!this.fieldMap)
            return undefined;
        return this.field("PreferredName");
    }
    /**
     * The function returns the first name from a preferred name string, or undefined if the fieldMap is
     * not defined.
     * @returns the first name from the preferred name.
     */
    preferedNameFirstName() {
        if (!this.fieldMap)
            return undefined;
        const names = this.preferedName()
            .split(" ")
            .filter((word) => word.trim().length);
        if (names.length === 1)
            names[1] = names[0];
        return names[0];
    }
    /**
     * The position() function returns the value of the 'Title' field if the fieldMap exists, otherwise
     * it returns undefined.
     * @returns the value of the field with the key 'Title' from the fieldMap object.
     */
    position() {
        if (!this.fieldMap)
            return undefined;
        return this.field("Title");
    }
    /**
     * The office function returns the value of the 'Office' field or the 'SPS-Location' field if it
     * exists, or undefined if neither field exists.
     * @returns the value of the 'Office' field or the 'SPS-Location' field.
     */
    office() {
        if (!this.fieldMap)
            return undefined;
        return this.field("Office") || this.field("SPS-Location");
    }
    /**
     * The function returns the value of the 'SPS-TimeZone' field if it exists, otherwise it returns
     * undefined.
     * @returns the value of the field 'SPS-TimeZone' if the fieldMap exists, otherwise it returns
     * undefined.
     */
    timezone() {
        if (!this.fieldMap)
            return undefined;
        return this.field("SPS-TimeZone");
    }
    /**
     * The email function returns the email address of the user if it is loaded, otherwise it returns
     * undefined.
     * @returns The email address of the user.
     */
    email() {
        if (!this.loaded)
            return undefined;
        return this.user.Email;
    }
    /**
     * The phone function returns the value of either the 'WorkPhone' or 'CellPhone' field, or undefined
     * if the fieldMap is not defined.
     * @returns the value of either the 'WorkPhone' field or the 'CellPhone' field.
     */
    phone() {
        if (!this.fieldMap)
            return undefined;
        return this.field("WorkPhone") || this.field("CellPhone");
    }
    /**
     * It returns the last name of the person
     * @returns The last name of the person.
     */
    lastName() {
        if (!this.loaded)
            return undefined;
        return this.names()[1];
    }
    /**
     * If the fieldMap is not defined, return undefined. Otherwise, return the fieldMap
     * @returns The fieldMap object.
     */
    fields() {
        if (!this.fieldMap)
            return undefined;
        return this.fieldMap;
    }
    /**
     * It returns the value of the fieldMap property with the key of the key parameter
     * @param {keyof UserProfileFields} key - The name of the field to retrieve.
     * @returns The value of the fieldMap key.
     */
    field(key) {
        var _a;
        if (!this.fieldMap)
            return undefined;
        key = (_a = key === null || key === void 0 ? void 0 : key.replaceAll("{", "")) === null || _a === void 0 ? void 0 : _a.replaceAll("}", "");
        return !emptyString(this.fieldMap[key]) ? this.fieldMap[key] : undefined;
    }
    /**
     * If the user has an email address, return the user photo from the user information list, otherwise
     * return the picture URL from the list item
     * @param {number} [size] - The size of the image you want to return.  If you don't pass a size, it
     * will return the medium size.
     * @returns The image of the user
     */
    image(size) {
        if (!this.loaded)
            return undefined;
        let wSize = "M";
        if (size > 80)
            wSize = "L";
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
    isManager() {
        if (!this.loaded)
            return undefined;
        if (!this.profileObject)
            return undefined;
        return this.reportees().length > 0;
    }
    /**
     * If the profile is not loaded, return undefined. If the profile object is not loaded, return
     * undefined. If the profile object does not have a Peers property, return an empty array. Otherwise,
     * return an array of SPLUser objects, one for each user name in the Peers property
     * @returns An array of SPLUser objects
     */
    coWorkers() {
        if (!this.loaded)
            return undefined;
        if (!this.profileObject)
            return undefined;
        const userNames = this.profileObject.Peers;
        if (!userNames || userNames.length === 0)
            return [];
        return userNames.map((userName) => {
            return new SPLUser(undefined, userName);
        });
    }
    /**
     * If the profile is not loaded, return undefined. If the profile object is not loaded, return
     * undefined. If the profile object does not have any direct reports, return an empty array.
     * Otherwise, return an array of SPLUser objects, one for each direct report
     * @returns An array of SPLUser objects
     */
    reportees() {
        if (!this.loaded)
            return undefined;
        if (!this.profileObject)
            return undefined;
        const userNames = this.profileObject.DirectReports;
        if (!userNames || userNames.length === 0)
            return [];
        return userNames.map((userName) => {
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
    manager() {
        if (!this.loaded)
            return undefined;
        if (!this.profileObject)
            return undefined;
        const username = this.field("Manager");
        if (!username)
            return undefined;
        return new SPLUser(undefined, username);
    }
    /**
     * The function initializes a SPLUser object with the provided user data.
     * @param {any} user - The "user" parameter is of type "any", which means it can accept any data
     * type. It is used to pass the user object to the constructor of the SPLUser class.
     * @returns The `SPLUser` object is being returned.
     */
    init(user) {
        this.user = user;
        this.id = user.id;
        if (this.user) {
            this.loaded = true;
        }
        return this;
    }
    /**
     * The function "groups" returns a Promise that resolves to an array of SPSiteGroup objects, either
     * from a cache or by querying the groups for a user.
     * @returns a Promise that resolves to an array of SPSiteGroup objects.
     */
    groups() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._groups)
                return this._groups;
            const cache = isCached(`user_${this.id}_${this.loginName}_groups`);
            if (cache)
                return cache;
            const groups = groupsInit(yield this.query().groups());
            setCache(`user_${this.id}_${this.loginName}_groups`, groups);
            this._groups = groups;
            return groups;
        });
    }
}
export function userInit(user) {
    return new SPLUser(user.Id).init(user);
}
export function usersInit(users) {
    return users.map((user) => userInit(user));
}
export { SPLUser };
//# sourceMappingURL=User.class.js.map