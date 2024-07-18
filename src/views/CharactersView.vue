<script setup lang="ts">
import { ref } from "vue";
import { useTitle } from "@vueuse/core";
import { fetch_cdn_data, type CharacterCategory } from "@/cdn";
import CharacterTable from "@/components/CharacterTable.vue";

const categories = ref<Array<CharacterCategory>>();

useTitle("Characters | PM Random");

fetch_cdn_data<Array<CharacterCategory>>("characters").then((data) => {
  categories.value = data;
});
</script>

<template>
  <h1>Characters</h1>
  <div v-if="categories != undefined">
    <CharacterTable
      v-for="category in categories"
      v-bind:key="category.title"
      :category="category"
    />
  </div>
</template>
