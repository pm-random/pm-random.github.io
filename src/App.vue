<template>
  <TopBar />
  <router-view v-slot="{ Component }" class="container-xxl">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { useHead } from "@vueuse/head";
import TopBar from "./components/TopBar.vue";

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "description", content: "List of missing characters, and other random stuff about Pokémon Masters" },
    { name: "viewport", content: "width=device-width" },
    { name: "theme-color", content: "#be1a39" },
  ],
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rajdhani:wght@600&display=swap");
@import "bootstrap/dist/css/bootstrap.min.css";

#app {
  --accent-color: #be1a39;
  --chara-icon-size: 85px;

  font-family: Arial, sans-serif;
  text-align: center;
  font-size: 15px;
}

.page-content {
  padding: 12px;
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Rajdhani", sans-serif;
}

tr {
  vertical-align: middle;
}

tbody tr:nth-child(odd) {
  background-color: white;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 275ms ease-out;
}
</style>
