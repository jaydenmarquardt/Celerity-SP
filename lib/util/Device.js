export var DeviceType;
(function (DeviceType) {
    DeviceType["Android"] = "Android";
    DeviceType["iOS"] = "iOS";
    DeviceType["Desktop"] = "Desktop";
    DeviceType["Other"] = "Other";
})(DeviceType || (DeviceType = {}));
/**
 * The function `getDeviceType` returns the type of device based on the user agent string.
 * @returns The function `getDeviceType` returns a value of type `DeviceType`.
 */
export const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/Android/i.test(ua)) {
        return DeviceType.Android;
    }
    if (/iPhone|iPad|iPod/i.test(ua)) {
        return DeviceType.iOS;
    }
    if (/Windows|Macintosh|Linux|Ubuntu/i.test(ua)) {
        return DeviceType.Desktop;
    }
    return DeviceType.Other;
};
export var OperatingSystem;
(function (OperatingSystem) {
    OperatingSystem["Windows"] = "Windows";
    OperatingSystem["MacOS"] = "Mac OS";
    OperatingSystem["Linux"] = "Linux";
    OperatingSystem["iOS"] = "iOS";
    OperatingSystem["Android"] = "Android";
    OperatingSystem["Unknown"] = "Unknown";
})(OperatingSystem || (OperatingSystem = {}));
/**
 * The function `getOperatingSystem` returns the operating system based on the user agent and platform
 * information.
 * @returns The function `getOperatingSystem` returns the operating system based on the user agent and
 * platform information. The return value is of type `OperatingSystem`.
 */
export const getOperatingSystem = () => {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    let os = OperatingSystem.Unknown;
    if (/Mac/.test(platform)) {
        os = OperatingSystem.MacOS;
    }
    else if (/Win/.test(platform)) {
        os = OperatingSystem.Windows;
    }
    else if (/Linux/.test(platform)) {
        os = OperatingSystem.Linux;
    }
    else if (/Android/.test(userAgent)) {
        os = OperatingSystem.Android;
    }
    else if (/iPhone|iPad|iPod/.test(userAgent)) {
        os = OperatingSystem.iOS;
    }
    return os;
};
export var Browser;
(function (Browser) {
    Browser["Chrome"] = "Chrome";
    Browser["Firefox"] = "Firefox";
    Browser["Safari"] = "Safari";
    Browser["Opera"] = "Opera";
    Browser["IE"] = "IE";
    Browser["Edge"] = "Edge";
    Browser["Unknown"] = "Unknown";
})(Browser || (Browser = {}));
/**
 * The function `getBrowser` returns the browser type based on the user agent string.
 * @returns The function `getBrowser` returns the value of the `browser` variable, which represents the
 * detected browser based on the user agent string. The possible return values are `Browser.Chrome`,
 * `Browser.Firefox`, `Browser.Safari`, `Browser.Opera`, `Browser.IE`, `Browser.Edge`, or
 * `Browser.Unknown`.
 */
export const getBrowser = () => {
    const userAgent = window.navigator.userAgent;
    let browser = Browser.Unknown;
    if (/Chrome/.test(userAgent)) {
        browser = Browser.Chrome;
    }
    else if (/Firefox/.test(userAgent)) {
        browser = Browser.Firefox;
    }
    else if (/Safari/.test(userAgent)) {
        browser = Browser.Safari;
    }
    else if (/Opera/.test(userAgent)) {
        browser = Browser.Opera;
    }
    else if (/Trident/.test(userAgent)) {
        browser = Browser.IE;
    }
    else if (/Edge/.test(userAgent)) {
        browser = Browser.Edge;
    }
    return browser;
};
//# sourceMappingURL=Device.js.map