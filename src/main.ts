import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createHead } from "@vueuse/head";
import HighchartsVue from "highcharts-vue";
import "bootstrap";

// Cast HighchartsVue to any, as it's supposed to be used with the now deprecated Class API
createApp(App)
  .use(router)
  .use(createHead())
  .use(HighchartsVue as any)
  .mount("#app");
