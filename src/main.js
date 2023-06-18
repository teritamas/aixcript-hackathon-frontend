import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/css/style.css";
import router from "./router.js";
import store from "./store";
import VueClipboard from "vue-clipboard2";

const app = createApp(App).use(store);

app.use(router);
app.use(VueClipboard);
app.mount("#app");
