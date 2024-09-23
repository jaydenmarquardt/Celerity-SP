import { error } from "./Debug";
/**
 * The function `isDateString` checks if a given string matches a common timestamp format.
 * @param {string} s - The parameter `s` is a string that represents a date or timestamp.
 * @returns The function isDateString returns a boolean value. It returns true if the input string
 * matches the pattern for a common timestamp format (e.g., "2021-12-31T23:59:59Z"), and false
 * otherwise.
 */
export function isDateString(s) {
    // Regex pattern to match common timestamp formats (e.g., 2021-12-31T23:59:59Z)
    const pattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}([Z]|[+-]\d{2}:\d{2})/;
    return pattern.exec(s) !== null;
}
/**
 * It takes a date, a format string, and returns a formatted date string
 * @param {Date | string | number} date - The date to format.
 * @param {string} formatString - The format string to use.
 * @returns A function that takes a date and a format string and returns a formatted date string.
 */
export function formatDate(date, formatString) {
    try {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const hours = d.getHours();
        const minutes = d.getMinutes();
        const seconds = d.getSeconds();
        const milliseconds = d.getMilliseconds();
        const formats = {
            YYYY: () => year.toString(),
            YY: () => year.toString().slice(-2),
            yyyy: () => year.toString(),
            yy: () => year.toString().slice(-2),
            MMMM: () => { var _a; return (_a = new Intl.DateTimeFormat("default", { month: "long" })) === null || _a === void 0 ? void 0 : _a.format(d); },
            MMM: () => { var _a; return (_a = new Intl.DateTimeFormat("default", { month: "short" })) === null || _a === void 0 ? void 0 : _a.format(d); },
            MM: () => month.toString().padStart(2, "0"),
            M: () => month.toString(),
            dd: () => day.toString().padStart(2, "0"),
            d: () => day.toString(),
            DD: () => day.toString().padStart(2, "0"),
            D: () => day.toString(),
            DDD: () => { var _a; return (_a = new Intl.DateTimeFormat("default", { weekday: "short" })) === null || _a === void 0 ? void 0 : _a.format(d); },
            DDDD: () => { var _a; return (_a = new Intl.DateTimeFormat("default", { weekday: "long" })) === null || _a === void 0 ? void 0 : _a.format(d); },
            HH: () => hours.toString().padStart(2, "0"),
            H: () => hours.toString(),
            hh: () => (hours % 12 || 12).toString().padStart(2, "0"),
            h: () => (hours % 12 || 12).toString(),
            mm: () => minutes.toString().padStart(2, "0"),
            m: () => minutes.toString(),
            ss: () => seconds.toString().padStart(2, "0"),
            s: () => seconds.toString(),
            SSS: () => milliseconds.toString().padStart(3, "0"),
            A: () => (hours < 12 ? "AM" : "PM"),
            a: () => (hours < 12 ? "am" : "pm"),
        };
        return formatString === null || formatString === void 0 ? void 0 : formatString.replace(/Y+|y+|M+|D+|d+|H+|h+|m+|s+|S+|A|a/g, (match) => formats[match]());
    }
    catch (e) {
        error("Failed to format date", { date, formatString, e });
        return "Invalid date";
    }
}
/**
 * It returns the time zone of the user's computer
 * @returns The time zone of the user's computer.
 */
export function getTimeZone() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
}
/**
 * The function `getTimeZoneName` takes a time zone string and returns the name of the city and country
 * in that time zone.
 * @param {string} timeZone - The `timeZone` parameter is a string that represents a specific time
 * zone. It is optional and has a default value of `getTimeZone()`.
 * @returns a string in the format "city, country" representing the time zone name.
 */
export function getTimeZoneName(timeZone = getTimeZone()) {
    if (!timeZone)
        return "undefined";
    const split = timeZone === null || timeZone === void 0 ? void 0 : timeZone.split("/");
    const country = split[0];
    const city = split[1];
    return `${city}, ${country}`;
}
/**
 * If the elapsed time is less than a minute, return the number of seconds ago, otherwise if the
 * elapsed time is less than an hour, return the number of minutes ago, otherwise if the elapsed time
 * is less than a day, return the number of hours ago, otherwise if the elapsed time is less than a
 * week, return the number of days ago, otherwise if the elapsed time is less than a month, return the
 * number of weeks ago, otherwise if the elapsed time is less than a year, return the number of months
 * ago, otherwise return the number of years ago.
 * @param {Date} date - The date to convert to a time ago string.
 * @returns A string that represents the time elapsed since the date passed in.
 */
