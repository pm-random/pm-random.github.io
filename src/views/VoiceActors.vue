<template>
  <div class="page-content">
    <h1>Voice Actors</h1>
    <table class="table table-sm">
      <thead>
        <tr>
          <th>Voice Actor</th>
          <th>Characters</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="actor in jp" class="actor">
          <td>
            <div v-if="actor.name_jp">
              {{ actor.name }}<br />
              <div class="actor-name-jp">
                {{ actor.name_jp }}
              </div>
            </div>
            <div v-else>{{ actor.name }}</div>
          </td>
          <td>
            <div class="row">
              <figure
                v-for="character in actor.characters"
                class="character col m-0"
              >
                <img :src="idToImageUrl(character.id)" :alt="character.id" />
                <figcaption>
                  {{ character.name }}
                </figcaption>
              </figure>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { DATA_URL, JSONFetch } from "@/data.ts";
import { useHead } from "@vueuse/head";

useHead({ title: "Voice Actors | PM Random" });

const jp = ref([]);
JSONFetch("voice_actors_jp").then(json => (jp.value = json));

const exceptions = new Map([
  ["ch0065_00_professor", "render/professor-bellis.png"],
  ["ch0093_00_staff_center", "render/trista.png"],
  ["ch0103_00_staff_shop", "render/tricia.png"],
  ["ch0104_00_staff_cafe", "render/trinnia.png"],
]);

function idToImageUrl(id) {
  if (!exceptions.has(id))
    return `${DATA_URL}/images/characters/256/${id}_256.ktx.png`;
  return `${DATA_URL}/images/characters/${exceptions.get(id)}`;
}
</script>

<style scoped>
img {
  height: 12vw;
  max-height: 70px;
}

.actor-name-jp {
  color: gray;
}
</style>
