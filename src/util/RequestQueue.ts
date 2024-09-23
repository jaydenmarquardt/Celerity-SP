import { isCached, setCache } from "./Cache";
import { errorLog, warn } from "./Debug";
import { UnknownObject, W } from "./Util.types";

class RequestQueue {
  private keys: (string | boolean)[] = [];
  private queue: (() => Promise<any>)[] = [];
  private isProcessing: boolean = false;
  private currentKey: boolean | string = false;

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
  enqueue(
    dataKey: string | boolean,
    request: () => Promise<any>
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const wrappedRequest = async () => {
        try {
          const response = await request();
          resolve(response);
        } catch (e) {
          reject(e);
        }
      };

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
  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;
    const request = this.queue.shift();
    this.currentKey = this.keys.shift();

    try {
      await wait(25);
      await request();
    } catch (e) {
      // Handle or log the error as needed
    } finally {
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
  cancel(dataKey: string): boolean {
    if (this.currentKey === dataKey) return false;
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
export async function q<T>(
  dataKey: string | boolean,
  request: () => Promise<T>
) {
  if (!W["requestQueue"]) {
    W["requestQueue"] = requestQueue;
  }
  if (dataKey !== false && typeof dataKey === "string") {
    const cache = isCached(dataKey);
    if (cache) {
      return true;
    }
  }
  const response = await requestQueue.enqueue(dataKey, request);

  if (dataKey !== false && typeof dataKey === "string") {
    setCache(dataKey, response);
  }
  return response;
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
export function qc<T>(
  dataKey: string,
  request: () => Promise<T>,
  callBack: (response: T, error: UnknownObject) => Promise<void> | void
) {
  q(dataKey, request)
    .then((response) => callBack(response, null))
    .catch((e) => callBack(null, e));

  return () => requestQueue.cancel(dataKey);
}
export async function timeOut<T>(
  request: () => Promise<T>,
  timeout = 1000,
  retries = 0
): Promise<T> {
  let attempts = 0;

  const executeRequest = async (): Promise<T> => {
    const timeoutPromise = new Promise<never>((resolve, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    );

    try {
      return await Promise.race([request(), timeoutPromise]);
    } catch (e) {
      if (attempts < retries) {
        attempts++;
        warn(`Attempt ${attempts} failed. Retrying...`);
        return executeRequest();
      } else {
        throw e;
      }
    }
  };

  return executeRequest();
}

export async function wait(ms: number = 1000) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
