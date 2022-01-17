<template>
  <TopBar/>
  <h1>Theme Skills</h1>
  <div class="responsive-x">
    <table>
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
            <td class="trainer-name" :rowspan="character.rest.length + 1">{{ character.name }}</td>
            <td>{{ character.first[0] }}</td>
            <td>{{ character.first[1].join(", ") }}</td>
          </tr>
          <tr v-for="[syncpair, skills] of character.rest" :key="syncpair">
            <td>{{ syncpair }}</td>
            <td>{{ skills.join(", ") }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>


<script>
import { JSONFetch } from "../data.js";
import TopBar from '@/components/TopBar.vue'
import { useHead } from '@vueuse/head';

export default {
  components: { TopBar },

  setup() {
    useHead({ title: "Theme Skills | PM Random" })
  },

  created() {
    JSONFetch('team_skills').then(json => {
      for (const [name, syncpairs] of Object.entries(json)) {
        let firstKey = Object.keys(syncpairs)[0];
        let character = {'name': name, 'first': [firstKey, syncpairs[firstKey]]};
        character.rest = Object.entries(syncpairs).slice(1);
        this.characters.push(character);
      }
      this.loaded = true;
    });
  },

  data() {
    return {
      characters: [],
      loaded: false
    }
  },
}
</script>


<style>
.trainer-name {
  background-color: white;
}
</style>
