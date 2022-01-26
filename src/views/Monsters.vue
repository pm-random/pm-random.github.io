<template>
  <TopBar/>
  <div class="page-content">
    <h1>Pokémon</h1>
    <HintedCharacterTable v-for="category in beta" :key="category" :category="category"/>
    <template v-if="current !== null">
      <h2>Current version</h2>
    </template>
  </div>
</template>


<script>
import { JSONFetch } from "@/data.js";
import TopBar from "@/components/TopBar"
import HintedCharacterTable from "@/components/HintedCharacterTable"
import { useHead } from '@vueuse/head';


export default {
  components: { TopBar, HintedCharacterTable },

  setup() {
    useHead({ title: "Pokémon | PM Random" })
  },

  created() {
    JSONFetch("monsters_beta").then(json => this.beta = [{"title": "1.0.0 to 1.1.1", "monsters": json}]);
    //JSONFetch("monsters").then(json => this.current = json["monsters"]);
  },

  data() {
    return {
      beta: [],
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
