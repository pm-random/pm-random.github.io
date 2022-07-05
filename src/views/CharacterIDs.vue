<template>
  <TopBar />
  <div class="page-content">
    <h1>Character IDs</h1>

    <table class="table table-sm table-bordered w-auto m-auto">
      <thead>
        <tr>
          <th>Character Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Scoutable</td>
        </tr>
        <tr class="playable">
          <td>Playable</td>
        </tr>
        <tr class="npc">
          <td>NPC</td>
        </tr>
        <tr class="id-only">
          <td>ID-only</td>
        </tr>
        <tr class="id-only-early">
          <td>ID-only (1.0.0 to 1.1.1)</td>
        </tr>
      </tbody>
    </table>

    <table class="table table-sm">
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

<script setup lang="ts">
import { ref } from "vue";
import { useHead } from "@vueuse/head";
import { getJson } from "@/data";
import TopBar from "@/components/TopBar.vue";

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
.unused-id {
  color: darkgray;
}

.playable {
  color: blue;
}

.npc {
  color: red;
}

.id-only {
  color: orange;
}

.id-only-early {
  color: blueviolet;
}
</style>
