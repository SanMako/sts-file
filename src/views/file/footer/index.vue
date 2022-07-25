<template>
  <sts-tabs>
    <sts-tab-pane key="FileList">
      <template #tab>
        <span>
          <svg-icon name="myfile" style="margin-left: 5px" />
          {{ $t("file.management.footer.tabs.myfile") }}
        </span>
      </template>
      <file-list
        :dataSource="dataSource"
        @rename-directory="renameDirectory"
        @on-delete="onDelete"
        @switch-directory="switchDirectory"
      />
    </sts-tab-pane>
    <sts-tab-pane key="Recycled">
      <template #tab>
        <span>
          <svg-icon name="recycle" style="margin-left: 5px" />
          {{ $t("file.management.footer.tabs.recycle") }}
        </span>
      </template>
    </sts-tab-pane>
    <sts-tab-pane key="ShareList">
      <template #tab>
        <span>
          <svg-icon name="myshare" style="margin-left: 5px" />
          {{ $t("file.management.footer.tabs.myshare") }}
        </span>
      </template>
    </sts-tab-pane>
  </sts-tabs>
</template>

<script lang="ts">
import { defineComponent, PropType, unref } from "vue";
import StsTabs from "sts-parent/StsTabs";
import FileList from "./fileList/index.vue";
import { deleteFileByFileId, renameDir } from "/@/apis/catalogApi";
import { useFileSetting } from "/@/hooks/useFileSetting";
import { FileModel } from "/@/model/FileModel";
import SvgIcon from "sts-parent/SvgIcon";

export default defineComponent({
  name: "FileMgrFooter",
  components: {
    StsTabs,
    StsTabPane: StsTabs.TabPane,
    FileList,
    SvgIcon,
  },
  props: {
    dataSource: {
      type: Array as PropType<FileModel[]>,
      default: null,
    },
  },
  emits: ["reload"],
  setup(props, { emit }) {
    const {
      getParentId,
      getFileShowMode,

      setCurrentPath,
      setCurrentPathShow,
    } = useFileSetting();

    const renameDirectory = async (record: FileModel) => {
      await renameDir(record);
      emit("reload", unref(getParentId));
    };

    const onDelete = async (catalogId: string) => {
      await deleteFileByFileId(catalogId);
      emit("reload", unref(getParentId));
    };

    const switchDirectory = async (record: FileModel) => {
      setCurrentPath(record.catalogId);
      setCurrentPathShow(record.originalFilename);
      emit("reload", record.catalogId);
    };

    return {
      getFileShowMode,

      renameDirectory,
      onDelete,
      switchDirectory,
    };
  },
});
</script>

<style lang="less"></style>
