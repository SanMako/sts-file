import { computed } from "vue";
import { useUnInstalledFileStore } from "/@/store/modules/fileStore";

export function useFileSetting() {
  const fileStore = useUnInstalledFileStore();

  const getFileShowMode = computed(() => fileStore.getFileShowMode);

  const getParentId = computed(() => fileStore.getParentId);

  const getCurrentDirName = computed(() => fileStore.getCurrentDirName);

  const getCurrentPath = computed(() => fileStore.getCurrentPath);

  const getCurrentPathShow = computed(() => fileStore.getCurrentPathShow);

  const isTop = computed(() => fileStore.isTop);

  const getUploadDrawerPosition = computed(
    () => fileStore.getUploadDrawerPosition
  );

  const setFileShowMode = (fileShowMode: string) =>
    fileStore.setFileShowMode(fileShowMode);

  const setCurrentPath = (currentPath: string) =>
    fileStore.setCurrentPath(currentPath);

  const setCurrentPathShow = (currentPathShow: string) =>
    fileStore.setCurrentPathShow(currentPathShow);

  const setUploadDrawerPosition = (uploadDrawerPosition: string) =>
    fileStore.setUploadDrawerPosition(uploadDrawerPosition);

  const pop = () => {
    fileStore.pop();
  };

  return {
    setFileShowMode,
    setCurrentPath,
    setCurrentPathShow,
    pop,
    setUploadDrawerPosition,

    isTop,
    getFileShowMode,
    getParentId,
    getCurrentDirName,
    getCurrentPath,
    getCurrentPathShow,
    getUploadDrawerPosition,
  };
}
