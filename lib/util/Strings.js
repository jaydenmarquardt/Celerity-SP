/**
 * It replaces all non-word characters with a dash, and then replaces multiple dashes with a single
 * dash
 * @param {string} string - The string to slugify.
 * @returns a string that has been converted to lowercase, has all spaces replaced with dashes, and has
 * all special characters removed.
 */
export function slugify(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
/**
 * The function takes a string input, capitalizes the first letter of each word, and joins them with
 * hyphens.
 * @param {string} input - The input parameter is a string that represents the text that needs to be
 * "nicefied".
 * @returns The `nicefyString` function is returning a modified version of the input string where each
 * word is capitalized and separated by a hyphen.
 */
export function nicefyString(input) {
    return input
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
/**
 * The function checks if a given string is empty or null.
 * @param {string} [text] - The input string that needs to be checked for emptiness. It is an optional
 * parameter, which means it can be undefined or null.
 * @returns a boolean value (either true or false) depending on whether the input string is considered
 * empty or not.
 */
export function emptyString(text) {
    if (text === undefined || text === null || text === false)
        return true;
    if (text === 'undefined' || text === 'null')
        return true;
    if (text.toString().trim().length === 0)
        return true;
    return false;
}
/**
 * If the text is not empty, return the first character of the text in uppercase, followed by the rest
 * of the text.
 * @param {string} text - string - this is the parameter that we're passing into the function. It's a
 * string.
 * @returns The first character of the string is being capitalised and then the rest of the string is
 * being returned.
 */
export function captitalise(text) {
    if (!text)
        return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
}
/**
 * It takes a sentence, splits it into an array of words, capitalises the first letter of each word,
 * then joins the array back into a sentence
 * @param {string} sentence - string - The sentence to be capitalised.
 * @returns The function capitaliseEachWord takes a string as an argument and returns a string with the
 * first letter of each word capitalised.
 */
export function capitaliseEachWord(sentence) {
    if (!sentence)
        return '';
    const split = sentence.split(' ');
    return split
        .map((element) => {
        return element.charAt(0).toUpperCase() + element.slice(1);
    })
        .join(' ');
}
/**
 * It replaces all the illegal characters in a string with their unicode equivalents
 * @param {string} str - any - The string to be replaced.
 * @returns A string with all the illegal characters replaced with unicode characters.
 */
export function replaceIllegalCharacters(str) {
    return str
        .replaceAll('\t', ' ')
        .replaceAll('"', '\uFF02')
        .replaceAll('<', '\uFF1C')
        .replaceAll('>', '\uFF1E')
        .replaceAll('|', '\uFF5C');
}
/**
 * It replaces all the illegal characters in a string with their legal counterparts
 * @param {string} str - any
 * @returns A string with all the illegal characters replaced with a legal character.
 */
export function replaceBackToIllegalCharacters(str) {
    return (str
        // replaceAll(";", ",").
        .replaceAll('\uFF02', '"')
        .replaceAll('\uFF1C', '<')
        .replaceAll('\uFF1E', '>')
        .replaceAll('\uFF5C', '|'));
}
/**
 * If the last digit of the number is 1, and the last two digits are not 11, return the number with
 * "st" appended; if the last digit is 2, and the last two digits are not 12, return the number with
 * "nd" appended; if the last digit is 3, and the last two digits are not 13, return the number with
 * "rd" appended; otherwise, return the number with "th" appended
 * @param {number} i - The number to convert to ordinal
 * @returns The ordinal of the number.
 */
export function ordinal(i) {
    const j = i % 10, k = i % 100;
    if (j === 1 && k !== 11) {
        return `${i}st`;
    }
    if (j === 2 && k !== 12) {
        return `${i}nd`;
    }
    if (j === 3 && k !== 13) {
        return `${i}rd`;
    }
    return `${i}th`;
}
/**
 * The function converts a string to camel case by removing spaces and capitalizing the first letter of
 * each word except the first one.
 * @param {string} name - The `name` parameter is a string that represents a name or a phrase.
 * @returns a camel case version of the input name.
 */
export function toCamelCase(name) {
    if (!name)
        return name;
    return name
        .split(' ')
        .map((word, index) => index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
}
export function price(value) {
    var _a;
    if (!value)
        return '$-';
    let formattedPrice = price === null || price === void 0 ? void 0 : price.toString().replaceAll('$', '');
    try {
        formattedPrice = `$${((_a = this.item.ClassifiedPrice) === null || _a === void 0 ? void 0 : _a.toFixed(2).replace(
        // eslint-disable-next-line security/detect-unsafe-regex
        /\d(?=(\d{3})+\.)/g, '$&,')) || '0.00'}`;
    }
    catch (e) {
        formattedPrice = value === null || value === void 0 ? void 0 : value.toString();
    }
    return formattedPrice;
}
export function formatNumber(value) {
    const number = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(number)) {
        return 'NaN';
    }
    return new Intl.NumberFormat('en-AU').format(number);
}
export function stripHtml(maybeHasHtmlString) {
    // Create a temporary DOM element to leverage the browser's parsing ability
    const tempElement = document.createElement('div');
    tempElement.innerHTML = maybeHasHtmlString;
    // Use textContent to retrieve the text without HTML tags
    return tempElement.textContent || '';
}
//# sourceMappingURL=Strings.js.map