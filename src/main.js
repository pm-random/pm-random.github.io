import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createHead } from '@vueuse/head'
import HighchartsVue from 'highcharts-vue'

createApp(App).use(router).use(createHead()).use(HighchartsVue).mount('#app')
