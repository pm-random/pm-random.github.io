<template>
  <TopBar/>
  <div class="page-content">
    <h1>Pokémon</h1>
    <HintedCharacterTable v-for="category in beta" :key="category" :category="category"/>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useHead } from '@vueuse/head';
import { JSONFetch } from "@/data.js";
import TopBar from "@/components/TopBar";
import HintedCharacterTable from "@/components/HintedCharacterTable";

useHead({ title: "Pokémon | PM Random" });

const beta = ref([]);
JSONFetch("monsters_beta").then(json => beta.value = [{"title": "1.0.0 to 1.1.1", "monsters": json}]);
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
