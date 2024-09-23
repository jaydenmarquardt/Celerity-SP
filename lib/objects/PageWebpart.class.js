var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SPObject } from "./Object.class";
import { errorLog } from "../util/Debug";
import { ControlType, } from "./types/PageWebpart.types";
class SPPageWebpart extends SPObject {
    constructor(page, control) {
        super();
        this.data = () => this._data;
        this.textData = () => this._data;
        this.webpartData = () => this.data().webPartData;
        this.text = () => { var _a; return (_a = this.textData()) === null || _a === void 0 ? void 0 : _a.innerHTML; };
        this.props = () => this.webpartData().properties;
        this.id = () => this.data().id;
        this.webpartId = () => this.data().webPartId;
        //   alias = (): string => this.webpartData().;
        this.title = () => this.webpartData().title;
        this.description = () => this.webpartData().description;
        this.isText = () => this.textData().controlType === ControlType.Text;
        this.isWebpart = () => this.data().controlType === ControlType.Webpart;
        this.isFullBleed = () => this.factor() === 0;
        this.factor = () => { var _a, _b; return (_b = (_a = this._control) === null || _a === void 0 ? void 0 : _a.column) === null || _b === void 0 ? void 0 : _b.factor; };
        this.emphasis = () => { var _a, _b, _c; return (_c = (_b = (_a = this._control) === null || _a === void 0 ? void 0 : _a.column) === null || _b === void 0 ? void 0 : _b.section) === null || _c === void 0 ? void 0 : _c.emphasis; };
        this.control = () => this._control;
        this.column = () => { var _a; return (_a = this._control) === null || _a === void 0 ? void 0 : _a.column; };
        this.section = () => { var _a, _b; return (_b = (_a = this._control) === null || _a === void 0 ? void 0 : _a.column) === null || _b === void 0 ? void 0 : _b.section; };
        this.position = () => { var _a, _b; return (_b = (_a = this._control) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.position; };
        this.element = () => document.querySelector(`[id*="${this.id()}`);
        this.isLoaded = () => this.element() !== null;
        this.onLoaded = (onLoad) => {
            setTimeout(() => {
                if (this.isLoaded()) {
                    onLoad().catch((e) => errorLog({
                        component: "PageWebpart.class:onLoaded",
                        message: "Failed to execute onLoad function.",
                        type: "error",
                        role: "user",
                        severity: "low",
                        data: { e },
                    }));
                }
                else {
                    this.onLoaded(onLoad);
                }
            }, 100);
        };
        /**
         * TODO - This function is not working yet.
         **/
        this.waitForLoad = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.onLoaded(() => __awaiter(this, void 0, void 0, function* () {
                    resolve(this.element());
                }));
            });
        });
        this.page = page;
        this._control = control;
        this._data = control === null || control === void 0 ? void 0 : control.data;
    }
}
export { SPPageWebpart };
//# sourceMappingURL=PageWebpart.class.js.map