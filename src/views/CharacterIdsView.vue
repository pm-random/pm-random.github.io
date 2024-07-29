<script setup lang="ts">
import { ref } from "vue";
import { useTitle } from "@vueuse/core";
import { fetch_cdn_data } from "@/cdn";
import Badge from "@/components/Badge.vue";

interface Character {
  number: string;
  name: string;
  internal_name: string;
  status?: string;
  excludeFromCount?: boolean;
}

function isCharacter(value: any): value is Character {
  return (value as Character).number !== undefined;
}

const rows = ref<Array<Character | number>>();
const counts = ref({
  scoutable: 0,
  playable: 0,
  npc: 0,
  idOnly: 0
});

useTitle("Character IDs | PM Random");

fetch_cdn_data<Array<Character>>("character_ids").then((data) => {
  counts.value = {
    scoutable: data.filter((x) => x.status === undefined && !x.excludeFromCount).length,
    playable: data.filter((x) => x.status === "playable" && !x.excludeFromCount).length,
    npc: data.filter((x) => x.status === "npc" && !x.excludeFromCount).length,
    idOnly: data.filter((x) => x.status === "id-only" && !x.excludeFromCount).length
  };

  const map = new Map(data.map((c) => [parseInt(c.number), c]));
  const lastId = parseInt(data[data.length - 1].number);
  const _rows: Array<Character | number> = [];

  let unusedIds = 0;
  for (let i = 0; i <= lastId; i++) {
    const character = map.get(i);
    if (character !== undefined) {
      if (unusedIds > 0) {
        _rows.push(unusedIds);
        unusedIds = 0;
      }
      _rows.push(character);
    } else {
      unusedIds++;
    }
  }

  rows.value = _rows;
});
</script>

<template>
  <h1>Character IDs</h1>
  <template v-if="rows != undefined">
    <div id="characterids--statuses" class="mb-3">
      <div class="p-2 card characterids--status">
        <div>Scoutable</div>
        <Badge :content="counts.scoutable"></Badge>
      </div>
      <div class="p-2 card characterids--status characterids--playable">
        <div>Playable</div>
        <Badge :content="counts.playable"></Badge>
      </div>
      <div class="p-2 card characterids--status characterids--npc">
        <div>NPC</div>
        <Badge :content="counts.npc"></Badge>
      </div>
    </div>
    <div class="card">
      <table class="w-100">
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Internal Name</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in rows"
            v-bind:key="index"
            :class="typeof row != 'number' ? `characterids--${row.status}` : ''"
          >
            <template v-if="isCharacter(row)">
              <td>{{ row.number }}</td>
              <td>{{ row.name }}</td>
              <td>{{ row.internal_name }}</td>
            </template>
            <td v-else colspan="3" class="characterids--unused-id">
              {{ row }} unused ID{{ row === 1 ? "" : "s" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
</template>

<style scoped>
#characterids--statuses {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-gap: 0.5rem;
}

.characterids--status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

.characterids--unused-id {
  color: darkgray;
}

.characterids--playable {
  color: blue;
}

.characterids--npc {
  color: orange;
}

.characterids--id-only {
  color: red;
}

/* ensure that columns have the same width */
table {
  table-layout: fixed;
}
</style>
