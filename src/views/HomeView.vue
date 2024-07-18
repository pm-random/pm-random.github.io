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
  { title: "Unobtainable Characters", link: "/characters", image: cdn_url("images/menu/characters.png") },
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
    </div>
    <div id="home--grid">
      <router-link
        v-for="item in items"
        :key="item.link"
        :to="item.link"
        class="home--item card p-2"
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

#home--grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  grid-gap: 0.75rem;
  margin-top: auto;
  margin-bottom: auto;
}

.home--item {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.home--item:hover {
  text-decoration: underline;
}

.home--item-image {
  max-height: 48px;
  border-radius: var(--border-radius);
}

.home--item-label {
  font-family: var(--title-font-family);
  font-weight: bold;
  font-size: 1.25em;
}
</style>
