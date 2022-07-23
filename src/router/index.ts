import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/Home.vue")
    },
    {
      path: "/characters",
      component: () => import("../views/Characters.vue"),
    },
    {
      path: "/character-ids",
      component: () => import("../views/CharacterIDs.vue"),
    },
    {
      path: "/monsters",
      component: () => import("../views/Monsters.vue"),
    },
    {
      path: "/revenue",
      component: () => import("../views/Revenue.vue")
    },
    { 
      path: "/timeline",
      component: () => import("../views/Timeline.vue")
    },
    {
      path: "/voice-actors",
      component: () => import("../views/VoiceActors.vue"),
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

export default router;
