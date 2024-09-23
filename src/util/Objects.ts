import { nullIsh } from './Booleans';
import { errorLog } from './Debug';
import { UnknownObject } from './Util.types';

export function xmlToJson(xml: string): any {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, 'text/xml');
  const jsonResult = xmlNodeToJson(xmlDoc.documentElement);
  return jsonResult;
}

function xmlNodeToJson(node: Element): any {
  const obj: any = {};

  // Convert attributes to JSON properties
  if (node.hasAttributes()) {
    for (let j = 0; j < node.attributes.length; j++) {
      const attribute = node.attributes.item(j);
      obj[attribute.name] = attribute.value;
    }
  }

  // Convert child nodes to JSON properties
  if (node.hasChildNodes()) {
    for (let i = 0; i < node.childNodes.length; i++) {
      const childNode = node.childNodes.item(i);
      if (childNode.nodeType === 1) {
        // Element node
        const childElement = childNode as Element;
        const childObj = xmlNodeToJson(childElement);
        const nodeName = childElement.nodeName;

        if (obj[nodeName] === undefined) {
          obj[nodeName] = childObj;
        } else {
          if (!Array.isArray(obj[nodeName])) {
            obj[nodeName] = [obj[nodeName]];
          }
          obj[nodeName].push(childObj);
        }
      } else if (childNode.nodeType === 3) {
        // Text node
        const textContent = childNode.nodeValue?.trim();
        if (textContent) {
          obj['text'] = textContent;
        }
      }
    }
  }

  return obj;
}

/**
 * If the objects are not the same type, or if they are functions, regular expressions, or dates, then
 * they are not equal. Otherwise, if they are equal, or if they are both arrays and have the same
 * length, or if they are both objects and have the same set of keys, then they are equal
 * @param {any} x - any, y: any
 * @param {any} y - any - The object to compare to.
 * @returns a boolean value.
 */
export function areObjectsEqual(x: UnknownObject, y: UnknownObject): boolean {
  if (x === null || x === undefined || y === null || y === undefined) {
    return x === y;
  }
  if (x.constructor !== y.constructor) {
    return false;
  }
  if (x instanceof Function) {
    return x === y;
  }
  if (x instanceof RegExp) {
    return x === y;
  }
  if (x === y || x.valueOf() === y.valueOf()) {
    return true;
  }
  if (Array.isArray(x) && x.length !== y.length) {
    return false;
  }

  if (x instanceof Date) {
    return false;
  }

  if (!(x instanceof Object)) {
    return false;
  }
  if (!(y instanceof Object)) {
    return false;
  }

  const p = Object.keys(x);
  return (
    Object.keys(y).every((i) => {
      return p.indexOf(i) !== -1;
    }) &&
    p.every((i) =>
      areObjectsEqual(x[i] as UnknownObject, y[i] as UnknownObject)
    )
  );
}

/**
 * The function `makeCopy` takes an object as input and returns a deep copy of that object, or the
 * original object if an error occurs.
 * @param {UnknownObject} object - The `object` parameter is of type `UnknownObject`, which means it
 * can be any type of object.
 * @returns a copy of the input object.
 */
export function makeCopy(object: UnknownObject): UnknownObject {
  if (object === undefined) return undefined;
  let string = '';
  try {
    string = safelyStringify(object);
    if (string === 'undefined') return undefined;
    return JSON.parse(string);
  } catch (e) {
    errorLog({
      component: 'Objects.util:MakeCopy',
      message: `Failed to make copy - ${e.message}`,
      type: 'error',
      role: 'user',
      severity: 'minor',
      data: { e, object, string }
    });
    return object;
  }
}

/**
 * The function safelyParse attempts to parse a string as JSON and returns the parsed object if
 * successful, otherwise it returns undefined.
 * @param {string} [text] - The `text` parameter is a string that represents JSON data. It can be
 * either a JSON object or a JSON array.
 * @returns an object of type UnknownObject.
 */
