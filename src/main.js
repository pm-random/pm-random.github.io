import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createHead } from '@vueuse/head'

createApp(App).use(router).use(createHead()).mount('#app')
