<script setup lang="ts">
import { cdn_url, type Character, type CharacterCategory } from "@/cdn";
import { prettyDate } from "@/utils";
import AccordionCard from "@/components/AccordionCard.vue";

const props = defineProps<{
  category: CharacterCategory;
}>();

class EnhancedCharacter {
  name: string;
  date: string;
  images?: Array<string>;
  notes?: Array<string>;
  days: number;

  constructor(character: Character) {
    this.name = character.name;
    this.date = character.date;
    this.images = character.images?.map(cdn_url);
    this.notes = character.notes;
    this.days = Math.floor((Date.now() - Date.parse(character.date)) / (60 * 60 * 24 * 1000));
  }
}

interface EnhancedCategory {
  title: string;
  characters: Array<EnhancedCharacter>;
  hasImages: boolean;
  hasNotes: boolean;
}

const category = enhanceCategory(props.category);

function compareEnhancedCharacters(a: EnhancedCharacter, b: EnhancedCharacter) {
  const difference = b.date.localeCompare(a.date);
  return difference === 0 ? a.name.localeCompare(b.name) : difference;
}

function enhanceCategory(category: CharacterCategory): EnhancedCategory {
  return {
    title: category.title,
    characters: category.characters
      .map((c) => new EnhancedCharacter(c))
      .sort(compareEnhancedCharacters),
    hasImages: category.characters.some((c) => c.images !== undefined),
    hasNotes: category.characters.some((c) => c.notes !== undefined)
  };
}
</script>

<template>
  <AccordionCard :open="true">
    <template #header>
      <div id="characteraccordion--header">
        <div id="characteraccordion--title">{{ category.title }}</div>
        <div class="pill">{{ category.characters.length }}</div>
      </div>
    </template>
    <template #content>
      <div class="table-responsive">
        <table class="w-100">
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
              <template v-if="category.hasImages">
                <td v-if="character.images === undefined">&mdash;</td>
                <td v-else>
                  <div class="characteraccordion--images">
                    <a v-for="image in character.images" :href="image" :key="image">
                      <img class="characteraccordion--image" :src="image" loading="lazy" />
                    </a>
                  </div>
                </td>
              </template>
              <template v-if="category.hasNotes">
                <td v-if="character.notes != undefined" v-html="character.notes.join('<br>')"></td>
                <td v-else>&mdash;</td>
              </template>
              <td v-if="character.days === 1">
                {{ prettyDate(character.date) }} ({{ character.days }} day)
              </td>
              <td v-else>{{ prettyDate(character.date) }} ({{ character.days }} days)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </AccordionCard>
</template>

<style scoped>
#characteraccordion--header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

#characteraccordion--title {
  font-size: 1.25rem;
  font-family: "Rajdhani", "sans-serif";
}

#characteraccordion--badge {
  padding: 0.15rem 0.75rem;
  border-radius: 4px;
  background-color: dodgerblue;
  color: white;
}

.characteraccordion--images {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
}

.characteraccordion--image {
  max-height: 3.5rem;
}

@media screen and (min-width: 768px) {
  .characteraccordion--images {
    flex-direction: row;
  }
}
</style>