export function timeAgo(date) {
    const currentDate = new Date();
    const elapsedTime = currentDate.getTime() - date.getTime();
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;
    if (elapsedTime < minute) {
        return `${Math.round(elapsedTime / second)} seconds ago`;
    }
    else if (elapsedTime < hour) {
        return `${Math.round(elapsedTime / minute)} minutes ago`;
    }
    else if (elapsedTime < day) {
        return `${Math.round(elapsedTime / hour)} hours ago`;
    }
    else if (elapsedTime < week) {
        return `${Math.round(elapsedTime / day)} days ago`;
    }
    else if (elapsedTime < month) {
        return `${Math.round(elapsedTime / week)} weeks ago`;
    }
    else if (elapsedTime < year) {
        return `${Math.round(elapsedTime / month)} months ago`;
    }
    else {
        return `${Math.round(elapsedTime / year)} years ago`;
    }
}
/**
 * "Given two dates, return true if they are the same day, false otherwise."
 *
 * The function takes two parameters, first and second, both of which are of type Date. The function
 * returns a value of type boolean
 * @param {Date} first - Date - The first date to compare.
 * @param {Date} second - Date - The date to compare against
 * @returns A boolean value.
 */
export function isSameDay(first, second) {
    return (first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate());
}
/**
 * It takes a number and returns an array of strings
 * @param {number} num - number - The number of days you want to get.
 * @returns An array of strings representing the next n days of the week.
 */
export function getUpcomingDays(count) {
    const upcomingDays = [];
    const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const currentDate = new Date();
    for (let i = 0; i < count; i++) {
        const nextDay = new Date(currentDate.getTime());
        nextDay.setDate(currentDate.getDate() + i);
        const dayIndex = nextDay.getDay();
        upcomingDays.push(weekdays[dayIndex]);
    }
    return upcomingDays;
}
export var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek["monday"] = "Monday";
    DayOfWeek["tuesday"] = "Tuesday";
    DayOfWeek["wednesday"] = "Wednesday";
    DayOfWeek["thursday"] = "Thursday";
    DayOfWeek["friday"] = "Friday";
    DayOfWeek["saturday"] = "Saturday";
    DayOfWeek["sunday"] = "Sunday";
})(DayOfWeek || (DayOfWeek = {}));
/**
 * Returns a greeting based on the time of day.
 * @returns A string
 */
export function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
        return "Good morning";
    }
    else if (hour < 18 && hour > 11) {
        return "Good afternoon";
    }
    else if (hour >= 18 && hour > 21) {
        return "Good evening";
    }
    else {
        return "Good night";
    }
}
/**
 * "Return AM if the current time is before noon, otherwise return PM."
 *
 * The function isAmOrPm() uses the Date object to get the current time. It then uses the getHours()
 * method to get the current hour
 * @returns the string "AM" or "PM" depending on the time of day.
 */ export function isAmOrPm(date = new Date()) {
    const currentTime = date;
    const hours = currentTime.getHours();
    return hours < 12 ? "AM" : "PM";
}
/**
 * "Given a date, return the start and end of the day in ISO format."
 *
 * The first line of the function is a TypeScript type annotation. It says that the function takes a
 * single parameter, date, which is of type Date. If no date is passed in, the function will use the
 * current date. The function returns an object with two properties, firstDate and lastDate, which are
 * both strings
 * @param {Date} date - Date = new Date()
 * @returns An object with two properties, firstDate and lastDate.
 */ export function getDayStartEnd(date = new Date()) {
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0, -1);
    const startOfDayString = startOfDay
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
    const endOfDayString = endOfDay.toISOString().slice(0, 19).replace("T", " ");
    return { firstDate: startOfDayString, lastDate: endOfDayString };
}
/**
 * "Given a date, return the start of the day."
 *
 * The function takes an optional parameter, now, which defaults to a new Date object
 * @param {Date} now - Date = new Date()
 * @returns A string
 */ export function getDayStart(now = new Date()) {
    const { firstDate } = getDayStartEnd(now);
    return firstDate;
}
/**
 * "Get the end of the day, in UTC, as a string."
 *
 * The function takes an optional parameter, now, which is a Date object. If you don't pass in a Date
 * object, it will use the current date and time
 * @param {Date} now - Date = new Date()
 * @returns A string
 */ export function getDayEnd(now = new Date()) {
    const { lastDate } = getDayStartEnd(now);
    return lastDate;
}
/**
 * It returns the first and last date of the current week.
 * @param {Date} now - The date to get the week start and end for. Defaults to the current date.
 * @returns An object with two properties, firstDate and lastDate.
 */
