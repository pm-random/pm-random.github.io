<script setup lang="ts">
import { ref } from "vue";
import { useTitle } from "@vueuse/core";;
import { fetch_cdn_data, type CharacterCategory } from "@/cdn";
import CharacterAccordion from "@/components/CharacterAccordion.vue";

const categories = ref<Array<CharacterCategory>>();

useTitle("Characters | PM Random");

fetch_cdn_data<Array<CharacterCategory>>("characters").then((data) => {
  categories.value = data;
});
</script>

<template>
  <h1>Characters</h1>
  <div v-if="categories != undefined" id="characters--root">
    <CharacterAccordion
      v-for="category in categories"
      v-bind:key="category.title"
      :category="category"
    />
  </div>
</template>

<style scoped>
#characters--root {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
