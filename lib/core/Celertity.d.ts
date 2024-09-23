import { SPFI } from "@pnp/sp";
import { GraphFI } from "@pnp/graph";
export declare function setupCelerity(context: any, options?: {
    ignoreSP?: boolean;
    ignoreGraph?: boolean;
    enableTelementry?: boolean;
}): Promise<void>;
export declare const sp: () => SPFI;
export declare const graph: () => GraphFI;
/**
 * It returns the current context object
 * @returns The current context of the SharePoint library.
 */
export declare function currentContext(): any;
//# sourceMappingURL=Celertity.d.ts.map