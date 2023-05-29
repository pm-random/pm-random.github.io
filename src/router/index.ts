import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/HomeView.vue")
    },
    {
      path: "/characters",
      component: () => import("@/views/CharactersView.vue")
    },
    {
      path: "/pokemon",
      component: () => import("@/views/PokemonView.vue")
    },
    {
      path: "/revenue",
      component: () => import("@/views/RevenueView.vue")
    },
    {
      path: "/timeline",
      component: () => import("@/views/TimelineView.vue")
    },
    {
      path: "/voice-actors",
      component: () => import("@/views/VoiceActorsView.vue")
    },
    {
      path: "/character-ids",
      component: () => import("@/views/CharacterIdsView.vue")
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("@/views/PageNotFound.vue")
    }
  ]
});

export default router;
