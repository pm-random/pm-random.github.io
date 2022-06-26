<template>
  <span id="all">
    <span id="name" :style="nameStyle">PM Random</span>
    <sup id="version" :style="versionStyle">{{ version }}</sup>
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { JSONFetch } from "@/data";

const props = defineProps({
  home: Boolean,
});

const nameStyle = computed(() => `font-size: ${props.home ? "48" : "24"}px`);
const versionStyle = computed(() => `font-size: ${props.home ? "36" : "18"}px`);

const version = ref();
JSONFetch("version").then(json => (version.value = json));
</script>

<style scoped>
#all {
  font-family: "Rajdhani", sans-serif;
}

#name {
  color: black;
}

#version {
  color: var(--accent-color);
}
</style>
