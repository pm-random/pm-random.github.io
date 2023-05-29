<script setup lang="ts">
const items = [
  { title: "Characters", link: "/characters" },
  { title: "Pokémon", link: "/pokemon" },
  { title: "Revenue", link: "/revenue" },
  { title: "Timeline", link: "/timeline" },
  { title: "Voice Actors", link: "/voice-actors" },
  { title: "Character IDs", link: "/character-ids" }
];
</script>

<template>
  <div id="topbarnav--root">
    <router-link
      v-for="item in items"
      :key="item.link"
      :to="item.link"
      @click="$emit('link_clicked')"
      class="nav-link"
    >
      {{ item.title }}
    </router-link>
  </div>
</template>

<style scoped>
#topbarnav--root {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
}
</style>
