import { W } from "./Util.types";
/**
 * > This function sets the global variable `splibDebug` to the value of the parameter `enable`
 * @param {boolean} enable - true or false
 */
export function setDebugEnabled(enable) {
  W["splibDebug"] = enable;
}
/**
 * `isDebugEnabled` returns `true` if the `splibDebug` property of the `window` object is `true`
 * @returns The value of the splibDebug property of the global object.
 */
export function isDebugEnabled() {
  return W["splibDebug"];
}
/**
 * The function `colorLog` logs the given arguments to the console with a specified color.
 * @param {string} hexColor - The hexColor parameter is a string that represents a hexadecimal color
 * code.
 * @param args - The `args` parameter is a rest parameter, which means it allows you to pass any number
 * of arguments to the function. These arguments can be of any type.
 */
function colorLog(hexColor, ...args) {
  console.log("%c %s", `color: ${hexColor}`, ...args);
}
/**
 * If the debug flag is enabled, log the message to the console and store it in an array
 * @param {any} log - any - this is the log message that you want to output. You can pass in any number
 * of parameters, and they will be output to the console.
 */
export function debug(...log) {
  if (isDebugEnabled()) {
    colorLog("#ab68ff", "[CELERITY]", ...log);
    if (!W["CELERITY_Debug_log"]) {
      W["CELERITY_Debug_log"] = [];
    }
    W["CELERITY_Debug_log"].push({
      m: log,
      d: Date(),
    });
  }
}
/**
 * The function logs an error message with a timestamp and stores it in a global error log array if
 * debug mode is enabled.
 * @param {any} log - The `log` parameter is a rest parameter that allows you to pass in any number of
 * arguments. These arguments will be logged to the console when the `error` function is called.
 */
export function error(...log) {
  if (isDebugEnabled()) {
    console.error("[CELERITY]", ...log);
  }
  if (!W["CELERITY_Error_log"]) {
    W["CELERITY_Error_log"] = [];
  }
  W["CELERITY_Error_log"].push({
    m: log,
    d: Date(),
  });
}
export function errorLog(logg) {
  const log = Object.assign(
    {
      type: "error",
      message: "An error occurred",
      component: "Unknown",
      severity: "minor",
      role: "user",
      data: {},
    },
    logg
  );
  error(`[${log.type}]{ ${log.component} } - ${log.message}`, log.data);
}
/**
 * The `warn` function logs a warning message with a timestamp if debug mode is enabled, and stores the
 * log in a global variable.
 * @param {any} log - The `log` parameter is a rest parameter that allows you to pass in any number of
 * arguments. These arguments will be logged as a warning message.
 */
export function warn(...log) {
  if (isDebugEnabled()) {
    console.warn("[CELERITY]", ...log);
  }
  if (!W["CELERITY_Warn_log"]) {
    W["CELERITY_Warn_log"] = [];
  }
  W["CELERITY_Warn_log"].push({
    m: log,
    d: Date(),
  });
}
/**
 * The `success` function logs a success message with optional additional data and stores it in a
 * global array.
 * @param {any} log - The `log` parameter is a rest parameter that allows you to pass in any number of
 * arguments. These arguments will be logged as part of the success message.
 */
export function success(...log) {
  if (isDebugEnabled()) {
    colorLog("#03fc6f", "[CELERITY]", ...log);
  }
  if (!W["CELERITY_Success_log"]) {
    W["CELERITY_Success_log"] = [];
  }
  W["CELERITY_Success_log"].push({
    m: log,
    d: Date(),
  });
}
//# sourceMappingURL=Debug.js.map
