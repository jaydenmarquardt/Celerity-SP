export type UnknownObject = { [key: string]: unknown } | unknown | any;
/* The line `export const W: UnknownObject = window;` is exporting a constant variable `W` that is
assigned the value of the `window` object. The type of `W` is `UnknownObject`, which means it can be
any object type. This allows `W` to be used as a generic object that can hold any properties and
values from the `window` object. */
export const W: UnknownObject = window;
export type OnClick = (e?: UnknownObject) => void;

/**
 * The WCAGClickable function returns an object with properties and event handlers that make an element
 * clickable and accessible according to WCAG guidelines.
 * @param {OnClick} [clicked] - The `clicked` parameter is a function that will be called when the
 * element is clicked or when the Enter key is pressed while the element is focused. It takes an event
 * object as its argument.
 * @returns an object with the following properties:
 */
export const WCAGClickable = (clicked?: OnClick): UnknownObject => {
  return {
    'data-clickable': true,
    'focus-status': 'focusable',
    role: 'button',
    tabIndex: 0,
    onClick: (e: UnknownObject) => {
      clicked && clicked(e);
    },
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        clicked && clicked(e);
      }
    }
  };
};

/**
 * The `DataAttr` function takes an object of key-value pairs and returns a new object with the keys
 * prefixed with "data-" and the corresponding values.
 * @param props - An object that can have properties with string, number, boolean, or undefined values.
 * @returns The function `DataAttr` returns an object with keys in the format `data-` and values
 * corresponding to the values of the input `props` object.
 */
export const DataAttr = (props: {
  [key: string]: string | number | boolean | undefined;
}): UnknownObject => {
  const dataProps = {};
  Object.keys(props).forEach((key) => {
    dataProps[`data-${key}`] = props[key];
  });

  return dataProps;
};

export type ByteLevel = 'B' | 'KB' | 'MB' | 'GB';
export type FormattedBytes = {
  [key in ByteLevel]?: string;
};

export type LogGroup = {
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

export type UUID = `${string}-${string}-${string}-${string}-${string}`;

/**
 * The function generates a random UUID (Universally Unique Identifier) in TypeScript.
 */
export const uuid = (): UUID =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  }) as UUID;
