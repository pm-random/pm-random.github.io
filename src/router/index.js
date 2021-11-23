import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('../views/Home.vue') },
    { path: '/characters', component: () => import('../views/Characters.vue') },
    { path: '/monsters', component: () => import('../views/Monsters.vue') },
    { path: '/theme-skills', component: () => import('../views/ThemeSkills.vue') },
    { path: '/revenue', component: () => import('../views/Revenue.vue') },
    { path: '/xp', component: () => import('../views/XP.vue') },
    { path: '/timeline', component: () => import('../views/Timeline.vue') },
    { path: '/:pathMatch(.*)', component: () => import('../views/NotFound.vue') }
  ],
})

export default router
