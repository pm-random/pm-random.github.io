import { createApp } from "vue";
import type { Plugin } from "vue";
import { createHead } from "@vueuse/head";
import { createPinia } from "pinia";
import HighchartsVue from "highcharts-vue";
import "bootstrap";

import App from "./App.vue";
import router from "./router";

// Cast HighchartsVue to Plugin, as it's supposed to be used with the now deprecated Class API
createApp(App)
  .use(router)
  .use(createHead())
  .use(createPinia())
  .use(HighchartsVue as unknown as Plugin)
  .mount("#app");
