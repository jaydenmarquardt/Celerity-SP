/**
 * > This function sets the global variable `splibDebug` to the value of the parameter `enable`
 * @param {boolean} enable - true or false
 */
export declare function setDebugEnabled(enable: boolean): void;
/**
 * `isDebugEnabled` returns `true` if the `splibDebug` property of the `window` object is `true`
 * @returns The value of the splibDebug property of the global object.
 */
export declare function isDebugEnabled(): any;
/**
 * If the debug flag is enabled, log the message to the console and store it in an array
 * @param {any} log - any - this is the log message that you want to output. You can pass in any number
 * of parameters, and they will be output to the console.
 */
export declare function debug(...log: any[]): void;
/**
 * The function logs an error message with a timestamp and stores it in a global error log array if
 * debug mode is enabled.
 * @param {any} log - The `log` parameter is a rest parameter that allows you to pass in any number of
 * arguments. These arguments will be logged to the console when the `error` function is called.
 */
export declare function error(...log: any): void;
export interface IErrorLog {
    type?: "userError" | "error" | "crash";
    role?: "user" | "admin" | "tool" | "editor";
    severity?: "minor" | "low" | "medium" | "high" | "critical";
    message: string;
    component?: string;
    data?: any;
}
export declare function errorLog(logg: IErrorLog): void;
/**
 * The `warn` function logs a warning message with a timestamp if debug mode is enabled, and stores the
 * log in a global variable.
 * @param {any} log - The `log` parameter is a rest parameter that allows you to pass in any number of
 * arguments. These arguments will be logged as a warning message.
 */
export declare function warn(...log: any): void;
/**
 * The `success` function logs a success message with optional additional data and stores it in a
 * global array.
 * @param {any} log - The `log` parameter is a rest parameter that allows you to pass in any number of
 * arguments. These arguments will be logged as part of the success message.
 */
export declare function success(...log: any): void;
//# sourceMappingURL=Debug.d.ts.map