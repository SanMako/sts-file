import { FileModel } from "/@/model/FileModel";
import httpRequest from "/@/utils/HttpUtils";

const BASE_CATALOG_URL = "catalog/v1";

/**
 * 获取当前目录下文件夹和文件列表
 * @returns
 */
export const getFileList = (parentId?: string, fileType?: number) => {
  return httpRequest.GET(`${BASE_CATALOG_URL}/getCatalogList`, {
    parentId,
    fileType,
  });
};

/**
 * 新增文件夹
 * @returns
 */
export const createDir = (record: FileModel) => {
  return httpRequest.POST(`${BASE_CATALOG_URL}/createDirectory`, record);
};

/**
 * 根据id删除文件或者文件夹
 * @returns
 */
export const deleteFileByFileId = (catalogId: string) => {
  return httpRequest.DELETE(
    `${BASE_CATALOG_URL}/deleteByCatalogId/${catalogId}`
  );
};

/**
 * 文件夹改名 -- 更新文件夹
 * @returns
 */
export const renameDir = (record: FileModel) => {
  return httpRequest.PUT(`${BASE_CATALOG_URL}/renameCatalog`, record);
};
