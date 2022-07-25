<template>
  <div class="file-list">
    <file-table
      v-if="getFileShowMode === 'list'"
      :dataSource="dataSource"
      @rename-directory="renameDirectory"
      @on-delete="onDelete"
      @switch-directory="switchDirectory"
    />
    <file-grid v-if="getFileShowMode === 'grid'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import FileGrid from "./FileGrid.vue";
import FileTable from "./FileTable.vue";
import { FileModel } from "/@/base/model/FileModel";
import { useFileSetting } from "/@/hooks/useFileSetting";

export default defineComponent({
  name: "FileList",
  components: { FileTable, FileGrid },
  props: {
    dataSource: {
      type: Array as PropType<FileModel[]>,
      default: null,
    },
  },
  emits: ["renameDirectory", "onDelete", "switchDirectory"],
  setup(props, { emit }) {
    const { getFileShowMode } = useFileSetting();

    const renameDirectory = (record: FileModel) => {
      emit("renameDirectory", record);
    };

    const onDelete = (fileId: string) => {
      emit("onDelete", fileId);
    };

    const switchDirectory = (record: FileModel) => {
      emit("switchDirectory", record);
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

<style lang="less">
.file-list {
  padding: 10px;
}
</style>
