<template>
  <h2 v-html="cat.title"></h2>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th v-if="cat.hasImages">Image</th>
          <th v-if="cat.hasNotes">Notes</th>
          <th v-if="cat.hasSince">Since</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="character in cat.characters">
          <td>{{ character.name }}</td>
          <td v-if="cat.hasImages">
            <p v-if="character.images === undefined" class="dash">&mdash;</p>
            <a v-for="image in character.images" :href="image">
              <img class="image" :src="image">
            </a>
          </td>
          <template v-if="cat.hasNotes">
            <td v-if="character.notes === undefined" class="dash">&mdash;</td>
            <td v-else v-html="character.notes.join('<br>')"></td>
          </template>
          <template v-if="cat.hasSince">
            <td v-if="character.since === undefined">???</td>
            <td v-else-if="character.days === 1">{{ character.since }} ({{ character.days }} day)</td>
            <td v-else>{{ character.since }} ({{ character.days }} days)</td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import { DATA_URL } from "@/data.js";

function daysSince(year, month, day) {
  const then = Date.UTC(year, month - 1, day)
  return Math.floor((Date.now() - then) / (60 * 60 * 24 * 1000));
}

function compareCharacters(a, b) {
  let difference = a.days - b.days;
  if (difference === 0) {
    return a.name > b.name;
  }
  return difference
}

function cleanCharacter(character) {
  if (character.since !== undefined) {
    let [year, month, day] = character.since.split('-');
    character.days = daysSince(year, month, day);
    character.since = `${day}/${month}/${year}`;
  }
  if (character.images !== undefined) {
    character.images = character.images.map(image => `${DATA_URL}/${image}`);
  }
  return character;
}

function cleanCategory(category) {
  if (category.characters === undefined) {
    category.characters = category.monsters;
  }
  category.characters = category.characters.map(cleanCharacter).sort(compareCharacters);
  category.hasImages = category.characters.find(x => x.images !== undefined);
  category.hasNotes = category.characters.find(x => x.notes !== undefined);
  category.hasSince = category.characters.find(x => x.since !== undefined);
  return category;
}

export default {
  props: {
    category: Object
  },

  data() {
    return {
      cat: cleanCategory(this.category)
    }
  }
}
</script>


<style scoped>
.dash {
  font-weight: bold;
}

.image {
  max-height: var(--chara-icon-size);
}
</style>
