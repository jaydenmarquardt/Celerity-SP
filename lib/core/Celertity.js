var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { spfi, SPFx as spSPFx } from "@pnp/sp";
import { graphfi } from "@pnp/graph";
import PnPTelemetry from "@pnp/telemetry-js";
/**
 * It sets up the SharePoint Library (sp) for use in the current context
 * @param {any} context - The context object that is passed to the web part's render method.
 */
let _sp = undefined;
let _graph = undefined;
let _context = undefined;
export function setupCelerity(context, options = {
    ignoreSP: true,
    ignoreGraph: false,
    enableTelementry: false,
}) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const sp = !(options === null || options === void 0 ? void 0 : options.ignoreSP)
            ? spfi().using(spSPFx(context))
            : undefined;
        const graph = !(options === null || options === void 0 ? void 0 : options.ignoreGraph)
            ? graphfi().using(spSPFx(context))
            : undefined;
        if (!(options === null || options === void 0 ? void 0 : options.enableTelementry)) {
            (_a = PnPTelemetry.getInstance()) === null || _a === void 0 ? void 0 : _a.optOut();
        }
        _sp = sp;
        _graph = graph;
        _context = context;
        window["sp"] = sp;
        window["graph"] = graph;
        window["context"] = context;
    });
}
export const sp = () => {
    if (_sp)
        return _sp || window["sp"];
    return window["sp"];
};
export const graph = () => {
    if (_graph)
        return _graph;
    return window["graph"];
};
/**
 * It returns the current context object
 * @returns The current context of the SharePoint library.
 */
export function currentContext() {
    if (window["context"])
        return window["context"];
    return _context;
}
//# sourceMappingURL=Celertity.js.map