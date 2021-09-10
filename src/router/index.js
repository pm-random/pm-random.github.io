import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
    { path: '/theme-skills', name: 'ThemeSkills', component: () => import('../views/ThemeSkills.vue') },
    { path: '/:pathMatch(.*)', component: () => import('../views/NotFound.vue') }
  ],
})

export default router
