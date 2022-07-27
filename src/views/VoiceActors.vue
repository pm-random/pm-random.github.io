<template>
  <div class="container-xxl">
    <h1 class="my-3">Voice Actors</h1>
    <div v-if="actors_jp.length == 0" class="spinner-grow my-3"></div>
    <div v-else class="card border border-3 shadow-sm p-0 my-3">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Voice Actor</th>
            <th>Characters</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="actor in actors_jp" class="actor" :key="actor.name">
            <td>
              <div>{{ actor.name }}</div>
              <div v-if="actor.name_jp" class="name-jp">{{ actor.name_jp }}</div>
            </td>
            <td>
              <div class="row">
                <figure v-for="character in actor.characters" :key="character.id" class="character col m-0">
                  <img :src="idToImageUrl(character.id)" :alt="character.id" />
                  <figcaption>{{ character.name }}</figcaption>
                </figure>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import { DATA_URL, getJson } from "@/data";
import { useHead } from "@vueuse/head";

interface Actor {
  name: string,
  name_jp?: string,
  characters: Array<Character>
}

interface Character {
  id: string,
  name: string
}

useHead({ title: "Voice Actors | PM Random" });

const actors_jp: Ref<Array<Actor>> = ref([]);
getJson<Array<Actor>>("voice_actors_jp").then(actors => actors_jp.value = actors);

const exceptions = new Map([
  ["ch0065_00_professor", "render/professor-bellis.png"],
  ["ch0093_00_staff_center", "render/trista.png"],
  ["ch0103_00_staff_shop", "render/tricia.png"],
  ["ch0104_00_staff_cafe", "render/trinnia.png"],
  ["ch0223_00_ushio", "render/matt.png"],
  ["ch0224_00_izumi", "render/shelly.png"]
]);

function idToImageUrl(id: string) {
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

.name-jp {
  color: gray;
}
</style>
