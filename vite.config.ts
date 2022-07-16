import { ConfigEnv, loadEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import copy from "rollup-plugin-copy";
import { resolve } from "path";

const root = process.cwd();

const pathResolve = (dir: string) => resolve(root, ".", dir);

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, root);
  console.log(env);
  return {
    resolve: {
      alias: resolveAlias,
    },
    server: {
      // host: true, // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
      port: 36110,
      strictPort: true, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
      // 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      hmr: {
        overlay: true,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
    plugins: [
      vue(),
      federation({
        name: "sts-file",
        filename: "stsFile.js",
        exposes: {
          "./File": "./src/views/File.vue",
        },
        remotes: {
          "sts-parent": {
            external: "http://localhost:8899/assets/StsParent.js",
            format: "esm",
            from: "vite",
          },
        },
        shared: ["vue", "vue-router"],
      }),
      copy({
        targets: [
          {
            src: "dist/assets",
            dest: "public",
          },
        ],
        hook: "writeBundle", // notice here
      }),
    ],
    build: {
      polyfillModulePreload: false,
      assetsInlineLimit: 40960,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
      rollupOptions: {
        // external: ["vue"],
        output: {
          minifyInternalExports: false,
        },
      },
    },
  };
};

const resolveAlias = [
  {
    find: /\/@\//,
    replacement: pathResolve("src") + "/",
  },
];
