export enum DeviceType {
  Android = 'Android',
  iOS = 'iOS',
  Desktop = 'Desktop',
  Other = 'Other'
}

/**
 * The function `getDeviceType` returns the type of device based on the user agent string.
 * @returns The function `getDeviceType` returns a value of type `DeviceType`.
 */
export const getDeviceType = (): DeviceType => {
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

export enum OperatingSystem {
  Windows = 'Windows',
  MacOS = 'Mac OS',
  Linux = 'Linux',
  iOS = 'iOS',
  Android = 'Android',
  Unknown = 'Unknown'
}

/**
 * The function `getOperatingSystem` returns the operating system based on the user agent and platform
 * information.
 * @returns The function `getOperatingSystem` returns the operating system based on the user agent and
 * platform information. The return value is of type `OperatingSystem`.
 */
export const getOperatingSystem = (): OperatingSystem => {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  let os = OperatingSystem.Unknown;

  if (/Mac/.test(platform)) {
    os = OperatingSystem.MacOS;
  } else if (/Win/.test(platform)) {
    os = OperatingSystem.Windows;
  } else if (/Linux/.test(platform)) {
    os = OperatingSystem.Linux;
  } else if (/Android/.test(userAgent)) {
    os = OperatingSystem.Android;
  } else if (/iPhone|iPad|iPod/.test(userAgent)) {
    os = OperatingSystem.iOS;
  }

  return os;
};

export enum Browser {
  Chrome = 'Chrome',
  Firefox = 'Firefox',
  Safari = 'Safari',
  Opera = 'Opera',
  IE = 'IE',
  Edge = 'Edge',
  Unknown = 'Unknown'
}

/**
 * The function `getBrowser` returns the browser type based on the user agent string.
 * @returns The function `getBrowser` returns the value of the `browser` variable, which represents the
 * detected browser based on the user agent string. The possible return values are `Browser.Chrome`,
 * `Browser.Firefox`, `Browser.Safari`, `Browser.Opera`, `Browser.IE`, `Browser.Edge`, or
 * `Browser.Unknown`.
 */
export const getBrowser = (): Browser => {
  const userAgent = window.navigator.userAgent;
  let browser = Browser.Unknown;

  if (/Chrome/.test(userAgent)) {
    browser = Browser.Chrome;
  } else if (/Firefox/.test(userAgent)) {
    browser = Browser.Firefox;
  } else if (/Safari/.test(userAgent)) {
    browser = Browser.Safari;
  } else if (/Opera/.test(userAgent)) {
    browser = Browser.Opera;
  } else if (/Trident/.test(userAgent)) {
    browser = Browser.IE;
  } else if (/Edge/.test(userAgent)) {
    browser = Browser.Edge;
  }

  return browser;
};
