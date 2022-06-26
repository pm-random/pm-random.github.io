<template>
  <h2 v-html="category.title"></h2>
  <div class="table-responsive">
    <table class="table table-sm">
      <thead>
        <tr>
          <th>Name</th>
          <th v-if="category.hasImages">Image</th>
          <th v-if="category.hasNotes">Notes</th>
          <th v-if="category.hasSince">Since</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="character in category.characters">
          <td>{{ character.name }}</td>
          <td v-if="category.hasImages">
            <span v-if="character.images === undefined" class="dash">
              &mdash;
            </span>
            <a v-for="image in character.images" :href="image">
              <img class="image img-thumbnail" :src="image" />
            </a>
          </td>
          <template v-if="category.hasNotes">
            <td v-if="character.notes === undefined">&mdash;</td>
            <td v-else v-html="character.notes.join('<br>')"></td>
          </template>
          <template v-if="category.hasSince">
            <td v-if="character.since === undefined">???</td>
            <td v-else-if="character.days === 1">
              {{ character.since }} ({{ character.days }}
              day)
            </td>
            <td v-else>
              {{ character.since }} ({{ character.days }}
              days)
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { DATA_URL } from "@/data";

const props = defineProps({
  category: Object,
});

const category = cleanCategory(props.category);

function daysSince(year, month, day) {
  const then = Date.UTC(year, month - 1, day);
  return Math.floor((Date.now() - then) / (60 * 60 * 24 * 1000));
}

function compareCharacters(a, b) {
  const difference = a.days - b.days;
  if (difference === 0) {
    return a.name > b.name;
  }
  return difference;
}

function cleanCharacter(character) {
  if (character.since !== undefined) {
    const [year, month, day] = character.since.split("-");
    character.days = daysSince(year, month, day);
    character.since = `${day}/${month}/${year}`;
  }
  if (character.images !== undefined) {
    character.images = character.images.map(image => `${DATA_URL}/${image}`);
  }
  return character;
}

function cleanCategory(category) {
  const c = JSON.parse(JSON.stringify(category));
  if (c.characters === undefined) {
    c.characters = c.monsters;
  }
  c.characters = c.characters.map(cleanCharacter).sort(compareCharacters);
  c.hasImages = c.characters.find(x => x.images !== undefined);
  c.hasNotes = c.characters.find(x => x.notes !== undefined);
  c.hasSince = c.characters.find(x => x.since !== undefined);
  return c;
}
</script>

<style scoped>
.image {
  max-height: var(--chara-icon-size);
}
</style>
