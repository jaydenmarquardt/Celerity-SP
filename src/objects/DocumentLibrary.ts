import { SPList } from "./List.class";
import { UnknownObject } from "../util/Util.types";
import { SPFileItem } from "./FileItem.class";
import { folderFromPath, IFolder, IFolderInfo } from "@pnp/sp/folders/types";
import type { IFileInfo } from "@pnp/sp/files";
import type { IFileItemInfo } from "./types/FileItem.types";
import { theSiteUrl } from "../core/instance/Site.instance";

class SPDocumentLibrary<
  T extends SPFileItem<UnknownObject> = SPFileItem<IFileItemInfo>,
  T1 extends IFileItemInfo = IFileItemInfo
> extends SPList<T, T1> {
  getIcon = () => "FileASPX";

  newItemUrl() {
    const siteUrl = theSiteUrl();
    //New form doesnt exist for document libraries
    return `${siteUrl}/${this.listName}`;
  }

  async getItemsInFolder(
    path: string
  ): Promise<(IFileInfo | IFolderInfo | UnknownObject)[]> {
    path = path || this.listName;
    const ifolder = await this.getFolder(path);
    const files = await ifolder.files
      .select(
        "*",
        "ListItemAllFields",
        "ListItemAllFields/*",
        "ListItemAllFields/FileRef"
      )
      .expand("ListItemAllFields")();
    const folders = await ifolder.folders
      .select("*")
      .expand("ListItemAllFields")();

    return [...files, ...folders];
  }

  async getFolder(path: string): Promise<IFolder> {
    if (this.url() === path) return this.query().rootFolder;
    return await folderFromPath(this.web, path);
  }

  isPathRoot(path: string, webRelativeUrl: string = theSiteUrl()) {
    return (
      this.url() === path ||
      webRelativeUrl + "/" === path ||
      webRelativeUrl === path
    );
  }

  async getParentFolder(fileOrFolder: IFolder) {
    const parentO = await fileOrFolder.parentFolder();
    const web = await this.web();

    const parentI = await this.getFolder(parentO.ServerRelativeUrl);
    return {
      data: parentO,
      query: parentI,
      path: parentO.ServerRelativeUrl,
      isRoot: this.isPathRoot(parentO.ServerRelativeUrl, web.ServerRelativeUrl),
      hasParent: !this.isPathRoot(
        parentO.ServerRelativeUrl,
        web.ServerRelativeUrl
      ),
    };
  }

  async getBreadcrumbs(fileOrFolder: IFolder): Promise<
    {
      title: string;
      path: string;
    }[]
  > {
    const fileOrFolderO = await fileOrFolder();
    const web = await this.web();
    const crumbs: {
      title: string;
      path: string;
    }[] = [
      {
        path: fileOrFolderO.ServerRelativeUrl,
        title: fileOrFolderO.Name,
      },
    ];

    if (this.isPathRoot(fileOrFolderO.ServerRelativeUrl, web.ServerRelativeUrl))
      return [];
    const parent = await this.getParentFolder(fileOrFolder);

    if (!parent) return crumbs;
    const parentCrumbs = await this.getBreadcrumbs(parent.query);
    crumbs.push(...parentCrumbs);

    return crumbs;
  }
}

export { SPDocumentLibrary };
