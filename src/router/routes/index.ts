import { RouteRecordRaw } from "vue-router";
import { HomeRouter } from "./modules/home";
import FileRouter from "./modules/file";

/**
 * 首页
 */
export const RootRouter: RouteRecordRaw = {
  path: "/",
  name: "Index",
  // redirect: "/index",
  redirect: "/file",
  meta: {
    title: "首页",
    hidden: true,
  },
};

/**
 * 页面找不到找不到 404
 */
export const PageNotFoundRouter: RouteRecordRaw = {
  path: "/:path(.*)*",
  name: "PageNotFound",
  component: () => import("/@/views/404.vue"),
};

/**
 * 静态路由
 */
export const routes: RouteRecordRaw[] = [
  RootRouter,
  HomeRouter,
  ...FileRouter,
  PageNotFoundRouter,
];
