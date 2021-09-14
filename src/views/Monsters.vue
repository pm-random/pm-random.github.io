<template>
  <HeaderBar/>
  <HintedCharacterTable v-for="category in hinted" :key="category" :category="category"/>
  <template v-if="current !== null">
    <h2>Current version</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="monster in current">
          <td>{{ monster }}</td>
        </tr>
      </tbody>
    </table>
  </template>
</template>


<script>
import { JSONFetch, GAME_VERSION } from "@/data.js";
import HeaderBar from "@/components/HeaderBar"
import HintedCharacterTable from "@/components/HintedCharacterTable"

export default {
  components: { HeaderBar, HintedCharacterTable },

  created() {
    JSONFetch("monsters_hinted").then(json => this.hinted = json);
    JSONFetch("monsters").then(json => this.current = new Set(json));
  },

  data() {
    return {
      hinted: [],
      current: null
    }
  }
}
</script>