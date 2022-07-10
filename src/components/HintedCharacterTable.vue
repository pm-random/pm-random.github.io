<template>
  <div>
    <div class="d-flex justify-content-between align-items-center m-2">
      <h4 v-html="category.title" class="m-0"></h4>
      <span class="badge bg-primary rounded-pill">{{ category.characters.length }}</span>
    </div>
    <div class="divider"></div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th v-if="category.hasImages">Images</th>
            <th v-if="category.hasNotes">Notes</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="character in category.characters" :key="character.name">
            <td>{{ character.name }}</td>
            <td v-if="category.hasImages">
              <span v-if="character.images === undefined" class="dash">
                &mdash;
              </span>
              <a v-for="image in character.images" :href="image" :key="image">
                <img class="image img-thumbnail mx-1" :src="image" />
              </a>
            </td>
            <template v-if="category.hasNotes">
              <td v-if="character.notes === undefined">&mdash;</td>
              <td v-else v-html="character.notes.join('<br>')"></td>
            </template>
            <td v-if="character.days === 1">{{ character.prettyDate() }} ({{ character.days }} day)</td>
            <td v-else>{{ character.prettyDate() }} ({{ character.days }} days)</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DATA_URL } from "@/data";

interface Character {
  name: string,
  date: string,
  images?: Array<string>,
  notes?: Array<string>
}

class EnhancedCharacter {
  name: string;
  date: string;
  images?: Array<string>;
  notes?: Array<string>;
  days: number;

  constructor(character: Character) {
    this.name = character.name;
    this.date = character.date;
    this.images = character.images?.map(image => `${DATA_URL}/${image}`);
    this.notes = character.notes;
    this.days = Math.floor((Date.now() - Date.parse(character.date)) / (60 * 60 * 24 * 1000));
  }

  prettyDate(): string {
    const [year, month, day] = this.date.split("-");
    return `${day}/${month}/${year}`;
  }
}

interface Category {
  title: string,
  characters: Array<Character>
}

interface EnhancedCategory {
  title: string,
  characters: Array<EnhancedCharacter>,
  hasImages: boolean,
  hasNotes: boolean,
}

const props = defineProps<{
  category: Category,
}>();

const category = enhanceCategory(props.category);

function compareEnhancedCharacters(a: EnhancedCharacter, b: EnhancedCharacter) {
  const difference = b.date.localeCompare(a.date);
  return difference === 0 ? a.name.localeCompare(b.name) : difference;
}

function enhanceCategory(category: Category): EnhancedCategory {
  return {
    title: category.title,
    characters: category.characters.map(c => new EnhancedCharacter(c)).sort(compareEnhancedCharacters),
    hasImages: category.characters.some(c => c.images !== undefined),
    hasNotes: category.characters.some(c => c.notes !== undefined)
  };
}
</script>

<style scoped>
.image {
  max-height: var(--chara-icon-size);
}

.badge {
  font-size: 16px;
}

.divider {
  background-color: var(--bs-border-color);
  height: 2px;
}
</style>
