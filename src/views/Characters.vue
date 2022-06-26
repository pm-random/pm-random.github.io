<template>
  <TopBar />
  <div class="page-content">
    <h1>Characters</h1>
    <HintedCharacterTable
      v-for="category in present"
      :key="category"
      :category="category"
    />
    <template v-if="absent !== null">
      <h2>No information so far</h2>
      <div class="table-responsive">
        <table class="table table-sm">
          <thead>
            <tr>
              <th>Game</th>
              <th>Count</th>
              <th>Characters</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="game in absent" v-bind:key="game.name">
              <td>{{ game.name }}</td>
              <td>{{ game.characters.length }}</td>
              <td>
                {{ game.characters.sort().join(", ") }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useHead } from "@vueuse/head";
import { JSONFetch } from "@/data.ts";
import TopBar from "@/components/TopBar.vue";
import HintedCharacterTable from "@/components/HintedCharacterTable.vue";

useHead({ title: "Characters | PM Random" });

const present = ref([]);
const absent = ref(null);

JSONFetch("characters_present").then(json => (present.value = json));
JSONFetch("characters_absent").then(
  json => (absent.value = json.filter(game => game.characters.length > 0))
);
</script>
