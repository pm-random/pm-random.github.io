<template>
  <HeaderBar/>
  <h1>Voice Actors</h1>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Character(s)</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="obj in jp">
        <td>{{ obj.name }}</td>
        <td>
          <img v-for="chara in obj.characters" class="image" :src="chara">
        </td>
      </tr>
    </tbody>
  </table>
</template>


<script>
import { DATA_URL, JSONFetch } from "@/data.js";
import HeaderBar from "@/components/HeaderBar"
import { useHead } from '@vueuse/head';


export default {
  components: { HeaderBar },

  setup() {
    useHead({ title: "Voice Actors | PM Random" })
  },

  created() {
    JSONFetch("voice_actors_jp").then(json => {
      json.forEach(group => group.characters = group.characters.map(this.idToImg));
      this.jp = json;
    });
  },

  data() {
    return {
      jp: []
    }
  },

  methods: {
    idToImg: id => `${DATA_URL}/images/characters/va/${id}_256.ktx.png`
  }
}
</script>


<style scoped>
img {
  max-height: 100px;
}
</style>