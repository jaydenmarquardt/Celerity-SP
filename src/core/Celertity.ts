import { SPFI, spfi, SPFx as spSPFx } from "@pnp/sp";
import { GraphFI, graphfi, SPFx as graphSPFx } from "@pnp/graph";
import PnPTelemetry from "@pnp/telemetry-js";

/**
 * It sets up the SharePoint Library (sp) for use in the current context
 * @param {any} context - The context object that is passed to the web part's render method.
 */
let _sp: SPFI = undefined;
let _graph: GraphFI = undefined;
let _context: any = undefined;

export async function setupCelerity(
  context: any,
  options: {
    ignoreSP?: boolean;
    ignoreGraph?: boolean;
    enableTelementry?: boolean;
  } = {
    ignoreSP: true,
    ignoreGraph: false,
    enableTelementry: false,
  }
) {
  const sp: SPFI = !options?.ignoreSP
    ? spfi().using(spSPFx(context))
    : undefined;
  const graph: GraphFI = !options?.ignoreGraph
    ? graphfi().using(spSPFx(context))
    : undefined;

  if (!options?.enableTelementry) {
    PnPTelemetry.getInstance()?.optOut();
  }

  _sp = sp;
  _graph = graph;
  _context = context;

  window["sp"] = sp;
  window["graph"] = graph;
  window["context"] = context;
}

export const sp = (): SPFI => {
  if (_sp) return _sp || window["sp"];

  return window["sp"];
};

export const graph = (): GraphFI => {
  if (_graph) return _graph;

  return window["graph"];
};

/**
 * It returns the current context object
 * @returns The current context of the SharePoint library.
 */
export function currentContext() {
  if (window["context"]) return window["context"];
  return _context;
}
