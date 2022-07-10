<template>
  <div class="container-xxl">
    <h1 class="m-3">Character IDs</h1>

    <div v-if="rows == null" class="spinner-grow m-3"></div>
    <template v-else>
      <div id="legend" class="card border border-3 mx-auto my-3 shadow-sm">
        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>Scoutable</span>
            <span class="badge bg-primary rounded-pill">{{ rows.filter((x: any) => x.status === undefined).length }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="playable">Playable</span>
            <span class="badge bg-primary rounded-pill">{{ rows.filter((x: any) => x.status === "playable").length }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="npc">NPC</span>
            <span class="badge bg-primary rounded-pill">{{ rows.filter((x: any) => x.status === "npc").length }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="id-only">ID-only</span>
            <span class="badge bg-primary rounded-pill">{{ rows.filter((x: any) => x.status === "id-only").length }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="id-only-early">ID-only (1.0.0 to 1.1.1)</span>
            <span class="badge bg-primary rounded-pill">{{ rows.filter((x: any) => x.status === "id-only-early").length }}</span>
          </li>
        </ul>
      </div>

      <div class="card border border-3 shadow-sm my-3">
        <table class="table table-striped">
          <thead>
            <tr>
              <th class="col-3">Number</th>
              <th class="col-3">Name</th>
              <th class="col-3">Internal Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" v-bind:key="row.number">
              <template v-if="row.number">
                <td :class="row.status">{{ row.number }}</td>
                <td :class="row.status">{{ row.name }}</td>
                <td :class="row.status">{{ row.internal_name }}</td>
              </template>
              <td v-else colspan="3" class="unused-id">
                {{ row }} unused ID{{ row === 1 ? "" : "s" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useHead } from "@vueuse/head";
import { getJson } from "@/data";

interface Character {
  number: string,
  name: string,
  internal_name: string,
  status?: string
}

useHead({ title: "Character IDs | PM Random" });

const rows = ref();

getJson<Array<Character>>("character_ids").then(characters => {
  const map = new Map(characters.map(c => [parseInt(c.number), c]));
  const last_number = parseInt(characters[characters.length - 1].number);
  const tmp: Array<Character | number> = [];

  let unusedIds = 0;
  for (let i = 0; i <= last_number; i++) {
    const character = map.get(i);
    if (character !== undefined) {
      if (unusedIds > 0) {
        tmp.push(unusedIds);
        unusedIds = 0;
      }
      tmp.push(character);
    } else {
      unusedIds++;
    }
  }

  rows.value = tmp;
});
</script>

<style scoped>
#legend {
  width: 300px;
}

.unused-id {
  color: darkgray !important;
}

.playable {
  color: blue !important;
}

.npc {
  color: red !important;
}

.id-only {
  color: orange !important;
}

.id-only-early {
  color: blueviolet !important;
}
</style>
