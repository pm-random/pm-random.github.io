<template>
  <TopBar/>
  <div class="page-content">
    <h1>Character IDs</h1>

    <table class="table table-sm table-bordered w-auto m-auto">
      <thead>
        <tr>
          <th>Character Status</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Scoutable</td></tr>
        <tr class="playable"><td>Playable</td></tr>
        <tr class="npc"><td>NPC</td></tr>
        <tr class="softlaunch"><td>Soft Launch</td></tr>
      </tbody>
    </table>

    <table class="table table-sm">
      <thead>
        <tr>
          <th>Number</th>
          <th>Name</th>
          <th>Internal Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows">
          <template v-if="row.number">
            <td :class="row.status">{{ row.number }}</td>
            <td :class="row.status">{{ row.name }}</td>
            <td :class="row.status">{{ row.internal_name }}</td>
          </template>
          <td v-else colspan="3" class="unused-id">{{ row }} unused ID{{ row === 1 ? "" : "s" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import { JSONFetch } from "@/data.js";
import TopBar from "@/components/TopBar"
import { useHead } from '@vueuse/head';


export default {
  components: { TopBar },

  setup() {
    useHead({ title: "Character IDs | PM Random" })
  },

  created() {
    JSONFetch("character_ids").then(json => {
      const map = new Map(json.map(c => [parseInt(c.number), c]));
      const last_number = json.map(c => parseInt(c.number)).reverse()[0];
      const tmp = [];

      for (var i = 0; i <= last_number; i++) {
        let chara = map.get(i);
        if (chara !== undefined) {
          tmp.push(chara);
        } else if (Number.isInteger(tmp[tmp.length - 1])) {
          tmp[tmp.length - 1]++;
        } else {
          tmp.push(1);
        }
      }

      this.rows = tmp;
    });
  },

  data() {
    return {
      rows: []
    }
  }
}
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

.softlaunch {
  color: purple;
}
</style>
