<template>
  <h1>PM Random<sup>{{ version }}</sup></h1>
  <div id="grid">
    <template v-for="item in items">
      <router-link class="item" :to="item.link">
        <img class="item-image" :src="item.image">
        <div class="item-title">{{ item.title }}</div>
      </router-link>
    </template>
  </div>
</template>


<script>
import { DATA_URL, GAME_VERSION } from "@/data.js";
import { useHead } from '@vueuse/head';

export default {
  setup() {
    useHead({ title: "PM Random" })
  },
  data() {
    return {
      version: GAME_VERSION,
      items: [
        { title: "Non-recruitable characters", image: `images/characters.png`, link: `/characters` },
        { title: "Pokémon List", image: `images/monsters.png`, link: `/monsters` },
        { title: "Theme Skills", image: `images/skill-sphere.png`, link: `/theme-skills` },
        { title: "Revenue", image: `images/gem.png`, link: `/revenue` },
        { title: "XP", image: `images/manual3.png`, link: `/xp` },
      ]
    }
  }
}
</script>


<style scoped>
h1 {
  font-size: 3em;
  color: black;
}

sup {
  color: blue;
}

#grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-gap: 10px;
  margin: 10px;
}

.item {
  border-radius: 15px;
  padding: 5px;
  text-decoration: none;
  box-shadow: 3px 3px 1px 1px #BBBBBB;
}

.item:hover {
  background-color: #EBEBEB;
}

.item-image {
  max-height: 80px;
}

.item-title {
  font-family: 'Rajdhani', sans-serif;
  font-weight: bold;
  font-size: 1.5em;
}
</style>
