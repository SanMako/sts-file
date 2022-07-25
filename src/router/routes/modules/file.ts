import { RouteRecordRaw } from "vue-router";

const FileRouter: Array<RouteRecordRaw> = [
  {
    path: "/file",
    name: "File",
    component: () => import("/@/views/file/index.vue"),
  },
];

export default FileRouter;
