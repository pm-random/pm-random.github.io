<script setup lang="ts">
import { cdn_url } from "@/cdn";
import { useTitle } from "@vueuse/core";
import SiteLogoText from "@/components/SiteLogoText.vue";

useTitle("PM Random");

interface Item {
  title: string;
  link: string;
  image: string;
}

const items: Array<Item> = [
  { title: "Characters", link: "/characters", image: cdn_url("images/menu/characters.png") },
  { title: "Pokémon", link: "/pokemon", image: cdn_url("images/menu/pokemon.png") },
  { title: "Revenue", link: "/revenue", image: cdn_url("images/menu/revenue.png") },
  { title: "Timeline", link: "/timeline", image: cdn_url("images/menu/timeline.png") },
  { title: "Voice Actors", link: "/voice-actors", image: cdn_url("images/menu/voice-actors.png") },
  {
    title: "Character IDs",
    link: "/character-ids",
    image: cdn_url("images/menu/character-ids.png")
  }
];
</script>

<template>
  <div>
    <div id="home--header" class="mb-3">
      <SiteLogoText :large="true" class="mb-2" />
      <div>Random information about Pokémon Masters</div>
      <a href="https://github.com/pm-random" id="home--github">GitHub</a>
    </div>
    <div id="home--grid">
      <router-link
        v-for="item in items"
        :key="item.link"
        :to="item.link"
        class="home--item card p-1"
      >
        <img class="home--item-image" :src="item.image" />
        <div class="home--item-label">{{ item.title }}</div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
#home--header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#home--github {
  text-decoration: none;
}

#home--grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-gap: 0.75rem;
  margin-top: auto;
  margin-bottom: auto;
}

.home--item {
  text-decoration: none;
  display: inline;
  text-align: center;
}

.home--item:hover {
  background-color: #ebebeb;
}

.home--item-image {
  max-height: 72px;
}

.home--item-label {
  font-family: "Rajdhani", sans-serif;
  font-weight: bold;
  font-size: 1.5em;
}
</style>
