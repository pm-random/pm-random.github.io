<script setup lang="ts">
import { ref } from "vue";
import { useTitle } from "@vueuse/core";
import { cdn_url, fetch_cdn_data } from "@/cdn";

export interface VoiceActor {
  name: string;
  name_jp?: string;
  characters: Array<VACharacter>;
}

type FormerVoiceActor = VoiceActor & { notes: string };

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
const formerActors = ref<Array<FormerVoiceActor>>();
const exceptions = ref<Map<string, string>>();

const actors_promise = fetch_cdn_data<Array<VoiceActor>>("va/jp");
const former_promise = fetch_cdn_data<Array<FormerVoiceActor>>("va/jp_former");
const exceptions_promise = fetch_cdn_data<Array<VAException>>("va/exceptions");

useTitle("Voice Actors | PM Random");

Promise.all([actors_promise, former_promise, exceptions_promise]).then(
  ([_actors, _former, _exceptions]) => {
    actors.value = _actors;
    formerActors.value = _former;
    exceptions.value = new Map(_exceptions.map((ex) => [ex.id, ex.path]));
  }
);
</script>

<template>
  <div>
    <h1>Voice Actors</h1>
    <h2>Current</h2>
    <div v-if="actors != undefined && exceptions != undefined" class="card table-responsive">
      <table class="w-100">
        <thead>
          <tr>
            <th>Voice actor</th>
            <th>Characters</th>
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
    <h2>Former</h2>
    <div v-if="formerActors != undefined" class="card table-responsive">
      <table class="w-100">
        <thead>
          <th>Voice actor</th>
          <th>Characters</th>
          <th>Notes</th>
        </thead>
        <tbody>
          <tr v-for="(actor, index) in formerActors" :key="index">
            <td>
              <div>{{ actor.name }}</div>
              <div v-if="actor.name_jp" class="voiceactors--jp">{{ actor.name_jp }}</div>
            </td>
            <td>{{ actor.characters.map((c) => c.name).join(", ") }}</td>
            <td>{{ actor.notes }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
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