export function safelyParse(text?: string): UnknownObject {
  try {
    if (nullIsh(text)) return undefined;
    if (!(text.startsWith('{') || text.startsWith('['))) return text;

    return JSON.parse(text);
  } catch (e) {
    return undefined;
  }
}

/**
 * The `safelyStringify` function safely converts an object to a JSON string, handling circular
 * references by replacing them with a placeholder.
 * @param {UnknownObject} object - The `object` parameter is of type `UnknownObject`, which means it
 * can be any type of object.
 * @returns The function `safelyStringify` returns a string representation of the input object, with
 * circular references handled by replacing them with a string `[Circular: key]`.
 */
export function safelyStringify(
  object: UnknownObject,
  space: number = undefined
): string {
  if (object === undefined) return undefined;
  const seen = new WeakSet();

  return JSON.stringify(
    object,
    (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          try {
            // Attempt to serialize the circular reference using a placeholder
            return JSON.parse(JSON.stringify(value, null, space));
          } catch (e) {
            // If the serialization fails, return a string representation of the circular reference
            return `[Circular: ${key}]`;
          }
        }
        seen.add(value);
      }
      return value;
    },
    space
  );
}

/**
 * The `removeProperties` function recursively removes properties with a given name from an object or
 * an array of objects.
 * @param {UnknownObject} obj - The `obj` parameter is an object or an array of objects.
 * @param {string} propName - The `propName` parameter is a string that represents the name of the
 * property that you want to remove from the object.
 */
export function removeProperties(obj: UnknownObject, propName: string): void {
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      removeProperties(obj[i], propName);
    }
  } else if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (key === propName) {
        delete obj[key];
      } else if (typeof obj[key] === 'object' || Array.isArray(obj[key])) {
        removeProperties(obj[key] as UnknownObject, propName);
      }
    }
  }
}

/**
 * The `hasProperty` function checks if an object has a specific property.
 * @param {T} obj - The `obj` parameter is the object that you want to check for the presence of a
 * property.
 * @param propName - The `propName` parameter is the name of the property that we want to check if it
 * exists in the `obj` object. It is of type `keyof T`, which means it can be any key that exists in
 * the `T` object type.
 * @returns a boolean value.
 */
export function hasProperty<T extends object = UnknownObject>(
  obj: T,
  propName: keyof T
): boolean {
  return propName in obj && Object.prototype.hasOwnProperty.call(obj, propName);
}

/* eslint-disable security/detect-object-injection */
/**
 * The `Obj` function in TypeScript allows for easy manipulation of objects by providing methods to
 * check for the existence of a key, retrieve a value by key, and set a value by key.
 * @param {T} object - The `object` parameter is the input object that you want to perform operations
 * on. It is a generic type `T` that extends the `object` type. This means that the `object` parameter
 * can be any object type, and the specific type of the object will be inferred based on the
 * @returns The `Obj` function returns an object with three methods: `has`, `get`, and `set`.
 */
export function Obj<T extends object = UnknownObject>(object: T) {
  return {
    has: (key: keyof T): boolean => hasProperty<T>(object, key),
    get: (key: keyof T): UnknownObject =>
      hasProperty<T>(object, key) ? object[key] : undefined,
    set: (key: keyof T, value: UnknownObject) => {
      object[key] = value;
      return object;
    }
  };
}

/**
 * The `isDeepEqual` function checks if two objects are deeply equal by comparing their properties
 * recursively.
 * @param {UnknownObject} obj1 - The parameter `obj1` is an unknown object that represents the first
 * object to compare.
 * @param {UnknownObject} obj2 - UnknownObject
 * @returns a boolean value. It returns true if the two objects passed as arguments are deeply equal,
 * and false otherwise.
 */
