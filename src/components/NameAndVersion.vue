<template>
  <div id="all">
    <div id="name" :style="nameStyle">PM Random</div>
    <div id="version" :style="versionStyle">{{ store.version }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMainStore } from "@/stores/main";

const props = defineProps({
  home: Boolean,
});

const store = useMainStore();
store.refreshVersion();

const nameStyle = computed(() => `font-size: ${props.home ? "48" : "24"}px`);
const versionStyle = computed(() => `font-size: ${props.home ? "28" : "14"}px`);
</script>

<style scoped>
#all {
  font-family: "Rajdhani", sans-serif;
  width: min-content;
  margin: auto;
}

#name {
  color: black;
  white-space: nowrap;
}

#version {
  color: var(--accent-color);
  text-align: right;
  margin-top: -11%;
}
</style>
