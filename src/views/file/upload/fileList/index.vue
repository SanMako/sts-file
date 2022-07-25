<template>
  <sts-table
    :columns="columns"
    :data-source="fileList"
    class="ant-table-striped"
    :row-class-name="
      (_record, index) => (index % 2 === 1 ? 'table-striped' : null)
    "
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'status'">
        <span>
          <sts-progress
            v-if="record.status === 'upload'"
            :percent="record.percent"
            size="small"
          />
          <sts-progress
            v-if="record.status === 'uploading'"
            :percent="record.percent"
            status="active"
            size="small"
          />
          <sts-progress
            v-if="record.status === 'error'"
            :percent="record.percent"
            status="exception"
            size="small"
          />
          <sts-progress
            v-if="record.status === 'done'"
            :percent="100"
            size="small"
          />
        </span>
      </template>
      <template v-if="column.key === 'action'">
        <span>
          <sts-popconfirm
            v-if="fileList.length"
            title="Sure to delete?"
            @confirm="onDelete(record.catalogId)"
          >
            <a>Delete</a>
          </sts-popconfirm>
        </span>
      </template>
    </template>
  </sts-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import StsTable from "sts-parent/StsTable";
import StsPopconfirm from "sts-parent/StsPopconfirm";
import StsProgress from "sts-parent/StsProgress";
import { FileItem, FileModel } from "/@/model/FileModel";
import { getUnCompleteList } from "/@/apis/fileApi";

const unCompleteList: FileModel[] = await getUnCompleteList().then((res) => {
  return res.data;
});

export default defineComponent({
  name: "UploadFileList",
  components: {
    StsTable,
    StsPopconfirm,
    StsProgress,
  },
  props: {
    fileList: {
      type: Array as PropType<FileItem[]>,
      default: null,
    },
  },
  emits: ["updateFileList"],
  setup(_props, { emit }) {
    unCompleteList?.forEach((item) => {
      const fileItem = {
        name: item.originalFilename,
        size: item.fileSize,
        status: "upload",
        percent: item.progress,
      };
      emit("updateFileList", fileItem);
    });

    return {
      columns,
    };
  },
});

const columns = [
  {
    title: "文件名",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },
  {
    title: "文件大小",
    dataIndex: "size",
    key: "size",
  },
  {
    title: "上传进度",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
  },
];
</script>

<style lang="less" scoped>
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
</style>
