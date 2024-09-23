import { errorLog } from './Debug';

/**
 * The function takes a string as an argument, and then uses the clipboard API to copy the string to
 * the clipboard
 * @param {string} text - The text to copy to the clipboard.
 */
export function copyToClipboard(text: string): void {
  navigator.clipboard
    .writeText(text)
    .then(() => {})
    .catch((e) =>
      errorLog({
        component: 'Misc.util:CopyToClipboard',
        message: 'Failed to copy text to clipboard.',
        type: 'error',
        role: 'user',
        severity: 'low',
        data: { e }
      })
    );
}

/**
 * It opens the user's email client with the specified parameters
 * @param {string} to - The email address of the recipient.
 * @param {string} subject - The subject of the email
 * @param {string} body - The body of the email.
 */
export function openEmailClient(
  to: string,
  subject: string,
  body: string
): void {
  const location: string =
    'mailto:' + to + '?subject=' + subject + '&body=' + body;
  document.location = location;
}

/**
 * The `widthLetter` function takes a width value and returns a corresponding size letter based on
 * predefined width thresholds.
 * @param {number} width - The `width` parameter is a number that represents the width of a letter.
 * @returns a string representing the size of a letter based on the given width.
 */
export function widthLetter(width: number): string {
  const widths = {
    XS: 380,
    S: 450,
    M: 1000,
    L: 1280,
    XL: 1500
  };
  const sizeKeys = Object.keys(widths) as Array<keyof typeof widths>;

  for (let i = 0; i < sizeKeys.length; i++) {
    const size = sizeKeys[i];
    const threshold = widths[size];

    if (width < threshold) {
      return size;
    }
  }

  return 'XXL';
}
