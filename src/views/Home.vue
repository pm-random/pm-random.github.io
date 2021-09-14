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

export default {
  data() {
    return {
      version: GAME_VERSION,
      items: [
        {
          title: "Non-recruitable characters",
          image: `${DATA_URL}/images/characters/ch0159_00_kokuran_1024.ktx.png`,
          link: `/characters`
        },
        {
          title: "Pokémon list",
          image: `${DATA_URL}/images/monsters/renders/mega-blaziken.png`,
          link: `/monsters`
        },
        {
          title: "Theme Skills",
          image: `${DATA_URL}/images/characters/ch0069_00_elitem_1024.ktx.png`,
          link: `/theme-skills`
        },
        {
          title: "XP Curves",
          image: `${DATA_URL}/images/characters/ch0085_00_hopef_1024.ktx.png`,
          link: `/xp-curves`
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
  margin-left: 8px;
  margin-right: 8px;
}

.item {
  border: solid thin gray;
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
