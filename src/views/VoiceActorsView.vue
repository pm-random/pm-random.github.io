<script setup lang="ts">
import { ref } from "vue";
import { useHead } from "@unhead/vue";
import { cdn_url, fetch_cdn_data } from "@/cdn";

export interface VoiceActor {
  name: string;
  name_jp?: string;
  characters: Array<VACharacter>;
}

export interface VACharacter {
  id: string;
  name: string;
}

export interface VAException {
  id: string;
  path: string;
}

function id_to_cdn_url(id: string, exceptions: Map<string, string>) {
  const path = exceptions.get(id);
  if (path == undefined) return cdn_url(`images/characters/256/${id}_256.ktx.png`);
  return cdn_url(`images/characters/${path}`);
}

const actors = ref<Array<VoiceActor>>();
const exceptions = ref<Map<string, string>>();

const actors_promise = fetch_cdn_data<Array<VoiceActor>>("va/jp");
const exceptions_promise = fetch_cdn_data<Array<VAException>>("va/exceptions");

useHead({ title: "Voice Actors | PM Random" });

Promise.all([actors_promise, exceptions_promise]).then(([_actors, _exceptions]) => {
  actors.value = _actors;
  exceptions.value = new Map(_exceptions.map((ex) => [ex.id, ex.path]));
});
</script>

<template>
  <div>
    <h1>Voice Actors</h1>
    <div v-if="actors != undefined && exceptions != undefined" class="card table-responsive">
      <table id="voiceactors--table">
        <thead>
          <tr>
            <th>Voice actor</th>
            <th id="voiceactors--chara-header">Characters</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="actor in actors" :key="actor.name">
            <td>
              <div>{{ actor.name }}</div>
              <div v-if="actor.name_jp" class="voiceactors--jp">{{ actor.name_jp }}</div>
            </td>
            <td>
              <div class="voiceactors--chara-list">
                <figure
                  v-for="character in actor.characters"
                  :key="character.id"
                  class="voiceactors--chara px-2"
                >
                  <img
                    :src="id_to_cdn_url(character.id, exceptions)"
                    class="voiceactors--chara-img"
                    loading="lazy"
                  />
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

<style scoped>
#voiceactors--table {
  width: 100%;
}

.voiceactors--jp {
  color: gray;
}

.voiceactors--chara-list {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
}

.voiceactors--chara {
  max-width: 80px;
}

.voiceactors--chara-img {
  height: 4rem;
}
</style>