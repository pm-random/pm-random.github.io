import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
    { path: '/characters', name: 'Characters', component: () => import('../views/Characters.vue') },
    { path: '/monsters', name: 'Monsters', component: () => import('../views/Monsters.vue') },
    { path: '/theme-skills', name: 'ThemeSkills', component: () => import('../views/ThemeSkills.vue') },
    { path: '/revenue', name: 'Revenue', component: () => import('../views/Revenue.vue') },
    { path: '/xp', name: 'XP', component: () => import('../views/XP.vue') },
    { path: '/:pathMatch(.*)', component: () => import('../views/NotFound.vue') }
  ],
})

export default router
