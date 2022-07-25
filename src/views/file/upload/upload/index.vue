<template>
  <sts-upload
    v-model:fileList="fileList"
    :multiple="true"
    name="files"
    :customRequest="upload"
    :before-upload="beforeUpload"
    :showUploadList="false"
    @change="onChange"
  >
    <div class="ant-upload ant-upload-drag">
      <span
        tabindex="0"
        class="ant-upload ant-upload-btn"
        style="display: block"
        role="button"
      >
        <p class="ant-upload-drag-icon">
          <svg-icon name="inbox-in" size="30" />
        </p>
        <p class="ant-upload-text">Click or drag file to this area to upload</p>
        <p class="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </span>
    </div>
  </sts-upload>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import StsUpload from "sts-parent/StsUpload";
import { checkIdentifier, initiateFile, uploadFile } from "/@/apis/fileApi";
import { FileItem } from "/@/model/FileModel";
import { sliceFile } from "/@/utils/FileUtils";
import { ResultModel } from "/@/model/HttpModel";
import { sliceUpload } from "/@/service/fileService";
import SvgIcon from "sts-parent/SvgIcon";

export default defineComponent({
  name: "UploadFile",
  components: {
    StsUpload,
    SvgIcon,
  },
  props: {
    directoryId: {
      type: String,
      default: "file_top_parent_id",
    },
  },
  emits: ["updateFileList", "updateFileStatus", "updateFileInfo"],
  setup(props, { emit }) {
    const fileList = ref([]);
    /**
     * 预处理
     */
    const beforeUpload = (file: FileItem) => {
      file.status = "uploading";
      file.percent = 0;
      emit("updateFileList", file);
    };
    /**
     * 上传
     */
    const upload = async (options: any) => {
      const catalogId = sliceUpload(
        options.file,
        options.onProgress,
        options.onSuccess,
        options.onError
      );
      console.log(catalogId);
    };

    const onChange = (info: any) => {
      emit("updateFileStatus", info.fileList);
    };

    return {
      fileList,

      beforeUpload,
      upload,
      onChange,
    };
  },
});
</script>

<style lang="less"></style>
