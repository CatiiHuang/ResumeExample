import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; // 默认主题
import "./assets/css/theme-green/index.css";
import "./assets/css/icon.css";

Vue.config.productionTip = false;
Vue.use(ElementUI, {
  size: "small",
});

Vue.prototype.$http = axios.create({
  baseURL: "http://127.0.0.1:2333/api",
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
