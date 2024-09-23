/* eslint-disable no-console */
import { debug, error } from './Debug';
import {
  ByteLevel,
  FormattedBytes,
  LogGroup,
  UnknownObject,
  W,
  uuid
} from './Util.types';

const GroupsEnabled = true;
const CONSOLELOG = console.log;
const CONSOLEERROR = console.error;

/**
 * The function returns an array of LogGroup objects.
 */
const logGroups = (): LogGroup[] => W.logGroups || [];
const currentLogGroup = (): LogGroup => W.currentLogGroup || {};

/**
 * The function `logGroupOpen` logs a group of messages with a specified name.
 * @param {string} name - A string representing the name of the log group.
 * @param {UnknownObject[]} msgs - The `msgs` parameter is a rest parameter that allows you to pass an
 * arbitrary number of arguments of type `UnknownObject`. These arguments can be of any type and will
 * be collected into an array called `msgs`.
 */
export function logGroupOpen(name: string, ...msgs: UnknownObject[]): void {
  logGroupInner(true, name, ...msgs);
}

/**
 * The function `logGroup` logs a group of messages with a specified name.
 * @param {string} name - A string representing the name of the log group.
 * @param {UnknownObject[]} msgs - The `msgs` parameter is a rest parameter that allows you to pass in
 * an arbitrary number of arguments of type `UnknownObject`. These arguments will be collected into an
 * array called `msgs`. The `UnknownObject` type indicates that the type of the objects in the array is
 * unknown or can be any
 */
export function logGroup(name: string, ...msgs: UnknownObject[]): void {
  logGroupInner(false, name, ...msgs);
}

/**
 * The function `formatBytes` takes a number of bytes as input and returns an object with the formatted
 * size in bytes, kilobytes, megabytes, and gigabytes.
 * @param {number} bytes - The `bytes` parameter is a number representing the size in bytes that you
 * want to format.
 * @returns an object of type `FormattedBytes`, which represents the memory usage in different units.
 */
export function formatBytes(bytes: number): FormattedBytes {
  const sizes: ByteLevel[] = ['B', 'KB', 'MB', 'GB'];

  const memoryUsage: FormattedBytes = {};
  for (let i = 0; i < sizes.length; i++) {
    const unit = sizes[i];
    const sizeInUnit = (bytes / Math.pow(1024, i)).toFixed(2);
    memoryUsage[unit] = sizeInUnit;
  }
  return memoryUsage;
}

/**
 * The function `printMemory` prints information about the memory usage in the browser.
 */
export function printMemory(): void {
  const memory = memoryPerformance();
  const savedMemoryUsage: UnknownObject = W.memoryUsage;

  if (memory) {
    let memoryUsageMSG: {
      MaxUsage?: FormattedBytes;
      Using?: FormattedBytes;
      MaxItemSize?: FormattedBytes;

      improved?: boolean;
      difference?: FormattedBytes;
      was?: {
        MaxUsage?: FormattedBytes;
        Using?: FormattedBytes;
        MaxItemSize?: FormattedBytes;
      };
      now?: {
        MaxUsage?: FormattedBytes;
        Using?: FormattedBytes;
        MaxItemSize?: FormattedBytes;
      };
      memory?: UnknownObject;
    } = {
      MaxUsage: formatBytes(memory.totalJSHeapSize), //memory allocated for JavaScript objects.
      Using: formatBytes(memory.usedJSHeapSize), //It shows the portion of the allocated memory that is actively being utilized.
      MaxItemSize: formatBytes(memory.jsHeapSizeLimit)
    };
    W.memoryUsage = memory;

    if (savedMemoryUsage) {
      const difference =
        memory.usedJSHeapSize - savedMemoryUsage.usedJSHeapSize;

      memoryUsageMSG = {
        improved: difference < 0,
        difference: formatBytes(difference),
        was: {
          MaxUsage: formatBytes(savedMemoryUsage.totalJSHeapSize), //memory allocated for JavaScript objects.
          Using: formatBytes(savedMemoryUsage.usedJSHeapSize), //It shows the portion of the allocated memory that is actively being utilized.
          MaxItemSize: formatBytes(savedMemoryUsage.jsHeapSizeLimit)
        },
        now: memoryUsageMSG,
        memory
      };
    }
    debug('Memory Usage:', memoryUsageMSG);
  } else {
    error('Memory Usage not supported');
  }
}

/**
 * The function `memoryPerformance` returns the memory performance information if available, otherwise
 * it returns undefined.
 * @returns the `memory` property of the `performance` object, if it exists. If the `performance`
 * object or the `memory` property is undefined, the function returns `undefined`.
 */
