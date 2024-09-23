import type {
  CanvasColumn,
  CanvasSection,
  ColumnControl,
  IClientsidePage,
  IClientsideTextData,
  IClientsideWebPartData,
} from "@pnp/sp/clientside-pages/types";
import { SPObject } from "./Object.class";
import { UnknownObject } from "../util/Util.types";
import { errorLog } from "../util/Debug";
import {
  WebpartSaveData,
  ControlType,
  ColumnFactor,
  Emphasis,
  IPosition,
} from "./types/PageWebpart.types";

class SPPageWebpart extends SPObject {
  page: IClientsidePage;
  _control: ColumnControl<any>;
  _data: IClientsideWebPartData | IClientsideTextData;
  constructor(
    page: IClientsidePage,
    control: ColumnControl<IClientsideWebPartData | IClientsideTextData>
  ) {
    super();
    this.page = page;
    this._control = control;
    this._data = control?.data;
  }

  data = (): IClientsideWebPartData => this._data as IClientsideWebPartData;
  textData = (): IClientsideTextData => this._data as IClientsideTextData;
  webpartData = (): WebpartSaveData => this.data().webPartData;
  text = (): string => this.textData()?.innerHTML;
  props = (): UnknownObject => this.webpartData().properties;

  id = (): string => this.data().id;
  webpartId = (): string => this.data().webPartId;
  //   alias = (): string => this.webpartData().;
  title = (): string => this.webpartData().title;
  description = (): string => this.webpartData().description;

  isText = (): boolean => this.textData().controlType === ControlType.Text;
  isWebpart = (): boolean => this.data().controlType === ControlType.Webpart;
  isFullBleed = (): boolean => this.factor() === 0;

  factor = (): ColumnFactor => this._control?.column?.factor;
  emphasis = (): Emphasis => this._control?.column?.section?.emphasis;

  control = (): ColumnControl<IClientsideWebPartData | IClientsideTextData> =>
    this._control;
  column = (): CanvasColumn => this._control?.column;
  section = (): CanvasSection => this._control?.column?.section;

  position = (): IPosition => this._control?.data?.position;

  element = (): HTMLElement => document.querySelector(`[id*="${this.id()}`);
  isLoaded = (): boolean => this.element() !== null;

  onLoaded = (onLoad: () => Promise<void>): void => {
    setTimeout(() => {
      if (this.isLoaded()) {
        onLoad().catch((e) =>
          errorLog({
            component: "PageWebpart.class:onLoaded",
            message: "Failed to execute onLoad function.",
            type: "error",
            role: "user",
            severity: "low",
            data: { e },
          })
        );
      } else {
        this.onLoaded(onLoad);
      }
    }, 100);
  };

  /**
   * TODO - This function is not working yet.
   **/

  waitForLoad = async (): Promise<HTMLElement> => {
    return new Promise((resolve) => {
      this.onLoaded(async () => {
        resolve(this.element());
      });
    });
  };
}

export { SPPageWebpart };
