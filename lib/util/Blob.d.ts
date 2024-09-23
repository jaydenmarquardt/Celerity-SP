/**
 * It takes a data URL and returns a Blob
 * @param {string} dataurl - The data URL string that you want to convert to a Blob.
 * @returns A blob object
 */
export declare function dataURLtoBlob(dataurl: string): Blob;
/**
 * It converts a blob to a data URL
 * @param {Blob} blob - The blob to convert to a data URL.
 * @param {ProgressEvent<FileReader>} callback - The function to call when the conversion is complete.
 */
export declare function blobToDataURL(blob: Blob, callback: (result: string | ArrayBuffer) => void): void;
/**
 * It downloads a file from a URL and returns a promise that resolves to a Blob
 * @param {string} url - The URL of the file you want to download.
 * @returns A promise that resolves to a blob.
 */
export declare function downloadFile(url: string): Promise<Blob>;
/**
 * It reads a Blob as an ArrayBuffer
 * @param {Blob} file - Blob - The file to read.
 * @returns A promise that resolves to an ArrayBuffer.
 */
export declare function readBlob(file: Blob): Promise<ArrayBuffer>;
/**
 * The function `readBlobText` reads the text content of a Blob object and returns it as a Promise.
 * @param {Blob} file - The `file` parameter is of type `Blob`, which represents a file-like object of
 * immutable, raw data. It can be a file from the user's device or a file received from a server.
 * @returns a Promise that resolves to a string.
 */
export declare function readBlobText(file: Blob): Promise<string>;
/**
 * The `download` function allows users to download a file with a specified filename, data, and file
 * type.
 * @param {string} filename - The filename parameter is a string that represents the name of the file
 * to be downloaded.
 * @param {string} data - The `data` parameter is a string that represents the content of the file that
 * you want to download.
 * @param {string} fileType - The `fileType` parameter is a string that represents the type of file to
 * be downloaded. It can be any valid file extension, such as "txt", "csv", "json", "xml", etc.
 */
export declare function download(filename: string, data: string, fileType: string): Promise<void>;
/**
 * The `upload` function allows users to select a file from their device and returns a promise that
 * resolves with the file's content as a string.
 * @param {string} [allowedFileTypes] - The `allowedFileTypes` parameter is an optional string that
 * specifies the types of files that can be selected for upload. It is used to set the `accept`
 * attribute of the file input element, which restricts the file selection to the specified types. For
 * example, if `allowedFileTypes`
 * @returns The `upload` function returns a Promise that resolves to a string.
 */
export declare function upload(allowedFileTypes?: string): Promise<string>;
//# sourceMappingURL=Blob.d.ts.map