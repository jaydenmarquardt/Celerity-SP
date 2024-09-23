import { UnknownObject } from './Util.types';
export declare function xmlToJson(xml: string): any;
/**
 * If the objects are not the same type, or if they are functions, regular expressions, or dates, then
 * they are not equal. Otherwise, if they are equal, or if they are both arrays and have the same
 * length, or if they are both objects and have the same set of keys, then they are equal
 * @param {any} x - any, y: any
 * @param {any} y - any - The object to compare to.
 * @returns a boolean value.
 */
export declare function areObjectsEqual(x: UnknownObject, y: UnknownObject): boolean;
/**
 * The function `makeCopy` takes an object as input and returns a deep copy of that object, or the
 * original object if an error occurs.
 * @param {UnknownObject} object - The `object` parameter is of type `UnknownObject`, which means it
 * can be any type of object.
 * @returns a copy of the input object.
 */
export declare function makeCopy(object: UnknownObject): UnknownObject;
/**
 * The function safelyParse attempts to parse a string as JSON and returns the parsed object if
 * successful, otherwise it returns undefined.
 * @param {string} [text] - The `text` parameter is a string that represents JSON data. It can be
 * either a JSON object or a JSON array.
 * @returns an object of type UnknownObject.
 */
export declare function safelyParse(text?: string): UnknownObject;
/**
 * The `safelyStringify` function safely converts an object to a JSON string, handling circular
 * references by replacing them with a placeholder.
 * @param {UnknownObject} object - The `object` parameter is of type `UnknownObject`, which means it
 * can be any type of object.
 * @returns The function `safelyStringify` returns a string representation of the input object, with
 * circular references handled by replacing them with a string `[Circular: key]`.
 */
export declare function safelyStringify(object: UnknownObject, space?: number): string;
/**
 * The `removeProperties` function recursively removes properties with a given name from an object or
 * an array of objects.
 * @param {UnknownObject} obj - The `obj` parameter is an object or an array of objects.
 * @param {string} propName - The `propName` parameter is a string that represents the name of the
 * property that you want to remove from the object.
 */
export declare function removeProperties(obj: UnknownObject, propName: string): void;
/**
 * The `hasProperty` function checks if an object has a specific property.
 * @param {T} obj - The `obj` parameter is the object that you want to check for the presence of a
 * property.
 * @param propName - The `propName` parameter is the name of the property that we want to check if it
 * exists in the `obj` object. It is of type `keyof T`, which means it can be any key that exists in
 * the `T` object type.
 * @returns a boolean value.
 */
export declare function hasProperty<T extends object = UnknownObject>(obj: T, propName: keyof T): boolean;
/**
 * The `Obj` function in TypeScript allows for easy manipulation of objects by providing methods to
 * check for the existence of a key, retrieve a value by key, and set a value by key.
 * @param {T} object - The `object` parameter is the input object that you want to perform operations
 * on. It is a generic type `T` that extends the `object` type. This means that the `object` parameter
 * can be any object type, and the specific type of the object will be inferred based on the
 * @returns The `Obj` function returns an object with three methods: `has`, `get`, and `set`.
 */
export declare function Obj<T extends object = UnknownObject>(object: T): {
    has: (key: keyof T) => boolean;
    get: (key: keyof T) => UnknownObject;
    set: (key: keyof T, value: UnknownObject) => T;
};
/**
 * The `isDeepEqual` function checks if two objects are deeply equal by comparing their properties
 * recursively.
 * @param {UnknownObject} obj1 - The parameter `obj1` is an unknown object that represents the first
 * object to compare.
 * @param {UnknownObject} obj2 - UnknownObject
 * @returns a boolean value. It returns true if the two objects passed as arguments are deeply equal,
 * and false otherwise.
 */
export declare function isDeepEqual(obj1: UnknownObject, obj2: UnknownObject): boolean;
/**
 * The function deepCopy<T> takes an object as input and returns a deep copy of that object.
 * @param {T} obj - The `obj` parameter is the object that you want to create a deep copy of. It can be
 * of any type.
 * @returns The deepCopy function returns a deep copy of the input object.
 */
export declare function deepCopy<T>(obj: T): T;
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
export declare function updateObject(object: UnknownObject, spec: UnknownObject): UnknownObject;
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
export declare function moveProp(obj: UnknownObject, key: string, direction: 'up' | 'down'): UnknownObject;
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
export declare function reorderObject(obj: UnknownObject, orderedKeys: string[]): UnknownObject;
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
export declare function convertListToMap(list: any, keyName: string, handleDuplicates?: boolean): {};
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
export declare function selectFieldsMap(map: any, fields: string[], hideNull?: boolean): {};
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
export declare function selectFields(object: any, fields: string[], hideNull?: boolean): {};
//# sourceMappingURL=Objects.d.ts.map