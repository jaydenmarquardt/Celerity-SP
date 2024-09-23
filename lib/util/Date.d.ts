/**
 * The function `isDateString` checks if a given string matches a common timestamp format.
 * @param {string} s - The parameter `s` is a string that represents a date or timestamp.
 * @returns The function isDateString returns a boolean value. It returns true if the input string
 * matches the pattern for a common timestamp format (e.g., "2021-12-31T23:59:59Z"), and false
 * otherwise.
 */
export declare function isDateString(s: string): boolean;
/**
 * It takes a date, a format string, and returns a formatted date string
 * @param {Date | string | number} date - The date to format.
 * @param {string} formatString - The format string to use.
 * @returns A function that takes a date and a format string and returns a formatted date string.
 */
export declare function formatDate(date: Date | string | number, formatString: string): string;
/**
 * It returns the time zone of the user's computer
 * @returns The time zone of the user's computer.
 */
export declare function getTimeZone(): string;
/**
 * The function `getTimeZoneName` takes a time zone string and returns the name of the city and country
 * in that time zone.
 * @param {string} timeZone - The `timeZone` parameter is a string that represents a specific time
 * zone. It is optional and has a default value of `getTimeZone()`.
 * @returns a string in the format "city, country" representing the time zone name.
 */
export declare function getTimeZoneName(timeZone?: string): string;
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
export declare function timeAgo(date: Date): string;
/**
 * "Given two dates, return true if they are the same day, false otherwise."
 *
 * The function takes two parameters, first and second, both of which are of type Date. The function
 * returns a value of type boolean
 * @param {Date} first - Date - The first date to compare.
 * @param {Date} second - Date - The date to compare against
 * @returns A boolean value.
 */
export declare function isSameDay(first: Date, second: Date): boolean;
/**
 * It takes a number and returns an array of strings
 * @param {number} num - number - The number of days you want to get.
 * @returns An array of strings representing the next n days of the week.
 */
export declare function getUpcomingDays(count: any): any[];
export declare enum DayOfWeek {
    monday = "Monday",
    tuesday = "Tuesday",
    wednesday = "Wednesday",
    thursday = "Thursday",
    friday = "Friday",
    saturday = "Saturday",
    sunday = "Sunday"
}
/**
 * Returns a greeting based on the time of day.
 * @returns A string
 */
export declare function getGreeting(): string;
/**
 * "Return AM if the current time is before noon, otherwise return PM."
 *
 * The function isAmOrPm() uses the Date object to get the current time. It then uses the getHours()
 * method to get the current hour
 * @returns the string "AM" or "PM" depending on the time of day.
 */ export declare function isAmOrPm(date?: Date): "AM" | "PM";
/**
 * "Given a date, return the start and end of the day in ISO format."
 *
 * The first line of the function is a TypeScript type annotation. It says that the function takes a
 * single parameter, date, which is of type Date. If no date is passed in, the function will use the
 * current date. The function returns an object with two properties, firstDate and lastDate, which are
 * both strings
 * @param {Date} date - Date = new Date()
 * @returns An object with two properties, firstDate and lastDate.
 */ export declare function getDayStartEnd(date?: Date): {
    firstDate: string;
    lastDate: string;
};
/**
 * "Given a date, return the start of the day."
 *
 * The function takes an optional parameter, now, which defaults to a new Date object
 * @param {Date} now - Date = new Date()
 * @returns A string
 */ export declare function getDayStart(now?: Date): string;
/**
 * "Get the end of the day, in UTC, as a string."
 *
 * The function takes an optional parameter, now, which is a Date object. If you don't pass in a Date
 * object, it will use the current date and time
 * @param {Date} now - Date = new Date()
 * @returns A string
 */ export declare function getDayEnd(now?: Date): string;
/**
 * It returns the first and last date of the current week.
 * @param {Date} now - The date to get the week start and end for. Defaults to the current date.
 * @returns An object with two properties, firstDate and lastDate.
 */
export declare function getWeekStartEnd(now?: Date): {
    firstDate: string;
    lastDate: string;
};
/**
 * "Given a date, return the first and last dates of the month."
 *
 * The function takes an optional parameter, now, which defaults to the current date
 * @param {Date} now - The date to get the month start and end for. Defaults to the current date.
 * @returns An object with two properties, firstDate and lastDate.
 */ export declare function getMonthStartEnd(now?: Date): {
    firstDate: string;
    lastDate: string;
};
/**
 * "Given a date, return the date of the first day of the week."
 *
 * The first line of the function is a function declaration. The function is named getWeekStartDay and
 * it takes one parameter named now. The parameter is optional, and if it's not provided, the function
 * will use the current date. The function returns a string
 * @param {Date} now - The date you want to get the week start day of.
 * @returns The first day of the week.
 */ export declare function getWeekStartDay(now?: Date): string;
/**
 * "Get the last day of the week for the given date."
 *
 * The function takes an optional parameter, now, which is a Date object. If no parameter is passed,
 * the function uses the current date
 * @param {Date} now - The date you want to get the week start and end date.
 * @returns The last day of the week.
 */ export declare function getWeekLastDay(now?: Date): string;
/**
 * "Given a date, return the first day of the month."
 *
 * The first line of the function is a comment. The second line is the function declaration. The third
 * line is the function body. The fourth line is the function return statement
 * @param {Date} now - The date you want to get the month start day.
 * @returns The first day of the month
 */ export declare function getMonthStartDay(now?: Date): string;
/**
 * "Get the last day of the month for the given date."
 *
 * The first line of the function is a comment. It's a good idea to include a comment at the top of
 * each function that describes what the function does
 * @param {Date} now - The date you want to get the first day of the month.
 * @returns The last day of the month.
 */ export declare function getMonthLastDay(now?: Date): string;
/**
 * Convert a UTC date string to a local date object.
 * @param {string} utcDateString - The UTC date string that you want to convert to local time.
 * @returns A date object that is the same as the UTC date object, but in the local timezone.
 */
export declare function convertUtcToLocal(date: Date): Date;
export declare function dayOfWeekToNumber(day: string): number;
export declare function dayOfWeekToString(day: string): string;
export declare function monthToString(month: number): string;
//# sourceMappingURL=Date.d.ts.map