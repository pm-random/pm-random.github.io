<template>
  <HeaderBar/>
  <h1>Pokémon</h1>
  <HintedCharacterTable v-for="category in hinted" :key="category" :category="category"/>
  <template v-if="current !== null">
    <h2>Current version</h2>
    <div id="grid" class="responsive-x">
      <div class="grid-item" v-for="monster in current">{{ monster }}</div>
    </div>
  </template>
</template>


<script>
import { JSONFetch } from "@/data.js";
import HeaderBar from "@/components/HeaderBar"
import HintedCharacterTable from "@/components/HintedCharacterTable"
import { useHead } from '@vueuse/head';


export default {
  components: { HeaderBar, HintedCharacterTable },

  setup() {
    useHead({ title: "Pokémon | PM Random" })
  },

  created() {
    JSONFetch("monsters_hinted").then(json => this.hinted = json);
    JSONFetch("monsters").then(json => this.current = json["monsters"]);
  },

  data() {
    return {
      hinted: [],
      current: null
    }
  }
}
</script>


<style scoped>
#grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
}

.grid-item {
  border: solid 1px lightgray;
  background-color: #EBEBEB;
  border-radius: 4px;
  padding: 5px;
}
</style>