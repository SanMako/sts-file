import { createApp } from "vue";
import App from "./App.vue";
import router from "/@/router";

const app = createApp(App);

// 全局加载router
app.use(router);

app.mount("#app");
