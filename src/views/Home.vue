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
        {
          title: "Non-recruitable characters",
          image: `images/characters.png`,
          link: `/characters`
        },
        {
          title: "Pokémon List",
          image: `images/monsters.png`,
          link: `/monsters`
        },
        {
          title: "Theme Skills",
          image: `images/theme-skills.png`,
          link: `/theme-skills`
        },
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
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
  margin: 4px;
}

.item {
  border: solid 1px gray;
  border-radius: 15px;
  padding: 5px;
  text-decoration: none;
}

.item:hover {
  background-color: #EBEBEB;
}

.item-image {
  max-width: 100px;
}

.item-title {
  font-family: 'Rajdhani', sans-serif;
  font-weight: bold;
  font-size: 1.5em;
}
</style>
