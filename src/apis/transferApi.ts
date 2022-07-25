import { UploadParams } from "/@/model/FileModel";
import httpRequest from "/@/utils/HttpUtils";

const BASE_TRANSFER_URL = "transfer/v1";

/**
 * 预览文件
 */
export const preview = (catalogId: string) => {
  return httpRequest.DOWNLOAD(`${BASE_TRANSFER_URL}/preview/${catalogId}`);
};

/**
 * 上传文件
 */
export const uploadFile = (params: UploadParams) => {
  return httpRequest.UPLOAD(`${BASE_TRANSFER_URL}/upload`, params);
};
