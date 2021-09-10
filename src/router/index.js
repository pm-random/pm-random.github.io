import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/:pathMatch(.*)', component: NotFound }
    { path: '/theme-skills', name: 'ThemeSkills', component: () => import('../views/ThemeSkills.vue') },
  ],
})

export default router
