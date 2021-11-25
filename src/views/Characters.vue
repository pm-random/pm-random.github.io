<template>
  <HeaderBar/>
  <div id="page-content">
    <h1>Characters</h1>
    <HintedCharacterTable v-for="category in present" :key="category" :category="category"/>
    <template v-if="absent !== null">
      <h2>No information so far</h2>
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Count</th>
            <th>Characters</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="game in absent">
            <td>{{ game.name }}</td>
            <td>{{ game.characters.length }}</td>
            <td>{{ game.characters.sort().join(", ") }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>


<script>
import { JSONFetch } from "@/data.js";
import HeaderBar from "@/components/HeaderBar"
import HintedCharacterTable from "@/components/HintedCharacterTable"
import { useHead } from '@vueuse/head';


export default {
  components: { HeaderBar, HintedCharacterTable },

  setup() {
    useHead({ title: "Characters | PM Random" })
  },

  created() {
    JSONFetch("characters_present").then(json => this.present = json);
    JSONFetch("characters_absent").then(json => this.absent = json.filter(game => game.characters.length > 0));
  },

  data() {
    return {
      present: [],
      absent: null
    }
  }
}
</script>