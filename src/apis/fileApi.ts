import { UploadParams } from "/@/model/FileModel";
import httpRequest from "/@/utils/HttpUtils";

const BASE_FILE_URL = "file/v1";

/**
 * 检查文件标识符
 */
export const checkIdentifier = (params: UploadParams) => {
  return httpRequest.POST(`${BASE_FILE_URL}/checkIdentifier`, params);
};

/**
 * 初始化文件
 * @returns
 */
export const initiateFile = (params: UploadParams) => {
  return httpRequest.POST(`${BASE_FILE_URL}/initiateFile`, params);
};

/**
 * 获取未完成上传的文件列表
 */
export const getUnCompleteList = () => {
  return httpRequest.GET(`${BASE_FILE_URL}/getUnCompleteFileList`);
};
