import type { CanvasColumn, CanvasSection, ColumnControl, IClientsidePage, IClientsideTextData, IClientsideWebPartData } from "@pnp/sp/clientside-pages/types";
import { SPObject } from "./Object.class";
import { UnknownObject } from "../util/Util.types";
import { WebpartSaveData, ColumnFactor, Emphasis, IPosition } from "./types/PageWebpart.types";
declare class SPPageWebpart extends SPObject {
    page: IClientsidePage;
    _control: ColumnControl<any>;
    _data: IClientsideWebPartData | IClientsideTextData;
    constructor(page: IClientsidePage, control: ColumnControl<IClientsideWebPartData | IClientsideTextData>);
    data: () => IClientsideWebPartData;
    textData: () => IClientsideTextData;
    webpartData: () => WebpartSaveData;
    text: () => string;
    props: () => UnknownObject;
    id: () => string;
    webpartId: () => string;
    title: () => string;
    description: () => string;
    isText: () => boolean;
    isWebpart: () => boolean;
    isFullBleed: () => boolean;
    factor: () => ColumnFactor;
    emphasis: () => Emphasis;
    control: () => ColumnControl<IClientsideWebPartData | IClientsideTextData>;
    column: () => CanvasColumn;
    section: () => CanvasSection;
    position: () => IPosition;
    element: () => HTMLElement;
    isLoaded: () => boolean;
    onLoaded: (onLoad: () => Promise<void>) => void;
    /**
     * TODO - This function is not working yet.
     **/
    waitForLoad: () => Promise<HTMLElement>;
}
export { SPPageWebpart };
//# sourceMappingURL=PageWebpart.class.d.ts.map