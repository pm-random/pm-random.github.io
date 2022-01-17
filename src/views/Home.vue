<template>
  <div id="nv-wrapper">
    <NameAndVersion home/>
  </div>
  <div id="grid">
    <router-link class="item" :to="item.link" v-for="item in items">
      <img class="item-image" :src="item.image">
      <div class="item-title">{{ item.title }}</div>
    </router-link>
  </div>
</template>


<script>
import { useHead } from '@vueuse/head';
import NameAndVersion from '@/components/NameAndVersion';

export default {
  components: { NameAndVersion },
  setup() {
    useHead({ title: "PM Random" })
  },
  data() {
    return {
      version: null,
      items: [
        { title: "Characters", image: `images/characters.png`, link: `/characters` },
        { title: "Pokémon", image: `images/monsters.png`, link: `/monsters` },
        { title: "Revenue", image: `images/gem.png`, link: `/revenue` },
        { title: "Timeline", image: `images/kana.png`, link: `/timeline` },
        { title: "Voice Actors", image: `images/voice-actors.png`, link: `/voice-actors` },
        { title: "XP", image: `images/manual3.png`, link: `/xp` },
        { title: "Theme Skills", image: `images/skill-sphere.png`, link: `/theme-skills` },
      ]
    }
  }
}
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