export function memoryPerformance(): UnknownObject {
  const w_performance: UnknownObject = performance as UnknownObject;
  if (!w_performance || w_performance.memory === undefined) return undefined;

  return w_performance.memory;
}

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
export function logGroupInner(
  open: boolean,
  name: string,
  ...msgs: string[]
): void {
  const GroupsExpand = open || W.logGroupsExpand === true;
  if (!W.logGroups) {
    W.logGroups = [];

    console.log = (...args) => {
      if (!W.currentLogGroup) {
        CONSOLELOG(...args);
        return;
      }
      CONSOLELOG(...args);
    };
    console.error = (...args) => {
      if (!W.currentLogGroup) {
        CONSOLEERROR(...args);
        return;
      }
      closeAllLogGroups();
      CONSOLEERROR(...args);
      openAllLogGroups();
    };
  }

  const uid = uuid();
  const current = W.currentLogGroup;
  if (current?.depth > 50) {
    error('Too many log groups open - preventing open');
    return;
  }
  const group: LogGroup = {
    uuid: uid,
    start: W.performance.now,
    name,
    depth: !current || !current.depth ? 1 : (current.depth as number) + 1,
    open,
    msgs,
    parent: current,
    children: [],
    logs: [],
    end: undefined,
    ended: false,
    time: undefined,
    timeSeconds: undefined
  };

  if (current) {
    current?.children.push(group);
  } else {
    W.logGroups.push(group);
  }
  if (!GroupsEnabled) {
    debug(name, ...msgs);
  } else {
    if (GroupsExpand) {
      console.group(name, ...msgs);
    } else {
      console.groupCollapsed(name, ...msgs);
    }
  }
  W.currentLogGroup = group;
}

/**
 * The function clears all log groups and logs the current log group before clearing.
 */
export function clearLogGroups(): void {
  closeAllLogGroups();
  CONSOLELOG('Clearing log groups', {
    logGroups: [...logGroups()],
    currentLogGroup: { ...currentLogGroup() }
  });
  if (logGroups()) {
    W.logGroups.length = 0;
  }
  W.currentLogGroup = null;
}

/**
 * The `logGroupEnd` function logs the summary of a log group and ends the group.
 * @param {unknown[]} remarks - The `remarks` parameter is an array of unknown values. These values can
 * be any type of data that you want to include as additional information or comments when logging the
 * group summary.
 * @returns The function does not return anything. It has a return type of `void`, which means it does
 * not return any value.
 */
export function logGroupEnd(...remarks: unknown[]): void {
  const current = currentLogGroup();
  if (!current) return;
  current.end = W.performance.now;
  current.ended = true;
  current.time = current.end - current.start;
  current.timeSeconds = (current.time / 1000).toFixed(2);
  W.currentLogGroup = current.parent;

  debug('Group Summary', {
    'Time taken (s)': current.timeSeconds,
    'Time taken (ms)': current.time,
    groupName: current.name,
    group: current,
    remarks
  });
  console.groupEnd();
}
/**
 * The function `closeAllLogGroups` closes all open log groups and returns an array of the closed
 * groups.
 * @param currentGroups - An optional parameter that represents an array of LogGroup objects. If no
 * value is provided, it defaults to the result of the getAllOpenGroups() function.
 * @returns an array of LogGroup objects.
 */

export function closeAllLogGroups(
  currentGroups = getAllOpenGroups()
): LogGroup[] {
  currentGroups.forEach((group) => {
    console.groupEnd();
  });

  return currentGroups;
}

/**
 * The function opens all log groups, either expanding or collapsing them based on the value of the
 * `GroupsExpand` variable.
 * @param currentGroups - The `currentGroups` parameter is an optional parameter that represents an
 * array of `LogGroup` objects. It is used to specify the log groups that should be opened. If no value
 * is provided, the function `getAllOpenGroups()` is called to get all the open log groups.
 * @returns an array of LogGroup objects.
 */
export function openAllLogGroups(
  currentGroups = getAllOpenGroups()
): LogGroup[] {
  const GroupsExpand = W.logGroupsExpand === true;

  currentGroups.reverse().forEach((group) => {
    if (group.open || GroupsExpand) {
      console.group(group.name, ...group.msgs);
    } else {
      console.groupCollapsed(group.name, ...group.msgs);
    }
  });

  return currentGroups;
}

/**
 * The `globalLog` function logs messages globally, breaking and continuing log groups if necessary.
 * @param {unknown[]} message - The `message` parameter is a rest parameter of type `unknown[]`. This
 * means that it can accept any number of arguments of any type. The `...` syntax allows you to pass
 * multiple arguments as an array to the function. In this case, the `message` parameter will be an
 * array
 * @returns The function `globalLog` does not return anything. It has a return type of `void`, which
 * means it does not return any value.
 */
export function globalLog(...message: unknown[]): void {
  const currentGroup = W.currentLogGroup;
  if (!currentGroup) {
    debug(...message);
    return;
  }
  debug('----Breaking groups for global log------');

  const currentGroups = getAllOpenGroups();
  closeAllLogGroups(currentGroups);

  debug(...message);

  openAllLogGroups(currentGroups);
  debug('----Continuing groups for global log----');
}

/**
 * The function getAllOpenGroups returns an array of all open log groups, starting from the current log
 * group and traversing up to the root parent group.
 * @returns an array of LogGroup objects.
 */
export function getAllOpenGroups(): LogGroup[] {
  if (!W.logGroups || !W.currentLogGroup) return [];

  const currentGroups: LogGroup[] = [];
  const currentGroup = W.currentLogGroup;
  if (!currentGroup) return [];

  const traverse = (group: LogGroup): LogGroup => {
    currentGroups.push(group);
    if (!group) return;
    if (group.parent) {
      traverse(group.parent);
    }
  };

  traverse(currentGroup);

  return currentGroups;
}
