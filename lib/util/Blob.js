var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * It takes a data URL and returns a Blob
 * @param {string} dataurl - The data URL string that you want to convert to a Blob.
 * @returns A blob object
 */
export function dataURLtoBlob(dataurl) {
    const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}
/**
 * It converts a blob to a data URL
 * @param {Blob} blob - The blob to convert to a data URL.
 * @param {ProgressEvent<FileReader>} callback - The function to call when the conversion is complete.
 */
export function blobToDataURL(blob, callback) {
    const a = new FileReader();
    a.onload = function (e) {
        callback(e.target.result);
    };
    a.readAsDataURL(blob);
}
/**
 * It downloads a file from a URL and returns a promise that resolves to a Blob
 * @param {string} url - The URL of the file you want to download.
 * @returns A promise that resolves to a blob.
 */
export function downloadFile(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const blob = yield fetch(url).then((res) => res.blob());
        return blob;
    });
}
/**
 * It reads a Blob as an ArrayBuffer
 * @param {Blob} file - Blob - The file to read.
 * @returns A promise that resolves to an ArrayBuffer.
 */
export function readBlob(file) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    });
}
/**
 * The function `readBlobText` reads the text content of a Blob object and returns it as a Promise.
 * @param {Blob} file - The `file` parameter is of type `Blob`, which represents a file-like object of
 * immutable, raw data. It can be a file from the user's device or a file received from a server.
 * @returns a Promise that resolves to a string.
 */
export function readBlobText(file) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield file.text();
    });
}
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
export function download(filename, data, fileType) {
    return __awaiter(this, void 0, void 0, function* () {
        const blob = new Blob([data], { type: `text/${fileType};charset=utf-8` });
        const url = window.URL.createObjectURL(blob);
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', url);
        downloadAnchorNode.setAttribute('download', `${filename}.${fileType}`);
        downloadAnchorNode.click();
        window.URL.revokeObjectURL(url); // Free up memory
    });
}
/**
 * The `upload` function allows users to select a file from their device and returns a promise that
 * resolves with the file's content as a string.
 * @param {string} [allowedFileTypes] - The `allowedFileTypes` parameter is an optional string that
 * specifies the types of files that can be selected for upload. It is used to set the `accept`
 * attribute of the file input element, which restricts the file selection to the specified types. For
 * example, if `allowedFileTypes`
 * @returns The `upload` function returns a Promise that resolves to a string.
 */
export function upload(allowedFileTypes) {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        // If allowedFileTypes is provided, set it as the accept attribute
        if (allowedFileTypes) {
            input.accept = allowedFileTypes;
        }
        input.onchange = (event) => {
            var _a;
            const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                var _a;
                resolve((_a = event.target) === null || _a === void 0 ? void 0 : _a.result);
            };
            reader.onerror = (e) => {
                reject(e);
            };
            reader.readAsText(file);
        };
        input.click();
    });
}
//# sourceMappingURL=Blob.js.map