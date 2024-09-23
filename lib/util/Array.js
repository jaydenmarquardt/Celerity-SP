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
 * "Filter an array of objects by a property value."
 *
 * The function takes three arguments:
 *
 * arr: an array of objects
 * prop: the property to filter by
 * value: the value to filter by
 * The function returns a new array of objects that have the property value specified
 * @param {any} arr - the array to filter
 * @param {string} prop - The property of the array element to filter by.
 * @param {any} value - The value to filter by.
 * @returns An array of objects that have a property that matches the value.
 */
export function filterArrayByProperty(arr, prop, value) {
    return arr.filter((el) => {
        if (value === '<EXISTS>' && hasProperty(el, prop) && !!el[prop])
            return true;
        return el[prop] === value;
    });
}
/**
 * The function checks if an object has a specific property.
 * @param {UnknownObject} object - The `object` parameter is the object you want to check for the
 * presence of a property.
 * @param {string} property - The `property` parameter is a string that represents the name of the
 * property you want to check for in the `object`.
 * @returns a boolean value indicating whether the given object has the specified property.
 */
export function hasProperty(object, property) {
    // eslint-disable-next-line no-prototype-builtins
    return object.hasOwnProperty(property);
}
/**
 * "Find the first element in an array that has a property with a given value."
 *
 * The function takes three arguments:
 *
 * * arr: The array to search
 * * prop: The property to search for
 * * value: The value to search for
 *
 * The function returns the first element in the array that has a property with the given value. If no
 * element is found, the function returns null
 * @param {UnknownObject[]} arr - the array to search
 * @param {string} prop - The property to search for
 * @param {UnknownObject} value - The value to search for.
 * @returns The first element in the array that matches the property and value.
 */
export function findByProperty(arr, prop, value) {
    const result = arr.filter((el) => {
        if (value === '<EXISTS>' && !!el[prop])
            return true;
        return el[prop] === value;
    });
    return result && result.length > 0 ? result[0] : null;
}
/**
 * It takes an array of objects, a property name, and a value, and returns an array of objects that
 * have a property with a value that contains the given value
 * @param {UnknownObject[]} arr - The array to filter
 * @param {string} prop - The property to filter by.
 * @param {UnknownObject} value - The value to search for
 * @returns An array of objects that have a property that matches the value.
 */
export function filterByProperty(arr, prop, value) {
    value = value.toLowerCase().trim();
    const result = arr.filter((el) => {
        if (!el[prop])
            return false;
        const propVal = el[prop].toString().toLowerCase();
        return propVal.indexOf(value) !== -1;
    });
    return result;
}
/**
 * It takes an array of items and a number of items per page, and returns an array of arrays, each of
 * which contains the items for a single page
 * @param {UnknownObject} items - The array of items to paginate
 * @param {number} perPage - The number of items you want to display per page.
 * @returns An array of arrays.
 */
export function paginate(items, perPage) {
    return items.reduce((acc, val, i) => {
        const idx = Math.floor(i / perPage);
        const page = acc[idx] || (acc[idx] = []);
        page.push(val);
        return acc;
    }, []);
}
/**
 * It takes an array, a page size, and a page number, and returns a new array containing the items from
 * the original array that should be displayed on the specified page
 * @param {any} array - The array you want to paginate.
 * @param {number} page_size - The number of items you want to display per page.
 * @param {number} page_number - The page number to return.
 * @returns a slice of the array.
 */
export function paginatePage(array, perPage, page_number) {
    var _a;
    return ((_a = paginate(array, perPage)) === null || _a === void 0 ? void 0 : _a[page_number]) || [];
}
/**
 * The function `getItemsPerPage` takes an array of objects, a page size, and a page index, and returns
 * a subset of the array based on the given page size and index.
 * @param {UnknownObject[]} items - An array of objects of type UnknownObject. These are the items that
 * need to be paginated.
 * @param {number} pageSize - The `pageSize` parameter represents the number of items that should be
 * displayed on each page.
 * @param {number} pageIndex - The `pageIndex` parameter represents the index of the page that you want
 * to retrieve. It is a zero-based index, meaning the first page has an index of 0, the second page has
 * an index of 1, and so on.
 * @returns a subset of the `items` array based on the `pageSize` and `pageIndex` parameters.
 */
export function getItemsPerPage(items, pageSize, pageIndex) {
    const startIndex = pageIndex * pageSize;
    const endIndex = (pageIndex + 1) * pageSize;
    return items.slice(startIndex, endIndex);
}
/**
 * The `moveItemIndex` function allows you to move an item within an array to a new index.
 * @param {UnknownObject[]} arr - An array of UnknownObject elements.
 * @param {number} old_index - The old_index parameter represents the current index of the item that
 * you want to move within the array.
 * @param {number} new_index - The `new_index` parameter represents the desired index where the item
 * should be moved to in the array.
 * @returns an array of UnknownObjects.
 */
