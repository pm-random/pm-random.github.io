<script setup lang="ts">
import { ref } from "vue";
import { useTitle } from "@vueuse/core";
import { fetch_cdn_data, type Character, type CharacterCategory } from "@/cdn";
import CharacterTable from "@/components/CharacterTable.vue";

useTitle("Pokémon | PM Random");

const category = ref<CharacterCategory>();

fetch_cdn_data<Array<Character>>("pokemon_beta").then((data) => {
  category.value = {
    title: "Only in versions 1.0.0 to 1.1.1",
    characters: data
  };
});
</script>

<template>
  <h1>Pokémon</h1>
  <template v-if="category != undefined">
    <CharacterTable :category="category" />
  </template>
</template>
