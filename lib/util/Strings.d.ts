/**
 * It replaces all non-word characters with a dash, and then replaces multiple dashes with a single
 * dash
 * @param {string} string - The string to slugify.
 * @returns a string that has been converted to lowercase, has all spaces replaced with dashes, and has
 * all special characters removed.
 */
export declare function slugify(str: string): string;
/**
 * The function takes a string input, capitalizes the first letter of each word, and joins them with
 * hyphens.
 * @param {string} input - The input parameter is a string that represents the text that needs to be
 * "nicefied".
 * @returns The `nicefyString` function is returning a modified version of the input string where each
 * word is capitalized and separated by a hyphen.
 */
export declare function nicefyString(input: string): string;
/**
 * The function checks if a given string is empty or null.
 * @param {string} [text] - The input string that needs to be checked for emptiness. It is an optional
 * parameter, which means it can be undefined or null.
 * @returns a boolean value (either true or false) depending on whether the input string is considered
 * empty or not.
 */
export declare function emptyString(text?: string | boolean): boolean;
/**
 * If the text is not empty, return the first character of the text in uppercase, followed by the rest
 * of the text.
 * @param {string} text - string - this is the parameter that we're passing into the function. It's a
 * string.
 * @returns The first character of the string is being capitalised and then the rest of the string is
 * being returned.
 */
export declare function captitalise(text: string): string;
/**
 * It takes a sentence, splits it into an array of words, capitalises the first letter of each word,
 * then joins the array back into a sentence
 * @param {string} sentence - string - The sentence to be capitalised.
 * @returns The function capitaliseEachWord takes a string as an argument and returns a string with the
 * first letter of each word capitalised.
 */
export declare function capitaliseEachWord(sentence: string): string;
/**
 * It replaces all the illegal characters in a string with their unicode equivalents
 * @param {string} str - any - The string to be replaced.
 * @returns A string with all the illegal characters replaced with unicode characters.
 */
export declare function replaceIllegalCharacters(str: string): string;
/**
 * It replaces all the illegal characters in a string with their legal counterparts
 * @param {string} str - any
 * @returns A string with all the illegal characters replaced with a legal character.
 */
export declare function replaceBackToIllegalCharacters(str: string): string;
/**
 * If the last digit of the number is 1, and the last two digits are not 11, return the number with
 * "st" appended; if the last digit is 2, and the last two digits are not 12, return the number with
 * "nd" appended; if the last digit is 3, and the last two digits are not 13, return the number with
 * "rd" appended; otherwise, return the number with "th" appended
 * @param {number} i - The number to convert to ordinal
 * @returns The ordinal of the number.
 */
export declare function ordinal(i: number): string;
/**
 * The function converts a string to camel case by removing spaces and capitalizing the first letter of
 * each word except the first one.
 * @param {string} name - The `name` parameter is a string that represents a name or a phrase.
 * @returns a camel case version of the input name.
 */
export declare function toCamelCase(name: string): string;
export declare function price(value: number | string): string;
export declare function formatNumber(value: number | string): string;
export declare function stripHtml(maybeHasHtmlString: string): string;
//# sourceMappingURL=Strings.d.ts.map