import { FormattedBytes, LogGroup, UnknownObject } from './Util.types';
/**
 * The function `logGroupOpen` logs a group of messages with a specified name.
 * @param {string} name - A string representing the name of the log group.
 * @param {UnknownObject[]} msgs - The `msgs` parameter is a rest parameter that allows you to pass an
 * arbitrary number of arguments of type `UnknownObject`. These arguments can be of any type and will
 * be collected into an array called `msgs`.
 */
export declare function logGroupOpen(name: string, ...msgs: UnknownObject[]): void;
/**
 * The function `logGroup` logs a group of messages with a specified name.
 * @param {string} name - A string representing the name of the log group.
 * @param {UnknownObject[]} msgs - The `msgs` parameter is a rest parameter that allows you to pass in
 * an arbitrary number of arguments of type `UnknownObject`. These arguments will be collected into an
 * array called `msgs`. The `UnknownObject` type indicates that the type of the objects in the array is
 * unknown or can be any
 */
export declare function logGroup(name: string, ...msgs: UnknownObject[]): void;
/**
 * The function `formatBytes` takes a number of bytes as input and returns an object with the formatted
 * size in bytes, kilobytes, megabytes, and gigabytes.
 * @param {number} bytes - The `bytes` parameter is a number representing the size in bytes that you
 * want to format.
 * @returns an object of type `FormattedBytes`, which represents the memory usage in different units.
 */
export declare function formatBytes(bytes: number): FormattedBytes;
/**
 * The function `printMemory` prints information about the memory usage in the browser.
 */
export declare function printMemory(): void;
/**
 * The function `memoryPerformance` returns the memory performance information if available, otherwise
 * it returns undefined.
 * @returns the `memory` property of the `performance` object, if it exists. If the `performance`
 * object or the `memory` property is undefined, the function returns `undefined`.
 */
export declare function memoryPerformance(): UnknownObject;
/**
 * The `logGroupInner` function is used to create and manage log groups in TypeScript, allowing for
 * organized and collapsible console logging.
 * @param {boolean} open - A boolean value indicating whether the log group should be initially
 * expanded or collapsed.
 * @param {string} name - The `name` parameter is a string that represents the name of the log group.
 * It is used to identify and label the log group when it is displayed in the console.
 * @param {string[]} msgs - The `msgs` parameter is a rest parameter that allows you to pass in
 * multiple string arguments. These arguments represent the messages that you want to log within the
 * log group. You can pass in any number of string arguments, and they will be stored in the `msgs`
 * array.
 * @returns The function is not returning anything. It has a return type of `void`, which means it does
 * not return a value.
 */
export declare function logGroupInner(open: boolean, name: string, ...msgs: string[]): void;
/**
 * The function clears all log groups and logs the current log group before clearing.
 */
export declare function clearLogGroups(): void;
/**
 * The `logGroupEnd` function logs the summary of a log group and ends the group.
 * @param {unknown[]} remarks - The `remarks` parameter is an array of unknown values. These values can
 * be any type of data that you want to include as additional information or comments when logging the
 * group summary.
 * @returns The function does not return anything. It has a return type of `void`, which means it does
 * not return any value.
 */
export declare function logGroupEnd(...remarks: unknown[]): void;
/**
 * The function `closeAllLogGroups` closes all open log groups and returns an array of the closed
 * groups.
 * @param currentGroups - An optional parameter that represents an array of LogGroup objects. If no
 * value is provided, it defaults to the result of the getAllOpenGroups() function.
 * @returns an array of LogGroup objects.
 */
export declare function closeAllLogGroups(currentGroups?: LogGroup[]): LogGroup[];
/**
 * The function opens all log groups, either expanding or collapsing them based on the value of the
 * `GroupsExpand` variable.
 * @param currentGroups - The `currentGroups` parameter is an optional parameter that represents an
 * array of `LogGroup` objects. It is used to specify the log groups that should be opened. If no value
 * is provided, the function `getAllOpenGroups()` is called to get all the open log groups.
 * @returns an array of LogGroup objects.
 */
export declare function openAllLogGroups(currentGroups?: LogGroup[]): LogGroup[];
/**
 * The `globalLog` function logs messages globally, breaking and continuing log groups if necessary.
 * @param {unknown[]} message - The `message` parameter is a rest parameter of type `unknown[]`. This
 * means that it can accept any number of arguments of any type. The `...` syntax allows you to pass
 * multiple arguments as an array to the function. In this case, the `message` parameter will be an
 * array
 * @returns The function `globalLog` does not return anything. It has a return type of `void`, which
 * means it does not return any value.
 */
export declare function globalLog(...message: unknown[]): void;
/**
 * The function getAllOpenGroups returns an array of all open log groups, starting from the current log
 * group and traversing up to the root parent group.
 * @returns an array of LogGroup objects.
 */
export declare function getAllOpenGroups(): LogGroup[];
//# sourceMappingURL=Logging.d.ts.map