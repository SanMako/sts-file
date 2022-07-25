<template>
  <div>
    <span>当前目录：</span>
    <sts-tree-select
      :value="treeSelectTitle"
      tree-data-simple-mode
      style="margin: 0 0 20px 5px; width: 58%"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      :tree-data="treeData"
      placeholder="Please select"
      :show-checked-strategy="SHOW_ALL"
      :load-data="onLoadData"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { StsTreeSelect, TreeSelectProps } from "sts-parent/StsTreeSelect";
import { getFileList } from "/@/apis/catalogApi";
import { FileModel } from "/@/base/model/FileModel";

const rootDirectoryData: FileModel[] = await getFileList("", 1).then((res) => {
  return res.data;
});

const SHOW_ALL = StsTreeSelect.SHOW_ALL;

export default defineComponent({
  name: "UploadTreeSelect",
  components: {
    AntTreeSelect: StsTreeSelect,
  },
  props: {
    treeSelectTitle: {
      type: String,
      default: "根目录",
    },
    treeSelectValue: {
      type: String,
      default: "file_top_parent_id",
    },
  },
  emits: ["update:treeSelectTitle"],
  setup(props, { emit }) {
    const treeData = ref<TreeSelectProps["treeData"]>([]);

    rootDirectoryData &&
      rootDirectoryData.forEach((item) => {
        treeData.value = treeData.value?.concat({
          id: item.catalogId,
          pId: item.parentId,
          value: item.catalogId,
          title: item.originalFilename,
          relativePath: item.relativePath,
        });
      });

    const onLoadData = async (
      treeNode: TreeSelectProps["treeData"][string]
    ) => {
      const { id } = treeNode.dataRef;
      const directoryData: FileModel[] = await getFileList(id, 1).then(
        (res) => {
          return res.data;
        }
      );
      return new Promise((resolve) => {
        if (!directoryData) {
          resolve(false);
        }
        directoryData.forEach((item) => {
          treeData.value = treeData.value?.concat({
            id: item.fileId,
            pId: item.parentId,
            title: item.originalFilename,
            value: item.fileId,
            relativePath: item.relativePath,
          });
          resolve(true);
        });
      });
    };

    const onChange = (value: string) => {
      console.log(value);
      emit("update:treeSelectTitle", value);
    };

    return {
      treeData,
      SHOW_ALL,

      onLoadData,
      onChange,
    };
  },
});
</script>

<style lang="less"></style>
