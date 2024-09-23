export declare type UnknownObject = {
    [key: string]: unknown;
} | unknown | any;
export declare const W: UnknownObject;
export declare type OnClick = (e?: UnknownObject) => void;
/**
 * The WCAGClickable function returns an object with properties and event handlers that make an element
 * clickable and accessible according to WCAG guidelines.
 * @param {OnClick} [clicked] - The `clicked` parameter is a function that will be called when the
 * element is clicked or when the Enter key is pressed while the element is focused. It takes an event
 * object as its argument.
 * @returns an object with the following properties:
 */
export declare const WCAGClickable: (clicked?: OnClick) => UnknownObject;
/**
 * The `DataAttr` function takes an object of key-value pairs and returns a new object with the keys
 * prefixed with "data-" and the corresponding values.
 * @param props - An object that can have properties with string, number, boolean, or undefined values.
 * @returns The function `DataAttr` returns an object with keys in the format `data-` and values
 * corresponding to the values of the input `props` object.
 */
export declare const DataAttr: (props: {
    [key: string]: string | number | boolean;
}) => UnknownObject;
export declare type ByteLevel = 'B' | 'KB' | 'MB' | 'GB';
export declare type FormattedBytes = {
    [key in ByteLevel]?: string;
};
export declare type LogGroup = {
    name: string;
    uuid: string;
    start: number;
    depth: number;
    open: boolean;
    msgs: string[];
    parent: LogGroup;
    children: LogGroup[];
    logs: string[];
    end: number;
    ended: boolean;
    time: number;
    timeSeconds: string;
};
export declare type UUID = `${string}-${string}-${string}-${string}-${string}`;
/**
 * The function generates a random UUID (Universally Unique Identifier) in TypeScript.
 */
export declare const uuid: () => UUID;
//# sourceMappingURL=Util.types.d.ts.map