export function moveItemIndex(arr, old_index, new_index) {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        let k = new_index - arr.length;
        while (k-- + 1) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
}
/**
 * The `asyncForEach` function allows you to iterate over an array asynchronously and execute a
 * callback function for each item.
 * @param {T[]} array - The `array` parameter is an array of elements of type `T`. It represents the
 * array that you want to iterate over asynchronously.
 * @param callback - The `callback` parameter is a function that will be called for each item in the
 * `array`. It takes three arguments:
 */
export function asyncForEach(array, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let index = 0; index < array.length; index++) {
            yield callback(array[index], index, array);
        }
    });
}
/**
 * It takes an array, an index, and a new item, and returns a new array with the new item inserted at
 * the specified index
 * @param {UnknownObject[]} arr - The array to insert into
 * @param {number} index - The index where you want to insert the new item.
 * @param {UnknownObject} newItem - The item to insert into the array.
 * @returns [1, 2, 3, 4, 5, 6]
 */
export function insertIntoArray(arr, index, newItem) {
    return [...arr.slice(0, index), newItem, ...arr.slice(index)];
}
/**
 * "Move an array item from one position to another."
 *
 * The function takes three arguments:
 *
 * arr: The array to move an item from/to.
 * old_index: The index of the item to move within the array.
 * new_index: The index to move the item to.
 * The function returns the array with the item moved
 * @param {unknown} arr - The array you want to move an item from.
 * @param {number} old_index - The index of the item you want to move.
 * @param {number} new_index - The new index of the element.
 * @returns The array with the item moved to the new index.
 */
export function moveArrayItemPosition(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        let k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
}
/**
 * It takes a string, replaces all the plus signs with spaces, replaces all the commas with commas, and
 * then splits the string into an array
 * @param {string} string - The string to be unserialised.
 * @returns An array of strings
 */
export function unSerialiseArray(string) {
    string = string
        .replaceAll('+', ' ')
        .replaceAll('+', ' ')
        .replaceAll('%2C', ',');
    return string.split(',');
}
/**
 * It takes a string of name/value pairs and converts it into an associative array
 * @param {UnknownObject} prmstr - The query string you want to parse.
 * @returns An object with the key value pairs of the query string.
 */
export function transformToAssocArray(prmstr) {
    const params = {};
    const prmarr = prmstr.split('&');
    for (let i = 0; i < prmarr.length; i++) {
        const tmparr = prmarr[i].split('=');
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}
/**
 * Remove the element at the specified index, then insert it at the specified index.
 * @param arr - The array to move an element from and to.
 * @param fromIndex - The index of the element you want to move.
 * @param toIndex - The index to move the element to.
 */
export function arrayMoveIndex(arr, fromIndex, toIndex) {
    const element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}
/**
 * This TypeScript function groups an array of objects by a specified key.
 * @param {any[]} items - an array of items that you want to group by a specific key
 * @param {string} key - The `key` parameter is a string that represents the property name of the
 * objects in the `items` array that will be used to group them. The function will group the objects in
 * the `items` array based on the value of this property.
 * @returns The `groupBy` function is returning an object that groups the items in the input array by
 * the value of the specified key. The keys of the returned object are the unique values of the
 * specified key in the input array, and the values of the object are arrays of items that have the
 * same value for the specified key.
 */
export function groupBy(items, key) {
    return items.reduce((result, item) => (Object.assign(Object.assign({}, result), { [item[key]]: [...(result[item[key]] || []), item] })), {});
}
/**
 * The `removeNullProperties` function recursively removes null properties from an object or array.
 * @param {any} obj - The `obj` parameter is the object that you want to remove null properties from.
 * @returns The function `removeNullProperties` returns an object with null properties removed.
 */
export function removeNullProperties(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(removeNullProperties);
    }
    const result = {};
    for (const key in obj) {
        if (obj[key] === null)
            continue;
        const value = removeNullProperties(obj[key]);
        if (value !== null) {
            result[key] = value;
        }
    }
    return result;
}
/**
 * The `toCSV` function converts an array of objects into a CSV string.
 * @param {object[]} data - An array of objects representing the data to be converted to CSV format.
 * Each object in the array should have the same keys, which will be used as the headers in the CSV
 * file.
 * @returns a string in CSV format.
 */
export function toCSV(data) {
    const replacer = (key, value) => value === null ? '' : value;
    const escape = (str) => str.replace(/(\r\n|\n|\r|,|"|;)/g, ' ');
    const headers = Object.keys(data[0]);
    const csv = [
        headers.join(','),
        ...data.map((row) => headers
            .map((fieldName) => escape(JSON.stringify(row[fieldName], replacer)))
            .join(','))
    ].join('\r\n');
    return csv;
}
//# sourceMappingURL=Array.js.map