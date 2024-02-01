<script setup lang="ts">
import store from "@/store";

const props = defineProps({
  large: {
    type: Boolean,
    default: false
  }
});

const nameSize = props.large ? "3rem" : "1.5rem";
const versionSize = props.large ? "1.5rem" : "0.875rem";
</script>

<template>
  <div id="sitelogotext--root">
    <div id="sitelogotext--name" :style="`font-size: ${nameSize}`">PM Random</div>
    <div id="sitelogotext--version" :style="`font-size: ${versionSize}`">
      {{ store.state.version }}
    </div>
  </div>
</template>

<style scoped>
#sitelogotext--root {
  font-family: var(--title-font-family);
  user-select: none;
}

#sitelogotext--name {
  white-space: nowrap;
  line-height: 0.85;
}

#sitelogotext--version {
  color: var(--accent-color);
  text-align: right;
  line-height: 0.85;
}
</style>
