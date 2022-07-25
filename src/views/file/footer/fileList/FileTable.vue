<template>
  <sts-table
    bordered
    :columns="columns"
    :loading="loading"
    class="ant-table-striped"
    :data-source="dataSource"
    :row-selection="rowSelection"
    :row-key="(record) => record.catalogId"
    :row-class-name="
      (_record, index) => (index % 2 === 1 ? 'table-striped' : null)
    "
  >
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'originalFilename'">
        <div class="editable-cell">
          <div
            v-if="editableData[record.catalogId]"
            class="editable-cell-input-wrapper"
          >
            <sts-input
              v-model:value="record.originalFilename"
              class="sts-table-input"
              @press-enter="renameDirectory(record)"
            />
            <svg-icon
              name="check"
              class="editable-cell-icon-check"
              @click="renameDirectory(record)"
            />
          </div>
          <div
            v-else
            class="editable-cell-text-wrapper"
            :style="{
              maxWidth: '200px',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              wordWrap: 'break-word',
              wordBreak: 'break-all',
            }"
          >
            <sts-button type="link" @click="switchDirectory(record)">
              <template v-if="record.isDirectory === 1" #icon>
                <svg-icon name="folder" style="margin-right: 5px" />
              </template>
              {{ text || " " }}
            </sts-button>
            <svg-icon
              name="edit"
              class="editable-cell-icon"
              @click="edit(record.catalogId)"
            />
          </div>
        </div>
      </template>
      <template
        v-if="column.dataIndex === 'fileSize' && record.isDirectory === 1"
      >
        {{ "-" }}
      </template>
      <template v-else-if="column.dataIndex === 'action'">
        <sts-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="onDelete(record.catalogId)"
        >
          <a>{{ $t("common.delete") }}</a>
        </sts-popconfirm>
      </template>
    </template>
  </sts-table>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, UnwrapRef } from "vue";
import StsPopconfirm from "sts-parent/StsPopconfirm";
import StsTable from "sts-parent/StsTable";
import StsInput from "sts-parent/StsInput";
import StsButton from "sts-parent/StsButton";
import SvgIcon from "sts-parent/SvgIcon";
import { FileModel } from "/@/base/model/FileModel";
import { cloneDeep } from "lodash-es";
import dayjs from "dayjs";
import SvgIcon from "sts-parent/SvgIcon";

export default defineComponent({
  name: "FileTable",
  components: {
    SvgIcon,
    StsTable,
    StsInput,
    StsButton,
    StsPopconfirm,
  },
  props: {
    dataSource: {
      type: Array as PropType<FileModel[]>,
      default: null,
    },
  },
  emits: ["renameDirectory", "onDelete", "switchDirectory"],
  setup(props, { emit }) {
    const loading = ref<Boolean>(false);

    const editableData: UnwrapRef<Record<string, FileModel>> = reactive({});

    const renameDirectory = (record: FileModel) => {
      emit("renameDirectory", record);
      delete editableData[record.catalogId];
    };

    const edit = (catalogId: string) => {
      editableData[catalogId] = cloneDeep(
        props.dataSource.filter((item) => catalogId === item.catalogId)[0]
      );
    };

    const onDelete = (catalogId: string) => {
      emit("onDelete", catalogId);
    };

    const rowSelection = ref({
      checkStrictly: false,
      onChange: (
        selectedRowKeys: (string | number)[],
        selectedRows: FileModel[]
      ) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      onSelect: (
        record: FileModel,
        selected: boolean,
        selectedRows: FileModel[]
      ) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (
        selected: boolean,
        selectedRows: FileModel[],
        changeRows: FileModel[]
      ) => {
        console.log(selected, selectedRows, changeRows);
      },
    });

    const switchDirectory = (record: FileModel) => {
      emit("switchDirectory", record);
    };

    return {
      loading,
      columns,
      editableData,
      renameDirectory,
      edit,
      onDelete,
      rowSelection,
      switchDirectory,
    };
  },
});

const columns = [
  {
    title: "文件名称",
    dataIndex: "originalFilename",
    key: "originalFilename",
    width: 300,
    ellipsis: true,
  },
  {
    title: "文件大小",
    key: "fileSize",
    dataIndex: "fileSize",
  },
  {
    title: "更新者",
    key: "updateUser",
    dataIndex: "updateUser",
  },
  {
    title: "修改时间",
    key: "updateTime",
    dataIndex: "updateTime",
    customRender: (text: any) => {
      return text.value ? dayjs(text.value).format("YYYY-MM-DD HH:mm:ss") : "";
    },
  },
  {
    title: "操作",
    dataIndex: "action",
  },
];
</script>

<style lang="less" scoped>
.editable-cell {
  position: relative;

  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 10px;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 6px;
    display: none;
  }

  .editable-cell-icon-check {
    margin-top: 8px;
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.sts-table-input {
  width: 60%;
}

.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
</style>
