import { RouteRecordRaw } from "vue-router";

export const HomeRouter: RouteRecordRaw = {
  path: "/index",
  name: "Home",
  component: () => import("/@/views/Home.vue"),
  meta: {
    title: "首页",
    hidden: true,
  },
};