export function isDeepEqual(obj1: UnknownObject, obj2: UnknownObject) {
  if (obj1 === obj2) {
    return true;
  }

  if (
    typeof obj1 !== 'object' ||
    obj1 === null ||
    typeof obj2 !== 'object' ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !isDeepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

/**
 * The function deepCopy<T> takes an object as input and returns a deep copy of that object.
 * @param {T} obj - The `obj` parameter is the object that you want to create a deep copy of. It can be
 * of any type.
 * @returns The deepCopy function returns a deep copy of the input object.
 */
export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * The `updateObject` function is a utility function in TypeScript that updates an object based on a
 * given specification object.
 * @param {UnknownObject} object - The `object` parameter is the object that you want to update. It can
 * be of any type, as indicated by the `UnknownObject` type annotation.
 * @param {UnknownObject} spec - The `spec` parameter is an object that specifies the updates to be
 * applied to the `object` parameter. It can contain various commands (keys starting with `$`) and
 * their corresponding values. The `updateObject` function iterates over the keys of the `spec` object
 * and applies the specified updates
 * @returns The function `updateObject` returns an updated object based on the provided `object` and
 * `spec`.
 */
export function updateObject(
  object: UnknownObject,
  spec: UnknownObject
): UnknownObject {
  const keys: string[] = Object.keys(spec) as string[];

  let newObj = Array.isArray(object)
    ? [...object]
    : ({ ...object } as UnknownObject);

  keys.forEach((key) => {
    if (key.startsWith('$')) {
      const commandKey = key;

      switch (commandKey) {
        case '$set':
          newObj = spec[commandKey];
          break;
        case '$push':
          if (Array.isArray(newObj)) {
            newObj.push(...spec[commandKey]);
          }
          break;
        case '$splice':
          if (Array.isArray(newObj)) {
            spec[commandKey].forEach((args) => {
              newObj.splice(...args);
            });
          }
          break;
        case '$merge':
          if (typeof newObj === 'object') {
            newObj = {
              ...newObj,
              ...spec[commandKey]
            };
          }
          break;
        case '$apply':
          if (typeof spec[commandKey] === 'function') {
            newObj = spec[commandKey](newObj);
          }
          break;
        default:
          throw new Error(`Unrecognized update command: ${commandKey}`);
      }
    } else if (typeof spec[key] === 'object' && spec[key] !== null) {
      newObj[key] = updateObject(object[key], spec[key]);
    } else {
      newObj[key] = spec[key];
    }
  });

  return newObj;
}

/**
 * The `moveProp` function allows you to move a property within an object up or down by swapping its
 * position with the adjacent property.
 * @param {UnknownObject} obj - The `obj` parameter is an object of type `UnknownObject`. It represents
 * the object whose property needs to be moved.
 * @param {string} key - The `key` parameter in the `moveProp` function represents the key of the
 * property that you want to move within the `obj` object.
 * @param {'up' | 'down'} direction - The `direction` parameter in the `moveProp` function is a string
 * that can have two possible values: 'up' or 'down'. It determines the direction in which the property
 * should be moved within the object.
 * @returns an object of type UnknownObject.
 */
export function moveProp(
  obj: UnknownObject,
  key: string,
  direction: 'up' | 'down'
): UnknownObject {
  const keys = Object.keys(obj);
  const index = keys.indexOf(key);

  if (index === -1) return obj; // Key not found

  // Boundary checks
  if (
    (direction === 'up' && index === 0) ||
    (direction === 'down' && index === keys.length - 1)
  ) {
    return obj;
  }

  // Swap keys
  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  [keys[index], keys[targetIndex]] = [keys[targetIndex], keys[index]];

  // Reconstruct object
  return keys.reduce((acc, k) => {
    acc[k] = obj[k];
    return acc;
  }, {} as UnknownObject);
}

/**
 * The function `reorderObject` takes an object and an array of keys, and returns a new object with the
 * same keys as the original object, but in the order specified by the array.
 * @param {UnknownObject} obj - The `obj` parameter is an object of unknown structure. It can contain
 * any number of key-value pairs, where the keys are strings and the values can be of any type.
 * @param {string[]} orderedKeys - An array of strings representing the desired order of keys in the
 * object.
 * @returns a new object that contains the properties from the input object (`obj`) but in the order
 * specified by the `orderedKeys` array.
 */
export function reorderObject(
  obj: UnknownObject,
  orderedKeys: string[]
): UnknownObject {
  const reorderedObj: UnknownObject = {};

  for (const key of orderedKeys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      reorderedObj[key] = obj[key];
    }
  }

  return reorderedObj;
}

/**
 * The function `convertListToMap` takes a list of objects, a key name, and an optional flag to handle
 * duplicates, and returns a map where the key is the value of the specified key name and the value is
 * the corresponding object from the list.
 * @param {any} list - The `list` parameter is an array of objects that you want to convert into a map.
 * @param {string} keyName - The `keyName` parameter is a string that represents the name of the
 * property in each object of the `list` array that will be used as the key in the resulting map.
 * @param [handleDuplicates=false] - The handleDuplicates parameter is a boolean flag that determines
 * how to handle duplicate keys in the list. If handleDuplicates is set to true, and a duplicate key is
 * encountered, the function will check if the existing value for that key is an array. If it is an
 * array, the new object will be
 * @returns a map object.
 */
export function convertListToMap(
  list: any,
  keyName: string,
  handleDuplicates = false
) {
  const map = {};

  for (const obj of list) {
    const key = obj[keyName];
    const existingValue = map[key];

    if (existingValue && handleDuplicates) {
      if (Array.isArray(existingValue)) {
        existingValue.push(obj);
      } else {
        map[key] = [existingValue, obj];
      }
    } else {
      map[key] = obj;
    }
  }

  return map;
}

/**
 * The function `selectFieldsMap` takes a map object and an array of fields, and returns a new map
 * object with only the selected fields from the original map.
 * @param {any} map - The `map` parameter is an object that contains key-value pairs. Each key
 * represents a field name, and the corresponding value represents the value of that field.
 * @param {string[]} fields - The `fields` parameter is an array of strings that represents the fields
 * you want to select from the `map` object. These fields will be used to create a new object with only
 * the selected fields.
 * @param [hideNull=true] - The `hideNull` parameter is a boolean flag that determines whether or not
 * to hide fields with null values in the resulting map. If `hideNull` is set to `true`, fields with
 * null values will be excluded from the new map. If `hideNull` is set to `false`,
 * @returns a new map object with selected fields from the original map object.
 */
export function selectFieldsMap(map: any, fields: string[], hideNull = true) {
  const newMap = {};

  Object.keys(map).forEach((key) => {
    newMap[key] = selectFields(map[key], fields, hideNull);
  });

  return newMap;
}

/**
 * The function `selectFields` takes an object and an array of field names, and returns a new object
 * with only the specified fields, optionally hiding null values.
 * @param {any} object - The `object` parameter is the object from which you want to select fields. It
 * can be any JavaScript object.
 * @param {string[]} fields - An array of strings representing the fields that you want to select from
 * the object.
 * @param [hideNull=true] - The `hideNull` parameter is a boolean flag that determines whether or not
 * to include fields with a value of `null` in the resulting object. If `hideNull` is set to `true`,
 * fields with a value of `null` will be excluded from the resulting object. If `hide
 * @returns an object containing the selected fields from the input object.
 */
export function selectFields(object: any, fields: string[], hideNull = true) {
  const selectedFields = {};

  for (const field of fields) {
    if (object[field] !== undefined) {
      if (hideNull && object[field] === null) {
        selectedFields[field] = null;
      } else {
        selectedFields[field] = object[field];
      }
    } else {
      if (!hideNull) {
        selectedFields[field] = null;
      }
    }
  }

  return selectedFields;
}
