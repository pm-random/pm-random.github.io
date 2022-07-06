<template>
  <div class="page-content">
    <h1>Theme Skills</h1>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Character</th>
            <th>Sync Pair</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="character in characters" :key="character">
            <tr>
              <td class="trainer-name" :rowspan="character.rest.length + 1">
                {{ character.name }}
              </td>
              <td>{{ character.first[0] }}</td>
              <td>{{ character.first[1].join(", ") }}</td>
            </tr>
            <tr v-for="[syncpair, skills] of character.rest" :key="syncpair">
              <td>{{ syncpair }}</td>
              <td v-if="skills.length > 0">
                {{ skills.join(", ") }}
              </td>
              <td v-else>&mdash;</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useHead } from "@vueuse/head";
import { JSONFetch } from "../data.ts";

useHead({ title: "Theme Skills | PM Random" });

const characters = ref([]);
const loaded = ref(false);

JSONFetch("team_skills").then(json => {
  for (const [name, syncpairs] of Object.entries(json)) {
    const firstKey = Object.keys(syncpairs)[0];
    const character = {
      name: name,
      first: [firstKey, syncpairs[firstKey]],
    };
    character.rest = Object.entries(syncpairs).slice(1);
    characters.value.push(character);
  }
  loaded.value = true;
});
</script>

<style>
.trainer-name {
  background-color: white;
}
</style>
