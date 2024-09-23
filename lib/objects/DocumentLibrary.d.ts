import { SPList } from "./List.class";
import { UnknownObject } from "../util/Util.types";
import { SPFileItem } from "./FileItem.class";
import { IFolder, IFolderInfo } from "@pnp/sp/folders/types";
import type { IFileInfo } from "@pnp/sp/files";
import type { IFileItemInfo } from "./types/FileItem.types";
declare class SPDocumentLibrary<T extends SPFileItem<UnknownObject> = SPFileItem<IFileItemInfo>, T1 extends IFileItemInfo = IFileItemInfo> extends SPList<T, T1> {
    getIcon: () => string;
    newItemUrl(): string;
    getItemsInFolder(path: string): Promise<(IFileInfo | IFolderInfo | UnknownObject)[]>;
    getFolder(path: string): Promise<IFolder>;
    isPathRoot(path: string, webRelativeUrl?: string): boolean;
    getParentFolder(fileOrFolder: IFolder): Promise<{
        data: IFolderInfo;
        query: IFolder;
        path: string;
        isRoot: boolean;
        hasParent: boolean;
    }>;
    getBreadcrumbs(fileOrFolder: IFolder): Promise<{
        title: string;
        path: string;
    }[]>;
}
export { SPDocumentLibrary };
//# sourceMappingURL=DocumentLibrary.d.ts.map