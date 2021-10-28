import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createHead } from '@vueuse/head'
import VueChartkick from 'vue-chartkick'
import 'chartkick/highcharts'
import HighchartsVue from 'highcharts-vue'

createApp(App).use(router).use(createHead()).use(VueChartkick).use(HighchartsVue).mount('#app')