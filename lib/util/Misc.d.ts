/**
 * The function takes a string as an argument, and then uses the clipboard API to copy the string to
 * the clipboard
 * @param {string} text - The text to copy to the clipboard.
 */
export declare function copyToClipboard(text: string): void;
/**
 * It opens the user's email client with the specified parameters
 * @param {string} to - The email address of the recipient.
 * @param {string} subject - The subject of the email
 * @param {string} body - The body of the email.
 */
export declare function openEmailClient(to: string, subject: string, body: string): void;
/**
 * The `widthLetter` function takes a width value and returns a corresponding size letter based on
 * predefined width thresholds.
 * @param {number} width - The `width` parameter is a number that represents the width of a letter.
 * @returns a string representing the size of a letter based on the given width.
 */
export declare function widthLetter(width: number): string;
//# sourceMappingURL=Misc.d.ts.map