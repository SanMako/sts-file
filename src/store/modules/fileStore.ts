import { defineStore } from "pinia";
import { LocalStorage } from "../db";
import { store } from "../index";
import {
  FILE_SHOW_MODE_KEY,
  FILE_UPLOAD_DRAWER_POSITION_KEY,
} from "/@/config/StoreConfig";
import { PositionEnum } from "/@/enums/BasicEnums";
import { FileState } from "/@/model/FileModel";

export const useInstalledFileStore = defineStore({
  id: "store-file",
  state: (): FileState => ({
    /**
     * 文件列表展示方式
     */
    fileShowMode: "list",
    /**
     * 当前目录
     */
    currentPath: ["file_top_parent_id"],
    /**
     * 当前面包屑展示的路径
     */
    currentPathShow: ["根目录"],
    /**
     * 上传抽屉的位置，默认左侧
     */
    uploadDrawerPosition: PositionEnum.POSITION_LEFT,
  }),
  getters: {
    getFileShowMode(): string {
      return LocalStorage.get(FILE_SHOW_MODE_KEY, this.fileShowMode);
    },
    getCurrentPath(): string {
      return this.currentPath.join("/");
    },
    getParentId(): string {
      return this.currentPath[this.currentPath.length - 1];
    },
    getCurrentDirName(): string {
      return this.currentPathShow[this.currentPathShow.length - 1];
    },
    getCurrentPathShow(): string {
      return this.currentPathShow.join("/") + "/";
    },
    isTop(): boolean {
      return this.currentPath.length <= 1;
    },
    getUploadDrawerPosition(): string {
      return LocalStorage.get(
        FILE_UPLOAD_DRAWER_POSITION_KEY,
        this.uploadDrawerPosition
      );
    },
  },
  actions: {
    setFileShowMode(fileShowMode: string) {
      this.fileShowMode = fileShowMode;
      LocalStorage.set(FILE_SHOW_MODE_KEY, fileShowMode);
    },
    setCurrentPath(currentPath: string) {
      this.currentPath.push(currentPath);
    },
    setCurrentPathShow(currentPathShow: string) {
      this.currentPathShow.push(currentPathShow);
    },
    pop() {
      this.currentPath.pop();
      this.currentPathShow.pop();
    },
    setUploadDrawerPosition(uploadDrawerPosition: string) {
      this.uploadDrawerPosition = uploadDrawerPosition;
      LocalStorage.set(FILE_UPLOAD_DRAWER_POSITION_KEY, uploadDrawerPosition);
    },
  },
});

export function useUnInstalledFileStore() {
  return useInstalledFileStore(store);
}
