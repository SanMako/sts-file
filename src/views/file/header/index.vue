<template>
  <div>
    <sts-button key="search" type="primary" shape="circle">
      <template #icon><svg-icon name="search" /></template>
    </sts-button>
    <sts-button
      key="showMode"
      type="primary"
      shape="circle"
      @click="switchFileShowMode"
    >
      <template #icon>
        <svg-icon v-if="getFileShowMode === 'list'" name="list" />
        <svg-icon v-else name="grid" />
      </template>
    </sts-button>
    <sts-button key="newFolder" type="primary" shape="circle">
      <template #icon>
        <svg-icon name="new_folder" @click="createDirectory" />
      </template>
    </sts-button>
    <sts-button
      key="upload"
      type="primary"
      shape="circle"
      @click="visible = true"
    >
      <template #icon>
        <svg-icon name="upload" />
        <file-upload-drawer
          :visible="visible"
          @close-drawer="visible = false"
        />
      </template>
    </sts-button>
    <sts-dropdown>
      <template #overlay>
        <sts-menu @click="handleMenuClick">
          <sts-menu-item key="delete">
            <svg-icon name="delete" style="vertical-align: -0.2em" />
            <span style="margin-left: 5px">{{
              $t("file.management.header.action.delete")
            }}</span>
          </sts-menu-item>
          <sts-menu-item key="download">
            <svg-icon name="download" style="vertical-align: -0.2em" />
            <span style="margin-left: 5px">{{
              $t("file.management.header.action.download")
            }}</span>
          </sts-menu-item>
          <sts-menu-item key="move">
            <svg-icon name="move" style="vertical-align: -0.2em" />
            <span style="margin-left: 5px">{{
              $t("file.management.header.action.move")
            }}</span>
          </sts-menu-item>
          <sts-menu-item key="share">
            <svg-icon name="share" style="vertical-align: -0.2em" />
            <span style="margin-left: 5px">{{
              $t("file.management.header.action.share")
            }}</span>
          </sts-menu-item>
        </sts-menu>
      </template>
      <sts-button>
        {{ $t("file.management.header.action.batch") }}
        <svg-icon name="down-outlined" style="margin-left: 5px" />
      </sts-button>
    </sts-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from "vue";
// import type { MenuProps } from "ant-design-vue";
import FileUploadDrawer from "../upload/index.vue";
import { useFileSetting } from "/@/hooks/useFileSetting";
import { createDir } from "/@/apis/catalogApi";
import SvgIcon from "sts-parent/SvgIcon";
import StsButton from "sts-parent/StsButton";
import { StsDropdown } from "sts-parent/StsDropdown";
import { StsMenu, StsMenuItem } from "sts-parent/StsMenu";

export default defineComponent({
  name: "FileMgrHeader",
  components: {
    FileUploadDrawer,
    SvgIcon,
    StsButton,
    StsDropdown,
    StsMenu,
    StsMenuItem,
  },
  emits: ["reload"],
  setup(props, { emit }) {
    const visible = ref<boolean>(false);

    const { getFileShowMode, setFileShowMode, getParentId, getCurrentPath } =
      useFileSetting();

    const switchFileShowMode = () => {
      if (unref(getFileShowMode) === "list") {
        setFileShowMode("grid");
      } else {
        setFileShowMode("list");
      }
    };

    const createDirectory = async () => {
      const newDir = {
        catalogId: "",
        originalFilename: "新建文件夹",
        fileType: 1,
        relativePath: unref(getCurrentPath),
        parentId: unref(getParentId),
      };
      await createDir(newDir);
      emit("reload", unref(getParentId));
    };

    const handleMenuClick: MenuProps["onClick"] = (e) => {
      console.log("click", e);
    };

    return {
      visible,
      getFileShowMode,

      createDirectory,
      handleMenuClick,
      switchFileShowMode,
    };
  },
});
</script>

<style lang="less"></style>
