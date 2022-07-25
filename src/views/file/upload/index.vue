<template>
  <sts-drawer
    :width="500"
    :title="$t('file.upload.drawer.title')"
    :placement="getUploadDrawerPosition"
    :visible="visible"
    @close="onClose"
  >
    <div>
      <span>抽屉位置：</span>
      <sts-radio-group
        :value="getUploadDrawerPosition"
        style="margin: 0 0 20px 5px"
        @change="switchPositionDrawer"
      >
        <sts-radio value="left">left</sts-radio>
        <sts-radio value="right">right</sts-radio>
        <sts-radio value="top">top</sts-radio>
        <sts-radio value="bottom">bottom</sts-radio>
      </sts-radio-group>
    </div>
    <upload-tree-select
      v-model:treeSelectTitle="treeSelectTitle"
      :treeSelectValue="treeSelectValue"
    />
    <upload-file
      :directoryId="treeSelectValue"
      @update-file-list="updateFileList"
      @update-file-status="updateFileStatus"
      @update-file-info="updateFileInfo"
    />
    <upload-file-list :fileList="fileList" @update-file-list="updateFileList" />
    <template #footer>
      <sts-progress
        :stroke-color="{
          '0%': '#52c41a',
          '100%': '#ff4d4f',
        }"
        :percent="99.9"
      />
      <span>存储</span>
      <span style="display: flex; float: right">204.7MB / 1.00GB</span>
    </template>
  </sts-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, unref, watch } from "vue";
import { StsRadio } from "sts-parent/StsRadio";
import StsProgress from "sts-parent/StsProgress";
import StsDrawer from "sts-parent/StsDrawer";
import { useFileSetting } from "/@/hooks/useFileSetting";
import { FileItem } from "/@/base/model/FileModel";
import UploadTreeSelect from "./treeSelect/index.vue";
import UploadFile from "./upload/index.vue";
import UploadFileList from "./fileList/index.vue";
import { StsRadio } from "sts-parent/StsRadio";

export default defineComponent({
  name: "FileUploadDrawer",
  components: {
    StsRadio,
    StsRadioGroup: StsRadio.Group,
    StsProgress,
    StsDrawer,
    UploadTreeSelect,
    UploadFile,
    UploadFileList,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["closeDrawer"],
  setup(props, { emit }) {
    const {
      getCurrentDirName,
      getParentId,
      getUploadDrawerPosition,
      setUploadDrawerPosition,
    } = useFileSetting();

    // 上传组件选中的文件夹名称
    const treeSelectTitle = ref<string>(unref(getCurrentDirName));
    const treeSelectValue = ref<string>(unref(getParentId));

    watch(getCurrentDirName, () => {
      console.log(getCurrentDirName);
      treeSelectTitle.value = unref(getCurrentDirName);
      treeSelectValue.value = unref(getParentId);
    });

    watch(treeSelectTitle, () => {
      if (props.visible) {
        treeSelectValue.value = treeSelectTitle.value;
      }
    });

    const fileList = ref<FileItem[]>([]);

    const updateFileList = (file: FileItem) => {
      fileList.value = fileList.value.concat(file);
    };

    const updateFileStatus = (files: FileItem[]) => {
      fileList.value = fileList.value.map((item) => {
        files.forEach((file) => {
          if (item.uid === file.uid) {
            item.status = file.status;
            item.percent = file.percent;
          }
        });
        return item;
      });
    };

    const updateFileInfo = (file: FileItem) => {
      fileList.value.forEach((item) => {
        if (item.uid === file.uid) {
          item.catalogId = file.catalogId;
        }
        return item;
      });
    };

    const onClose = () => {
      emit("closeDrawer", false);
    };

    const switchPositionDrawer = (event: Event) => {
      setUploadDrawerPosition((<HTMLTextAreaElement>event.target).value);
    };

    return {
      getUploadDrawerPosition,
      fileList,
      treeSelectTitle,
      treeSelectValue,

      onClose,
      switchPositionDrawer,
      updateFileList,
      updateFileStatus,
      updateFileInfo,
    };
  },
});
</script>
