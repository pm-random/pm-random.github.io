<script setup lang="ts">
import { computed, ref } from "vue";
import { useTitle } from "@vueuse/core";
import { cdn_url, fetch_cdn_data } from "@/cdn";
import { prettyDate } from "@/utils";

interface Item {
  name: string;
  date: string;
  category?: string;
  link?: string;
  icon?: string;
  detail?: string;
  weight?: number;
}

function groupBy<K, V>(list: Array<V>, keyGetter: (item: V) => K) {
  const map = new Map<K, Array<V>>();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

function itemCmp(a: Item, b: Item) {
  const dateCmpResult = b.date.localeCompare(a.date);
  if (dateCmpResult !== 0) return dateCmpResult;
  if (a.weight !== undefined && b.weight === undefined) return -1;
  if (a.weight === undefined && b.weight !== undefined) return 1;
  if (a.weight === undefined && b.weight === undefined) return a.name.localeCompare(b.name);

  const weightCmpResult = b.weight!! - a.weight!!;
  if (weightCmpResult !== 0) return weightCmpResult;

  return a.name.localeCompare(b.name);
}

function itemMapper(item: Item) {
  if (item.icon === undefined)
    return item
  return { ...item, icon: cdn_url(item.icon) }
}

useTitle("Timeline | PM Random");

const weightMap = new Map([
  [1, "timeline--minor"],
  [2, "timeline--major"]
]);

const items = ref<Array<Item>>();
const groups = computed(() => {
  if (items.value === undefined) return undefined;
  else return groupBy<string, Item>(items.value, (item) => item.date);
});

fetch_cdn_data<Array<Item>>("timeline").then((timeline) => {
  items.value = timeline.sort(itemCmp).map(itemMapper);
});
</script>

<template>
  <h1>Timeline</h1>
  <template v-if="groups != null">
    <div class="card">
      <table class="w-100">
        <thead>
          <tr>
            <th>Date</th>
            <th>Events</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="[date, items] in groups" :key="date">
            <td>{{ prettyDate(date) }}</td>
            <td>
              <div v-for="(item, index) in items" class="timeline--item" :key="index">
                <img v-if="item.icon" :src="item.icon" class="timeline--icon"/>
                <span :class="item.weight ? weightMap.get(item.weight) : null">
                  <a v-if="item.link" :href="item.link">{{ item.name }}</a>
                  <template v-else>{{ item.name }}</template>
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
</template>

<style scoped>
.timeline--item {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
.timeline--major {
  font-weight: 700;
}
.timeline--minor {
  font-weight: 600;
}
.timeline--icon {
  height: 24px;
  width: 24px;
}
</style>
