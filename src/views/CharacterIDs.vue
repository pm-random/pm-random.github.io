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
            <td :class="row.status">
              {{ row.internal_name }}
            </td>
          </template>
          <td v-else colspan="3" class="unused-id">
            {{ row }} unused ID{{ row === 1 ? "" : "s" }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useHead } from "@vueuse/head";
import { JSONFetch } from "@/data.ts";
import TopBar from "@/components/TopBar.vue";

useHead({ title: "Character IDs | PM Random" });

const rows = ref();

JSONFetch("character_ids").then(json => {
  const map = new Map(json.map(c => [parseInt(c.number), c]));
  const last_number = json.map(c => parseInt(c.number)).reverse()[0];
  const tmp = [];

  for (let i = 0; i <= last_number; i++) {
    const chara = map.get(i);
    if (chara !== undefined) {
      tmp.push(chara);
    } else if (Number.isInteger(tmp[tmp.length - 1])) {
      tmp[tmp.length - 1]++;
    } else {
      tmp.push(1);
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
