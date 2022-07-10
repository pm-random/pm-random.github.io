<template>
  <div class="container-xxl">
    <h1 class="my-3">Characters</h1>

    <div v-if="present == null || absent == null" class="spinner-grow my-3"></div>
    <template v-else>
      <div v-for="category in present" :key="category.title" class="card shadow-sm my-3 border border-3">
        <HintedCharacterTable :category="category" />
      </div>

      <div class="card border border-3 shadow-sm my-3">
        <div class="m-2 d-flex justify-content-between align-items-center">
          <h4 class="m-0">No information so far</h4>
          <span class="badge bg-primary rounded-pill large-badge">
            {{ absent.map(game => game.characters.length).reduce((a, b) => a + b) }}
          </span>
        </div>
        <div class="border border-1"></div>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Game</th>
                <th>Characters</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="game in absent" v-bind:key="game.name">
                <td>
                  {{ game.name }}
                  <br/>
                  <span class="badge bg-primary rounded-pill small-badge">
                    {{ game.characters.length }}
                  </span>
                </td>
                <td>{{ game.characters.sort().join(", ") }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useHead } from "@vueuse/head";
import { getJson } from "@/data";
import HintedCharacterTable from "@/components/HintedCharacterTable.vue";

interface PresentCat {
  title: string,
  characters: Array<{
    name: string,
    date: string,
    images?: Array<string>,
    notes?: Array<string>
  }>,
}

interface AbsentCat {
  name: string,
  characters: Array<string>
}

useHead({ title: "Characters | PM Random" });

const present: Ref<Array<PresentCat> | null> = ref(null);
const absent: Ref<Array<AbsentCat> | null> = ref(null);

getJson<Array<PresentCat>>("characters_present").then(categories => present.value = categories);
getJson<Array<AbsentCat>>("characters_absent").then(
  categories => absent.value = categories.filter(game => game.characters.length > 0)
);
</script>

<style scoped>
.small-badge {
  font-size: 13px;
}

.large-badge {
  font-size: 16px;
}
</style>