var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SPList } from "./List.class";
import { folderFromPath } from "@pnp/sp/folders/types";
import { theSiteUrl } from "../core/instance/Site.instance";
class SPDocumentLibrary extends SPList {
    constructor() {
        super(...arguments);
        this.getIcon = () => "FileASPX";
    }
    newItemUrl() {
        const siteUrl = theSiteUrl();
        //New form doesnt exist for document libraries
        return `${siteUrl}/${this.listName}`;
    }
    getItemsInFolder(path) {
        return __awaiter(this, void 0, void 0, function* () {
            path = path || this.listName;
            const ifolder = yield this.getFolder(path);
            const files = yield ifolder.files
                .select("*", "ListItemAllFields", "ListItemAllFields/*", "ListItemAllFields/FileRef")
                .expand("ListItemAllFields")();
            const folders = yield ifolder.folders
                .select("*")
                .expand("ListItemAllFields")();
            return [...files, ...folders];
        });
    }
    getFolder(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.url() === path)
                return this.query().rootFolder;
            return yield folderFromPath(this.web, path);
        });
    }
    isPathRoot(path, webRelativeUrl = theSiteUrl()) {
        return (this.url() === path ||
            webRelativeUrl + "/" === path ||
            webRelativeUrl === path);
    }
    getParentFolder(fileOrFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            const parentO = yield fileOrFolder.parentFolder();
            const web = yield this.web();
            const parentI = yield this.getFolder(parentO.ServerRelativeUrl);
            return {
                data: parentO,
                query: parentI,
                path: parentO.ServerRelativeUrl,
                isRoot: this.isPathRoot(parentO.ServerRelativeUrl, web.ServerRelativeUrl),
                hasParent: !this.isPathRoot(parentO.ServerRelativeUrl, web.ServerRelativeUrl),
            };
        });
    }
    getBreadcrumbs(fileOrFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileOrFolderO = yield fileOrFolder();
            const web = yield this.web();
            const crumbs = [
                {
                    path: fileOrFolderO.ServerRelativeUrl,
                    title: fileOrFolderO.Name,
                },
            ];
            if (this.isPathRoot(fileOrFolderO.ServerRelativeUrl, web.ServerRelativeUrl))
                return [];
            const parent = yield this.getParentFolder(fileOrFolder);
            if (!parent)
                return crumbs;
            const parentCrumbs = yield this.getBreadcrumbs(parent.query);
            crumbs.push(...parentCrumbs);
            return crumbs;
        });
    }
}
export { SPDocumentLibrary };
//# sourceMappingURL=DocumentLibrary.js.map