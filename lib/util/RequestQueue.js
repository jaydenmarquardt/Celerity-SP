var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isCached, setCache } from "./Cache";
import { errorLog, warn } from "./Debug";
import { W } from "./Util.types";
class RequestQueue {
    constructor() {
        this.keys = [];
        this.queue = [];
        this.isProcessing = false;
        this.currentKey = false;
    }
    /**
     * The `enqueue` function adds a request to a queue and processes it if the queue is not already
     * being processed.
     * @param {string | boolean} dataKey - The `dataKey` parameter is a string or boolean value that
     * represents a key associated with the request data. It can be used to identify and retrieve the
     * response data later on.
     * @param request - The `request` parameter is a function that returns a Promise. It represents the
     * asynchronous operation that needs to be enqueued and processed.
     * @returns The `enqueue` function returns a Promise.
     */
    enqueue(dataKey, request) {
        return new Promise((resolve, reject) => {
            const wrappedRequest = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield request();
                    resolve(response);
                }
                catch (e) {
                    reject(e);
                }
            });
            this.queue.push(wrappedRequest);
            this.keys.push(dataKey);
            if (!this.isProcessing) {
                this.processQueue().catch((e) => {
                    errorLog({
                        component: "RequestQueue:Enqueue",
                        message: `Failed to process request queue - ${e.message}`,
                        type: "error",
                        role: "user",
                        severity: "low",
                        data: { e },
                    });
                });
            }
        });
    }
    /**
     * The `processQueue` function processes a queue of requests asynchronously, executing each request
     * one at a time and handling any errors that occur.
     * @returns a Promise that resolves to void.
     */
    processQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isProcessing || this.queue.length === 0) {
                return;
            }
            this.isProcessing = true;
            const request = this.queue.shift();
            this.currentKey = this.keys.shift();
            try {
                yield wait(25);
                yield request();
            }
            catch (e) {
                // Handle or log the error as needed
            }
            finally {
                this.isProcessing = false;
                this.processQueue().catch((e) => {
                    errorLog({
                        component: "RequestQueue:PocessQueue",
                        message: `Failed to process request queue - ${e.message}`,
                        type: "error",
                        role: "user",
                        severity: "low",
                        data: { e },
                    });
                });
            }
        });
    }
    /**
     * The `cancel` function removes a data key from the queue and returns `true` if it exists, otherwise
     * it returns `false`.
     * @param {string} dataKey - The `dataKey` parameter is a string that represents the key of the data
     * that needs to be canceled.
     * @returns The `cancel` function returns a boolean value. It returns `true` if the cancellation was
     * successful (i.e., the `dataKey` was found and removed from the `keys` and `queue` arrays), and
     * `false` if the cancellation was not successful (i.e., the `dataKey` was not found in the `keys`
     * array or if the `currentKey` is
     */
    cancel(dataKey) {
        if (this.currentKey === dataKey)
            return false;
        const index = this.keys.indexOf(dataKey);
        if (index > -1) {
            this.keys.splice(index, 1);
            this.queue.splice(index, 1);
            return true;
        }
        return false;
    }
}
const requestQueue = new RequestQueue();
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
export function q(dataKey, request) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!W["requestQueue"]) {
            W["requestQueue"] = requestQueue;
        }
        if (dataKey !== false && typeof dataKey === "string") {
            const cache = isCached(dataKey);
            if (cache) {
                return true;
            }
        }
        const response = yield requestQueue.enqueue(dataKey, request);
        if (dataKey !== false && typeof dataKey === "string") {
            setCache(dataKey, response);
        }
        return response;
    });
}
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
export function qc(dataKey, request, callBack) {
    q(dataKey, request)
        .then((response) => callBack(response, null))
        .catch((e) => callBack(null, e));
    return () => requestQueue.cancel(dataKey);
}
export function timeOut(request, timeout = 1000, retries = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        let attempts = 0;
        const executeRequest = () => __awaiter(this, void 0, void 0, function* () {
            const timeoutPromise = new Promise((resolve, reject) => setTimeout(() => reject(new Error("Request timed out")), timeout));
            try {
                return yield Promise.race([request(), timeoutPromise]);
            }
            catch (e) {
                if (attempts < retries) {
                    attempts++;
                    warn(`Attempt ${attempts} failed. Retrying...`);
                    return executeRequest();
                }
                else {
                    throw e;
                }
            }
        });
        return executeRequest();
    });
}
export function wait(ms = 1000) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve) => setTimeout(resolve, ms));
    });
}
//# sourceMappingURL=RequestQueue.js.map