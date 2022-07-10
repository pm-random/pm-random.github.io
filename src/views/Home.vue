<template>
  <div>
    <NameAndVersion class="my-5" home/>
    <div id="grid" class="container-xxl">
      <router-link v-for="item in items" :key="item.link" :to="item.link" class="item card shadow-sm p-1">
        <img class="item-image" :src="item.image" />
        <div class="item-title">{{ item.title }}</div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { mascotPath } from "@/data";
import NameAndVersion from "@/components/NameAndVersion.vue";

useHead({ title: "PM Random" });

interface Item {
  title: string,
  link: string,
  image: string
}

const items: Array<Item> = [
  {title: "Characters", link: "/characters", image: mascotPath()},
  {title: "Pokémon", link: "/monsters", image: "/assets/monsters.png"},
  {title: "Revenue", link: "/revenue", image: "/assets/gem.png"},
  {title: "Voice Actors", link: "/voice-actors", image: "/assets/voice-actors.png"},
  {title: "Character IDs", link: "/character-ids", image: "/assets/character-ids.png"}
];
</script>

<style scoped>
#grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-gap: 10px;
}

.item {
  text-decoration: none;
  display: inline;
}

.item:hover {
  background-color: #ebebeb;
}

.item-image {
  max-height: 80px;
}

.item-title {
  font-family: "Rajdhani", sans-serif;
  font-weight: bold;
  font-size: 1.5em;
}
</style>
