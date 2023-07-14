<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
});

const opened = ref(props.open);
</script>

<template>
  <div class="card">
    <div @click="opened = !opened" id="accordioncard--header" class="p-3">
      <slot name="header"></slot>
      <img v-if="opened" src="@/assets/img/material_remove.svg" />
      <img v-else src="@/assets/img/material_add.svg" />
    </div>
    <div v-if="opened">
      <div id="accordioncard--divider"></div>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>
#accordioncard--header {
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#accordioncard--divider {
  margin: 0;
  border-bottom: 1px solid var(--border-color);
}
</style>