export function getWeekStartEnd(now = new Date()) {
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // adjust when day is sunday
    const firstDate = new Date(now.setDate(diff)).toISOString().slice(0, 10);
    const lastDate = new Date(now.setDate(diff + 6)).toISOString().slice(0, 10);
    return { firstDate, lastDate };
}
/**
 * "Given a date, return the first and last dates of the month."
 *
 * The function takes an optional parameter, now, which defaults to the current date
 * @param {Date} now - The date to get the month start and end for. Defaults to the current date.
 * @returns An object with two properties, firstDate and lastDate.
 */ export function getMonthStartEnd(now = new Date()) {
    const firstDate = new Date(now.getFullYear(), now.getMonth(), 1)
        .toISOString()
        .slice(0, 10);
    const lastDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        .toISOString()
        .slice(0, 10);
    return { firstDate, lastDate };
}
/**
 * "Given a date, return the date of the first day of the week."
 *
 * The first line of the function is a function declaration. The function is named getWeekStartDay and
 * it takes one parameter named now. The parameter is optional, and if it's not provided, the function
 * will use the current date. The function returns a string
 * @param {Date} now - The date you want to get the week start day of.
 * @returns The first day of the week.
 */ export function getWeekStartDay(now = new Date()) {
    const { firstDate } = getWeekStartEnd(now);
    return firstDate;
}
/**
 * "Get the last day of the week for the given date."
 *
 * The function takes an optional parameter, now, which is a Date object. If no parameter is passed,
 * the function uses the current date
 * @param {Date} now - The date you want to get the week start and end date.
 * @returns The last day of the week.
 */ export function getWeekLastDay(now = new Date()) {
    const { lastDate } = getWeekStartEnd(now);
    return lastDate;
}
/**
 * "Given a date, return the first day of the month."
 *
 * The first line of the function is a comment. The second line is the function declaration. The third
 * line is the function body. The fourth line is the function return statement
 * @param {Date} now - The date you want to get the month start day.
 * @returns The first day of the month
 */ export function getMonthStartDay(now = new Date()) {
    const { firstDate } = getMonthStartEnd(now);
    return firstDate;
}
/**
 * "Get the last day of the month for the given date."
 *
 * The first line of the function is a comment. It's a good idea to include a comment at the top of
 * each function that describes what the function does
 * @param {Date} now - The date you want to get the first day of the month.
 * @returns The last day of the month.
 */ export function getMonthLastDay(now = new Date()) {
    const { lastDate } = getMonthStartEnd(now);
    return lastDate;
}
/**
 * Convert a UTC date string to a local date object.
 * @param {string} utcDateString - The UTC date string that you want to convert to local time.
 * @returns A date object that is the same as the UTC date object, but in the local timezone.
 */
export function convertUtcToLocal(date) {
    const utcDate = new Date(date.toUTCString());
    const offset = utcDate.getTimezoneOffset();
    const localDate = new Date(utcDate.getTime() - offset * 60 * 1000);
    return localDate;
}
export function dayOfWeekToNumber(day) {
    switch (day.toLowerCase()) {
        case "su":
            return 0;
        case "mo":
            return 1;
        case "tu":
            return 2;
        case "we":
            return 3;
        case "th":
            return 4;
        case "fr":
            return 5;
        case "sa":
            return 6;
        default:
            return -1;
    }
}
export function dayOfWeekToString(day) {
    switch (day.toLowerCase()) {
        case "su":
            return "Sunday";
        case "mo":
            return "Monday";
        case "tu":
            return "Tuesday";
        case "we":
            return "Wednesday";
        case "th":
            return "Thursday";
        case "fr":
            return "Friday";
        case "sa":
            return "Saturday";
        default:
            return "";
    }
}
export function monthToString(month) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return months[month - 1] || "";
}
//# sourceMappingURL=Date.js.map