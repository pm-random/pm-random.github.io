<template>
  <div class="container-xxl">
    <h1 class="my-3">Pokémon</h1>
    <div v-if="beta == null" class="spinner-grow my-3"></div>
    <div v-else class="card border border-3 shadow-sm my-3">
      <HintedCharacterTable :category="beta" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useHead } from "@vueuse/head";
import { getJson } from "@/data";
import HintedCharacterTable from "@/components/HintedCharacterTable.vue";

useHead({ title: "Pokémon | PM Random" });

interface BetaMonster {
  name: string,
  date: string
  images?: Array<string>,
  notes?: Array<string>,
}

interface BetaMonsterList {
  title: string,
  characters: Array<BetaMonster>
}

const beta: Ref<BetaMonsterList | null> = ref(null);
getJson<Array<BetaMonster>>("monsters_beta").then(
  monsters => beta.value = { title: "1.0.0 to 1.1.1", characters: monsters }
);
</script>

<style scoped>
#grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
}

.grid-item {
  border: solid 1px lightgray;
  background-color: #ebebeb;
  border-radius: 4px;
  padding: 5px;
}
</style>
