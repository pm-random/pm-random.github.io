<script setup lang="ts">
import { ref } from "vue";
import { useHead } from "@unhead/vue";
import { fetch_cdn_data } from "@/cdn";
import { prettyDate } from "@/utils";

interface Version {
  name: string;
  date: string;
  highlight?: boolean;
}

interface Letter {
  link: string;
  date: string;
}

interface Milestone {
  name: string;
  date: string;
  link: string;
}

interface Dated {
  date: string;
}

interface Timeline {
  versions: Array<Version>;
  letters: Array<Letter>;
  milestones: Array<Milestone>;
}

function datedCmp(a: Dated, b: Dated) {
  if (a.date < b.date) return 1;
  if (b.date < a.date) return -1;
  return 0;
}

const versions = ref<Array<Version>>();
const letters = ref<Array<Letter>>();
const milestones = ref<Array<Milestone>>();

useHead({ title: "Timeline | PM Random" });

fetch_cdn_data<Timeline>("timeline").then((timeline) => {
  letters.value = timeline.letters.sort(datedCmp);
  milestones.value = timeline.milestones.sort(datedCmp);
  versions.value = timeline.versions.sort(datedCmp);
});
</script>

<template>
  <h1>Timeline</h1>
  <template v-if="letters != null">
    <h2>Dev Letters</h2>
    <div class="card">
      <table class="w-100">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(letter, index) in letters" :key="letter.link">
            <td>
              <a :href="letter.link">Dev Letter #{{ letters.length - index }}</a>
            </td>
            <td>{{ prettyDate(letter.date) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>Milestones</h2>
    <div class="card">
      <table class="w-100">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="milestone in milestones" :key="milestone.name">
            <td>
              <a v-if="milestone.link" :href="milestone.link">{{ milestone.name }}</a>
              <template v-else>{{ milestone.name }}</template>
            </td>
            <td>{{ prettyDate(milestone.date) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>Versions</h2>
    <div class="card">
      <table class="w-100">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="version in versions" :key="version.name">
            <td>{{ version.name }}</td>
            <td>{{ prettyDate(version.date) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
</template>
