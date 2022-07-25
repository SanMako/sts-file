<template>
  <sts-page-header
    :title="$t('file.management.title')"
    style="background-color: #fff; padding: 15px"
    :sub-title="$t('file.management.subtitle') + getCurrentPathShow"
    @back="() => back()"
  >
    <template #extra>
      <file-mgr-header @reload="reload" />
    </template>
    <template #footer>
      <file-mgr-footer v-model:dataSource="dataSource" @reload="reload" />
    </template>
  </sts-page-header>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, unref } from "vue";
import { FileModel } from "/@/model/FileModel";
import { getFileList } from "/@/apis/catalogApi";
import { useFileSetting } from "/@/hooks/useFileSetting";
import StsPageHeader from "sts-parent/StsPageHeader";

import FileMgrHeader from "./header/index.vue";
import FileMgrFooter from "./footer/index.vue";

const fileList: FileModel[] = await getFileList().then((res) => {
  return res;
});

export default defineComponent({
  name: "FileMgr",
  components: {
    FileMgrHeader,
    FileMgrFooter,
    StsPageHeader,
  },
  setup() {
    const {
      getCurrentPathShow,
      getParentId,
      isTop,

      pop,
    } = useFileSetting();

    const dataSource: Ref<FileModel[]> = ref(fileList);

    const reload = async (fileId: string) => {
      dataSource.value = await getFileList(fileId).then((res) => {
        return res.data;
      });
    };

    const back = () => {
      if (!isTop.value) {
        pop();
        reload(unref(getParentId));
      }
    };

    return {
      dataSource,
      getCurrentPathShow,
      reload,
      back,
    };
  },
});
</script>

<style lang="less"></style>
