<template>
  <div id="nv-wrapper">
    <NameAndVersion home />
  </div>
  <div id="grid" class="page-content">
    <router-link class="item" to="/characters">
      <img class="item-image" src="/src/assets/characters.png" />
      <div class="item-title">Characters</div>
    </router-link>
    <router-link class="item" to="/pokemon">
      <img class="item-image" src="/src/assets/monsters.png" />
      <div class="item-title">Pokémon</div>
    </router-link>
    <router-link class="item" to="/revenue">
      <img class="item-image" src="/src/assets/gem.png" />
      <div class="item-title">Revenue</div>
    </router-link>
    <router-link class="item" to="/voice-actors">
      <img class="item-image" src="/src/assets/voice-actors.png" />
      <div class="item-title">Voice Actors</div>
    </router-link>
    <router-link class="item" to="/character-ids">
      <img class="item-image" src="/src/assets/character-ids.png" />
      <div class="item-title">Character IDs</div>
    </router-link>
    <router-link class="item" to="/xp">
      <img class="item-image" src="/src/assets/manual3.png" />
      <div class="item-title">XP</div>
    </router-link>
    <router-link class="item" to="/theme-skills">
      <img class="item-image" src="/src/assets/skill-sphere.png" />
      <div class="item-title">Theme Skills</div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import NameAndVersion from "@/components/NameAndVersion.vue";

useHead({ title: "PM Random" });
</script>

<style scoped>
#nv-wrapper {
  padding: 30px;
}

#grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-gap: 10px;
}

.item {
  border-radius: 15px;
  padding: 5px;
  text-decoration: none;
  box-shadow: 3px 3px 1px 1px #bbbbbb;
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
