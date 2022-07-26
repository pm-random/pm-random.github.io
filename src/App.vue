<template>
  <TopBar />
  <router-view v-slot="{ Component }">
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

h1, h2, h3, h4, h5, h6 {
  font-family: "Rajdhani", sans-serif;
}

h2, h3, h4, h5, h6 {
  text-align: left;
}

td {
  vertical-align: middle;
}

.card {
  overflow: hidden;
}

.table tbody > tr:last-child > td {
  border-bottom: 0;
}

.table {
  margin-bottom: 0px;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 275ms ease-out;
}
</style>
