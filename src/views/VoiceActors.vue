<template>
  <TopBar/>
  <h1>Voice Actors</h1>
  <div id="grid">
    <div v-for="actor in jp" class="actor">
      <div class="actor-name">
        <div v-if="actor.name_jp">
          {{ actor.name }}<br>
          <div class="actor-name-jp">{{ actor.name_jp }}</div>
        </div>
        <div v-else>{{ actor.name }}</div>
      </div>
      <div class="characters">
        <figure v-for="character in actor.characters" class="character">
          <img :src="idToImageUrl(character.id)" :alt="character.id">
          <figcaption>{{ character.name }}</figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>


<script>
import { DATA_URL, JSONFetch } from "@/data.js";
import TopBar from "@/components/TopBar"
import { useHead } from '@vueuse/head';


export default {
  components: { TopBar },

  setup() {
    useHead({ title: "Voice Actors | PM Random" })
  },

  created() {
    JSONFetch("voice_actors_jp").then(json => this.jp = json);
  },

  data() {
    return {
      jp: [],
      exceptions: new Map([
        ["ch0065_00_professor", "render/professor-bellis.png"],
        ["ch0093_00_staff_center", "render/trista.png"],
        ["ch0103_00_staff_shop", "render/tricia.png"],
        ["ch0104_00_staff_cafe", "render/trinnia.png"]
      ])
    }
  },

  methods: {
    idToImageUrl(id) {
      if (!this.exceptions.has(id))
        return `${DATA_URL}/images/characters/256/${id}_256.ktx.png`;
      return `${DATA_URL}/images/characters/${this.exceptions.get(id)}`;
    }
  }
}
</script>


<style>
:root {
  --img-size: 90px;
}
</style>

<style scoped>
img {
  height: var(--img-size);
  min-height: var(--img-size);
}

#grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  grid-gap: 4px;
}

.actor {
  border: 1px solid lightgray;
  border-radius: 5px;
  overflow: hidden;
}

.actor-name {
  background-color: #f1f1f1;
  border-bottom: 1px solid lightgray;
}

.actor-name-jp {
  color: gray;
}

.characters {
  --space: 3px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--img-size), 1fr));
  grid-gap: var(--space);
  padding: var(--space);
}

.character {
  margin: 0px;
}
</style>
