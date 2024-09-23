import { UnknownObject } from "./Util.types";
/**
 * The function `q` is an asynchronous function that checks if a value is cached, and if not, it
 * enqueues a request and sets the cache.
 * @param {string | boolean} dataKey - The `dataKey` parameter can be either a string or a boolean
 * value. It is used to identify the data being requested or cached. If `dataKey` is `false`, it means
 * that caching is disabled for this request. If `dataKey` is a string, it represents the key
 * @param request - The `request` parameter is a function that returns a promise. It is used to make an
 * asynchronous request to fetch data.
 * @returns a Promise that resolves to the response from the request.
 */
export declare function q<T>(dataKey: string | boolean, request: () => Promise<T>): Promise<any>;
/**
 * The `qc` function takes in a data key, a request function, and a callback function, and returns a
 * cancel function.
 * @param {string} dataKey - The `dataKey` parameter is a string that represents a unique identifier
 * for the data being requested. It is used to track and manage the request in the request queue.
 * @param request - The `request` parameter is a function that returns a Promise. It is responsible for
 * making the actual request to fetch the data.
 * @param callBack - The `callBack` parameter is a function that takes two arguments: `response` and
 * `error`. It is called after the `request` function is executed and either resolves with a response
 * or rejects with an error. The `response` argument represents the response data returned by the
 * `request` function
 * @returns The `qc` function returns a cancel function.
 */
export declare function qc<T>(dataKey: string, request: () => Promise<T>, callBack: (response: T, error: UnknownObject) => Promise<void> | void): () => boolean;
export declare function timeOut<T>(request: () => Promise<T>, timeout?: number, retries?: number): Promise<T>;
export declare function wait(ms?: number): Promise<void>;
//# sourceMappingURL=RequestQueue.d.ts.map