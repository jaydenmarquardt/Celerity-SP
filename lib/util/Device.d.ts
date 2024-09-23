export declare enum DeviceType {
    Android = "Android",
    iOS = "iOS",
    Desktop = "Desktop",
    Other = "Other"
}
/**
 * The function `getDeviceType` returns the type of device based on the user agent string.
 * @returns The function `getDeviceType` returns a value of type `DeviceType`.
 */
export declare const getDeviceType: () => DeviceType;
export declare enum OperatingSystem {
    Windows = "Windows",
    MacOS = "Mac OS",
    Linux = "Linux",
    iOS = "iOS",
    Android = "Android",
    Unknown = "Unknown"
}
/**
 * The function `getOperatingSystem` returns the operating system based on the user agent and platform
 * information.
 * @returns The function `getOperatingSystem` returns the operating system based on the user agent and
 * platform information. The return value is of type `OperatingSystem`.
 */
export declare const getOperatingSystem: () => OperatingSystem;
export declare enum Browser {
    Chrome = "Chrome",
    Firefox = "Firefox",
    Safari = "Safari",
    Opera = "Opera",
    IE = "IE",
    Edge = "Edge",
    Unknown = "Unknown"
}
/**
 * The function `getBrowser` returns the browser type based on the user agent string.
 * @returns The function `getBrowser` returns the value of the `browser` variable, which represents the
 * detected browser based on the user agent string. The possible return values are `Browser.Chrome`,
 * `Browser.Firefox`, `Browser.Safari`, `Browser.Opera`, `Browser.IE`, `Browser.Edge`, or
 * `Browser.Unknown`.
 */
export declare const getBrowser: () => Browser;
//# sourceMappingURL=Device.d.ts.map