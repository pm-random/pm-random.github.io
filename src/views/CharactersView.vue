<script setup lang="ts">
import { ref } from "vue";
import { useHead } from "@unhead/vue";
import { fetch_cdn_data, type CharacterCategory } from "@/cdn";
import CharacterAccordion from "@/components/CharacterAccordion.vue";

const categories = ref<Array<CharacterCategory>>();

useHead({ title: "Characters | PM Random" });

fetch_cdn_data<Array<CharacterCategory>>("characters").then((data) => {
  categories.value = data;
});
</script>

<template>
  <h1>Characters</h1>
  <template v-if="categories != undefined">
    <CharacterAccordion
      v-for="category in categories"
      v-bind:key="category.title"
      :category="category"
    />
  </template>
</template>
