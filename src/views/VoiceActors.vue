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
      <tr v-for="actor in jp">
        <td>
          <p v-if="actor.name_jp">{{ actor.name }}<br><span class="jp">{{ actor.name_jp }}</span></p>
          <p v-else>{{ actor.name }}</p>
        </td>
        <td>
          <figure v-for="character in actor.characters" class="chara">
            <img :src="idToImg(character.id)" :alt="character.id">
            <figcaption class="caption">{{ character.name }}</figcaption>
          </figure>
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
    JSONFetch("voice_actors_jp").then(json => this.jp = json);
  },

  data() {
    return {
      jp: [],
      exceptions: new Set([
        "ch0065_00_professor",
        "ch0093_00_staff_center",
        "ch0103_00_staff_shop",
        "ch0104_00_staff_cafe"
      ])
    }
  },

  methods: {
    idToImg(id) {
      if (!this.exceptions.has(id)) {
        return `${DATA_URL}/images/characters/256/${id}_256.ktx.png`;
      } else if (id === "ch0065_00_professor") {
        return `${DATA_URL}/images/characters/render/professor-bellis.png`
      } else if (id === "ch0093_00_staff_center") {
        return `${DATA_URL}/images/characters/render/trista.png`
      } else if (id === "ch0103_00_staff_shop") {
        return `${DATA_URL}/images/characters/render/tricia.png`
      } else if (id === "ch0104_00_staff_cafe") {
        return `${DATA_URL}/images/characters/render/trinnia.png`
      }
    }
  }
}
</script>


<style scoped>
img {
  max-height: 90px;
}
.jp {
  color: gray;
}
.chara {
  margin: 0px;
}
</style>
